<?php
include '../config.php';
checkLogin();

$filter_keg = $_GET['filter_kegiatan'] ?? '';
$filter_tipe = $_GET['filter_tipe'] ?? '';

$query = "SELECT d.*, k.nama_kegiatan 
          FROM dokumentasi d
          JOIN kegiatan k ON d.id_kegiatan = k.id
          WHERE 1=1";
if ($filter_keg && $filter_keg != 'Semua kegiatan') {
    $filter_keg = mysqli_real_escape_string($conn, $filter_keg);
    $query .= " AND k.nama_kegiatan = '$filter_keg'";
}
if ($filter_tipe && $filter_tipe != 'Semua tipe') {
    $filter_tipe = mysqli_real_escape_string($conn, $filter_tipe);
    $query .= " AND d.tipe_file = '$filter_tipe'";
}
$query .= " ORDER BY d.id DESC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>