const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA"

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"

type EmailBinding = {
  send(message: { from: string; subject: string; text: string; to: string }): Promise<unknown>
}

export async function verifyTurnstile(token: string, ip: string | null, onWorker: boolean) {
  const secret = process.env.TURNSTILE_SECRET_KEY || (!onWorker ? TURNSTILE_TEST_SECRET : "")
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
  code: string
  env: unknown
  locale: "en" | "es"
  onWorker: boolean
  to: string
}): Promise<"dev" | "sent" | "unavailable"> {
  const email = readEmailBinding(input.env)
  if (!email) return input.onWorker ? "unavailable" : "dev"
  const from = "hi@iolivares.com"
  const subject = input.locale === "es" ? "Tu código para ver los precios" : "Your code to see pricing"
  const text =
    input.locale === "es"
      ? `Tu código es ${input.code}. Vence en 10 minutos.`
      : `Your code is ${input.code}. It expires in 10 minutes.`
  try {
    await email.send({ from, subject, text, to: input.to })
    return "sent"
  } catch (error) {
    console.error(
      JSON.stringify({ detail: error instanceof Error ? error.message : "email failed", event: "service_otp_email" })
    )
    return "unavailable"
  }
}

function readEmailBinding(env: unknown): EmailBinding | null {
  if (!env || typeof env !== "object") return null
  const candidate = (env as { SERVICES_EMAIL?: { send?: unknown } }).SERVICES_EMAIL
  if (!candidate || typeof candidate.send !== "function") return null
  return candidate as EmailBinding
}
