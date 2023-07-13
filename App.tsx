import React from 'react'
import { ThemeProvider } from 'react-native-elements'
import './config/firebase'
import RootNavigation from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { magicClient } from './config/magicLink'

export default function App () {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <magicClient.Relayer />
        <RootNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
