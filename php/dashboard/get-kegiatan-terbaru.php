<?php
include '../config.php';
checkLogin();

$query = "SELECT nama_kegiatan, tanggal_mulai, status FROM kegiatan ORDER BY tanggal_mulai DESC LIMIT 3";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = [
        'nama_kegiatan' => $row['nama_kegiatan'],
        'tanggal' => date('j F Y', strtotime($row['tanggal_mulai'])),
        'status' => ucfirst($row['status'])
    ];
}
echo json_encode($data);
?>