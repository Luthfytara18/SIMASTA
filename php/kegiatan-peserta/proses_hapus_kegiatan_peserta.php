<?php
include '../config.php';
checkLogin();

$id = (int)($_GET['id'] ?? 0);
if ($id > 0) {
    mysqli_query($conn, "DELETE FROM kegiatan_peserta WHERE id=$id");
}
redirectWithToast('../../kegiatan-peserta.html', 'success', 'Peserta berhasil dikeluarkan dari kegiatan.');
?>