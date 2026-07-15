<?php
include '../config.php';
checkLogin();

$id = (int)($_GET['id'] ?? 0);
if ($id > 0) {
    mysqli_query($conn, "DELETE FROM kegiatan WHERE id=$id");
}
redirectWithToast('../../kegiatan.html', 'success', 'Kegiatan berhasil dihapus.');
?>