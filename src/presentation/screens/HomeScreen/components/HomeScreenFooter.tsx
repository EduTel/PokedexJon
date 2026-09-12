import React from 'react';
import { View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { styles } from '../HomeScreen.styles';
import { colors } from '../../../theme/colors';

interface HomeScreenFooterProps {
  isLoadingMore: boolean;
  hasMore: boolean;
  listLength: number;
}

export const HomeScreenFooter = React.memo(
  ({ isLoadingMore, hasMore, listLength }: HomeScreenFooterProps) => {
    if (isLoadingMore) {
      return (
        <View style={styles.footerLoader} testID="footer-loading-indicator">
          <ActivityIndicator size="small" color={colors.primary} />
          <Text variant="bodySmall" style={styles.footerText}>
            Cargando...
          </Text>
        </View>
      );
    }

    if (!hasMore && listLength > 0) {
      return (
        <Text variant="labelMedium" style={styles.endMessage}>
          ¡Has descubierto todos los Pokémon disponibles!
        </Text>
      );
    }

    return null;
  },
);
