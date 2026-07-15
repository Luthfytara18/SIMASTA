<?php
session_start();

$host = 'localhost';
$user = 'root';        
$pass = '';            
$db = 'simasta';       

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    die(json_encode(['error' => 'Koneksi gagal: ' . mysqli_connect_error()]));
}
mysqli_set_charset($conn, 'utf8');

function jsonResponse($success, $message, $data = null) {
    header('Content-Type: application/json');
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}

function checkLogin() {
    if (!isset($_SESSION['user_id'])) {
        header('Location: index.html');
        exit;
    }
}

function redirectWithToast($location, $type, $message) {
    $sep = (strpos($location, '?') !== false) ? '&' : '?';
    header("Location: {$location}{$sep}toast={$type}&msg=" . urlencode($message));
    exit;
}
?>