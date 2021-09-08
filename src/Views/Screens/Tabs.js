import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import HomeScreen from './HomeScreen';
import FavoritesScreen from './FavoritesScreen';
import NewsflashScreen from './NewsflashScreen';
import ProfileScreen from './ProfileScreen';

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#800000',
        tabBarInactiveTintColor: '#708090',
        // tabBarStyle: {marginVertical: moderateScale(10)},
        //  tabBarShowLabel: 'false',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="star-sharp" size={size} color={color}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Newsflash"
        component={NewsflashScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="flash-sharp" size={size} color={color}></Icon>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="person-sharp" size={size} color={color}></Icon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
