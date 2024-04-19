import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

export const useGetMeetingCall = (id: string | string[]) => {
  const [meetingCall, setMeetingCall] = useState<Call>()
  const [isCallLoading, setIsCallLoading] = useState(true)

  const videoClient = useStreamVideoClient()

  useEffect(() => {
    if (!videoClient) return

    const loadMeetingCall = async () => {
      const { calls } = await videoClient.queryCalls({
        filter_conditions: { id },
      })

      if (calls.length > 0) setMeetingCall(calls[0])

      setIsCallLoading(false)
    }

    loadMeetingCall()
  }, [id, videoClient])

  return { meetingCall, isCallLoading }
}
