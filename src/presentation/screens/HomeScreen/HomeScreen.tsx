import React, { useCallback } from 'react';
import { View } from 'react-native';
import { LegendList } from '@legendapp/list/react-native';
import { HomeScreenProps } from '@core/types/navigation.types';
import { Pokemon } from '@domain/models/pokemon.model';
import { usePokemonList } from '@hooks/usePokemonList';
import { PokemonCard } from '@components/PokemonCard';
import { PokemonListSkeleton } from '@components/PokemonCardSkeleton';
import { OfflineBanner } from '@components/OfflineBanner';
import { ErrorState } from '@components/ErrorState';
import { EmptyState } from '@components/EmptyState';
import { HomeScreenHeader } from './components/HomeScreenHeader';
import { HomeScreenFooter } from './components/HomeScreenFooter';
import { styles } from './HomeScreen.styles';

const keyExtractor = (item: Pokemon): string => item.id.toString();

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const {
    pokemonList,
    isLoading,
    isError,
    isEmpty,
    errorMessage,
    isRefreshing,
    isLoadingMore,
    hasMore,
    isOffline,
    reload,
    refresh,
    loadMore,
  } = usePokemonList();

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => (
      <PokemonCard
        pokemon={item}
        onPress={() =>
          navigation.navigate('Detail', {
            pokemonId: item.id,
            pokemonName: item.name,
          })
        }
      />
    ),
    [navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HomeScreenHeader totalCount={0} />
        <PokemonListSkeleton count={6} />
      </View>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={errorMessage || 'No se pudieron cargar los Pokemon.'}
        onRetry={reload}
      />
    );
  }

  if (isEmpty) {
    return <EmptyState onRefresh={refresh} />;
  }

  return (
    <View style={styles.container}>
      {isOffline && <OfflineBanner />}

      <LegendList
        data={pokemonList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={92}
        recycleItems={true}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <HomeScreenHeader totalCount={pokemonList.length} />
        }
        ListFooterComponent={
          <HomeScreenFooter
            isLoadingMore={isLoadingMore}
            hasMore={hasMore}
            listLength={pokemonList.length}
          />
        }
        refreshing={isRefreshing}
        onRefresh={refresh}
        onEndReached={hasMore && !isOffline ? loadMore : undefined}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
