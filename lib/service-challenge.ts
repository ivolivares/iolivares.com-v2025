const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA"

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAF62OAYvIEAQmASR"

const RESEND_FROM = "Iván Olivares <hi@iolivares.com>"

export function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1"
}

export function allowsOnScreenCode(host: string): boolean {
  return isLocalHost(host) || host === "preview.iolivares.com"
}

export function turnstileSecret(env: unknown, host: string): string {
  const configured = readWorkerSecret(env, "TURNSTILE_SECRET_KEY")
  if (configured) return configured
  if (isLocalHost(host)) return TURNSTILE_TEST_SECRET
  return ""
}

export function readWorkerSecret(env: unknown, name: keyof CloudflareEnv): string {
  if (env && typeof env === "object" && name in env) {
    const value = (env as CloudflareEnv)[name]
    if (typeof value === "string" && value) return value
  }
  return process.env[name] ?? ""
}

export async function verifyTurnstile(token: string, ip: string | null, secret: string) {
  if (!secret || !token) return false
  const body = new FormData()
  body.set("secret", secret)
  body.set("response", token)
  if (ip) body.set("remoteip", ip)
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { body, method: "POST" })
  if (!response.ok) return false
  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

export async function sendOtpEmail(input: {
  apiKey: string
  code: string
  locale: "en" | "es"
  to: string
}): Promise<"sent" | "unavailable"> {
  if (!input.apiKey) return "unavailable"
  const subject = input.locale === "es" ? "Tu código para ver los precios" : "Your code to see pricing"
  const text =
    input.locale === "es"
      ? `Tu código es ${input.code}. Vence en 10 minutos.`
      : `Your code is ${input.code}. It expires in 10 minutes.`
  try {
    const response = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: RESEND_FROM,
        subject,
        text,
        to: [input.to],
      }),
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const payload = (await response.json().catch(() => null)) as { id?: string; message?: string } | null
    if (!response.ok) {
      console.error(
        JSON.stringify({
          detail: payload?.message ?? `resend ${response.status}`,
          event: "service_otp_email",
          status: response.status,
        })
      )
      return "unavailable"
    }
    console.info(JSON.stringify({ event: "service_otp_email", id: payload?.id ?? null, status: response.status }))
    return "sent"
  } catch (error) {
    console.error(
      JSON.stringify({ detail: error instanceof Error ? error.message : "email failed", event: "service_otp_email" })
    )
    return "unavailable"
  }
}
