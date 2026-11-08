const OTP_TTL_MS = 10 * 60 * 1000

export const OTP_COOKIE = "services_otp"

export function otpSecret(onWorker: boolean): string {
  const configured = process.env.SERVICES_OTP_SECRET || process.env.DRAFT_SECRET_TOKEN
  if (configured) return configured
  if (!onWorker) return "dev-services-otp"
  return ""
}

export async function createOtp(email: string, secret: string, now = Date.now()) {
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0")
  const exp = now + OTP_TTL_MS
  const sig = await sign(`${normalize(email)}|${code}|${exp}`, secret)
  return { code, cookieValue: `${normalize(email)}|${exp}|${sig}`, maxAge: OTP_TTL_MS / 1000 }
}

export async function verifyOtp(
  cookie: string | undefined,
  email: string,
  code: string,
  secret: string,
  now = Date.now()
) {
  if (!cookie || !secret || !/^\d{6}$/.test(code)) return false
  const [cookieEmail, expRaw, sig] = splitCookie(cookie)
  const exp = Number(expRaw)
  if (!cookieEmail || !sig || !Number.isFinite(exp) || exp < now) return false
  if (cookieEmail !== normalize(email)) return false
  const expected = await sign(`${normalize(email)}|${code}|${exp}`, secret)
  return safeEqual(expected, sig)
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

function splitCookie(cookie: string): [string, string, string] {
  const expIndex = cookie.lastIndexOf("|")
  const emailIndex = cookie.lastIndexOf("|", expIndex - 1)
  if (emailIndex <= 0 || expIndex <= emailIndex) return ["", "", ""]
  return [cookie.slice(0, emailIndex), cookie.slice(emailIndex + 1, expIndex), cookie.slice(expIndex + 1)]
}

function normalize(email: string) {
  return email.trim().toLowerCase()
}

function safeEqual(left: string, right: string) {
  const a = new TextEncoder().encode(left)
  const b = new TextEncoder().encode(right)
  if (a.length !== b.length) return false
  let diff = 0
  for (let index = 0; index < a.length; index++) diff |= a[index] ^ b[index]
  return diff === 0
}
