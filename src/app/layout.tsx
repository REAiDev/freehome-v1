import type { Metadata } from 'next';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { API_GATEWAY_CONFIG } from '@/lib/deployment-config';
import './globals.css';

// For AWS builds, the manifest URL needs the stage prefix to match assetPrefix
function getManifestUrl() {
  // Log for debugging
  console.log('[DEBUG] BUILD_TARGET:', process.env.BUILD_TARGET);
  console.log('[DEBUG] API_GATEWAY_STAGE:', process.env.API_GATEWAY_STAGE);

  if (API_GATEWAY_CONFIG.IS_AWS_BUILD) {
    const url = `${API_GATEWAY_CONFIG.BASE_PATH}/manifest.webmanifest`;
    console.log('[DEBUG] AWS manifest URL:', url);
    return url;
  }

  const defaultUrl = '/manifest.webmanifest';
  console.log('[DEBUG] Default manifest URL:', defaultUrl);
  return defaultUrl;
}

// Get the favicon URL with proper path prefix
function getFaviconUrl() {
  if (API_GATEWAY_CONFIG.IS_AWS_BUILD) {
    return `${API_GATEWAY_CONFIG.BASE_PATH}/favicon.ico`;
  }
  return '/favicon.ico';
}

function getAppleTouchIconUrl() {
  if (API_GATEWAY_CONFIG.IS_AWS_BUILD) {
    return `${API_GATEWAY_CONFIG.BASE_PATH}/apple-touch-icon.png`;
  }
  return '/apple-touch-icon.png';
}

export const metadata: Metadata = {
  title: 'FreeHome.World - 1 Euro Properties',
  description: 'Discover 1 Euro Properties and Affordable Housing Programs Worldwide',
  manifest: getManifestUrl(),
  icons: {
    icon: getFaviconUrl(),
    apple: getAppleTouchIconUrl(),
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <NavigationWrapper />
            <main className="flex-grow">{children}</main>
            <footer className="bg-gray-50 border-t border-gray-200">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
                <div className="flex flex-col items-center text-center">
                  <Image src="/freehome-logo.png" alt="FreeHome.World" width={120} height={53} />
                  <p className="mt-2 text-sm text-gray-500">Part of REAi.co Global Home Services</p>
                  <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link
                      href="/about"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/privacy"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Privacy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Terms
                    </Link>
                    <Link
                      href="/cookies"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Cookies
                    </Link>
                  </nav>
                  {/* Social Media Links */}
                  <div className="mt-6 flex justify-center gap-4">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/company/reai-co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    {/* Telegram */}
                    <a
                      href="https://t.me/REAIco"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Telegram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/REAi.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    {/* Twitter/X */}
                    <a
                      href="https://twitter.com/REAi_co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/reai.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@REAi-co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@reai.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                      aria-label="TikTok"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                  <p className="mt-6 text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} FreeHome.World. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
