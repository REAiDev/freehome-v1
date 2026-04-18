'use client';

import { ApolloProvider } from '@apollo/client/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { apolloClient } from '@/lib/apollo-client';
import { ThemeProvider as NextThemesProvider } from '@/components/ui/theme-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
