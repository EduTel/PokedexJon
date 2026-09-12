import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../theme/colors';

interface PokemonCardSkeletonProps {
  animatedOpacity?: Animated.Value;
}

export const PokemonCardSkeleton = ({
  animatedOpacity,
}: PokemonCardSkeletonProps = {}) => {
  return (
    <Card style={styles.card} testID="pokemon-card-skeleton">
      <View style={styles.content}>
        <Animated.View
          style={[styles.imagePlaceholder, { opacity: animatedOpacity }]}
        />
        <View style={styles.info}>
          <Animated.View
            style={[styles.idPlaceholder, { opacity: animatedOpacity }]}
          />
          <Animated.View
            style={[styles.namePlaceholder, { opacity: animatedOpacity }]}
          />
        </View>
      </View>
    </Card>
  );
};

interface PokemonListSkeletonProps {
  count?: number;
}

export const PokemonListSkeleton = ({
  count = 6,
}: PokemonListSkeletonProps = {}) => {
  const sharedOpacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(sharedOpacity, {
          toValue: 0.8,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(sharedOpacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [sharedOpacity]);

  return (
    <View style={styles.listContainer}>
      {Array.from({ length: count }, (_, index) => (
        <PokemonCardSkeleton
          key={`skeleton-${index}`}
          animatedOpacity={sharedOpacity}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
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
  imagePlaceholder: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.border,
    marginRight: 16,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  idPlaceholder: {
    width: 48,
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginBottom: 8,
  },
  namePlaceholder: {
    width: '65%',
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
