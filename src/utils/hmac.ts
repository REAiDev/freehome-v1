import crypto from 'crypto';

/**
 * Generate HMAC signature for URL parameters
 * @param data - Query string to sign (e.g., "price_min=50&price_max=150&countries=Italy")
 * @returns Base64-encoded HMAC signature
 */
export function generateHMAC(data: string): string {
  const secret = process.env.HMAC_SECRET_KEY;

  if (!secret) {
    throw new Error('HMAC_SECRET_KEY not configured');
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  return hmac.digest('base64');
}

/**
 * Build complete signed URL for redirect
 */
export function buildSignedRedirectUrl(params: Record<string, string>): string {
  const baseUrl = process.env.NEXT_PUBLIC_REAI_WEBSITE_URL || 'https://reai.co';

  // Build query string
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // Generate signature
  const signature = generateHMAC(queryString);

  // Append signature
  const signedUrl = `${baseUrl}/freehomeworld?${queryString}&signature=${encodeURIComponent(signature)}`;

  return signedUrl;
}
