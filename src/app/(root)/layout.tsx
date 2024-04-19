import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'

type RootLayoutProps = {
  children: ReactNode
}

const SecondRootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="flex flex-1 flex-grow">
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}

export default SecondRootLayout
