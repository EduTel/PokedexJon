import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { colors } from '../theme/colors';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

export const StatBar = React.memo(
  ({ name, value, maxValue = 255 }: StatBarProps) => {
  const displayName = STAT_NAMES[name.toLowerCase()] || name.toUpperCase();
  const progress = Math.min(Math.max(value / maxValue, 0), 1);

  // Color de barra segun el valor
  let statColor: string = colors.error;
  if (value >= 100) statColor = colors.success;
  else if (value >= 70) statColor = colors.warning;
  else if (value >= 50) statColor = colors.info;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`Estadística ${displayName}: ${value} de ${maxValue}`}
    >
      <View style={styles.labelContainer}>
        <Text variant="labelMedium" style={styles.name}>
          {displayName}
        </Text>
        <Text variant="labelLarge" style={styles.value}>
          {value}
        </Text>
      </View>
      <ProgressBar
        progress={progress}
        color={statColor}
        style={styles.progressBar}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  value: {
    color: colors.text,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
