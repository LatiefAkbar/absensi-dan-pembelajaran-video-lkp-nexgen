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
      <h1 class="mt-4 text-2xl font-bold text-primary">
        PresensiNex
      </h1>
      <p class="text-sm text-slate-500 mt-1">
        Silakan login untuk melanjutkan
      </p>
    </div>

    <!-- NOTIFIKASI ERROR -->
    <?php if (isset($_GET['error'])): ?>
      <?php if ($_GET['error'] === 'invalid'): ?>
        <div id="login-alert"
             class="mb-5 rounded-lg bg-red-50 border border-red-300 p-4 text-sm text-red-700 transition-opacity duration-500">
          Email atau password salah
        </div>
      <?php elseif ($_GET['error'] === 'kosong'): ?>
        <div id="login-alert"
             class="mb-5 rounded-lg bg-yellow-50 border border-yellow-300 p-4 text-sm text-yellow-700 transition-opacity duration-500">
          Harap isi email dan password terlebih dahulu.
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <!-- FORM -->
    <form action="auth/login_process.php" method="POST" class="space-y-5">

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-primary mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="nama@email.com"
          class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <!-- Password + Eye Icon -->
      <div>
        <label class="block text-sm font-medium text-primary mb-1">
          Password
        </label>

        <div class="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            class="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />

          <!-- Eye Button -->
          <button
            type="button"
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-primary"
          >
            <svg id="eye-open" xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                       c4.478 0 8.268 2.943 9.542 7
                       -1.274 4.057-5.064 7-9.542 7
                       -4.477 0-8.268-2.943-9.542-7z"/>
            </svg>

            <svg id="eye-closed" xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19
                       c-4.478 0-8.268-2.943-9.543-7
                       a9.956 9.956 0 012.317-3.592"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.18 6.18A9.957 9.957 0 0112 5
                       c4.478 0 8.268 2.943 9.543 7
                       a9.97 9.97 0 01-4.132 5.411"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15 12a3 3 0 00-3-3"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 3l18 18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
      >
        Login
      </button>
    </form>

    <p class="text-center text-xs text-slate-500 mt-6">
      © 2026 PresensiNex
    </p>
  </div>

  <!-- JS -->
  <script>
    function togglePassword() {
      const password = document.getElementById('password');
      const eyeOpen = document.getElementById('eye-open');
      const eyeClosed = document.getElementById('eye-closed');

      if (password.type === 'password') {
        password.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
      } else {
        password.type = 'password';
        eyeClosed.classList.add('hidden');
        eyeOpen.classList.remove('hidden');
      }
    }
  </script>

</body>
</html>
