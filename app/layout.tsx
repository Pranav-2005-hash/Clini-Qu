import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import AuthProvider from '@/components/providers/session-provider'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/contexts/language-context'

export const metadata: Metadata = {
  title: 'Clini-Q',
  description: 'Your gentle health companion',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/clini-q-logo.svg" />
        <style>{`
          :root {
            --toast-background: #ffffff;
            --toast-foreground: #111827;
            --toast-border: #e5e7eb;
            --toast-success: #10b981;
            --toast-error: #ef4444;
            --toast-warning: #f59e0b;
            --toast-info: #3b82f6;
          }

          .dark {
            --toast-background: #1f2937;
            --toast-foreground: #f9fafb;
            --toast-border: #374151;
          }

          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <Toaster 
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast: 'group relative flex items-center justify-between space-x-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 pr-8 shadow-lg transition-all duration-300 data-[swipe=move]:transition-none data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-4',
                  title: 'text-sm font-semibold text-gray-900',
                  description: 'text-sm text-gray-600',
                  closeButton: 'absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 group-hover:opacity-100',
                  success: 'bg-green-50 border-green-200',
                  error: 'bg-red-50 border-red-200',
                  warning: 'bg-amber-50 border-amber-200',
                  info: 'bg-blue-50 border-blue-200',
                },
                duration: 500,
                style: {
                  animationDuration: '300ms',
                  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform, opacity',
                },
              }}
              closeButton
              richColors
              theme="light"
              visibleToasts={3}
              duration={500}
              expand
              gap={12}
              offset="16px"
              pauseWhenPageIsHidden={false}
            />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
