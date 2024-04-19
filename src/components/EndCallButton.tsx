'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const EndCallButton = () => {
  const videoCall = useCall()
  const router = useRouter()

  const { useLocalParticipant } = useCallStateHooks()
  const localPariticpant = useLocalParticipant()

  const isMeetingOwner =
    localPariticpant && videoCall?.state.createdBy && localPariticpant.userId === videoCall.state.createdBy.id

  if (!isMeetingOwner) return null

  return (
    <Button
      variant="default"
      onClick={async () => {
        videoCall.endCall()
        router.replace('/')
      }}
      className="bg-destructive hover:bg-destructive-darker cursor-alias"
    >
      End call for everyone
    </Button>
  )
}

export default EndCallButton
