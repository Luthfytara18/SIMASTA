<?php
include '../config.php';
checkLogin();

$id = $_POST['id_kegiatan'] ?? 0;
$nama = $_POST['nama_kegiatan'] ?? '';
$deskripsi = $_POST['deskripsi'] ?? '';
$tgl_mulai = $_POST['tanggal_mulai'] ?? '';
$tgl_selesai = $_POST['tanggal_selesai'] ?? '';
$lokasi = $_POST['lokasi'] ?? '';
$status = $_POST['status'] ?? 'terjadwal';

if ($id <= 0 || empty($nama) || empty($tgl_mulai) || empty($tgl_selesai)) {
    redirectWithToast('../../kegiatan.html', 'error', 'Data tidak lengkap.');
}

$stmt = mysqli_prepare($conn, "UPDATE kegiatan SET nama_kegiatan=?, deskripsi=?, tanggal_mulai=?, tanggal_selesai=?, lokasi=?, status=? WHERE id=?");
mysqli_stmt_bind_param($stmt, 'ssssssi', $nama, $deskripsi, $tgl_mulai, $tgl_selesai, $lokasi, $status, $id);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../kegiatan.html', 'success', 'Kegiatan berhasil diperbarui.');
} else {
    redirectWithToast('../../kegiatan.html', 'error', 'Gagal memperbarui kegiatan.');
}
?>