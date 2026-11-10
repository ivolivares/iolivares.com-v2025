import { defineCloudflareConfig, getCloudflareContext } from "@opennextjs/cloudflare"
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache"
import staticAssetsIncrementalCache, {
  NAME as STATIC_ASSETS_CACHE_NAME,
} from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

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
  name: STATIC_ASSETS_CACHE_NAME,
  async get(...args: Parameters<typeof staticAssetsIncrementalCache.get>) {
    if (hasKv()) {
      try {
        const hit = await kvIncrementalCache.get(...args)
        if (hit) return hit
      } catch {
        // A missing read falls through to the prerender stored with the build.
      }
    }
    return staticAssetsIncrementalCache.get(...args)
  },
  async set(...args: Parameters<typeof kvIncrementalCache.set>) {
    if (!hasKv()) return
    await kvIncrementalCache.set(...args)
  },
  async delete(...args: Parameters<typeof kvIncrementalCache.delete>) {
    if (!hasKv()) return
    await kvIncrementalCache.delete(...args)
  },
} as typeof staticAssetsIncrementalCache

export default defineCloudflareConfig({
  incrementalCache,
})
