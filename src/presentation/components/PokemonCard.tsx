import { StyleSheet, Image, View } from 'react-native';
import { Card, Text, Icon } from 'react-native-paper';
import { Pokemon } from '@/domain/models/pokemon.model';
import { colors } from '@/presentation/theme/colors';
import React, { useState } from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: (id: number, name: string) => void;
}

export const POKEMON_CARD_HEIGHT = 110;

export const PokemonCard = React.memo(
  ({ pokemon, onPress }: PokemonCardProps) => {
    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
    const [hasImageError, setHasImageError] = useState(false);

    const hasFailed = !pokemon.imageUrl || hasImageError;

    const handlePress = () => {
      onPress(pokemon.id, pokemon.name);
    };

    return (
      <Card
        style={styles.card}
        mode="elevated"
        elevation={2}
        onPress={handlePress}
        testID={`pokemon-card-${pokemon.id}`}
        accessibilityRole="button"
        accessibilityLabel={`${pokemon.name}, número ${formattedId}`}
        accessibilityHint="Toca dos veces para ver los detalles de este Pokémon"
      >
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {!hasFailed ? (
              <Image
                source={{ uri: pokemon.imageUrl }}
                style={styles.image}
                resizeMode="contain"
                fadeDuration={0}
                onError={() => setHasImageError(true)}
              />
            ) : (
              <Icon
                source="pokeball"
                size={38}
                color={colors.textSecondary}
              />
            )}
          </View>
          <View style={styles.info}>
            <Text variant="labelSmall" style={styles.id}>
              {formattedId}
            </Text>
            <Text variant="titleMedium" style={styles.name} numberOfLines={1}>
              {pokemon.name}
            </Text>
          </View>
        </View>
      </Card>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  imageContainer: {
    width: 74,
    height: 74,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  image: {
    width: 64,
    height: 64,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  id: {
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
});
