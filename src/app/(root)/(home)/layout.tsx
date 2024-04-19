import React, { ReactNode } from 'react'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

type HomeLayoutProps = {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex flex-col flex-1 flex-grow">
      <div className="flex flex-col flex-grow relative">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <section className="flex flex-col flex-1 w-full">
            <div className="h-full">
              <section className="flex size-full flex-col gap-10 text-muted p-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                {children}
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
