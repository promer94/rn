import * as React from 'react'
import {
  TextInput,
  Dimensions,
  Animated,
  FlatList,
  View,
  StyleSheet,
  Text,
} from 'react-native'

const { width } = Dimensions.get('window')

const colors = {
  back: '#ffffff',
  bubble: '#dbf1f3',
  line: '#7bccd6',
} as const

const ITEM_SIZE = 3
const ITEM_SPACING = width / 21

interface AgeSliderProps {
  max?: number
  min?: number
}

export default function App({ max = 80, min = 0 }: AgeSliderProps) {
  const scaleArray = React.useMemo(
    () => new Array(max - min + 21).fill(min).map((i, index) => index),
    [min, max]
  )
  const scrollX = React.useRef(new Animated.Value(0)).current
  const [value, setValue] = React.useState(scaleArray[0].toString())
  const listRef = React.useRef<FlatList | null>(null)
  const animtaedId = React.useRef<number | null>(null)
  const showText = (index: number) =>
    (index - 10) % 10 === 0 && index - 10 >= 0 && index - 10 < max
  return (
    <View style={styles.container}>
      <View style={styles.mask}>
        <View style={styles.maskItem}>
          <View style={styles.maskItemLevel1}></View>
          <View style={styles.maskItemLevel2}></View>
          <View style={styles.maskItemLevel4}></View>
          <View style={styles.maskItemLevel3}></View>
        </View>
        <View style={styles.maskItem}>
          <View style={styles.maskItemLevel4}></View>
          <View style={styles.maskItemLevel3}></View>
          <View style={styles.maskItemLevel2}></View>
          <View style={styles.maskItemLevel1}></View>
        </View>
      </View>
      <View style={styles.bubble}>
        <TextInput
          keyboardType='numeric'
          value={value}
          onChangeText={setValue}
          returnKeyType='done'
          onBlur={() => {
            if (!isNaN(parseInt(value, 10))) {
              listRef.current?.scrollToOffset({
                animated: false,
                offset: parseInt(value, 10) * ITEM_SPACING,
              })
            }
          }}
          selectionColor='#756969'
          style={styles.textInput}
        />
      </View>
      <View style={styles.indicator} />
      <Animated.FlatList
        data={scaleArray}
        ref={listRef}
        keyExtractor={(item) => item.toString()}
        horizontal
        bounces={false}
        snapToInterval={ITEM_SPACING}
        decelerationRate='normal'
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={() => {
          if (animtaedId.current) {
            cancelAnimationFrame(animtaedId.current)
          }
        }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_SPACING
          )
          setValue(index.toString())
          animtaedId.current = requestAnimationFrame(() => {
            listRef.current?.scrollToOffset({
              animated: true,
              offset: index * ITEM_SPACING,
            })
          })
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ index }) => (
          <Animated.View
            style={{
              width: ITEM_SPACING,
              justifyContent: index % 10 === 0 ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              backgroundColor: colors.back,
              height: 20,
              borderBottomColor: colors.line,
              borderBottomWidth: 2,
            }}>
            <View
              style={{
                width: ITEM_SIZE,
                backgroundColor: colors.line,
                height: index % 10 === 0 ? 20 : 12,
                borderRadius: 4,
                transform: [
                  {
                    translateY: showText(index) ? 16 : 0,
                  },
                ],
              }}></View>
            {showText(index) ? (
              <Text
                style={{
                  color: '#756969',
                  fontSize: 12,
                  transform: [
                    {
                      translateY: 20,
                    },
                  ],
                }}>
                {index - 10}
              </Text>
            ) : null}
          </Animated.View>
        )}></Animated.FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.back,
    alignItems: 'center',
  },
  bubble: {
    width: 120,
    backgroundColor: '#dbf1f3',
    height: 120,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    transform: [
      {
        rotate: '45deg',
      },
      {
        translateY: 20,
      },
      {
        translateX: 20,
      },
    ],
    zIndex: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    transform: [
      {
        rotate: '-45deg',
      },
    ],
    fontSize: 36,
    color: '#756969',
    fontFamily: 'Menlo',
  },
  mask: {
    flexDirection: 'row',
    height: 40,
    width,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  maskItem: {
    height: 40,
    width: ITEM_SPACING * 4,
    flexDirection: 'row',
    zIndex: 3,
    alignItems: 'center',
  },
  maskItemLevel1: {
    height: 40,
    width: ITEM_SPACING * 1,
    opacity: 0.85,
    backgroundColor: '#fff',
    zIndex: 4,
    transform: [
      {
        translateY: 240,
      },
    ],
  },
  maskItemLevel2: {
    height: 40,
    width: ITEM_SPACING * 1,
    opacity: 0.65,
    backgroundColor: '#fff',
    zIndex: 4,
    transform: [
      {
        translateY: 240,
      },
    ],
  },
  maskItemLevel3: {
    height: 40,
    width: ITEM_SPACING * 1,
    opacity: 0.35,
    backgroundColor: '#fff',
    zIndex: 4,
    transform: [
      {
        translateY: 240,
      },
    ],
  },
  maskItemLevel4: {
    height: 40,
    width: ITEM_SPACING * 1,
    opacity: 0.1,
    backgroundColor: '#fff',
    zIndex: 4,
    transform: [
      {
        translateY: 240,
      },
    ],
  },
  indicator: {
    height: 80,
    width: 6,
    backgroundColor: colors.line,
    borderRadius: 4,
    transform: [
      {
        translateY: 60,
      },
    ],
    zIndex: 1,
  },
  button: {
     justifyContent: 'center',
     alignItems: 'center',
     width: width * 4/7
     
  }
})
