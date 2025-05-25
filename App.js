import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
