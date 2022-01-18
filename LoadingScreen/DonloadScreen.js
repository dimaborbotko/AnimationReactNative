import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Blink from './Blink';
import DotsLoad from './DotsLoad';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {transform} from '@babel/core';

const {width, height} = Dimensions.get('window');
const WIDTH = width + 105;
const HEIGHT = height - 50;

export default function DonloadScreen() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const z = useSharedValue(0)

  x.value = withRepeat(
    withSequence(
      withTiming(-WIDTH, {duration: 5000, easing: Easing.bezier(0.12, 0, 0.39, 0)}),
      withTiming(0, {duration: 5000, easing: Easing.bezier(0.12, 0, 0.39, 0)}),
    ),
    -1,
    true,
  );

  y.value = withRepeat(
    withSequence(
      withTiming(0, {duration: 1666}),
      withTiming(-100, {duration: 1666}),
      withTiming(0, {duration: 1666}),
      withTiming(0, {duration: 1666}),
      withTiming(100, {duration: 1666}),
      withTiming(0, {duration: 1666}),
    ),
    -1,
    true,
  );

  z.value = withRepeat(
    withSequence(
      withTiming(-95, {duration: 2500}),
      withTiming(-165, {duration: 2500}),
      withTiming(-280, {duration: 2500}),
      withTiming(-350, {duration: 2500}),
    ),
    -1,
    true,
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: x.value},
        {translateY: y.value},
        {rotateZ: `${z.value.toString()}deg`},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.rocket}>
        <Animated.Image
          style={[
            {width: 40, height: 40, position: 'absolute', bottom: 100, right: -110},
            style,
          ]}
          source={require('../img/rocket.png')}
        />
      </View>
      <View style={styles.blinkLoad}>
        <Blink>
          <Text style={styles.load}>Loading</Text>
        </Blink>
        <DotsLoad duration1={500} duration2={1500} text={'.'} />
        <DotsLoad duration1={1000} duration2={1000} text={'.'} />
        <DotsLoad duration1={1500} duration2={500} text={'.'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rocket: {
    width: '100%',
    height: '40%',
    marginTop: 20,
  },
  blinkLoad: {
    flexDirection: 'row',
    marginVertical: '10%',
  },
  load: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
