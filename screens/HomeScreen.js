import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NightBackground from '../components/NightBackground';
import DiaryCard from '../components/DiaryCard';

// Props: navigation, entries, onToggleFavorite (dari App.js)
export default function HomeScreen({ navigation, entries, onToggleFavorite }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.content.toLowerCase().includes(search.toLowerCase())
      ),
    [entries, search]
  );

  return (
    <NightBackground>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Malam Berbintang</Text>
          <Text style={styles.subtitle}>✨ Tuliskan ceritamu di bawah cahaya bulan</Text>
          <Text style={styles.count}>{entries.length} catatan tersimpan</Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="🔍 Cari catatan..."
          placeholderTextColor="#7F8BC0"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              🌙 Belum ada catatan.{'\n'}Tekan tombol di bawah untuk mulai menulis.
            </Text>
          }
          renderItem={({ item }) => (
            <DiaryCard
              entry={item}
              onPress={() => navigation.navigate('Detail', { entry: item })}
              onToggleFavorite={() => onToggleFavorite(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </NightBackground>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 20, width: '65%' },
  title: { color: '#FFF3C4', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: '#B8C0E0', fontSize: 12, marginTop: 4 },
  count: { color: '#E6FF5A', fontSize: 12, marginTop: 6 },
  search: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    marginHorizontal: 20,
    marginTop: 90,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  empty: { color: '#B8C0E0', textAlign: 'center', marginTop: 60, lineHeight: 24 },
});