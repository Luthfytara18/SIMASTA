# 📋 SIMASTA - Sistem Monitoring Kegiatan Pengabdian Masyarakat

**Sistem Informasi Manajemen Kegiatan Pengabdian Masyarakat**
berbasis web yang dikembangkan untuk memonitor dan mendokumentasikan kegiatan pengabdian masyarakat secara terstruktur.

## 📌 Tentang Aplikasi

SIMASTA (Sistem Monitoring Kegiatan Pengabdian Masyarakat) adalah aplikasi manajemen kegiatan yang memungkinkan pengguna untuk:
- Mengelola data kegiatan (CRUD)
- Mengelola data peserta (CRUD)
- Mendaftarkan peserta ke dalam kegiatan
- Mengupload dan mengelola dokumentasi kegiatan (foto/PDF)
- Melihat dashboard statistik

## ✨ Fitur Utama
_________________________________________________________________________________________________________________
| Fitur                 | Deskripsi                                                                             |
|-----------------------|---------------------------------------------------------------------------------------|
| **Dashboard**         | Menampilkan statistik total kegiatan, peserta, kegiatan berlangsung, dan dokumentasi  |
| **Kegiatan**          | Tambah, edit, hapus, cari, dan filter kegiatan berdasarkan status                     |
| **Peserta**           | Tambah, edit, hapus, dan cari peserta (mahasiswa/dosen/umum)                          |
| **Kegiatan Peserta**  | Mendaftarkan peserta ke kegiatan dan mengelola keterangan peran                       |
| **Dokumentasi**       | Upload, preview, download, dan hapus file dokumentasi (JPG/PNG/PDF)                   |
|_______________________|_______________________________________________________________________________________|

## 🛠️ Teknologi yang Digunakan
_____________________________________________
| Komponen      | Teknologi                 |
|---------------|---------------------------|
| Backend       | PHP 8.2 (Native)          |
| Database      | MySQL / MariaDB           |
| Frontend      | HTML5, CSS3, JavaScript   |
| Framework CSS | Bootstrap 5               |
| Icons         | Bootstrap Icons           |
| Font          | Google Fonts (Poppins)    |
| Server        | XAMPP / Apache            |
|_______________|___________________________|

## 📁 Struktur Proyek

simasta v2.1-FINAL
|
|---README.md
|---.gitignore
|---dashboard.html
|---dokumentasi.html
|---index.html
|---kegiatan-peserta.html
|---kegiatan.html
|---peserta.html
|
+---assets
|     |--logo-sidebar.png
|     |--logo.png
|       
+---css
|    |---dashboard.css
|    |---pages.css
|    |---style.css
|    |---toast.css
|       
+---js
|    |---dashboard.js
|    |---dokumentasi.js
|    |---index.js
|    |---kegiatan-peserta.js
|    |---kegiatan.js
|    |---login.js
|    |---peserta.js
|    |---toast.js
|       
+---php
|   |---config.php
|   |---login.php
|   |   
|   +---dashboard
|   |       |---get-kegiatan-terbaru.php
|   |       |---get-statistik.php
|   |       
|   +---dokumentasi
|   |       |---get-data.php
|   |       |---proses_hapus_dokumentasi.php
|   |       
|   +---kegiatan
|   |        |---get-data.php
|   |        |---get-list.php
|   |        |---proses_edit_kegiatan.php
|   |        |---proses_hapus_kegiatan.php
|   |        |---proses_upload_dokumentasi.php
|   |        |---tambah.php
|   |       
|   +---kegiatan-peserta
|   |        |---get-data.php
|   |        |---proses_edit_kegiatan_peserta.php
|   |        |---proses_hapus_kegiatan_peserta.php
|   |        |---proses_tambah_kegiatan_peserta.php
|   |       
|   \---peserta
|           |---get-data.php
|           |---get-list.php
|           |---proses_edit_peserta.php
|           |---proses_hapus_peserta.php
|           |---proses_tambah_peserta.php
|           
\---upload
        |---1783902950_6a5432e60bd44.jpeg
        |---1783902982_6a5433069db9c.jpeg
        |---1783903037_6a54333d6c4cc.pdf
        |---1783916726_6a5468b63487c.jpeg
        |---1783916734_6a5468be88e0b.jpeg
        |---1783916743_6a5468c787048.jpeg
        |---1783916751_6a5468cf45bc2.jpg
        |---1783916763_6a5468dbd328c.jpg

## ⚙️ Instalasi & Konfigurasi

### 1. Prasyarat
- XAMPP (Apache + MySQL) atau server sejenis
- PHP 8.0 atau lebih tinggi
- Web browser modern

### 2. Langkah Instalasi

1. **Clone atau copy folder proyek** ke dalam direktori `htdocs` XAMPP:
C:\xampp\htdocs\simasta\


2. **Import database** menggunakan phpMyAdmin atau command line:
- Buka phpMyAdmin di `http://localhost/phpmyadmin`
- Buat database baru bernama `simasta`
- Import file `simasta.sql` yang ada di root proyek

3. **Konfigurasi koneksi database** (jika perlu):
- Buka file `php/config.php`
- Sesuaikan kredensial database jika berbeda:
```php
$host = 'localhost';
$user = 'root';        // default XAMPP
$pass = '';            // default XAMPP
$db = 'simasta';

4. Pastikan folder upload/ dapat ditulis oleh web server:
Pada Windows/XAMPP, folder sudah memiliki izin tulis secara default

5. Akses aplikasi di browser:
"http://localhost/simasta/"

## 🔐 Login Default
_____________________________
|Field      |   Nilai       |
|-----------|---------------|
|Username   |   admin       |
|Password   |   admin123    |
|___________|_______________|
Catatan: Password telah di-hash menggunakan password_hash() dengan Bcrypt.

## 🗄️ Struktur Database
Tabel-tabel utama:
_____________________________________________________________________
|Tabel               |Deskripsi                                     |
|users               |Data pengguna (login)                         |
|kegiatan            |Data kegiatan pengabdian                      |
|peserta             |Data peserta (mahasiswa/dosen/umum)           |
|kegiatan_peserta    |Relasi banyak-ke-banyak kegiatan ↔ peserta    |
|dokumentasi         |File dokumentasi kegiatan                     |
|____________________|______________________________________________|
Relasi:
kegiatan (1) ──┬── (∞) kegiatan_peserta ──┬── (1) peserta
               └── (∞) dokumentasi

## 📸 Dokumentasi - Aturan Upload
- Format yang diterima: JPG, JPEG, PNG, PDF
- Ukuran maksimal: 5 MB
- File disimpan di folder upload/ dengan penamaan unik (timestamp + random string)

## 🔄 Alur Kerja Aplikasi
Login (index.html)
    ↓
Dashboard (dashboard.html)
    ├── Lihat statistik
    ├── Lihat 3 kegiatan terbaru
    ├── Kelola Kegiatan (kegiatan.html)
    │   ├── Tambah kegiatan
    │   ├── Edit kegiatan
    │   ├── Hapus kegiatan
    │   └── Cari & filter
    ├── Kelola Peserta (peserta.html)
    │   ├── Tambah peserta
    │   ├── Edit peserta
    │   ├── Hapus peserta
    │   └── Cari peserta
    ├── Kelola Kegiatan Peserta (kegiatan-peserta.html)
    │   ├── Daftarkan peserta ke kegiatan
    │   ├── Edit keterangan
    │   └── Keluarkan peserta
    └── Dokumentasi (dokumentasi.html)
        ├── Upload file (foto/PDF)
        ├── Preview file
        ├── Download file
        └── Hapus file

## 🧪 Testing & Debugging
- Saat login, jika gagal, server akan mengembalikan data debug yang dapat dilihat di console browser (Network → Response)
- Error handling disertakan di setiap fetch request dengan fallback pesan

## 🔒 Keamanan
- Session-based authentication: Semua halaman (kecuali login) memeriksa session
- Password hashing: Menggunakan Bcrypt (PHP password_hash())
- SQL Injection protection: Menggunakan mysqli_prepare dan mysqli_real_escape_string
- File upload validation: Validasi tipe file dan ukuran
- Cascade delete: Saat kegiatan dihapus, dokumentasi dan relasi peserta ikut terhapus

## 👥 Pengembang
Kelompok 13 – Fakultas Teknik, Program Studi Informatika, Universitas Sarjanawiyata Tamansiswa
_________________________________________________________________________________________________
|Nama                     |     NIM     |               Peran                                   |
|Yohanes Mario Fernandez  |  2024018003 | Front-End (HTML5, CSS, Bootstrap) & Penyusunan Laporan|
|Luthfy Tara Nurwidagdo   |  2024018020 | JavaScript, GitHub Management & Integrasi Sistem      |
|Atthaya Nanda            |  2022018010 | Database Design (MySQL) & Pengujian Database          |
|Helena Trivena           |  2022018024 | Back-End (PHP Native) & Implementasi CRUD             |
|_________________________|_____________|_______________________________________________________|

## 📜 Lisensi
Hak Cipta Dilindungi Undang-Undang.

SIMASTA - Sistem Monitoring Kegiatan Pengabdian Masyarakat
Versi 2.1 Final – 13 Juli 2026