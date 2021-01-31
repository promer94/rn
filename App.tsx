import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import AgeSlider from './AgeSlider'
import Header from './Header'
import Lable from './Lable'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView></SafeAreaView>
      <Header></Header>
      <Lable></Lable>
      <AgeSlider />
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
