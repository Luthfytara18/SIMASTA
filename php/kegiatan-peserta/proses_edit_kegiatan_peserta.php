<?php
include '../config.php';
checkLogin();

$id = $_POST['id'] ?? 0;
$keterangan = $_POST['keterangan'] ?? '';

if ($id <= 0 || empty($keterangan)) {
    redirectWithToast('../../kegiatan-peserta.html', 'error', 'Data tidak lengkap.');
}

$stmt = mysqli_prepare($conn, "UPDATE kegiatan_peserta SET keterangan=? WHERE id=?");
mysqli_stmt_bind_param($stmt, 'si', $keterangan, $id);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../kegiatan-peserta.html', 'success', 'Keterangan berhasil diperbarui.');
} else {
    redirectWithToast('../../kegiatan-peserta.html', 'error', 'Gagal memperbarui data.');
}
?>