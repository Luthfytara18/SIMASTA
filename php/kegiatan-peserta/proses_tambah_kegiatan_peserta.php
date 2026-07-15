<?php
include '../config.php';
checkLogin();

$id_keg = $_POST['id_kegiatan'] ?? 0;
$id_pes = $_POST['id_peserta'] ?? 0;
$keterangan = $_POST['keterangan'] ?? '';

if ($id_keg <= 0 || $id_pes <= 0 || empty($keterangan)) {
    redirectWithToast('../../kegiatan-peserta.html', 'error', 'Data tidak lengkap.');
}

$stmt = mysqli_prepare($conn, "INSERT INTO kegiatan_peserta (id_kegiatan, id_peserta, keterangan) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'iis', $id_keg, $id_pes, $keterangan);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../kegiatan-peserta.html', 'success', 'Peserta berhasil ditambahkan ke kegiatan.');
} else {
    redirectWithToast('../../kegiatan-peserta.html', 'error', 'Gagal menambahkan data.');
}
?>