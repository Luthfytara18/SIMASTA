<?php
include '../config.php';
checkLogin();

$query = "SELECT id, nama_kegiatan FROM kegiatan ORDER BY nama_kegiatan ASC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>