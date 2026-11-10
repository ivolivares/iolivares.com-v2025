import { defineCloudflareConfig, getCloudflareContext } from "@opennextjs/cloudflare"
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

function hasKv(): boolean {
  try {
    const env = getCloudflareContext().env as { NEXT_INC_CACHE_KV?: unknown }
    return Boolean(env.NEXT_INC_CACHE_KV)
  } catch {
    return false
  }
}

// Production keeps the KV cache so home and /thoughts can revalidate.
// Preview has no KV binding, so it reads the prerender and never writes.
const incrementalCache = {
  name: kvIncrementalCache.name,
  get: (...args: Parameters<typeof kvIncrementalCache.get>) =>
    hasKv() ? kvIncrementalCache.get(...args) : staticAssetsIncrementalCache.get(...args),
  set: async (...args: Parameters<typeof kvIncrementalCache.set>) => {
    if (!hasKv()) return
    await kvIncrementalCache.set(...args)
  },
  delete: async (...args: Parameters<typeof kvIncrementalCache.delete>) => {
    if (!hasKv()) return
    await kvIncrementalCache.delete(...args)
  },
} as typeof kvIncrementalCache

export default defineCloudflareConfig({
  incrementalCache,
})
