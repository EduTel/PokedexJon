import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { colors } from '@/presentation/theme/colors';

const THUMB_HEIGHT = 48;
const THUMB_WIDTH = 16;
const ACTIVE_THUMB_WIDTH = 22;

export interface FastScrollerHandle {
  onListScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export interface FastScrollerProps {
  totalItems: number;
  onScrollToIndex: (index: number) => void;
}

export const FastScroller = React.memo(
  forwardRef<FastScrollerHandle, FastScrollerProps>(
    ({ totalItems, onScrollToIndex }, ref) => {
      const trackRef = useRef<React.ElementRef<typeof View>>(null);
      const [isActive, setIsActive] = useState(false);

      const trackHeightRef = useRef(0);
      const trackPageYRef = useRef(0);
      const totalItemsRef = useRef(totalItems);
      const onScrollToIndexRef = useRef(onScrollToIndex);
      const lastScrolledIndex = useRef(-1);

      const thumbY = useRef(new Animated.Value(0)).current;
      const currentThumbY = useRef(0);
      const isDragging = useRef(false);
      const grabOffsetY = useRef(THUMB_HEIGHT / 2);

      useEffect(() => {
        totalItemsRef.current = totalItems;
      }, [totalItems]);

      useEffect(() => {
        onScrollToIndexRef.current = onScrollToIndex;
      }, [onScrollToIndex]);

      useImperativeHandle(ref, () => ({
        onListScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (isDragging.current) return;
          const h = trackHeightRef.current;
          if (h <= THUMB_HEIGHT) return;

          const { contentOffset, contentSize, layoutMeasurement } =
            event.nativeEvent;
          const maxScroll = contentSize.height - layoutMeasurement.height;
          if (maxScroll > 0) {
            const progress = Math.min(
              1,
              Math.max(0, contentOffset.y / maxScroll),
            );
            const maxThumbY = h - THUMB_HEIGHT;
            const newY = progress * maxThumbY;
            currentThumbY.current = newY;
            thumbY.setValue(newY);
          }
        },
      }));

      const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        trackHeightRef.current = height;
        trackRef.current?.measure((_x, _y, _width, _h, _pageX, pageY) => {
          if (pageY !== undefined) {
            trackPageYRef.current = pageY;
          }
        });
      }, []);

      const updateScroll = useCallback(
        (targetY: number) => {
          const h = trackHeightRef.current;
          const count = totalItemsRef.current;
          if (h <= THUMB_HEIGHT || count <= 0) return;

          const maxThumbY = h - THUMB_HEIGHT;
          const clampedY = Math.max(0, Math.min(maxThumbY, targetY));
          currentThumbY.current = clampedY;
          thumbY.setValue(clampedY);

          const progress = maxThumbY > 0 ? clampedY / maxThumbY : 0;
          const targetIndex = Math.min(
            count - 1,
            Math.max(0, Math.round(progress * (count - 1))),
          );

          if (targetIndex !== lastScrolledIndex.current) {
            lastScrolledIndex.current = targetIndex;
            onScrollToIndexRef.current(targetIndex);
          }
        },
        [thumbY],
      );

      const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onStartShouldSetPanResponderCapture: () => true,
          onMoveShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponderCapture: () => true,
          onPanResponderTerminationRequest: () => false,

          onPanResponderGrant: evt => {
            isDragging.current = true;
            setIsActive(true);

            trackRef.current?.measure((_x, _y, _width, _h, _pageX, pageY) => {
              if (pageY !== undefined) {
                trackPageYRef.current = pageY;
              }
            });

            const pageY = evt.nativeEvent.pageY;
            const trackPageY = trackPageYRef.current;
            const touchY =
              trackPageY > 0 ? pageY - trackPageY : evt.nativeEvent.locationY;
            const curY = currentThumbY.current;

            if (touchY >= curY && touchY <= curY + THUMB_HEIGHT) {
              grabOffsetY.current = touchY - curY;
            } else {
              grabOffsetY.current = THUMB_HEIGHT / 2;
              updateScroll(touchY - THUMB_HEIGHT / 2);
            }
          },

          onPanResponderMove: evt => {
            const pageY = evt.nativeEvent.pageY;
            const trackPageY = trackPageYRef.current;
            const touchY =
              trackPageY > 0 ? pageY - trackPageY : evt.nativeEvent.locationY;
            updateScroll(touchY - grabOffsetY.current);
          },

          onPanResponderRelease: () => {
            isDragging.current = false;
            setIsActive(false);
            lastScrolledIndex.current = -1;
          },

          onPanResponderTerminate: () => {
            isDragging.current = false;
            setIsActive(false);
            lastScrolledIndex.current = -1;
          },
        }),
      ).current;

      if (totalItems <= 5) {
        return null;
      }

      return (
        <View
          ref={trackRef}
          style={styles.track}
          onLayout={handleLayout}
          testID="fast-scroller-track"
          {...panResponder.panHandlers}
        >
          <Animated.View
            style={[
              styles.thumb,
              isActive && styles.thumbActive,
              {
                transform: [{ translateY: thumbY }],
              },
            ]}
            testID="fast-scroller-thumb"
          >
            <View style={styles.indicatorLines} />
          </Animated.View>
        </View>
      );
    },
  ),
);

FastScroller.displayName = 'FastScroller';

const styles = StyleSheet.create({
  track: {
    position: 'absolute',
    right: 0,
    top: 72,
    bottom: 24,
    width: 36,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 9999,
  },
  thumb: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: THUMB_WIDTH / 2,
    backgroundColor: colors.primary,
    opacity: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  thumbActive: {
    width: ACTIVE_THUMB_WIDTH,
    borderRadius: ACTIVE_THUMB_WIDTH / 2,
    opacity: 1,
    elevation: 8,
  },
  indicatorLines: {
    width: 6,
    height: 12,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    opacity: 0.9,
  },
});
