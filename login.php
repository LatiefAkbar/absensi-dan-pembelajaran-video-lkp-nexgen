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
             class="mb-5 rounded-lg bg-red-50 border border-red-300 p-4 text-sm text-red-700
                    transition-opacity duration-500">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"/>
            </svg>
            <span>Email atau password salah</span>
          </div>
        </div>

      <?php elseif ($_GET['error'] === 'kosong'): ?>
        <div id="login-alert"
             class="mb-5 rounded-lg bg-yellow-50 border border-yellow-300 p-4 text-sm text-yellow-700
                    transition-opacity duration-500">
          Harap isi email dan password terlebih dahulu.
        </div>
      <?php endif; ?>
    <?php endif; ?>

    <!-- FORM POST -->
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

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-primary mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <!-- Options -->
      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            name="remember"
            value="1"
            class="rounded border-slate-300 text-primary focus:ring-primary"
          />
          Ingatkan saya
        </label>

        <a href="lupa-password.php" class="text-primary hover:underline font-medium">
          Lupa password?
        </a>
      </div>

      <!-- Button -->
      <button
        type="submit"
        name="login"
        class="w-full bg-primary text-white py-3 rounded-lg font-semibold
               hover:bg-blue-900 transition"
      >
        Login
      </button>

    </form>

    <!-- Footer -->
    <p class="text-center text-xs text-slate-500 mt-6">
      © 2026 PresensiNex
    </p>

  </div>

  <!-- AUTO HIDE ALERT -->
  <script>
    const alertBox = document.getElementById('login-alert');

    if (alertBox) {
      setTimeout(() => {
        alertBox.classList.add('opacity-0');

        setTimeout(() => {
          alertBox.remove();
        }, 500);
      }, 3000);
    }
  </script>

</body>
</html>
