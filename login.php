<?php
session_start();
require_once 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $conn = $database->getConnection();
    
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Query user
    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    var_dump($user['email']);
    // Verifikasi password (asumsi sudah di-hash)
    if ($user && password_verify($password, $user['password']) && $user['role'] === 'peserta') {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['nama'];
        $_SESSION['user_email'] = $user['email'];
        
        header("Location: dashboard/participant/index.php");
        exit();
    } elseif($user && password_verify($password, $user['password']) && $user['role'] === 'admin') {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['nama'];
        $_SESSION['user_email'] = $user['email'];
        
        header("Location: dashboard/admin/admin.html");
        exit();

    } elseif($user && password_verify($password, $user['password']) && $user['role'] === 'karyawan') {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['nama'];
        $_SESSION['user_email'] = $user['email'];
        
        header("Location: dashboard/karyawan/karyawan.html");
        exit();
    }else{
        $error = 'Email atau Password salah';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login - PresensiNex</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
</head>
<body class="bg-gray-900 min-h-screen flex items-center justify-center">

<div class="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full">
    <div class="text-center mb-8">
        <img src="dashboard/participant/logonex.png" style="border-radius: 50%;" alt="Logo" class="w-20 h-20 mx-auto mb-4">
        <h2 class="text-2xl font-bold text-white">PresensiNex Login</h2>
        <p class="text-gray-400">Masuk ke dashboard peserta</p>
    </div>

    <?php if (isset($error)): ?>
    <div class="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
        <?= $error ?>
    </div>
    <?php endif; ?>

    <form method="POST" class="space-y-4">
        <div>
            <label class="block text-gray-400 mb-2">Email</label>
            <input type="email" name="email" required 
                   class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
        </div>

        <div>
            <label class="block text-gray-400 mb-2">Password</label>
            <input type="password" name="password" required 
                   class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
        </div>

        <div class="flex items-center justify-between">
            <label class="inline-flex items-center text-gray-400 text-sm">
                <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-500">
                <span class="ml-2">Ingat Saya</span>
            </label>

            <button type="button" id="forgotBtn" class="text-blue-400 text-sm hover:underline">Lupa Password?</button>
        </div>

        <button type="submit" 
                class="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold hover:opacity-90">
            Login
        </button>
    </form>

    <div class="mt-6 text-center text-gray-400 text-sm">
        <p>Demo login: ahmad@example.com / password: admin123</p>
    </div>
</div>

<!-- MODAL LUPA PASSWORD -->
<div id="forgotModal" class="fixed inset-0 hidden items-center justify-center bg-black/40 px-4 z-50">
    <div class="bg-gray-800 w-full max-w-sm rounded-xl shadow-lg p-6 relative">
        <h2 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
            Masukkan Email
        </h2>
        <p class="text-sm text-gray-300 mb-4">
            Masukkan email Anda untuk reset password.
        </p>
        <form action="auth/forgot_password_process.php" method="POST" class="space-y-4">
            <input type="email" name="email" required placeholder="Email Anda"
                   class="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none">
            <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
                Kirim Link Reset
            </button>
        </form>
        <button id="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-white">
            &times;
        </button>
    </div>
</div>

<script>
    const forgotBtn = document.getElementById('forgotBtn');
    const forgotModal = document.getElementById('forgotModal');
    const closeModal = document.getElementById('closeModal');

    forgotBtn.addEventListener('click', () => {
        forgotModal.classList.remove('hidden');
        forgotModal.classList.add('flex');
    });

    closeModal.addEventListener('click', () => {
        forgotModal.classList.add('hidden');
        forgotModal.classList.remove('flex');
    });
</script>

</body>
</html>
