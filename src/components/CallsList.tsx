'use client'

import { useGetAllCalls } from '@/hooks/useGetAllCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from '@/components/MeetingCard'
import Loader from '@/components/Loader'
import { toast } from 'sonner'

const CallsList = ({ type }: { type: 'previous' | 'upcoming' | 'recorded' }) => {
  const { isLoading, previousCalls, recordedCalls, upcomingCalls } = useGetAllCalls()
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const router = useRouter()

  const getFilteredCalls = () => {
    switch (type) {
      case 'previous':
        return previousCalls
      case 'recorded':
        return recordings
      case 'upcoming':
        return upcomingCalls
      default:
        return []
    }
  }

  const getEmptyCallsMessage = () => {
    switch (type) {
      case 'previous':
        return 'No previouslly ended calls'
      case 'recorded':
        return 'No recorded calls registered'
      case 'upcoming':
        return 'No scheduled calls'
      default:
        return ''
    }
  }

  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(recordedCalls?.map((meeting) => meeting.queryRecordings()) ?? [])

        const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings)

        setRecordings(recordings)
      }

      if (type === 'recorded') {
        fetchRecordings()
      }
    } catch (error) {
      toast.warning('Try again later!')
    }
  }, [type, recordedCalls])

  if (isLoading) return <Loader />

  const calls = getFilteredCalls()
  const emptyCallsMessage = getEmptyCallsMessage()
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'previous'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Description'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'previous'}
            link={
              type === 'recorded'
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recorded' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recorded' ? 'Play' : 'Start'}
            handleClick={
              type === 'recorded'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{emptyCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallsList
