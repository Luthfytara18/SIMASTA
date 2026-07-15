<?php
include '../config.php';
checkLogin();

$totalKegiatan = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM kegiatan"))['total'];
$totalPeserta = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM peserta"))['total'];
$totalBerlangsung = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM kegiatan WHERE status='berlangsung'"))['total'];
$totalDokumentasi = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) AS total FROM dokumentasi"))['total'];

echo json_encode([
    'totalKegiatan' => $totalKegiatan,
    'totalPeserta' => $totalPeserta,
    'totalBerlangsung' => $totalBerlangsung,
    'totalDokumentasi' => $totalDokumentasi
]);
?>