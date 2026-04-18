/**
 * Error State Component
 * Responsibility: Display error states with retry functionality
 * Follows SRP by focusing only on error display and recovery
 */

import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle, WifiOff } from 'lucide-react';

export interface ErrorStateProps {
  readonly message: string;
  readonly onRetry?: () => void;
  readonly isRetrying?: boolean;
}

export function ErrorState({
  message,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  const isNetworkError =
    message.toLowerCase().includes('network') ||
    message.toLowerCase().includes('fetch') ||
    message.toLowerCase().includes('connection');

  return (
    <div className="mx-auto max-w-2xl py-20">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          {isNetworkError ? (
            <WifiOff className="h-8 w-8 text-red-600" />
          ) : (
            <AlertCircle className="h-8 w-8 text-red-600" />
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {isNetworkError ? 'Connection Problem' : 'Something went wrong'}
        </h3>

        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          {message}
        </p>

        {onRetry && (
          <div className="space-y-4">
            <Button
              onClick={onRetry}
              disabled={isRetrying}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </>
              )}
            </Button>

            <div className="text-sm text-gray-500">
              <p>
                If the problem persists, please check your internet connection
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
