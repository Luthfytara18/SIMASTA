<?php
include '../config.php';
checkLogin();

$search = $_GET['search'] ?? '';
$filter_keg = $_GET['filter_kegiatan'] ?? '';

$query = "SELECT kp.*, p.nama_peserta, k.nama_kegiatan 
          FROM kegiatan_peserta kp
          JOIN peserta p ON kp.id_peserta = p.id
          JOIN kegiatan k ON kp.id_kegiatan = k.id
          WHERE 1=1";
if ($search) {
    $search = mysqli_real_escape_string($conn, $search);
    $query .= " AND (p.nama_peserta LIKE '%$search%' OR k.nama_kegiatan LIKE '%$search%' OR kp.keterangan LIKE '%$search%')";
}
if ($filter_keg && $filter_keg != 'Semua kegiatan') {
    $filter_keg = mysqli_real_escape_string($conn, $filter_keg);
    $query .= " AND k.nama_kegiatan = '$filter_keg'";
}
$query .= " ORDER BY kp.id DESC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>