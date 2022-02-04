import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import PlacesListScreen from "../screens/PlacesListScreen"
import NewPlaceScreen from "../screens/NewPlaceScreen"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = props => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="PlacesList" component={PlacesListScreen} />
        <Stack.Screen name="NewPlace" component={NewPlaceScreen} />
      </Stack.Navigator>
  )
}

const ProfileStack = props => {
  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
  )
};

const PlacesStack = () => {
  
  return (
    <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen
        name="Places"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarShowLabel: true,
          tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home-outline"
              color={"red"}
              size={25}
            />
          ),
        })}
      />
     
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          
          tabBarIcon: () => (
            <Ionicons name="person-outline" color={"green"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PlacesStack;