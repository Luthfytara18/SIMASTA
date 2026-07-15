<?php
include '../config.php';
checkLogin();

$search = $_GET['search'] ?? '';
$query = "SELECT * FROM peserta WHERE 1=1";
if ($search) {
    $search = mysqli_real_escape_string($conn, $search);
    $query .= " AND (nama_peserta LIKE '%$search%' OR nim_nip LIKE '%$search%' OR email LIKE '%$search%')";
}
$query .= " ORDER BY id DESC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>