<?php
include '../config.php';
checkLogin();

$id = (int)($_GET['id'] ?? 0);
if ($id > 0) {
    $result = mysqli_query($conn, "SELECT path_file FROM dokumentasi WHERE id=$id");
    $row = mysqli_fetch_assoc($result);
    if ($row) {
        $filePath = dirname(dirname(__DIR__)) . '/' . $row['path_file'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
    mysqli_query($conn, "DELETE FROM dokumentasi WHERE id=$id");
}
redirectWithToast('/simasta/dokumentasi.html', 'success', 'Dokumentasi berhasil dihapus.');
?>