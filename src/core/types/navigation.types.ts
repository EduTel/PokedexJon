import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    pokemonId: number;
    pokemonName: string;
  };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;
