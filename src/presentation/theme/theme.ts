import { MD3LightTheme, MD3Theme } from 'react-native-paper';
import { colors } from './colors';

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
  },
};

