import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native'
import AgeSlider from './AgeSlider'
import Header from './Header'
import Lable from './Lable'

export default function App() {
  const onpress = (value: number) => {
    Alert.alert('Your age is', value.toString())
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView>
        <Header></Header>
        <Lable></Lable>
        <AgeSlider onContinuePressed={onpress} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
