import CallsList from '@/components/CallsList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="h1">Upcoming</h1>
      <CallsList type="upcoming" />
    </section>
  )
}

export default Upcoming
