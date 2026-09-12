import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  ScrollViewInstance,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Text, Chip, Card, Divider } from 'react-native-paper';
import { DetailScreenProps } from '@core/types/navigation.types';
import { getPokemonTypeColor } from '@core/enums/pokemon-type.enum';
import { usePokemonDetail } from '@hooks/usePokemonDetail';
import { LoadingState } from '@components/LoadingState';
import { ErrorState } from '@components/ErrorState';
import { StatBar } from '@components/StatBar';
import { styles } from './DetailScreen.styles';

export const DetailScreen = ({ route }: DetailScreenProps) => {
  const { pokemonId, pokemonName } = route.params;
  const { width } = useWindowDimensions();
  // ancho de pantalla menos padding horizontal
  const slideWidth = width - 72;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollViewInstance>(null);

  const { detail, isLoading, isError, errorMessage, reload } = usePokemonDetail(
    pokemonId || pokemonName,
  );

  if (isLoading) {
    return <LoadingState message={`Cargando detalles de ${pokemonName}...`} />;
  }

  if (isError || !detail) {
    return (
      <ErrorState
        message={
          errorMessage || `No se pudo cargar la información de ${pokemonName}.`
        }
        onRetry={reload}
      />
    );
  }

  const formattedId = `#${String(detail.id).padStart(3, '0')}`;
  const heightInMeters = (detail.height / 10).toFixed(1);
  const weightInKg = (detail.weight / 10).toFixed(1);
  const images =
    detail.images && detail.images.length > 0
      ? detail.images
      : [detail.imageUrl];

  const scrollTo = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * slideWidth, animated: true });
    setActiveImageIndex(index);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Card style={styles.headerCard} mode="elevated" elevation={2}>
        <Text variant="labelLarge" style={styles.id}>
          {formattedId}
        </Text>

        {images.length > 1 ? (
          <View style={styles.sliderContainer} testID="pokemon-image-slider">
            {activeImageIndex > 0 && (
              <TouchableOpacity
                style={[styles.arrowButton, styles.leftArrow]}
                onPress={() => scrollTo(activeImageIndex - 1)}
                testID="slider-prev-button"
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>
            )}

            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / slideWidth);
                setActiveImageIndex(index);
              }}
              scrollEventThrottle={16}
            >
              {/*son solo dos imagenes no es necesario un flashlist*/}
              {images.map((imgUri, index) => (
                <View
                  key={`${imgUri}-${index}`}
                  style={[styles.slideItem, { width: slideWidth }]}
                >
                  <Image
                    source={{ uri: imgUri }}
                    style={styles.image}
                    resizeMode="contain"
                    testID={`pokemon-slide-image-${index}`}
                  />
                </View>
              ))}
            </ScrollView>

            {activeImageIndex < images.length - 1 && (
              <TouchableOpacity
                style={[styles.arrowButton, styles.rightArrow]}
                onPress={() => scrollTo(activeImageIndex + 1)}
                testID="slider-next-button"
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            )}

            <View style={styles.paginationDots} testID="pagination-dots">
              {/*son solo dos imagenes no es necesario un flashlist*/}
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activeImageIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                  testID={
                    activeImageIndex === index ? 'active-dot' : 'inactive-dot'
                  }
                />
              ))}
            </View>
          </View>
        ) : (
          <Image
            source={{ uri: images[0] }}
            style={styles.image}
            resizeMode="contain"
            testID="pokemon-detail-image"
          />
        )}

        <Text variant="headlineSmall" style={styles.name}>
          {detail.name}
        </Text>
      </Card>

      <Card style={styles.sectionCard} mode="elevated" elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Tipo
        </Text>
        <View style={styles.abilitiesContainer}>
          {/* son solo 2 tipos no es necesario un flashlist*/}
          {detail.types.map(type => (
            <Chip
              key={type}
              style={[
                styles.typeChip,
                { backgroundColor: getPokemonTypeColor(type) },
              ]}
              textStyle={styles.typeChipText}
            >
              {type}
            </Chip>
          ))}
        </View>
      </Card>

      {/*(Peso y Altura) */}
      <Card style={styles.sectionCard} mode="elevated" elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Características Físicas
        </Text>
        <View style={styles.measurementsRow}>
          <View style={styles.measurementItem}>
            <Text variant="headlineSmall" style={styles.measurementValue}>
              {heightInMeters} m
            </Text>
            <Text variant="bodySmall" style={styles.measurementLabel}>
              Altura
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.measurementItem}>
            <Text variant="headlineSmall" style={styles.measurementValue}>
              {weightInKg} kg
            </Text>
            <Text variant="bodySmall" style={styles.measurementLabel}>
              Peso
            </Text>
          </View>
        </View>
      </Card>

      {/* Tarjeta de Habilidades */}
      <Card style={styles.sectionCard} mode="elevated" elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Habilidades
        </Text>
        <View style={styles.abilitiesContainer}>
          {/*son solo 3 habilidades maximo no es necesario un flashlist*/}
          {detail.abilities.map(ability => (
            <Chip
              key={ability.name}
              mode="outlined"
              style={[
                styles.abilityChip,
                ability.isHidden && styles.hiddenAbilityChip,
              ]}
            >
              {ability.name} {ability.isHidden ? '(Oculta)' : ''}
            </Chip>
          ))}
        </View>
      </Card>

      {/* Tarjeta de Estadísticas Base */}
      <Card style={styles.sectionCard}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Estadísticas Base
        </Text>
        {/*para solo 6 eleementos no es necesario un flashlist*/}
        {detail.stats.map(stat => (
          <StatBar
            key={stat.name}
            name={stat.name}
            value={stat.baseStat}
            maxValue={255}
          />
        ))}
      </Card>
    </ScrollView>
  );
};
