import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { type StackScreenProps } from '@react-navigation/stack'
import { Button } from 'react-native-elements'

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Text>Welcome screen!</Text>

        <View style={styles.buttons}>
          <Button title="Login" buttonStyle={styles.button} onPress={() => { navigation.navigate('Login') }} />
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

  buttons: {
    flex: 1
  },

  button: {
    marginTop: 10
  }
})

export default WelcomeScreen
