import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Props dari Tab Navigator: state (tab aktif) dan navigation (untuk pindah halaman)
export default function BottomBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const activeName = state.routes[state.index].name;

  const items = [
    { name: 'Home', icon: '🏠', label: 'Home' },
    { name: 'Favorit', icon: '❤️', label: 'Favorit' },
  ];

  const renderTab = (item) => {
    const active = activeName === item.name;
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.tab}
        onPress={() => navigation.navigate(item.name)}
      >
        <Text style={[styles.icon, !active && { opacity: 0.45 }]}>{item.icon}</Text>
        <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {renderTab(items[0])}

      {/* Tombol tengah: Tulis Cerita */}
      <View style={styles.centerWrap}>
        <TouchableOpacity
         style={styles.centerButton}
         onPress={() => (navigation.getParent() || navigation).navigate('Tambah')}
>
          <Text style={styles.centerText}>🪶 Tulis Cerita</Text>
        </TouchableOpacity>
      </View>

      {renderTab(items[1])}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 10, 36, 0.97)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,243,196,0.3)',
    paddingTop: 10,
  },
  tab: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 22 },
  label: { color: '#7F8BC0', fontSize: 11, marginTop: 2 },
  labelActive: { color: '#FFF3C4', fontWeight: 'bold' },
  centerWrap: { flex: 1.6, alignItems: 'center' },
  centerButton: {
    backgroundColor: '#FFF3C4',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    shadowColor: '#FFF3C4',
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  centerText: { color: '#0B1340', fontWeight: 'bold', fontSize: 15 },
});