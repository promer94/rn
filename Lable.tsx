import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Lable = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How old are you ?</Text>
    </View>
  )
}

Lable.displayName = 'Age-Lable'

export default Lable


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: '100%',
    height: 120
  },
  text: {
    fontSize: 28,
    color: '#756969',
    flex: 1
  },
})