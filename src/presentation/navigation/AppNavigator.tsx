import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../core/types/navigation.types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen/DetailScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right' /*Animacion*/,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Pokedex',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => {
          const name = route.params.pokemonName;
          const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
          return {
            title: capitalizedName,
          };
        }}
      />
    </Stack.Navigator>
  );
};
