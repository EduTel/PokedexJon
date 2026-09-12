import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  ScrollViewInstance,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { styles } from '../DetailScreen.styles';

interface PokemonImageSliderProps {
  images: string[];
  pokemonName: string;
  slideWidth: number;
}

export const PokemonImageSlider = React.memo(
  ({ images, pokemonName, slideWidth }: PokemonImageSliderProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const scrollViewRef = useRef<ScrollViewInstance>(null);

    const scrollTo = useCallback(
      (index: number) => {
        scrollViewRef.current?.scrollTo({
          x: index * slideWidth,
          animated: true,
        });
        setActiveImageIndex(index);
      },
      [slideWidth],
    );

    if (images.length <= 1) {
      return (
        <Image
          source={{ uri: images[0] }}
          style={styles.image}
          resizeMode="contain"
          testID="pokemon-detail-image"
          accessibilityLabel={`Imagen de ${pokemonName}`}
        />
      );
    }

    return (
      <View style={styles.sliderContainer} testID="pokemon-image-slider">
        {activeImageIndex > 0 && (
          <TouchableOpacity
            style={[styles.arrowButton, styles.leftArrow]}
            onPress={() => scrollTo(activeImageIndex - 1)}
            testID="slider-prev-button"
            accessibilityRole="button"
            accessibilityLabel="Ver imagen anterior"
            accessibilityHint="Muestra la imagen anterior del Pokémon"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.arrowText} aria-hidden={true}>
              ‹
            </Text>
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
                accessibilityLabel={`Imagen ${index + 1} de ${pokemonName}`}
              />
            </View>
          ))}
        </ScrollView>

        {activeImageIndex < images.length - 1 && (
          <TouchableOpacity
            style={[styles.arrowButton, styles.rightArrow]}
            onPress={() => scrollTo(activeImageIndex + 1)}
            testID="slider-next-button"
            accessibilityRole="button"
            accessibilityLabel="Ver imagen siguiente"
            accessibilityHint="Muestra la siguiente imagen del Pokémon"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.arrowText} aria-hidden={true}>
              ›
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={styles.paginationDots}
          testID="pagination-dots"
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Página ${activeImageIndex + 1} de ${images.length}`}
        >
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
    );
  },
);
