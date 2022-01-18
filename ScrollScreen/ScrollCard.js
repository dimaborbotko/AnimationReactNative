import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Cards from './Cards';


const {width} = Dimensions.get('window');
const {height: wHeight } = Dimensions.get("window");
const height = wHeight - 64
const ratio = 228 / 362;
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * ratio;
const MARGIN = 12;
const ITEM_SIZE = CARD_HEIGHT + MARGIN * 2;

export default function ScrollCard() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={Cards}
      keyExtractor={item => item.index}
      contentContainerStyle={{
        paddingTop: StatusBar.currentHeight || 10,
      }}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      renderItem={({item, index}) => {
        const itemScrollY = Animated.subtract(index * ITEM_SIZE, scrollY);
        

        const scale = itemScrollY.interpolate({
          inputRange: [-ITEM_SIZE, 0, height - ITEM_SIZE -120, height],
          outputRange: [0.5, 1, 1, 0.5],
          extrapolate: 'clamp',
        });
        const opacity = itemScrollY.interpolate({
          inputRange: [-ITEM_SIZE, 0, height - ITEM_SIZE-120, height],
          outputRange: [0.2, 1, 1, 0.2],
          extrapolate: 'clamp'
        });
        return (
          <Animated.View style={[{transform: [{scale}], opacity}]}>
            <Animated.Image
            style={[styles.img]}
            source={item.type}
          />
          </Animated.View>
          
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  img: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: MARGIN,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
