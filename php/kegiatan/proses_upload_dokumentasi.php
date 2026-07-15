<?php
include '../config.php';
checkLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Akses tidak diizinkan. Silakan upload dari form.");
}

$id_keg = $_POST['id_kegiatan'] ?? 0;
if ($id_keg <= 0) {
    redirectWithToast('../../dokumentasi.html', 'error', 'Pilih kegiatan terlebih dahulu.');
}

if (!isset($_FILES['file_dokumentasi']) || $_FILES['file_dokumentasi']['error'] !== UPLOAD_ERR_OK) {
    redirectWithToast('../../dokumentasi.html', 'error', 'File gagal diupload.');
}

$file = $_FILES['file_dokumentasi'];
$fileName = basename($file['name']);
$fileTmp  = $file['tmp_name'];
$fileSize = $file['size'];
$fileType = mime_content_type($fileTmp);

$allowed = ['image/jpeg', 'image/png', 'application/pdf'];
if (!in_array($fileType, $allowed)) {
    redirectWithToast('../../dokumentasi.html', 'error', 'Hanya JPG, PNG, atau PDF yang diperbolehkan.');
}
if ($fileSize > 5 * 1024 * 1024) {
    redirectWithToast('../../dokumentasi.html', 'error', 'Ukuran file maksimal 5MB.');
}

$ext     = pathinfo($fileName, PATHINFO_EXTENSION);
$newName = time() . '_' . uniqid() . '.' . $ext;

// Path absolut ke folder upload di root project
$uploadDir  = dirname(dirname(__DIR__)) . '/upload/';
$uploadPath = 'upload/' . $newName; // path relatif yang disimpan di DB

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!move_uploaded_file($fileTmp, $uploadDir . $newName)) {
    redirectWithToast('../../dokumentasi.html', 'error', 'Gagal menyimpan file.');
}

$tipe = strtoupper($ext);
if ($tipe === 'JPEG') $tipe = 'JPG';

$tanggal = date('Y-m-d');
$stmt = mysqli_prepare($conn, "INSERT INTO dokumentasi (id_kegiatan, nama_file, tipe_file, path_file, tanggal_upload) VALUES (?, ?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt, 'issss', $id_keg, $fileName, $tipe, $uploadPath, $tanggal);

if (mysqli_stmt_execute($stmt)) {
    redirectWithToast('../../dokumentasi.html', 'success', 'Dokumentasi berhasil diupload.');
} else {
    redirectWithToast('../../dokumentasi.html', 'error', 'Gagal menyimpan data dokumentasi.');
}
?>
