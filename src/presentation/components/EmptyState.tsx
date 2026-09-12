import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors } from '@/presentation/theme/colors';

interface EmptyStateProps {
  message?: string;
  onRefresh?: () => void;
}

export const EmptyState = ({
  message = 'No se encontraron Pokemon disponibles',
  onRefresh,
}: EmptyStateProps) => {
  return (
    <View style={styles.container} testID="empty-state">
      <Text variant="titleMedium" style={styles.title}>
        Sin resultados
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {onRefresh && (
        <Button mode="outlined" onPress={onRefresh} style={styles.button}>
          Actualizar
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
  },
});
