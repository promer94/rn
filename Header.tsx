import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

interface HeaderProps {
  current?: number
  total?: number
}

const Header: React.FC<HeaderProps> = ({ current = 1, total = 8 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backIconBox}>
        <View
          style={{
            width: 15,
            height: 15,
            borderLeftWidth: 4,
            borderBottomWidth: 4,
            borderRadius: 3,
            borderLeftColor: '#666666',
            borderBottomColor: '#666666',
            transform: [
              {
                rotate: '45deg',
              },
            ],
          }}
        />
      </View>
      <View style={styles.prograssBox}>
        <Animated.View
          style={{
            backgroundColor: '#7bccd6',
            height: 10,
            width: `${(current / total) * 100}%`,
            borderRadius: 5,
          }}
        />
      </View>
      <View style={styles.step}>
        <Text style={styles.text}>{current}</Text>
        <Text style={styles.text}>/</Text>
        <Text style={styles.text}>{total}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconBox: {
    flex: 1,
    justifyContent: 'center',
  },
  prograssBox: {
    flex: 4,
    justifyContent: 'center',
    height: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
  },
  step: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: 'Menlo',
  },
  text: {
    fontFamily: 'Menlo',
  },
})

Header.displayName = 'Header-Back-Step'

export default Header
