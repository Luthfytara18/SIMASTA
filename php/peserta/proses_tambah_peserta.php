<?php
include '../config.php';
checkLogin();

$nama = $_POST['nama_peserta'] ?? '';
$nim = $_POST['nim_nip'] ?? '';
$jenis = $_POST['jenis_peserta'] ?? 'umum';
$email = $_POST['email'] ?? '';
$telp = $_POST['no_telp'] ?? '';

if (empty($nama) || empty($nim) || empty($email)) {
    redirectWithToast('../../peserta.html', 'error', 'Semua field wajib diisi.');
}

$stmt = mysqli_prepare($conn, "INSERT INTO peserta (nama_peserta, nim_nip, jenis_peserta, email, no_telp) VALUES (?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'sssss', $nama, $nim, $jenis, $email, $telp);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../peserta.html', 'success', 'Peserta berhasil ditambahkan.');
} else {
    redirectWithToast('../../peserta.html', 'error', 'Gagal menambahkan peserta.');
}
?>