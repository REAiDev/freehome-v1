import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  /** The main headline text */
  title: string | ReactNode;
  /** The subtitle or description text */
  subtitle?: string | ReactNode;
  /** Additional content to render in the hero (buttons, stats, etc.) */
  children?: ReactNode;
  /** Custom background gradient variant */
  variant?:
    | 'primary'
    | 'secondary'
    | 'programs'
    | 'municipalities'
    | 'properties';
  /** Size variant for different hero heights */
  size?: 'default' | 'large' | 'compact';
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the background overlay */
  showOverlay?: boolean;
  /** Custom background pattern */
  showPattern?: boolean;
}

const gradientVariants = {
  primary: 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800',
  secondary: 'bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-800',
  programs: 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800',
  municipalities:
    'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800',
  properties: 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800',
};

const sizeVariants = {
  compact: 'py-8 sm:py-12',
  default: 'py-12 sm:py-16',
  large: 'py-16 sm:py-20 lg:py-24',
};

/**
 * Standardized Hero component for all public pages
 * Provides consistent styling, padding, and layout structure
 */
export function Hero({
  title,
  subtitle,
  children,
  variant = 'primary',
  size = 'default',
  className,
  showOverlay = true,
  showPattern = true,
}: HeroProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden px-6 lg:px-8',
        gradientVariants[variant],
        sizeVariants[size],
        className
      )}
    >
      {/* Background Pattern */}
      {showPattern && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* Background Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
      )}

      {/* Content Container */}
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          {/* Title */}
          {typeof title === 'string' ? (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              {title}
            </h1>
          ) : (
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              {title}
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <div className="mt-4 text-lg md:text-xl leading-relaxed text-blue-50 max-w-3xl mx-auto">
              {typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle}
            </div>
          )}
        </div>

        {/* Additional Content */}
        {children && <div className="mt-8 animate-slide-up">{children}</div>}
      </div>
    </div>
  );
}

export default Hero;
