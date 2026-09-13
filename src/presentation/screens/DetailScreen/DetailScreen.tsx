import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Chip, Card, Divider } from 'react-native-paper';
import { DetailScreenProps } from '@core/types/navigation.types';
import { getPokemonTypeColor } from '@core/enums/pokemon-type.enum';
import { usePokemonDetail } from '@hooks/usePokemonDetail';
import { LoadingState } from '@components/LoadingState';
import { ErrorState } from '@components/ErrorState';
import { StatBar } from '@components/StatBar';
import { PokemonImageSlider } from './components/PokemonImageSlider';
import { styles } from './DetailScreen.styles';
import { colors } from '@/presentation/theme/colors';

export const DetailScreen = ({ route }: DetailScreenProps) => {
  const { pokemonId, pokemonName } = route.params;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  // ancho de pantalla menos padding horizontal
  const slideWidth = width - 72;

  const { detail, isLoading, isError, errorMessage, reload } = usePokemonDetail(
    pokemonId,
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: Math.max(32, insets.bottom + 24) },
      ]}
    >
      <Card style={styles.headerCard} mode="elevated" elevation={2}>
        <Text variant="labelLarge" style={styles.id}>
          {formattedId}
        </Text>

        <PokemonImageSlider
          images={images}
          pokemonName={detail.name}
          slideWidth={slideWidth}
        />

        <Text variant="headlineSmall" style={styles.name} accessibilityRole="header">
          {detail.name}
        </Text>
      </Card>

      <Card style={styles.sectionCard} mode="elevated" elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle} accessibilityRole="header">
          Tipo
        </Text>
        <View style={styles.abilitiesContainer}>
          {/* son solo 2 tipos no es necesario un flashlist*/}
          {detail.types.map(type => {
            const isLightType = ['electric', 'ice', 'ground', 'fairy'].includes(
              type.toLowerCase(),
            );
            return (
              <Chip
                key={type}
                style={[
                  styles.typeChip,
                  { backgroundColor: getPokemonTypeColor(type) },
                ]}
                textStyle={[
                  styles.typeChipText,
                  isLightType && { color: colors.text },
                ]}
                accessibilityRole="text"
                accessibilityLabel={`Tipo ${type}`}
              >
                {type}
              </Chip>
            );
          })}
        </View>
      </Card>

      {/*(Peso y Altura) */}
      <Card style={styles.sectionCard} mode="elevated" elevation={1}>
        <Text variant="titleMedium" style={styles.sectionTitle} accessibilityRole="header">
          Características Físicas
        </Text>
        <View style={styles.measurementsRow}>
          <View
            style={styles.measurementItem}
            accessible={true}
            accessibilityLabel={`Altura: ${heightInMeters} metros`}
          >
            <Text variant="headlineSmall" style={styles.measurementValue}>
              {heightInMeters} m
            </Text>
            <Text variant="bodySmall" style={styles.measurementLabel}>
              Altura
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={styles.measurementItem}
            accessible={true}
            accessibilityLabel={`Peso: ${weightInKg} kilogramos`}
          >
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
        <Text variant="titleMedium" style={styles.sectionTitle} accessibilityRole="header">
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
              accessibilityRole="text"
              accessibilityLabel={`Habilidad ${ability.name}${ability.isHidden ? ', oculta' : ''}`}
            >
              {ability.name} {ability.isHidden ? '(Oculta)' : ''}
            </Chip>
          ))}
        </View>
      </Card>

      {/* Tarjeta de Estadísticas Base */}
      <Card style={styles.sectionCard}>
        <Text variant="titleMedium" style={styles.sectionTitle} accessibilityRole="header">
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
