import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScrollCard from './ScrollScreen/ScrollCard';
import DonloadScreen from './LoadingScreen/DonloadScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Scroll') {
              iconName = 'database'
            } else if (route.name === 'Loading') {
              iconName = 'sync'
            }
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        })}>
        <Tab.Screen name="Scroll" component={ScrollCard} />
        <Tab.Screen name="Loading" component={DonloadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
