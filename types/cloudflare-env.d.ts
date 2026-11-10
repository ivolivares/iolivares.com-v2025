declare global {
  interface CloudflareEnv {
    DRAFT_SECRET_TOKEN?: string
    NOTION_LEADS_DATABASE_ID?: string
    NOTION_TOKEN?: string
    RESEND_API_KEY?: string
    TURNSTILE_SECRET_KEY?: string
  }
}

export {}
