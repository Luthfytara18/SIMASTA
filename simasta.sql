-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2026 at 02:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simasta`
--

-- --------------------------------------------------------

--
-- Table structure for table `dokumentasi`
--

CREATE TABLE `dokumentasi` (
  `id` int(11) NOT NULL,
  `id_kegiatan` int(11) NOT NULL,
  `nama_file` varchar(255) NOT NULL,
  `tipe_file` varchar(10) DEFAULT NULL,
  `path_file` varchar(255) NOT NULL,
  `tanggal_upload` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dokumentasi`
--

INSERT INTO `dokumentasi` (`id`, `id_kegiatan`, `nama_file`, `tipe_file`, `path_file`, `tanggal_upload`, `created_at`) VALUES
(16, 18, 'kegiatan1.jpeg', 'JPG', 'upload/1783916726_6a5468b63487c.jpeg', '2026-07-13', '2026-07-13 04:25:26'),
(17, 14, 'kegiatan2.jpeg', 'JPG', 'upload/1783916734_6a5468be88e0b.jpeg', '2026-07-13', '2026-07-13 04:25:34'),
(18, 17, 'kegiatan3.jpeg', 'JPG', 'upload/1783916743_6a5468c787048.jpeg', '2026-07-13', '2026-07-13 04:25:43'),
(19, 15, 'kegiatan4.jpg', 'JPG', 'upload/1783916751_6a5468cf45bc2.jpg', '2026-07-13', '2026-07-13 04:25:51'),
(20, 16, 'kegiatan5.jpg', 'JPG', 'upload/1783916763_6a5468dbd328c.jpg', '2026-07-13', '2026-07-13 04:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id` int(11) NOT NULL,
  `nama_kegiatan` varchar(200) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `status` enum('terjadwal','berlangsung','selesai') DEFAULT 'terjadwal',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id`, `nama_kegiatan`, `deskripsi`, `tanggal_mulai`, `tanggal_selesai`, `lokasi`, `status`, `created_at`) VALUES
(14, 'Pelatihan Literasi Digital untuk Siswa SMA', 'Memberikan pelatihan mengenai keamanan digital, etika bermedia sosial, dan penggunaan internet secara bijak.', '2026-08-05', '2026-08-05', 'SMA Negeri 1 Pontianak', 'terjadwal', '2026-07-13 04:09:10'),
(15, 'Sosialisasi Pengelolaan Sampah Berbasis Masyarakat', 'Edukasi mengenai pemilahan sampah organik dan anorganik serta praktik daur ulang.', '2026-08-12', '2026-08-12', 'Balai Desa Sungai Raya', 'terjadwal', '2026-07-13 04:09:58'),
(16, 'Workshop Microsoft Office untuk UMKM', 'Pelatihan penggunaan Microsoft Word, Excel, dan PowerPoint untuk mendukung administrasi usaha.', '2026-08-20', '2026-08-21', 'Aula Kecamatan Pontianak Selatan', 'berlangsung', '2026-07-13 04:10:51'),
(17, 'Pendampingan Pembuatan Website UMKM', 'Membantu pelaku UMKM membuat website sederhana sebagai media promosi produk.', '2026-09-02', '2026-09-02', 'Desa Parit Baru', 'selesai', '2026-07-13 04:12:10'),
(18, 'Edukasi Keamanan Informasi di Lingkungan Sekolah', 'Penyuluhan mengenai perlindungan data pribadi, phishing, dan keamanan akun digital.', '2026-09-15', '2026-09-15', 'SMK Negeri 2 Pontianak', 'selesai', '2026-07-13 04:12:57');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan_peserta`
--

CREATE TABLE `kegiatan_peserta` (
  `id` int(11) NOT NULL,
  `id_kegiatan` int(11) NOT NULL,
  `id_peserta` int(11) NOT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kegiatan_peserta`
--

INSERT INTO `kegiatan_peserta` (`id`, `id_kegiatan`, `id_peserta`, `keterangan`, `created_at`) VALUES
(8, 18, 12, 'Ketua Panitia', '2026-07-13 04:19:06'),
(9, 14, 11, 'Ketua Panitia', '2026-07-13 04:19:20'),
(10, 17, 14, 'Ketua Panitia', '2026-07-13 04:19:33'),
(11, 16, 13, 'Ketua Panitia', '2026-07-13 04:19:44'),
(12, 15, 13, 'Ketua Panitia', '2026-07-13 04:19:56'),
(13, 15, 12, 'Bendahara', '2026-07-13 04:20:11'),
(14, 15, 11, 'Sekretaris', '2026-07-13 04:20:23'),
(15, 15, 14, 'Perkab', '2026-07-13 04:20:34');

-- --------------------------------------------------------

--
-- Table structure for table `peserta`
--

CREATE TABLE `peserta` (
  `id` int(11) NOT NULL,
  `nama_peserta` varchar(100) NOT NULL,
  `nim_nip` varchar(50) NOT NULL,
  `jenis_peserta` enum('mahasiswa','dosen','umum') DEFAULT 'umum',
  `email` varchar(100) NOT NULL,
  `no_telp` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peserta`
--

INSERT INTO `peserta` (`id`, `nama_peserta`, `nim_nip`, `jenis_peserta`, `email`, `no_telp`, `created_at`) VALUES
(11, 'Helena Trivena', '2022018024', 'mahasiswa', 'helena@gmail.com', '08100000000', '2026-07-13 04:16:00'),
(12, 'Atthaya Nanda', '2022018010', 'mahasiswa', 'attahaya@gmail.com', '08100000000', '2026-07-13 04:17:08'),
(13, 'Yohanes Mario Fernandez', '2024018003', 'dosen', 'mario@gmail.com', '08100000000', '2026-07-13 04:17:49'),
(14, 'Luthfy Tara Nurwidagdo', '2024018020', 'umum', 'luthfy@gmail.com', '08100000000', '2026-07-13 04:18:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `created_at`) VALUES
(1, 'admin', '$2y$10$TFp1ITUqAquYJKtz.Del3OxBV9JWG.OwQ3dI1dp5KOHPJk0yO/q8u', 'Administrator', '2026-07-11 14:49:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kegiatan` (`id_kegiatan`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kegiatan_peserta`
--
ALTER TABLE `kegiatan_peserta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kegiatan` (`id_kegiatan`),
  ADD KEY `id_peserta` (`id_peserta`);

--
-- Indexes for table `peserta`
--
ALTER TABLE `peserta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `kegiatan_peserta`
--
ALTER TABLE `kegiatan_peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dokumentasi`
--
ALTER TABLE `dokumentasi`
  ADD CONSTRAINT `dokumentasi_ibfk_1` FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `kegiatan_peserta`
--
ALTER TABLE `kegiatan_peserta`
  ADD CONSTRAINT `kegiatan_peserta_ibfk_1` FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kegiatan_peserta_ibfk_2` FOREIGN KEY (`id_peserta`) REFERENCES `peserta` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
