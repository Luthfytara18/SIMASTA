<?php
include '../config.php';
checkLogin();

$query = "SELECT id, nama_peserta, nim_nip FROM peserta ORDER BY nama_peserta ASC";
$result = mysqli_query($conn, $query);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>