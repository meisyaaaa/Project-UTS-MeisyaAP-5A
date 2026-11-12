Nama: Meisya Amelia Putri
NIM: 2430511002
Kelas: 5A

🌙 Malam Berbintang

Aplikasi buku harian digital bertema pemandangan alam di malam hari, dibuat dengan React Native (Expo). Tulis cerita harianmu di bawah langit bertabur bintang, bulan bercahaya, kunang-kunang, dan kupu-kupu malam.

✨ Fitur
Menulis catatan harian lengkap dengan pilihan suasana hati
Mencari catatan berdasarkan judul atau isi
Menandai catatan sebagai favorit (❤️)
Melihat detail dan menghapus catatan
Data tersimpan permanen di perangkat
Latar malam beranimasi: bulan, bintang, kunang-kunang, kupu-kupu, dan siluet hutan

🛠️ Teknologi
React Native dan Expo
React Navigation (Stack dan Bottom Tabs)
AsyncStorage
Expo Linear Gradient

🚀 Cara Menjalankan
Pasang Node.js (versi LTS).
Buka folder proyek di terminal, lalu pasang dependensi:
KODE:   npm install
Jalankan aplikasi:
KODE:   npx expo start
Buka aplikasi:
HP: pasang Expo Go, lalu scan QR code (HP dan laptop harus satu WiFi)
Browser: tekan tombol w di terminal

Jika ada kendala, coba npx expo start -c untuk membersihkan cache.

📁 Struktur Folder
BukuHarianMalam/
├── App.js                  # State utama dan navigasi
├── components/
│   ├── NightBackground.js  # Latar malam
│   ├── Star.js             # Bintang berkelip
│   ├── Firefly.js          # Kunang-kunang
│   ├── Moth.js             # Kupu-kupu malam
│   ├── Moon.js             # Bulan bercahaya
│   ├── DiaryCard.js        # Kartu catatan
│   ├── MoodPicker.js       # Pilihan suasana hati
│   └── BottomBar.js        # Bar navigasi bawah
└── screens/
    ├── HomeScreen.js       # Daftar catatan dan pencarian
    ├── FavoritesScreen.js  # Daftar favorit
    ├── AddEntryScreen.js   # Form menulis catatan
    └── DetailScreen.js     # Detail dan hapus catatan

Screenshot aplikasi:
<img width="311" height="335" alt="Screenshot 2026-11-12 210210" src="https://github.com/user-attachments/assets/a7cb2a0d-d508-40a1-9545-0da2d747cd6f" />
<img width="317" height="335" alt="Screenshot 2026-11-12 210221" src="https://github.com/user-attachments/assets/97f6c82b-44f5-4e3e-b577-29cd12233c30" />
<img width="314" height="332" alt="Screenshot 2026-11-12 210236" src="https://github.com/user-attachments/assets/3a3e93fb-5bd8-462d-ae7a-fbc8a09394ac" />
<img width="314" height="334" alt="Screenshot 2026-11-12 210250" src="https://github.com/user-attachments/assets/39b85202-e65f-480c-8340-01b625498d5b" />




