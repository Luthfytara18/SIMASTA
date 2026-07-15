<?php
include '../config.php';
checkLogin();

$nama = $_POST['nama_kegiatan'] ?? '';
$deskripsi = $_POST['deskripsi'] ?? '';
$tgl_mulai = $_POST['tanggal_mulai'] ?? '';
$tgl_selesai = $_POST['tanggal_selesai'] ?? '';
$lokasi = $_POST['lokasi'] ?? '';
$status = $_POST['status'] ?? 'terjadwal';

if (empty($nama) || empty($tgl_mulai) || empty($tgl_selesai)) {
    jsonResponse(false, 'Nama, tanggal mulai, dan selesai wajib diisi.');
}

$stmt = mysqli_prepare($conn, "INSERT INTO kegiatan (nama_kegiatan, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, status) VALUES (?, ?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'ssssss', $nama, $deskripsi, $tgl_mulai, $tgl_selesai, $lokasi, $status);
if (mysqli_stmt_execute($stmt)) {
    jsonResponse(true, 'Kegiatan berhasil ditambahkan.');
} else {
    jsonResponse(false, 'Gagal menambahkan: ' . mysqli_error($conn));
}
?>