<?php
include 'config.php';

// Ambil data dari request
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Cek apakah username/password kosong
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username dan password wajib diisi.']);
    exit;
}

// Cari user di database
$stmt = mysqli_prepare($conn, "SELECT id, password FROM users WHERE username = ?");
mysqli_stmt_bind_param($stmt, 's', $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

// DEBUG: Tampilkan informasi (hanya untuk testing)
$debug = [
    'username_input' => $username,
    'password_input' => $password,
    'user_found' => $user ? true : false,
    'hash_database' => $user ? $user['password'] : null,
    'verify_result' => $user ? password_verify($password, $user['password']) : false
];

// Kalau user tidak ditemukan
if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User tidak ditemukan', 'debug' => $debug]);
    exit;
}

// Verifikasi password
if (password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    echo json_encode(['success' => true, 'message' => 'Login berhasil', 'debug' => $debug]);
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Password salah', 'debug' => $debug]);
    exit;
}
?>