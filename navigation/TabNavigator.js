import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListsScreen from '../screens/ListsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

// Stack: Anasayfa + Film Detay
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
const FavoritesStackScreen = () => {
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen name="FavoritesList" component={ListsScreen} />
      <FavoritesStack.Screen name="Detail" component={DetailScreen} />
    </FavoritesStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Anasayfa') iconName = 'home';
          else if (route.name === 'Listeler') iconName = 'list';
          else if (route.name === 'Profil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomeStack} />
      <Tab.Screen name="Listeler" component={FavoritesStackScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
