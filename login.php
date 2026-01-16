<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login</title>
  <script src="https://cdn.tailwindcss.com"></script>

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
      <p class="text-sm text-slate-500 mt-1">Silakan login untuk melanjutkan</p>
    </div>

    <!-- NOTIFIKASI ERROR -->
    <?php if (isset($_GET['error'])): ?>
      <div id="login-alert"
        class="mb-5 rounded-lg border p-4 text-sm transition-opacity duration-500
        <?= $_GET['error'] === 'invalid'
          ? 'bg-red-50 border-red-300 text-red-700'
          : 'bg-yellow-50 border-yellow-300 text-yellow-700' ?>">
        <?= $_GET['error'] === 'invalid'
          ? 'Email atau password salah'
          : 'Harap isi email dan password terlebih dahulu.' ?>
      </div>
    <?php endif; ?>

    <!-- FORM -->
    <form action="auth/login_process.php" method="POST" class="space-y-5">

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-primary mb-1">Email</label>
        <input
          type="email"
          name="email"
          class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required>
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-primary mb-1">Password</label>

        <div class="relative">
          <input
            type="password"
            id="password"
            name="password"
            class="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required>

          <!-- Eye -->
          <button
            type="button"
            id="togglePassword"
            class="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-primary">
            👁️
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
        Login
      </button>
    </form>

    <p class="text-center text-xs text-slate-500 mt-6">
      © 2026 PresensiNex
    </p>
  </div>

  <!-- SCRIPT (AMAN & TERPISAH) -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {

      /* ===== AUTO HIDE POPUP ===== */
      const alertBox = document.getElementById('login-alert');
      if (alertBox) {
        setTimeout(() => {
          alertBox.classList.add('opacity-0');
          setTimeout(() => alertBox.remove(), 500);
        }, 3000);
      }

      /* ===== TOGGLE PASSWORD ===== */
      const toggleBtn = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password');

      if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
          passwordInput.type =
            passwordInput.type === 'password' ? 'text' : 'password';
        });
      }

    });
  </script>

</body>
</html>
