'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type MeetingSetupProps = {
  handleSetupCompletion: (value: true) => void
}
const MeetingSetup = ({ handleSetupCompletion }: MeetingSetupProps) => {
  const [isMicAndCamAccessAllowed, setIsMicAndCamAccessAllowed] = useState(false)

  const meetnigCall = useCall()

  if (!meetnigCall) throw new Error('useCall must be used within StreamCall component')

  const handleJoinMeeting = () => {
    meetnigCall.join()
    handleSetupCompletion(true)
  }

  useEffect(() => {
    if (isMicAndCamAccessAllowed) {
      meetnigCall?.camera.disable()
      meetnigCall?.microphone.disable()
    } else {
      meetnigCall?.camera.enable()
      meetnigCall?.microphone.enable()
    }
  }, [isMicAndCamAccessAllowed, meetnigCall?.camera, meetnigCall?.microphone])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label htmlFor="mic-and-cam-setup" className="flex items-center justify-center gap-2 font-medium">
          <input
            id="mic-and-cam-setup"
            type="checkbox"
            checked={isMicAndCamAccessAllowed}
            onChange={(event) => setIsMicAndCamAccessAllowed(event.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 hover:bg-green-500/80 px-4 py-2.5" onClick={handleJoinMeeting}>
        Join meeting call
      </Button>
    </div>
  )
}

export default MeetingSetup
