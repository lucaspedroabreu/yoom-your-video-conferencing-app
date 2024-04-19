import CallsList from '@/components/CallsList'
import React from 'react'

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recorded Meetings</h1>

      <CallsList type="recorded" />
    </section>
  )
}

export default Recordings
