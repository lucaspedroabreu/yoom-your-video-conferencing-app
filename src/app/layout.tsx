import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans, JetBrains_Mono as FontMono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { enUS } from '@clerk/localizations'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Yoom | Your Conferencing App',
  description: 'A truly powerful replica of zoom',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      localization={enUS}
      appearance={{
        elements: {
          socialButtonsIconButton: {
            backgroundColor: '#ffffff20',
          },
        },
        layout: {
          socialButtonsPlacement: 'bottom',
          logoImageUrl: '/images/yoom-logo-2.png',
          logoPlacement: 'inside',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning className="flex size-full">
        <body className={cn('flex flex-1 font-sans antialiased bg-dark-2', fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}
