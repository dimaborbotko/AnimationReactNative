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

const {width, height} = Dimensions.get('screen');

export default function DonloadScreen() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);


  const rocketFly = () => {
    withRepeat(
      withTiming(500, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    ),
      -5,
      true;
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: rocketFly}],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.rocket}>
        <Animated.Image
          style={[
            {width: 40, height: 40, position: 'absolute', bottom: 100},
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
    backgroundColor: '#cfeafc',
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
