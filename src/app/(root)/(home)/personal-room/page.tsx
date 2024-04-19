'use client'

import { Button } from '@/components/ui/button'
import { useGetMeetingCall } from '@/hooks/useGetMeetingCall'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type TableProps = {
  title: string
  description: string
}
const Table = ({ title, description }: TableProps) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-sky-100 lg:text-xl xl:min-w-32">{title}:</h1>
    <h2 className="truncate text-sm max-sm:max-w-[320px] lg^text-xl">{description}</h2>
  </div>
)

const PersonalRoom = () => {
  const { user } = useUser()
  const meetingId = user?.id
  const meetingRoute = `/meeting/${meetingId}?personal=true`
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}${meetingRoute}`

  const client = useStreamVideoClient()
  const { meetingCall } = useGetMeetingCall(meetingId!)

  const router = useRouter()

  const startRoom = async () => {
    if (!client || !user) throw new Error('Client or user is not defined')

    if (!meetingCall) {
      try {
        const newPersonalMeeting = client.call('default', meetingId!)
        await newPersonalMeeting.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
            custom: {
              description: `${user.firstName}'s Personal Meeting Room`,
            },
          },
        })
      } catch (error) {
        console.log('Error getting or creating', error)
        throw error
      }
    }

    router.push(meetingRoute)
  }

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.fullName}'s Meeting Room`} />
        <Table title="Meeting ID" description={`${meetingId!}`} />
        <Table title="Meeting Link" description={`${meetingLink!}`} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-500 hover:bg-blue-500/80" onClick={startRoom}>
          Start meeting
        </Button>
        <Button
          className="bg-gray-500 hover:bg-gray-500/80"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast.success('Link copied!')
          }}
        >
          Copy link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
