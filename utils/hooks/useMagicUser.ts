import { magicClient } from '../../config/magicLink'
import { type MagicUserMetadata } from '@magic-sdk/react-native-expo'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type MagicUser = MagicUserMetadata & {
  isLoggedIn: boolean
}

export const magicUserAtom = atomWithStorage<MagicUser | undefined>('magicUser', undefined)

// TODO don't break rule of hooks
export async function useSetMagicUser () {
  const [, setUser] = useAtom(magicUserAtom)
  const isLoggedIn = await magicClient.user.isLoggedIn()
  const userMetadata = await magicClient.user.getInfo()
  setUser({ ...userMetadata, isLoggedIn })
}
