<?php
// file: auth/reset_password_process.php
require '../config/database.php';

// Ambil token dari URL
$token = $_GET['token'] ?? '';
$token = trim($token);

if (empty($token)) {
    die("Token tidak valid");
}

// Hash token untuk dibandingkan dengan DB
$tokenHash = hash('sha256', $token);

$database = new Database();
$conn = $database->getConnection();

// Cari user dengan token hash dan belum expired
$stmt = $conn->prepare("SELECT id, reset_token_expired FROM users WHERE reset_token_hash = ?");
$stmt->execute([$tokenHash]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die("Token tidak valid atau sudah digunakan");
}

// Cek expired
if (strtotime($user['reset_token_expired']) < time()) {
    die("Token sudah expired. Silakan minta reset password baru.");
}

// Jika form dikirim
$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm_password'] ?? '';

    if (empty($password) || empty($confirm)) {
        $errors[] = "Semua field harus diisi";
    } elseif ($password !== $confirm) {
        $errors[] = "Password dan konfirmasi tidak sama";
    } else {
        // Hash password baru
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Update password & hapus token
        $update = $conn->prepare("UPDATE users SET password = ?, reset_token_hash = NULL, reset_token_expired = NULL WHERE id = ?");
        if ($update->execute([$passwordHash, $user['id']])) {
            $success = true;
        } else {
            $errors[] = "Gagal update password. Coba lagi.";
        }
    }
}

// Supaya tampilan bisa akses $errors, $success
