/**
 * Minimal in-memory fixed-window rate limiter, keyed by client IP.
 *
 * Note: serverless instances are ephemeral and not shared, so this is a
 * best-effort throttle to blunt casual abuse — pair it with the honeypot.
 * Swap in Upstash/Redis if you need a durable, cross-instance limit.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = { allowed: boolean; remaining: number; resetAt: number };

export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    // Opportunistic cleanup so the map can't grow unbounded.
    if (buckets.size > 5_000) {
      for (const [k, v] of buckets) if (now >= v.resetAt) buckets.delete(k);
    }
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return { allowed, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}
