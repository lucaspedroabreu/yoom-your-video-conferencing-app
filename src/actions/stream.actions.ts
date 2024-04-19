'use server'

import { currentUser } from '@clerk/nextjs'
import { StreamClient } from '@stream-io/node-sdk'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
  const user = await currentUser()

  if (!user) throw new Error('User not authenticated!')
  if (!apiKey) throw new Error('Server error (no api key)!')
  if (!apiSecret) throw new Error('Server error (no api secret)!')

  const streamClient = new StreamClient(apiKey, apiSecret, { timeout: 3000 })
  const expirationDate = Math.round(new Date().getTime() / 1000) + 60 * 60
  const issued = Math.floor(Date.now() / 1000) - 60 // Deprecated (it will be set internelly)

  const token = streamClient.createToken(user.id, expirationDate, issued)

  return token
}
