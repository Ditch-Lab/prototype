import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { magicClient } from '../config/magicLink'
import { magicUserAtom } from '../utils/hooks/useMagicUser'
import { useAtom } from 'jotai'

import RPC from '../config/ethers' // for using ethers.js

export default function HomeScreen () {
  const [user, setUser] = useAtom(magicUserAtom)
  const [chainId, setChainId] = React.useState('')
  async function handleLogout () {
    await magicClient.user.logout()
    setUser(undefined)
  }
  async function getChainId () {
    const chainId = await RPC.getChainId()
    const stringChainId = JSON.stringify(chainId)
    setChainId(stringChainId)
  }
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Text>Wallet Address:{'\n'} {user?.publicAddress}</Text>
      <Text>Chain Id:{'\n'} {chainId}</Text>

      <Button title="Sign Out" style={styles.button} onPress={handleLogout} />
      <Button title="Get Chain Id" style={styles.button} onPress={getChainId} />
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
