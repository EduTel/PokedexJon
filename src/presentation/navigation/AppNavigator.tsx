import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../core/types/navigation.types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E53935',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};
