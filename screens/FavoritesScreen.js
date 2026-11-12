import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NightBackground from '../components/NightBackground';
import DiaryCard from '../components/DiaryCard';

// Props: navigation, entries, onToggleFavorite
export default function FavoritesScreen({ navigation, entries, onToggleFavorite }) {
  // useMemo: hanya ambil catatan yang di-love
  const favorites = useMemo(() => entries.filter((e) => e.favorite), [entries]);

  return (
    <NightBackground>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>❤️ Favorit</Text>
          <Text style={styles.subtitle}>Kenangan yang paling berkesan</Text>
          <Text style={styles.count}>{favorites.length} catatan favorit</Text>
        </View>

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingTop: 100, paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              🌠 Belum ada favorit.{'\n'}Tekan ikon 🤍 pada catatan untuk menyimpannya di sini.
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
  empty: { color: '#B8C0E0', textAlign: 'center', marginTop: 60, lineHeight: 24 },
});