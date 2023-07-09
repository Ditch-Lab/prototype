import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Web3Auth } from '@web3auth/modal'
import { useEffect, useState } from 'react'
import { RPC_URL, WEB3_AUTH_CLIENT_ID } from '@env'
import { JsonRpcProvider, toQuantity } from 'ethers'
import { CHAIN_NAMESPACES } from '@web3auth/base'

export default function App () {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [idToken, setIdToken] = useState<string | null>(null)
  const web3AuthClientId = WEB3_AUTH_CLIENT_ID
  useEffect(() => {
    const init = async () => {
      try {
        const provider = new JsonRpcProvider(RPC_URL)
        const network = await provider.getNetwork()
        const chainId = network.chainId

        const web3auth = new Web3Auth({
          clientId: web3AuthClientId,
          web3AuthNetwork: 'testnet',
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: toQuantity(chainId),
            rpcTarget: process.env.NEXT_PUBLIC_RPC_URL
          }
        })

        await web3auth.initModal()

        setWeb3auth(web3auth)
      } catch (error) {
        console.error(error)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    init()
  }, [])

  const login = async () => {
    if (web3auth == null) {
      throw new Error('web3auth not initialized yet')
    }
    const web3authProvider = await web3auth.connect()
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (web3authProvider) {
      if (web3auth.provider == null) {
        return
      }
      const authenticateUser = await web3auth.authenticateUser()
      setIdToken(authenticateUser.idToken)
    }
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
      {idToken
        ? <Text>{idToken}</Text>
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        : <Pressable style={styles.button} onPress={login}>
        <Text >Login</Text>
      </Pressable>}
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
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
