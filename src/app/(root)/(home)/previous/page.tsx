import CallsList from '@/components/CallsList'
import React from 'react'

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous Calls</h1>

      <CallsList type="previous" />
    </section>
  )
}

export default Previous
