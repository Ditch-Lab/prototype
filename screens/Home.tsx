import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { magicClient } from '../config/magicLink'
import { magicUserAtom } from '../utils/hooks/useMagicUser'
import { useAtom } from 'jotai'

export default function HomeScreen () {
  const [user, setUser] = useAtom(magicUserAtom)
  async function handleLogout () {
    await magicClient.user.logout()
    setUser(undefined)
  }
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Text>Wallet Address:{'\n'} {user?.publicAddress}</Text>

      <Button title="Sign Out" style={styles.button} onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 10
  }
})
