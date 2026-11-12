import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import DetailScreen from './screens/DetailScreen';
import BottomBar from './components/BottomBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const STORAGE_KEY = 'buku_harian_malam';

function MainTabs({ entries, onToggleFavorite }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen {...props} entries={entries} onToggleFavorite={onToggleFavorite} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Favorit">
        {(props) => (
          <FavoritesScreen {...props} entries={entries} onToggleFavorite={onToggleFavorite} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [entries, setEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Muat data saat aplikasi dibuka
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);   // 👈 TAMBAHKAN SEMENTARA
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setEntries(JSON.parse(saved));
      } catch (e) {
        console.log('Gagal memuat data', e);
      }
      setLoaded(true);
    })();
  }, []);

  // Simpan otomatis setiap data berubah (termasuk status favorit)
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries)).catch(() => {});
    }
  }, [entries, loaded]);

  const addEntry = (entry) => setEntries((prev) => [entry, ...prev]);
  const deleteEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const toggleFavorite = (id) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, favorite: !e.favorite } : e))
    );

  // useCallback: komponen Main hanya dibuat ulang bila entries berubah
  const MainScreen = useCallback(
    () => <MainTabs entries={entries} onToggleFavorite={toggleFavorite} />,
    [entries]
  );

  const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#040714' } };

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Tambah">
          {(props) => <AddEntryScreen {...props} onSave={addEntry} />}
        </Stack.Screen>
        <Stack.Screen name="Detail">
          {(props) => (
            <DetailScreen
              {...props}
              entries={entries}
              onDelete={deleteEntry}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}