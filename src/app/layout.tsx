import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';

import { Geist, Geist_Mono } from 'next/font/google';
import { TRPCReactProvider } from '@/trpc/client';

import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import { siteConfig } from '@/config/site-config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'oklch(0.5054 0.1905 27.5181)',
        },
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute={'class'}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
