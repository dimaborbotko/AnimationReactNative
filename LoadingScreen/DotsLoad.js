import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

export default function DotsLoad({duration1, duration2, text}) {
    const loadDots = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadDots, {
            toValue: 1,
            duration: duration1,
            useNativeDriver: true,
          }),
          Animated.timing(loadDots, {
            toValue: 0,
            duration: duration2,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
    return (
        <Animated.Text style={{opacity: loadDots, fontWeight: 'bold', fontSize: 16}} duration1={duration1} duration2={duration2}>{text}</Animated.Text>
    )
}

const styles = StyleSheet.create({})
