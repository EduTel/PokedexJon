import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../theme/colors';

export const OfflineBanner = () => {
  return (
    <View style={styles.banner} testID="offline-banner">
      <View style={styles.dot} />
      <Text variant="labelMedium" style={styles.text}>
        Modo sin conexión • Mostrando datos en caché local
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warningLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
    marginRight: 8,
  },
  text: {
    color: colors.warning,
    fontWeight: '600',
  },
});
