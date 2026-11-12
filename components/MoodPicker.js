import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const MOODS = [
  { key: 'bahagia', emoji: '😊', label: 'Bahagia' },
  { key: 'tenang', emoji: '🌙', label: 'Tenang' },
  { key: 'semangat', emoji: '🔥', label: 'Semangat' },
  { key: 'lelah', emoji: '😴', label: 'Lelah' },
  { key: 'sedih', emoji: '🥀', label: 'Sedih' },
];

// Props: selected (mood terpilih), onSelect (fungsi dari parent)
export default function MoodPicker({ selected, onSelect }) {
  return (
    <View style={styles.row}>
      {MOODS.map((m) => {
        const active = selected === m.key;
        return (
          <TouchableOpacity
            key={m.key}
            onPress={() => onSelect(m.key)}
            style={[styles.item, active && styles.active]}
          >
            <Text style={styles.emoji}>{m.emoji}</Text>
            <Text style={[styles.label, active && { color: '#FFF3C4' }]}>{m.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  item: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    width: 62,
  },
  active: { backgroundColor: 'rgba(255,243,196,0.2)', borderColor: '#FFF3C4' },
  emoji: { fontSize: 24 },
  label: { color: '#B8C0E0', fontSize: 10, marginTop: 4 },
});