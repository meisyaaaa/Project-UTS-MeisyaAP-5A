import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Star from './Star';
import Firefly from './Firefly';
import Moth from './Moth';
import Moon from './Moon';

const { width, height } = Dimensions.get('window');

// Props: children (isi halaman), showMoon (tampilkan bulan atau tidak)
export default function NightBackground({ children, showMoon = true }) {
  // useMemo: posisi bintang dibuat sekali saja, tidak berubah tiap render
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        size: 6 + Math.random() * 10,
        delay: Math.random() * 1500,
      })),
    []
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: height * 0.3 + Math.random() * height * 0.6,
      })),
    []
  );

  return (
    <LinearGradient
      colors={['#040714', '#0B1340', '#1B2A6B', '#0F3D3E']}
      style={styles.container}
    >
      {/* Lapisan dekorasi (tidak menghalangi sentuhan) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {stars.map((s) => (
          <Star key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
        ))}

        {showMoon && <Moon />}

        {/* Siluet pepohonan di bawah */}
        <View style={styles.forest}>
          <Text style={styles.trees}>🌲🌳🌲🌲🌳🌲🌲🌳🌲</Text>
        </View>

        <Moth top={height * 0.15} delay={0} duration={16000} />
        <Moth top={height * 0.4} delay={5000} duration={20000} size={22} reverse />
        <Moth top={height * 0.65} delay={9000} duration={18000} size={32} />

        {fireflies.map((f) => (
          <Firefly key={f.id} startX={f.x} startY={f.y} />
        ))}
      </View>

      {/* Isi halaman */}
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  forest: { position: 'absolute', bottom: -10, width: '100%', alignItems: 'center' },
  trees: { fontSize: 44, opacity: 0.35 },
});