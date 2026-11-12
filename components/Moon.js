import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

// Props: size (ukuran bulan)
export default function Moon({ size = 70 }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.25, duration: 2500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 2500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ position: 'absolute', top: 50, right: 30, width: size, height: size }}>
      {/* Cahaya berdenyut di belakang bulan */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255, 243, 196, 0.25)',
          transform: [{ scale: pulse }],
        }}
      />
      {/* Badan bulan */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#FFF3C4',
          shadowColor: '#FFF3C4',
          shadowOpacity: 1,
          shadowRadius: 20,
          elevation: 12,
        }}
      >
        {/* Kawah bulan */}
        <View style={{ position: 'absolute', top: 15, left: 18, width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(200,180,120,0.45)' }} />
        <View style={{ position: 'absolute', top: 38, left: 40, width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(200,180,120,0.45)' }} />
        <View style={{ position: 'absolute', top: 40, left: 14, width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(200,180,120,0.35)' }} />
      </View>
    </View>
  );
}