<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password Terkirim</title>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Google Material Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0A2D55',
            accent: '#FFD700'
          }
        }
      }
    }
  </script>
</head>

<body class="min-h-screen flex items-center justify-center bg-slate-100 px-4">

  <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">

    <!-- Header -->
    <div class="mb-6">
      <div class="mx-auto w-14 h-14 bg-accent rounded-xl flex items-center justify-center font-bold text-primary text-xl">
        PK
      </div>
      <h1 class="mt-4 text-2xl font-bold text-primary">PresensiNex</h1>
      <p class="text-sm text-slate-500 mt-1">Reset password</p>
    </div>

    <!-- Notifikasi -->
     <?php if(!isset($_GET['message'])): ?>
    <div class="bg-blue-50 border border-blue-300 text-blue-700 p-4 rounded-lg mb-6 flex items-center gap-2">
      <span class="material-symbols-outlined text-2xl">mail_outline</span>
      <p class="text-sm">
        Jika email terdaftar, kami telah mengirimkan <br>
        link reset password. Silakan cek inbox atau spam Anda.
      </p> 
    </div>
    <?php else : ?>
    <div class="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
      <span class="material-symbols-outlined text-2xl">mail_outline</span>
      <p class="text-sm">
        Email yang dituju tidak terdaftar
      </p> 
    </div>
    <?php endif; ?>

    <!-- Tombol kembali login -->
    <a href="../login.php" class="inline-block bg-primary text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-blue-900 transition">
      Kembali ke Login
    </a>

    <p class="text-center text-xs text-slate-500 mt-6">
      © 2026 PresensiNex
    </p>
  </div>

</body>
</html>
