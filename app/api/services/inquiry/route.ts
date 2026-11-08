import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextResponse } from "next/server"
import { z } from "zod"
import { sendOtpEmail, verifyTurnstile } from "@/lib/service-challenge"
import { defaultInquiryFilePath, isCloudflareWorker, submitServiceInquiry } from "@/lib/service-inquiries"
import { type InquiryErrorCode, type InquiryResponse, isInquiryFailure } from "@/lib/service-inquiry-contract"
import { createOtp, OTP_COOKIE, otpSecret, verifyOtp } from "@/lib/service-otp"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const MAX_BODY_CHARS = 12_000

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return respond(failure("invalid_body"))
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0")
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_CHARS) {
    return respond(failure("invalid_body"))
  }

  let raw = ""
  try {
    raw = await request.text()
  } catch {
    return respond(failure("invalid_body"))
  }
  if (raw.length > MAX_BODY_CHARS) return respond(failure("invalid_body"))

  let body: unknown
  try {
    body = JSON.parse(raw) as unknown
  } catch {
    return respond(failure("invalid_body"))
  }

  if (!isSameOrigin(request)) return respond(failure("origin"))
  if (isIntent(body, "send-code")) return sendCode(request, body)
  if (isIntent(body, "verify")) return verifyCode(request, body)
  return respond(failure("invalid_body"))
}

const sendCodeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  locale: z.enum(["en", "es"]).optional(),
  turnstileToken: z.string().min(1),
})

async function sendCode(request: Request, body: unknown) {
  const parsed = sendCodeSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "invalid_email", ok: false }, { status: 400 })
  const onWorker = isCloudflareWorker()
  const ip = request.headers.get("cf-connecting-ip")
  const human = await verifyTurnstile(parsed.data.turnstileToken, ip, onWorker)
  if (!human) return NextResponse.json({ error: "turnstile", ok: false }, { status: 400 })
  const secret = otpSecret(onWorker)
  if (!secret) return NextResponse.json({ error: "email_unavailable", ok: false }, { status: 503 })
  const otp = await createOtp(parsed.data.email, secret)
  const { env } = await platformEnv()
  const delivery = await sendOtpEmail({
    code: otp.code,
    env,
    locale: parsed.data.locale === "es" ? "es" : "en",
    onWorker,
    to: parsed.data.email,
  })
  if (delivery === "unavailable") return NextResponse.json({ error: "email_unavailable", ok: false }, { status: 503 })
  const response = NextResponse.json({ devCode: delivery === "dev" ? otp.code : undefined, ok: true })
  response.cookies.set(OTP_COOKIE, otp.cookieValue, {
    httpOnly: true,
    maxAge: otp.maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  return response
}

async function verifyCode(request: Request, body: unknown) {
  const record = body as { code?: unknown; email?: unknown }
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : ""
  const code = typeof record.code === "string" ? record.code.trim() : ""
  const onWorker = isCloudflareWorker()
  const secret = otpSecret(onWorker)
  const cookie = readCookie(request, OTP_COOKIE)
  const valid = await verifyOtp(cookie, email, code, secret)
  if (!valid) return NextResponse.json({ error: "invalid_code", ok: false }, { status: 400 })
  const result = await submitServiceInquiry({
    body,
    config: await readLeadConfig(),
    filePath: defaultInquiryFilePath(),
    now: Date.now(),
    onWorker,
    originAllowed: true,
  })
  const response = respond(result)
  response.cookies.set(OTP_COOKIE, "", { httpOnly: true, maxAge: 0, path: "/" })
  return response
}

async function platformEnv(): Promise<{ env: unknown }> {
  try {
    const context = await getCloudflareContext({ async: true })
    return { env: context.env }
  } catch {
    return { env: undefined }
  }
}

function isIntent(body: unknown, intent: "send-code" | "verify"): boolean {
  return !!body && typeof body === "object" && (body as { intent?: unknown }).intent === intent
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get("cookie") ?? ""
  const part = header
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
  if (!part) return undefined
  return decodeURIComponent(part.slice(name.length + 1))
}

async function readLeadConfig(): Promise<{ databaseId?: string; token?: string }> {
  const fromProcess = {
    databaseId: process.env.NOTION_LEADS_DATABASE_ID,
    token: process.env.NOTION_TOKEN,
  }
  if ((fromProcess.token && fromProcess.databaseId) || !isCloudflareWorker()) return fromProcess

  try {
    const { env } = await getCloudflareContext({ async: true })
    const extra = env as { NOTION_LEADS_DATABASE_ID?: string; NOTION_TOKEN?: string }
    return {
      databaseId: fromProcess.databaseId || extra.NOTION_LEADS_DATABASE_ID,
      token: fromProcess.token || extra.NOTION_TOKEN,
    }
  } catch (error) {
    console.error(
      JSON.stringify({
        detail: error instanceof Error ? error.message : "context unavailable",
        event: "service_inquiry_env",
      })
    )
    return fromProcess
  }
}

function isSameOrigin(request: Request): boolean {
  const host = new URL(request.url).host
  const origin = request.headers.get("origin")
  if (origin) return hostMatches(origin, host)
  const referer = request.headers.get("referer")
  if (referer) return hostMatches(referer, host)
  return !isCloudflareWorker()
}

function hostMatches(value: string, host: string): boolean {
  try {
    return new URL(value).host === host
  } catch {
    return false
  }
}

function failure(error: InquiryErrorCode): InquiryResponse {
  return { error, ok: false }
}

function statusFor(error: InquiryErrorCode): number {
  switch (error) {
    case "origin":
      return 403
    case "rate_limited":
      return 429
    case "invalid_body":
    case "invalid_company":
    case "invalid_email":
    case "invalid_name":
    case "invalid_need":
    case "too_fast":
      return 400
    default: {
      const exhaustive: never = error
      return exhaustive
    }
  }
}

function respond(result: InquiryResponse) {
  const status = isInquiryFailure(result) ? statusFor(result.error) : 200
  return NextResponse.json(result, {
    headers: { "cache-control": "no-store" },
    status,
  })
}
