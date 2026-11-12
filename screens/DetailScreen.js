import React from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, Alert, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NightBackground from '../components/NightBackground';
import { MOODS } from '../components/MoodPicker';

// Props: route, navigation, entries, onDelete, onToggleFavorite
export default function DetailScreen({ route, navigation, entries, onDelete, onToggleFavorite }) {
  // Ambil versi terbaru dari state, supaya status love selalu up-to-date
  const entry = entries.find((e) => e.id === route.params.entry.id) || route.params.entry;
  const mood = MOODS.find((m) => m.key === entry.mood) || MOODS[1];
  const tanggal = new Date(entry.date).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

    // Fungsi yang benar-benar menghapus lalu kembali ke halaman sebelumnya
  const doDelete = () => {
    onDelete(entry.id);
    navigation.goBack();
  };

  const confirmDelete = () => {
    if (Platform.OS === 'web') {
      // Di browser, Alert.alert tidak jalan, jadi pakai window.confirm
      if (window.confirm('Hapus catatan ini? Catatan akan hilang selamanya.')) {
        doDelete();
      }
    } else {
      // Di HP (Android/iOS), pakai Alert bawaan
      Alert.alert('Hapus catatan?', 'Catatan ini akan hilang selamanya.', [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: doDelete },
      ]);
    }
  };

  return (
    <NightBackground showMoon={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>← Kembali</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onToggleFavorite(entry.id)}>
              <Text style={styles.heart}>{entry.favorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <Text style={styles.mood}>{mood.emoji}</Text>
            <Text style={styles.date}>{tanggal}</Text>
            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.content}>{entry.content}</Text>
          </View>

          <TouchableOpacity style={styles.delete} onPress={confirmDelete}>
            <Text style={styles.deleteText}>🗑️ Hapus Catatan</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </NightBackground>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  back: { color: '#FFF3C4', fontSize: 16 },
  heart: { fontSize: 28 },
  box: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,243,196,0.3)',
  },
  mood: { fontSize: 40, textAlign: 'center' },
  date: { color: '#9FB0E8', textAlign: 'center', marginTop: 6 },
  title: { color: '#FFF3C4', fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  content: { color: '#E3E8FF', fontSize: 16, lineHeight: 26, marginTop: 12 },
  delete: {
    marginTop: 24,
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF7B7B',
  },
  deleteText: { color: '#FF9C9C', fontWeight: 'bold' },
});