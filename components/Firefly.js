import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Props: startX, startY (posisi awal)
export default function Firefly({ startX, startY }) {
  const x = useRef(new Animated.Value(startX)).current;
  const y = useRef(new Animated.Value(startY)).current;
  const glow = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    let active = true;

    // Terbang ke titik acak, lalu ulangi terus
    const fly = () => {
      if (!active) return;
      const duration = 4000 + Math.random() * 3000;
      Animated.parallel([
        Animated.timing(x, { toValue: Math.random() * (width - 20), duration, useNativeDriver: true }),
        Animated.timing(y, {
          toValue: height * 0.3 + Math.random() * height * 0.65,
          duration,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => finished && fly());
    };
    fly();

    // Efek menyala redup-terang
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.2, duration: 900, useNativeDriver: true }),
      ])
    ).start();

    return () => {
      active = false;
      x.stopAnimation();
      y.stopAnimation();
      glow.stopAnimation();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E6FF5A',
        shadowColor: '#E6FF5A',
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        opacity: glow,
        transform: [{ translateX: x }, { translateY: y }],
      }}
    />
  );
}