import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { magicClient } from '../config/magicLink'
import { magicUserAtom } from '../utils/hooks/useMagicUser'
import { useAtom } from 'jotai'

import RPC from '../config/ethers' // for using ethers.js

export default function HomeScreen () {
  const [user, setUser] = useAtom(magicUserAtom)
  async function handleLogout () {
    await magicClient.user.logout()
    setUser(undefined)
  }
  useEffect(() => {
    async function getUserAddrAndBalance () {
      if (user?.publicAddress) {
        const balance = await RPC.getBalance(user?.publicAddress)
        setUser({ ...user, balance })
      }
    }
    getUserAddrAndBalance().catch(console.error)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.phoneNumber}!</Text>
      {user?.publicAddress && <Text>Wallet Address: {user?.publicAddress}</Text>}
      {user?.balance && <Text>Balance: {user?.balance}</Text>}

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
