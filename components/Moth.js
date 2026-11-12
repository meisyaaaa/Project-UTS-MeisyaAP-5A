import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Props: top (tinggi terbang), delay, duration (kecepatan), size, reverse (arah)
export default function Moth({ top, delay = 0, duration = 15000, size = 28, reverse = false }) {
  const progress = useRef(new Animated.Value(0)).current;
  const flap = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Terbang melintasi layar, berulang
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(progress, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(progress, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Sayap mengepak
    Animated.loop(
      Animated.sequence([
        Animated.timing(flap, { toValue: 0.35, duration: 220, useNativeDriver: true }),
        Animated.timing(flap, { toValue: 1, duration: 220, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? [width + 50, -50] : [-50, width + 50],
  });
  // Gerakan naik-turun bergelombang
  const translateY = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -35, 0, 35, 0],
  });

  return (
    <Animated.Text
      style={{
        position: 'absolute',
        top,
        left: 0,
        fontSize: size,
        opacity: 0.9,
        transform: [{ translateX }, { translateY }, { scaleX: flap }],
      }}
    >
      🦋
    </Animated.Text>
  );
}