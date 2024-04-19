import { cn } from '@/lib/utils'
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutList, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from '@/components/EndCallButton'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'

type MeetingLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get('personal')
  const [layout, setLayout] = useState<MeetingLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const router = useRouter()

  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) return <Loader />

  const MeetingLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full mex-w-[1000px] items-center">
          <MeetingLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-user-list': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls
          onLeave={() => {
            router.push('/')
          }}
        />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-foreground hover:bg-foreground/70 px-4 py-2">
              <LayoutList size={20} className="text-white" />{' '}
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-muted">
            <DropdownMenuLabel>Change Layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['grid', 'speaker-left', 'speaker-right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item as MeetingLayoutType)
                  }}
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button name="participants" type="button" onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-foreground hover:bg-foreground/70 px-4 py-2">
            <Users size={20} className="text-muted" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
