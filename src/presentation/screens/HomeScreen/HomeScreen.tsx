import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LegendList, LegendListRef } from '@legendapp/list/react-native';
import { HomeScreenProps } from '@core/types/navigation.types';
import { Pokemon } from '@domain/models/pokemon.model';
import { usePokemonList } from '@hooks/usePokemonList';
import { PokemonCard, POKEMON_CARD_HEIGHT } from '@components/PokemonCard';
import { PokemonListSkeleton } from '@components/PokemonCardSkeleton';
import { OfflineBanner } from '@components/OfflineBanner';
import { ErrorState } from '@components/ErrorState';
import { EmptyState } from '@components/EmptyState';
import { HomeScreenHeader } from './components/HomeScreenHeader';
import { HomeScreenFooter } from './components/HomeScreenFooter';
import { FastScroller, FastScrollerHandle } from './components/FastScroller';
import { styles } from './HomeScreen.styles';

const keyExtractor = (item: Pokemon): string => item.id.toString();
const getFixedItemSize = (): number => POKEMON_CARD_HEIGHT;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
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

  const listRef = useRef<LegendListRef>(null);
  const fastScrollerRef = useRef<FastScrollerHandle>(null);

  const handleSelectPokemon = useCallback(
    (id: number, name: string) => {
      navigation.navigate('Detail', {
        pokemonId: id,
        pokemonName: name,
      });
    },
    [navigation],
  );

  const handleScrollToIndex = useCallback((index: number) => {
    try {
      listRef.current?.scrollToIndex({ index, animated: false });
    } catch {
      listRef.current?.scrollToOffset({
        offset: Math.max(0, 68 + index * POKEMON_CARD_HEIGHT),
        animated: false,
      });
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => (
      <PokemonCard pokemon={item} onPress={handleSelectPokemon} />
    ),
    [handleSelectPokemon],
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {isOffline && <OfflineBanner />}

      <LegendList
        ref={listRef}
        data={pokemonList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={70}
        getFixedItemSize={getFixedItemSize}
        drawDistance={1200}
        estimatedHeaderSize={68}
        maintainVisibleContentPosition={true}
        recycleItems={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onScroll={event => {
          fastScrollerRef.current?.onListScroll(event);
        }}
        scrollEventThrottle={16}
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

      <FastScroller
        ref={fastScrollerRef}
        totalItems={pokemonList.length}
        onScrollToIndex={handleScrollToIndex}
      />
    </View>
  );
};
