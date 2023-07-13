import React from 'react'
import UserStack from './userStack'
import AuthStack from './authStack'
import { magicUserAtom } from '../utils/hooks/useMagicUser'
import { useAtom } from 'jotai'

export default function RootNavigation () {
  const [user] = useAtom(magicUserAtom)
  return (user?.isLoggedIn) ? <UserStack /> : <AuthStack />
}
