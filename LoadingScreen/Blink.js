import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

export default function Blink({children}) {
    const blink = new Animated.Value(0.3);
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blink, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(blink, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: true
                })
            ])
        ).start();
    },)
    return (
        <Animated.View style={[styles.blink, {opacity: blink}]}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    blink: {
        flexDirection: 'row',
        
    }
})
