import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Background({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.component} behavior="height">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
  component: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
