// Simple in-memory rate limiter for public API routes.
// Tracks requests per IP in a sliding window. Not distributed-safe
// (resets on cold start), but blocks casual abuse and bot floods.

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

// Periodic cleanup to prevent memory growth
let lastCleanup = Date.now()
function cleanup(now: number) {
  if (now - lastCleanup < 60_000) return
  lastCleanup = now
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetIn: number
}

/**
 * Check if a request from the given key is within the rate limit.
 * @param key - Unique identifier (typically client IP)
 * @param maxRequests - Max requests allowed in the window
 * @param windowMs - Window duration in milliseconds
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  cleanup(now)

  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs }
  }

  if (bucket.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetIn: bucket.resetAt - now }
  }

  bucket.count += 1
  return {
    allowed: true,
    remaining: maxRequests - bucket.count,
    resetIn: bucket.resetAt - now,
  }
}

/**
 * Extract the client IP from a Next.js request.
 * Checks x-forwarded-for (Vercel/proxies) then falls back.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

// Presets for public forms: 5 submissions per 10 minutes per IP
export const FORM_RATE_LIMIT = { maxRequests: 5, windowMs: 10 * 60 * 1000 }
// Stricter for download/save endpoints that cost Resend sends
export const DOWNLOAD_RATE_LIMIT = { maxRequests: 10, windowMs: 10 * 60 * 1000 }
