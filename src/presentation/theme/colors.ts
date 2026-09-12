import { POKEMON_TYPE_COLORS } from '@core/enums/pokemon-type.enum';

export const colors = {
  primary: '#ff0400ff',
  primaryLight: '#FFEBEE',

  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F5',

  text: '#212121',
  textSecondary: '#757575',
  white: '#FFFFFF',

  border: '#E0E0E0',

  success: '#43A047',
  warning: '#FB8C00',
  warningLight: '#FFF3E0',
  error: '#D32F2F',
  info: '#FDD835',

  types: POKEMON_TYPE_COLORS,
} as const;

export type Colors = typeof colors;
