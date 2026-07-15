<?php
include '../config.php';
checkLogin();

$id = (int)($_GET['id'] ?? 0);
if ($id > 0) {
    mysqli_query($conn, "DELETE FROM peserta WHERE id=$id");
}
redirectWithToast('../../peserta.html', 'success', 'Peserta berhasil dihapus.');
?>