<?php
include '../config.php';
checkLogin();

$search = $_GET['search'] ?? '';
$status = $_GET['status'] ?? '';

$query = "SELECT * FROM kegiatan WHERE 1=1";
if ($search) {
    $search = mysqli_real_escape_string($conn, $search);
    $query .= " AND nama_kegiatan LIKE '%$search%'";
}
if ($status && $status != 'Semua status') {
    $status = mysqli_real_escape_string($conn, $status);
    $query .= " AND status = '$status'";
}
$query .= " ORDER BY tanggal_mulai DESC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>