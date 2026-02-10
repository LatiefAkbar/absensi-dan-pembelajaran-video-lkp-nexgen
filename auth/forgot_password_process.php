<?php
// file: auth/forgot_password_process.php

require '../config/database.php';
require '../vendor/autoload.php';
$mailConfig = require '../config/mail.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Ambil email dari form
$email = $_POST['email'] ?? '';
$email = trim($email);

if (empty($email)) {
    header("Location: forgot_password.php?error=kosong");
    exit;
}

$database = new Database();
$conn = $database->getConnection();

// Cari user berdasarkan email
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // User ada → generate token
    $token = bin2hex(random_bytes(32)); // token asli
    $tokenHash = hash('sha256', $token); // hash simpan di DB
    $expired = date('Y-m-d H:i:s', strtotime('+15 minutes')); // expired 15 menit

    $userId = $user['id'];

    // Simpan token hash + expired ke DB
    $update = $conn->prepare("UPDATE users SET reset_token_hash = ?, reset_token_expired = ? WHERE id = ?");
    $update->execute([$tokenHash, $expired, $userId]);

    // Buat link reset password
    $resetLink = "https://unafraid-eldon-noninstinctually.ngrok-free.dev/absensi-dan-pembelajaran-video-lkp-nexgen/auth/reset_password.php?token=$token";

    // Kirim email dengan PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $mailConfig['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $mailConfig['username'];
        $mail->Password   = $mailConfig['password'];
        $mail->SMTPSecure = $mailConfig['encryption'];
        $mail->Port       = $mailConfig['port'];

        $mail->setFrom($mailConfig['from_email'], $mailConfig['from_name']);
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = "Reset Password PresensiNex";
        $mail->Body    = "Halo, klik link ini untuk reset password: <a href='$resetLink'>$resetLink</a>";

        $mail->send();
        header("Location: forgot_password.php");
        exit;
    } catch (Exception $e) {
        echo "Gagal mengirim email.";
    }
}else{
    header("Location: forgot_password.php?message=error");
    exit;
    
}

?>
