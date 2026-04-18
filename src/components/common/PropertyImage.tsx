'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PropertyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
}

/**
 * PropertyImage Component
 *
 * A reusable image component that gracefully handles image loading failures
 * by displaying a branded placeholder when the source image cannot be loaded.
 *
 * Best Practices Applied:
 * - Branded placeholder maintains professional appearance
 * - Clear messaging about unavailable content
 * - Automatic fallback on any load error (403, 404, timeout, etc.)
 * - Optimized for Next.js Image component features
 *
 * @param src - Image source URL
 * @param alt - Alternative text for accessibility
 * @param fill - Whether to fill parent container (Next.js Image prop)
 * @param width - Image width (required if fill is false)
 * @param height - Image height (required if fill is false)
 * @param sizes - Responsive image sizes
 * @param className - Additional CSS classes
 * @param priority - Load image with high priority
 * @param loading - Loading strategy (lazy or eager)
 * @param quality - Image quality (1-100)
 */
const PropertyImage = ({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = '',
  priority = false,
  loading = 'lazy',
  quality,
}: PropertyImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // Only set placeholder once to avoid infinite loops
    if (!hasError) {
      setHasError(true);
      setImgSrc('/images/placeholder-property.svg');
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={hasError ? 'Property image not available' : alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={priority ? undefined : loading}
      quality={quality}
      onError={handleError}
    />
  );
};

export default PropertyImage;
