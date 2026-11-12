import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NightBackground from '../components/NightBackground';
import MoodPicker from '../components/MoodPicker';

// Props: navigation, onSave (fungsi dari App.js untuk menyimpan catatan)
export default function AddEntryScreen({ navigation, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('tenang');

  // Fungsi ini HANYA berjalan saat tombol Simpan ditekan
  const handleSave = () => {
        if (!title.trim() || !content.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Judul dan isi cerita tidak boleh kosong 🌙');
      } else {
        Alert.alert('Oops', 'Judul dan isi cerita tidak boleh kosong 🌙');
      }
      return;
    }
    onSave({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      favorite: false,
      date: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <NightBackground showMoon={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
            <Text style={styles.heading}>🪶 Cerita Malam Ini</Text>

            <Text style={styles.label}>Judul</Text>
            <TextInput
              style={styles.input}
              placeholder="Apa judul harimu?"
              placeholderTextColor="#7F8BC0"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Bagaimana perasaanmu?</Text>
            <MoodPicker selected={mood} onSelect={setMood} />

            <Text style={styles.label}>Ceritamu</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tuliskan apa yang kamu rasakan hari ini..."
              placeholderTextColor="#7F8BC0"
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>💫 Simpan Catatan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancel}>Batal</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NightBackground>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#FFF3C4', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { color: '#B8C0E0', marginTop: 12, marginBottom: 4 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  textArea: { height: 180 },
  button: {
    backgroundColor: '#FFF3C4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#FFF3C4',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: { color: '#0B1340', fontWeight: 'bold', fontSize: 16 },
  cancel: { color: '#9FB0E8', textAlign: 'center', marginTop: 16 },
});