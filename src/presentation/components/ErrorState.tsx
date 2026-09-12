import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { colors } from '@/presentation/theme/colors';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = 'Ocurrio un error al cargar la informacion.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <View
      style={styles.container}
      testID="error-state"
      accessible={true}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <Text variant="titleMedium" style={styles.title} accessibilityRole="header">
        ¡Ups! Algo salió mal
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <Button
          mode="contained"
          onPress={onRetry}
          style={styles.button}
          buttonColor={colors.primary}
          testID="retry-button"
          accessibilityRole="button"
          accessibilityLabel="Reintentar cargar información"
          accessibilityHint="Vuelve a intentar cargar la información que falló"
        >
          Reintentar
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
    color: colors.error,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
