import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MOODS } from './MoodPicker';

// Props: entry, onPress (buka detail), onToggleFavorite (love/unlove)
export default function DiaryCard({ entry, onPress, onToggleFavorite }) {
  const mood = MOODS.find((m) => m.key === entry.mood) || MOODS[1];
  const tanggal = new Date(entry.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.date}>🌌 {tanggal}</Text>
        <View style={styles.right}>
          <Text style={styles.mood}>{mood.emoji}</Text>
          <TouchableOpacity
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.heart}>{entry.favorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {entry.content}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,243,196,0.25)',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  date: { color: '#9FB0E8', fontSize: 12 },
  mood: { fontSize: 22 },
  heart: { fontSize: 22 },
  title: { color: '#FFF3C4', fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  preview: { color: '#D5DBF5', marginTop: 4, lineHeight: 20 },
});