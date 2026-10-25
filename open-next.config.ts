import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// 2026-10-25: the default (no) cache left ~1 in 4 uncached page renders hanging ("waitUntil() tasks did not
// complete ... cancelled"). Prerendered pages are served straight from assets. Same fix as 1210cedar (7bc4a31).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
