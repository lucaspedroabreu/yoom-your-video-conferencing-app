import MeetingOptionsSection from '@/components/MeetingOptionsSection'
import { cn } from '@/lib/utils'
import { JetBrains_Mono as FontMono } from 'next/font/google'
import React, { useEffect, useState } from 'react'

import { Temporal } from 'temporal-polyfill'

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500'],
})

const formatDate = () => {
  const date = Temporal.Now.plainDateISO()
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTime = () => {
  const time = Temporal.Now.plainTimeISO()
  const formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return formattedTime
}

type DateTimeType = 'date' | 'time' | 'both'
function getCurrentDateTime(type: 'date'): string
function getCurrentDateTime(type: 'time'): string
function getCurrentDateTime(type: 'both'): { date: string; time: string }
function getCurrentDateTime(type: DateTimeType = 'both'): any {
  switch (type) {
    case 'date':
      return formatDate()
    case 'time':
      return formatTime()
    default:
      return {
        time: formatTime(),
        date: formatDate(),
      }
  }
}

const Home = () => {
  // const [time, setTime] = useState(getCurrentDateTime('time'))
  const time = getCurrentDateTime('time')
  const date = getCurrentDateTime('date')

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setTime(getCurrentDateTime('time'))
  //   }, 30 * 1000) // Update time every 1/2 minute

  //   return () => clearInterval(timerId) // Cleanup on component unmount
  // }, [])

  // useEffect(() => {}, [])

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-11">
          <h2 className="glassmorphic-bg max-w-[270px]">Upcoming Meeting at: 12:30</h2>
          <div className="flex flex-col gap-2">
            <h1 className={cn('h1 lg:text-7xl font-extrabold', fontMono.variable)}>{time}</h1>
            <p className="text-lg font-medium text-sky-200 lg:pl-2">{date}</p>
          </div>
        </div>
      </div>

      <MeetingOptionsSection />
    </section>
  )
}

export default Home
