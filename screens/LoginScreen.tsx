import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input, Button } from 'react-native-elements'
import { type StackScreenProps } from '@react-navigation/stack'
import { magicClient } from '../config/magicLink'
import { magicUserAtom } from '../utils/hooks/useMagicUser'
import { useAtom } from 'jotai'

const LoginScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    // password: '',
    error: ''
  })
  const [, setUser] = useAtom(magicUserAtom)

  // async function signUp () {
  //   if (value.email === '' || value.password === '') {
  //     setValue({
  //       ...value,
  //       error: 'Email and password are mandatory.'
  //     })
  //     return
  //   }

  //   try {
  //     await createUserWithEmailAndPassword(auth, value.email, value.password)
  //     navigation.navigate('Sign In')
  //   } catch (error) {
  //     setValue({
  //       ...value,
  //       error: error.message
  //     })
  //   }
  // }
  const handleLogin = async () => {
    if (value.email === '') {
      setValue({
        ...value,
        error: 'Email is mandatory.'
      })
      return
    }
    try {
      await magicClient.auth.loginWithEmailOTP({ email: value.email })
      const isLoggedIn = await magicClient.user.isLoggedIn()
      const userMetadata = await magicClient.user.getInfo()
      setUser({ ...userMetadata, isLoggedIn })
    } catch (error) {
      setValue({
        ...value,
        error: error.message
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => { setValue({ ...value, email: text }) }}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Button title="Login" buttonStyle={styles.control} onPress={handleLogin} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  controls: {
    flex: 1,
    width: '70%'
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF'
  }
})

export default LoginScreen
