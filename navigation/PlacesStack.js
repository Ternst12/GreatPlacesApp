import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons"

import HomeScreen from "../screens/HomeScreen"
import PlacesListScreen from "../screens/PlacesListScreen"
import NewPlaceScreen from "../screens/NewPlaceScreen"
import PlaceDetailScreen from "../screens/PlaceDetailScreen"
import MapScreen from "../screens/MapScreen"
import MessagesScreen from '../screens/MessagesScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = props => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="PlacesList" component={PlacesListScreen} />
        <Stack.Screen name="NewPlace" component={NewPlaceScreen} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
  )
}

const ChatStack = props => {
  return (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        title: "Message Dashboard",
        headerTintColor: "#FF9054",
        headerTitleAlign: "center"
      }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
    />
  </Stack.Navigator>
  )
};

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
          tabBarLabel: 'Places',
          tabBarShowLabel: true,
          tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home-outline"
              color={"black"}
              size={25}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Messages"
        component={ChatStack}
        options={{
          
          tabBarIcon: () => (
            <MaterialCommunityIcons name="message-minus-outline" size={25} color="black" />
          ),
        }}
      />
     
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          
          tabBarIcon: () => (
            <Ionicons name="person-outline" color={"black"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PlacesStack;