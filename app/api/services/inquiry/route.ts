import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextResponse } from "next/server"
import { defaultInquiryFilePath, isCloudflareWorker, submitServiceInquiry } from "@/lib/service-inquiries"
import { type InquiryErrorCode, type InquiryResponse, isInquiryFailure } from "@/lib/service-inquiry-contract"

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

  const result = await submitServiceInquiry({
    body,
    config: await readLeadConfig(),
    filePath: defaultInquiryFilePath(),
    now: Date.now(),
    onWorker: isCloudflareWorker(),
    originAllowed: isSameOrigin(request),
  })

  return respond(result)
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
