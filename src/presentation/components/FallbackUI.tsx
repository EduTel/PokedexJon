import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

interface FallbackUIProps {
  error: Error;
  resetError: () => void;
}

export const FallbackUI = ({ error, resetError }: FallbackUIProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>😵</Text>

        <Text variant="headlineMedium" style={styles.title}>
          ¡Ups! Algo salió mal
        </Text>

        <Text variant="bodyLarge" style={styles.subtitle}>
          Ha ocurrido un error inesperado en la aplicación. Por favor, intenta
          reiniciar la pantalla.
        </Text>

        {__DEV__ && (
          <View style={styles.devContainer}>
            <Text style={styles.devTitle}>Detalles del error (Solo Dev):</Text>
            <ScrollView style={styles.devScroll}>
              <Text style={styles.devText}>
                {error.name}: {error.message}
              </Text>
              {error.stack && (
                <Text style={styles.devStackText}>{error.stack}</Text>
              )}
            </ScrollView>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={resetError}
        >
          <Text style={styles.buttonText}>REINTENTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FallbackUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    color: colors.error,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  devContainer: {
    width: '100%',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    maxHeight: 180,
    borderWidth: 1,
    borderColor: colors.border,
  },
  devTitle: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 8,
  },
  devScroll: {
    flex: 1,
  },
  devText: {
    color: colors.error,
    fontSize: 12,
    fontFamily: 'System',
    marginBottom: 4,
  },
  devStackText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontFamily: 'System',
  },
});
