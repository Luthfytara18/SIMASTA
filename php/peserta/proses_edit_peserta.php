<?php
include '../config.php';
checkLogin();

$id = $_POST['id_peserta'] ?? 0;
$nama = $_POST['nama_peserta'] ?? '';
$nim = $_POST['nim_nip'] ?? '';
$jenis = $_POST['jenis_peserta'] ?? 'umum';
$email = $_POST['email'] ?? '';
$telp = $_POST['no_telp'] ?? '';

if ($id <= 0 || empty($nama) || empty($nim) || empty($email)) {
    redirectWithToast('../../peserta.html', 'error', 'Data tidak lengkap.');
}

$stmt = mysqli_prepare($conn, "UPDATE peserta SET nama_peserta=?, nim_nip=?, jenis_peserta=?, email=?, no_telp=? WHERE id=?");
mysqli_stmt_bind_param($stmt, 'sssssi', $nama, $nim, $jenis, $email, $telp, $id);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../peserta.html', 'success', 'Data peserta berhasil diperbarui.');
} else {
    redirectWithToast('../../peserta.html', 'error', 'Gagal memperbarui data peserta.');
}
?>