const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA"

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA"

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAF62OAYvIEAQmASR"

export function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1"
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
