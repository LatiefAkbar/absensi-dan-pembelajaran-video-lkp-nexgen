<?php
require 'reset_password_process.php';
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>

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

  <div class="w-full max-w-md bg-white rounded-xl shadow-md p-8">

    <!-- Header -->
    <div class="text-center mb-6">
      <div class="mx-auto w-14 h-14 bg-accent rounded-xl flex items-center justify-center font-bold text-primary text-xl">
        PK
      </div>
      <h1 class="mt-4 text-2xl font-bold text-primary">PresensiNex</h1>
      <p class="text-sm text-slate-500 mt-1">Silakan reset password anda</p>
    </div>

    <!-- NOTIFIKASI ERROR -->
    <?php if (!empty($errors)): ?>
      <div id="alert-box"
           class="mb-5 rounded-lg border p-4 text-sm transition-opacity duration-500 bg-red-50 border-red-300 text-red-700">
        <?php foreach ($errors as $err) echo $err . "<br>"; ?>
      </div>
    <?php endif; ?>

    <?php if ($success): ?>
      <div class="bg-green-100 text-green-700 p-4 rounded mb-4">
        Password berhasil diubah. Silakan <a href='../login.php' class="underline text-primary">login</a>.
      </div>
    <?php else: ?>
      <!-- FORM RESET PASSWORD -->
      <form method="POST" class="space-y-5">

        <div>
          <label class="block text-sm font-medium text-primary mb-1">Password Baru</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              lock
            </span>
            <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full pl-11 pr-12 rounded-lg border border-slate-300 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Masukkan password baru">
            <button
              type="button"
              id="togglePassword"
              class="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-primary">
              <span id="eyeIcon" class="material-symbols-outlined text-[22px]">visibility</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-primary mb-1">Konfirmasi Password</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              lock
            </span>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              class="w-full pl-11 pr-12 rounded-lg border border-slate-300 px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Konfirmasi password">
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
          Ubah Password
        </button>
      </form>
    <?php endif; ?>

    <p class="text-center text-xs text-slate-500 mt-6">
      © 2026 PresensiNex
    </p>
  </div>

  <!-- SCRIPT -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const alertBox = document.getElementById('alert-box');
      if (alertBox) {
        setTimeout(() => {
          alertBox.classList.add('opacity-0');
          setTimeout(() => alertBox.remove(), 500);
        }, 4000);
      }

      const toggleBtn = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');

      toggleBtn.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        eyeIcon.textContent = isHidden ? 'visibility_off' : 'visibility';
      });
    });
  </script>

</body>
</html>
