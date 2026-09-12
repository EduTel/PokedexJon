import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { colors } from '../theme/colors';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = 'Cargando datos...',
}: LoadingStateProps) => {
  return (
    <View style={styles.container} testID="loading-state">
      <ActivityIndicator size="large" animating={true} color={colors.primary} />
      <Text variant="bodyLarge" style={styles.text}>
        {message}
      </Text>
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
  text: {
    marginTop: 16,
    color: colors.textSecondary,
  },
});
