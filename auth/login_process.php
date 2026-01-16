<?php
require '../config/database.php';
session_start();

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    header("Location: ../login.php?error=kosong");
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, email, password 
     FROM users 
     WHERE email = ? 
     LIMIT 1"
);

$stmt->bind_param('s', $email);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($password, $user['password'])) {
    header("Location: ../login.php?error=invalid");
    exit;
}

// LOGIN BERHASIL
$_SESSION['user_id'] = $user['id'];
$_SESSION['email']   = $user['email'];

header("Location: ../dashboard/peserta.php");
exit;
