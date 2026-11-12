import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Props: x, y (posisi), size (ukuran), delay (variasi kecepatan kelip)
export default function Star({ x, y, size, delay }) {
  const opacity = useRef(new Animated.Value(0.2)).current;

  // Hook useEffect: animasi mulai saat komponen muncul
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 1000 + delay, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.2, duration: 1000 + delay, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop(); // dibersihkan saat komponen hilang
  }, []);

  return (
    <Animated.Text
      style={{ position: 'absolute', left: x, top: y, fontSize: size, color: '#FFF8C6', opacity }}
    >
      ✦
    </Animated.Text>
  );
}