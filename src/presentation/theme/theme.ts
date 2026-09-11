import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E53935',
    secondary: '#1E88E5',
    background: '#F7F8FA',
    surface: '#FFFFFF',
    error: '#D32F2F',
  },
};
