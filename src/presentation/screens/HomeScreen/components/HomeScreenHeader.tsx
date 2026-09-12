import React from 'react';
import { View } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import { styles } from '../HomeScreen.styles';

interface HomeScreenHeaderProps {
  totalCount: number;
}

export const HomeScreenHeader = React.memo(
  ({ totalCount }: HomeScreenHeaderProps) => {
    return (
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {totalCount > 0 && (
            <Badge style={styles.badge} size={24}>
              {`${totalCount} Pokemon Mostrados`}
            </Badge>
          )}
        </View>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Todos los Pokemon
        </Text>
      </View>
    );
  },
);
