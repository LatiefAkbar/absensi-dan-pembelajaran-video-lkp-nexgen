// Data diambil dari PHP via window.phpData
const userData = window.phpData.userData;
const coursesData = window.phpData.coursesData;
let presensiData = window.phpData.presensiData;
const tasksData = window.phpData.tasksData;
const scheduleData = window.phpData.scheduleData;
const materialsByCourse = window.phpData.materialsByCourse;

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  if (!sessionStorage.getItem("loadingShown")) {
    loadingScreen.classList.remove("hidden");
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      document;
    }, 1500);

    sessionStorage.setItem("loadingShown", "true");
  } else {
    loadingScreen.style.display = "none";
  }
  setupTabNavigation();
  setupMaterialDropdowns();
  setupTaskFilters();
  setupEventListeners();
  initTheme();
});

function setupTabNavigation() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");

      // Update tab buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update tab panes
      tabPanes.forEach((pane) => {
        pane.classList.remove("active");
        pane.classList.add("hidden");
      });

      const activePane = document.getElementById(`${tabId}Tab`);
      if (activePane) {
        activePane.classList.remove("hidden");
        activePane.classList.add("active");
      }
    });
  });
}

function setupMaterialDropdowns() {
  const dropdownBtns = document.querySelectorAll(".material-dropdown-btn");

  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.closest(".material-dropdown");
      const content = dropdown.querySelector(".material-dropdown-content");
      const icon = btn.querySelector(".fa-chevron-down");

      content.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");

      // Close other dropdowns
      dropdownBtns.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          const otherDropdown = otherBtn.closest(".material-dropdown");
          const otherContent = otherDropdown.querySelector(
            ".material-dropdown-content",
          );
          const otherIcon = otherBtn.querySelector(".fa-chevron-down");

          otherContent.classList.add("hidden");
          otherIcon.classList.remove("rotate-180");
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".material-dropdown-content")
      .forEach((content) => {
        content.classList.add("hidden");
      });
    document
      .querySelectorAll(".material-dropdown-btn .fa-chevron-down")
      .forEach((icon) => {
        icon.classList.remove("rotate-180");
      });
  });
}

function setupTaskFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      filterTasks(filter);
    });
  });
}

function filterTasks(filter = "all") {
  const rows = document.querySelectorAll("#taskTableBody tr");
  let visibleCount = 0;

  rows.forEach((row) => {
    if (row.querySelector("td")) {
      // Skip empty row
      const status = row.getAttribute("data-status");
      if (filter === "all" || status === filter) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    }
  });

  // Update count
  const taskCountElement = document.getElementById("taskCount");
  if (taskCountElement) {
    taskCountElement.textContent = visibleCount;
  }
}

function getMaterialsForCourse(courseName) {
  const course = coursesData.find((c) => c.nama_kursus === courseName);
  if (!course) return [];

  return materialsByCourse[course.id] || [];
}

function getFileIconJS(fileType) {
  const icons = {
    pdf: "fa-file-pdf text-red-500",
    zip: "fa-file-archive text-yellow-500",
    video: "fa-file-video text-blue-500",
    doc: "fa-file-word text-blue-400",
    xls: "fa-file-excel text-emerald-400",
    ppt: "fa-file-powerpoint text-orange-400",
  };

  const iconClass = icons[fileType] || "fa-file text-gray-400";
  return `<i class="fas ${iconClass} text-2xl"></i>`;
}

function submitPresensi() {
  const form = document.getElementById("presensiForm");
  const formData = new FormData(form);

  // alert loading
  showAlert(
    "info",
    "Memproses...",
    `<div class="flex items-center gap-3">
            <i class="fas fa-spinner fa-spin text-yellow-500 text-xl"></i>
            <div class="text-white font-bold">
                Menyimpan presensi...
            </div>
        </div>`,
  );

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        showAlert(
          "success",
          "Berhasil!",
          `<div class="flex items-center gap-3">
                    <i class="fas fa-check text-emerald-500 text-xl"></i>
                    <div class="text-white font-bold">
                        Presensi berhasil disimpan
                    </div>
                </div>`,
        );

        form.reset();

        refreshPresensiTable();
      } else {
        showAlert(
          "error",
          "Gagal",
          `<div class="text-white">
                    ${data.message || "Terjadi kesalahan"}
                </div>`,
        );
      }
    })
    .catch(() => {
      showAlert(
        "error",
        "Error",
        `<div class="text-white">
                Koneksi bermasalah
            </div>`,
      );
    });
}

function refreshPresensiTable() {
  fetch(window.location.href)
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const newTbody = doc.querySelector("#presensiTableBody").innerHTML;

      document.querySelector("#presensiTableBody").innerHTML = newTbody;
    });
}

function downloadMaterial(materialId, courseName, materialName) {
  const materials = getMaterialsForCourse(courseName);
  const material = materials.find((m) => m.id == materialId);

  if (!material) {
    showAlert("error", "Gagal", "Materi tidak ditemukan");
    return;
  }

  // Update download count (simulasi frontend)
  material.downloads = (material.downloads || 0) + 1;

  showAlert(
    "info",
    "Mengunduh...",
    `<div class="flex items-center gap-3">
            <i class="fas fa-download text-yellow-500 text-xl"></i>
            <div>
                <div class="font-bold text-white">${materialName}</div>
                <div class="text-sm text-gray-300">${material.ukuran} • ${material.tipe_file.toUpperCase()}</div>
            </div>
        </div>`,
  );

  // Simulasi download
  setTimeout(() => {
    const link = document.createElement("a");
    link.href = material.file_url || "#";
    link.download = `${materialName.replace(/[^a-z0-9]/gi, "_")}.${material.tipe_file}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAlert(
      "success",
      "Berhasil!",
      `<div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <i class="fas fa-check text-white"></i>
                </div>
                <div>
                    <div class="font-bold text-white">${materialName}</div>
                    <div class="text-sm text-gray-300">Berhasil diunduh • ${material.ukuran}</div>
                </div>
            </div>`,
    );
  }, 1500);
}

function submitTask(taskId) {
  const task = tasksData.find((t) => t.id == taskId);
  if (task && (task.status === "pending" || task.status === "overdue")) {
    // Konfirmasi sebelum submit
    if (confirm("Apakah Anda yakin ingin mengumpulkan tugas ini?")) {
      // Update status (hanya frontend untuk demo)
      task.status = "submitted";
      task.tanggal_kumpul = new Date().toISOString().split("T")[0];

      // Update pending tasks count
      const pendingTasks = tasksData.filter(
        (t) => t.status === "pending" || t.status === "overdue",
      ).length;
      document.getElementById("pendingTasks").textContent = pendingTasks;

      // Refresh filter
      const activeFilter =
        document
          .querySelector(".filter-btn.active")
          ?.getAttribute("data-filter") || "all";
      filterTasks(activeFilter);

      showAlert(
        "success",
        "Berhasil!",
        "Tugas berhasil dikumpulkan. Menunggu penilaian coach.",
      );
    }
  }
}

function getCoachByCourse(courseName) {
  const course = coursesData.find((c) => c.nama_kursus === courseName);
  return course ? course.coach_name : "Unknown";
}

// Fungsi untuk menampilkan alert
function showAlert(icon, title, text) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl ${
    icon === "success"
      ? "bg-emerald-900/90 border border-emerald-700"
      : icon === "error"
        ? "bg-red-900/90 border border-red-700"
        : "bg-blue-900/90 border border-blue-700"
  }`;
  alertDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${icon === "success" ? "check-circle" : icon === "error" ? "exclamation-circle" : "info-circle"} 
                mr-3 text-${icon === "success" ? "emerald" : icon === "error" ? "red" : "blue"}-400 text-xl"></i>
            <div>
                <div class="font-bold text-white">${title}</div>
                <div class="text-gray-300 text-sm">${text}</div>
            </div>
        </div>
    `;

  document.body.appendChild(alertDiv);

  // Hapus alert setelah 3 detik
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Form presensi validation
  const presensiForm = document.getElementById("presensiForm");
  if (presensiForm) {
    presensiForm.addEventListener("submit", function (e) {
      const course = document.getElementById("inputCourse").value;
      const materi = document.getElementById("inputMateri").value;
      const sesi = document.getElementById("inputSesi").value;

      if (!course || !materi || !sesi) {
        e.preventDefault();
        showAlert(
          "error",
          "Data tidak lengkap",
          "Harap isi semua field yang diperlukan",
        );
      }
    });
  }
}

// Fungsi untuk toggle tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light-mode", savedTheme === "light");
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light-mode");
  const theme = isLight ? "light" : "dark";
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector(".theme-icon.sun");
  const moonIcon = document.querySelector(".theme-icon.moon");

  if (theme === "light") {
    sunIcon?.classList.remove("hidden");
    moonIcon?.classList.add("hidden");
    sunIcon?.classList.add("text-yellow-500");
  } else {
    sunIcon?.classList.add("hidden");
    moonIcon?.classList.remove("hidden");
    moonIcon?.classList.add("text-blue-300");
  }
}

// Fungsi format tanggal untuk JavaScript
function formatDate(dateString) {
  if (dateString === "-" || !dateString || dateString === "0000-00-00")
    return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
