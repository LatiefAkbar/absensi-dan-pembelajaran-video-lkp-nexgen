// ============ DATA MASTER ============
const adminData = {
    name: "Super Admin",
    role: "Administrator",
    totalPeserta: 120,
    totalKaryawan: 25,
    totalKursus: 8,
    totalAktivitas: 47
};

// Data Peserta
let pesertaData = [
    { id: "PES-2026-001", name: "Ahmad Fauzi", email: "ahmad@email.com", kursus: "Komputer Dasar", status: "Aktif", tanggalDaftar: "2026-01-15" },
    { id: "PES-2026-002", name: "Budi Santoso", email: "budi@email.com", kursus: "Content Creator", status: "Aktif", tanggalDaftar: "2026-01-16" },
    { id: "PES-2026-003", name: "Citra Dewi", email: "citra@email.com", kursus: "Desain Grafis", status: "Lulus", tanggalDaftar: "2026-01-10" },
    { id: "PES-2026-004", name: "Dedi Pratama", email: "dedi@email.com", kursus: "Digital Marketing", status: "Aktif", tanggalDaftar: "2026-01-20" },
    { id: "PES-2026-005", name: "Eka Putri", email: "eka@email.com", kursus: "Komputer Dasar", status: "Aktif", tanggalDaftar: "2026-01-18" },
    { id: "PES-2026-006", name: "Fajar Ramadan", email: "fajar@email.com", kursus: "Digital Marketing", status: "Nonaktif", tanggalDaftar: "2026-01-12" },
    { id: "PES-2026-007", name: "Gita Maharani", email: "gita@email.com", kursus: "Content Creator", status: "Aktif", tanggalDaftar: "2026-01-22" },
    { id: "PES-2026-008", name: "Hendra Wijaya", email: "hendra@email.com", kursus: "Desain Grafis", status: "Aktif", tanggalDaftar: "2026-01-14" }
];

// Data Karyawan
let karyawanData = [
    { id: "KRY-2026-001", name: "Ekal Arga Fraizy", email: "ekal@nexgen.com", department: "Coach", position: "Coach Komputer", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-002", name: "Faizal Arya Putu Nirmansyah", email: "faizal@nexgen.com", department: "Coach", position: "Coach Content", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-003", name: "Afdhal Fauzan", email: "afdhal@nexgen.com", department: "Coach", position: "Coach Design", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-004", name: "Latif Akbar Maulana", email: "latif@nexgen.com", department: "Coach", position: "Coach Marketing", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-005", name: "Admin NexGen", email: "admin@nexgen.com", department: "Administrasi", position: "Admin", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-006", name: "Staff IT", email: "it@nexgen.com", department: "IT", position: "IT Support", status: "Aktif", joinDate: "2025-01-15" }
];

// Data Kursus
let kursusData = [
    { id: 1, name: "Komputer Dasar", coach: "Ekal Arga Fraizy", level: "Basic", peserta: 25, sesi: 12, progress: 83 },
    { id: 2, name: "Content Creator", coach: "Faizal Arya Putu Nirmansyah", level: "Content", peserta: 20, sesi: 12, progress: 92 },
    { id: 3, name: "Desain Grafis", coach: "Afdhal Fauzan", level: "Design", peserta: 20, sesi: 12, progress: 78 },
    { id: 4, name: "Digital Marketing", coach: "Latif Akbar Maulana", level: "Marketing", peserta: 22, sesi: 12, progress: 88 }
];

// Data Materi
let materiData = [
    { id: 1, kursus: "Komputer Dasar", kategori: "Microsoft Word", judul: "Pengenalan Microsoft Word Dasar", file: "word-dasar.pdf", tanggal: "2026-02-01", status: "Published", ukuran: "2.4 MB", tipe: "pdf" },
    { id: 2, kursus: "Content Creator", kategori: "Fondasi & Strategi Konten", judul: "Membangun Strategi Konten", file: "strategi-konten.mp4", tanggal: "2026-02-02", status: "Published", ukuran: "45 MB", tipe: "video" },
    { id: 3, kursus: "Desain Grafis", kategori: "Canva", judul: "Mendesain dengan Canva", file: "canva-tutorial.zip", tanggal: "2026-02-03", status: "Draft", ukuran: "12 MB", tipe: "archive" }
];

// Data Aktivitas
let aktivitasData = [
    { id: 1, user: "Budi Santoso", action: "Mendaftar kursus", detail: "Digital Marketing", time: "10 menit lalu", icon: "user-plus", color: "emerald" },
    { id: 2, user: "Ekal Arga Fraizy", action: "Input presensi", detail: "Komputer Dasar", time: "30 menit lalu", icon: "calendar-check", color: "blue" },
    { id: 3, user: "Ahmad Fauzi", action: "Mengumpulkan tugas", detail: "Content Creator", time: "1 jam lalu", icon: "tasks", color: "amber" },
    { id: 4, user: "Citra Dewi", action: "Lulus kursus", detail: "Desain Grafis", time: "2 jam lalu", icon: "graduation-cap", color: "purple" }
];

// ============ DATA VIDEO E-LEARNING ============
let videoData = [
    {
        id: 1,
        judul: "Tutorial Python Dasar untuk Pemula",
        deskripsi: "Belajar dasar-dasar pemrograman Python dari nol",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        kategori: "tutorial",
        level: "Pemula",
        durasi: "12:34",
        tags: ["python", "pemrograman", "dasar"],
        uploader: "Admin",
        tanggalUpload: "2026-02-10",
        views: 234,
        status: "published"
    },
    {
        id: 2,
        judul: "Webinar Digital Marketing 2026",
        deskripsi: "Strategi digital marketing terkini",
        url: "https://www.youtube.com/watch?v=123456",
        thumbnail: "https://img.youtube.com/vi/123456/maxresdefault.jpg",
        kategori: "webinar",
        level: "Menengah",
        durasi: "45:22",
        tags: ["marketing", "digital", "webinar"],
        uploader: "Admin",
        tanggalUpload: "2026-02-09",
        views: 567,
        status: "published"
    },
    {
        id: 3,
        judul: "Workshop Desain Grafis dengan Canva",
        deskripsi: "Praktik langsung mendesain dengan Canva",
        url: "https://www.youtube.com/watch?v=789012",
        thumbnail: "https://img.youtube.com/vi/789012/maxresdefault.jpg",
        kategori: "workshop",
        level: "Pemula",
        durasi: "78:15",
        tags: ["canva", "desain", "workshop"],
        uploader: "Admin",
        tanggalUpload: "2026-02-08",
        views: 189,
        status: "published"
    },
    {
        id: 4,
        judul: "Tutorial Excel Advanced",
        deskripsi: "Rumus dan fitur lanjutan Microsoft Excel",
        url: "https://www.youtube.com/watch?v=345678",
        thumbnail: "https://img.youtube.com/vi/345678/maxresdefault.jpg",
        kategori: "tutorial",
        level: "Lanjutan",
        durasi: "25:18",
        tags: ["excel", "office", "advanced"],
        uploader: "Admin",
        tanggalUpload: "2026-02-07",
        views: 412,
        status: "published"
    }
];

// State management
let state = {
    pesertaPage: 1,
    karyawanPage: 1,
    itemsPerPage: 5,
    filteredPeserta: [],
    filteredKaryawan: []
};

// ============ SESSION & LOGIN MANAGEMENT ============
function saveLoginData(userData, role) {
    localStorage.setItem('presensinex_currentUser', JSON.stringify(userData));
    localStorage.setItem('presensinex_userRole', role);
    localStorage.setItem('presensinex_isLoggedIn', 'true');
    localStorage.setItem('presensinex_loginTime', new Date().toISOString());
}

function clearLoginData() {
    localStorage.removeItem('presensinex_currentUser');
    localStorage.removeItem('presensinex_userRole');
    localStorage.removeItem('presensinex_isLoggedIn');
    localStorage.removeItem('presensinex_loginTime');
}

function getLoginData() {
    return {
        currentUser: JSON.parse(localStorage.getItem('presensinex_currentUser')),
        userRole: localStorage.getItem('presensinex_userRole'),
        isLoggedIn: localStorage.getItem('presensinex_isLoggedIn') === 'true'
    };
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen dengan animasi smooth
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1800);

    // Set user data
    document.getElementById('userName').textContent = adminData.name;
    document.getElementById('userAvatar').textContent = getInitials(adminData.name);
    document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
    document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
    document.getElementById('totalKursus').textContent = adminData.totalKursus;
    document.getElementById('totalAktivitas').textContent = adminData.totalAktivitas;
    
    // Welcome message dinamis
    const welcomeElement = document.getElementById('welcomeName');
    if (welcomeElement) {
        welcomeElement.textContent = adminData.name;
    }

    // Setup semua fitur
    setupTabNavigation();
    loadPesertaData();
    loadKaryawanData();
    loadKursusData();
    loadMateriData();
    loadAktivitasData();
    loadRecentUploads();
    loadDropdownPeserta();
    loadDropdownKaryawan();
    setupEventListeners();
    setupUserProfileDropdown();
    setupUploadDropzone();
    
    // Setup E-Learning
    updateELearningTabContent();
    setupELearningTab();
    
    // Filter state
    state.filteredPeserta = [...pesertaData];
    state.filteredKaryawan = [...karyawanData];
});

// ============ UTILITY FUNCTIONS ============
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIconClass(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'pdf': 'fa-file-pdf text-red-400',
        'doc': 'fa-file-word text-blue-400',
        'docx': 'fa-file-word text-blue-400',
        'ppt': 'fa-file-powerpoint text-amber-400',
        'pptx': 'fa-file-powerpoint text-amber-400',
        'mp4': 'fa-file-video text-purple-400',
        'avi': 'fa-file-video text-purple-400',
        'mov': 'fa-file-video text-purple-400',
        'jpg': 'fa-file-image text-pink-400',
        'png': 'fa-file-image text-pink-400',
        'zip': 'fa-file-archive text-gray-400',
        'rar': 'fa-file-archive text-gray-400'
    };
    return icons[ext] || 'fa-file text-gray-400';
}

// ============ SWEET ALERT INTEGRATION ============
function showAlert(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        background: '#1e293b',
        color: '#cbd5e1',
        confirmButtonColor: '#fbbf24',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        customClass: {
            popup: 'rounded-2xl border border-amber-400/30',
            title: 'text-white font-bold',
            confirmButton: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-navy-900 font-semibold px-6 py-2 rounded-lg'
        }
    });
}

function showConfirmation(title, text, confirmCallback) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fbbf24',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        background: '#1e293b',
        color: '#cbd5e1',
        customClass: {
            popup: 'rounded-2xl border border-amber-400/30'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCallback();
        }
    });
}

// ============ TAB NAVIGATION ============
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active class pada button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active class pada pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.classList.add('hidden');
            });
            
            const activePane = document.getElementById(`${tabId}Tab`);
            if (activePane) {
                activePane.classList.remove('hidden');
                activePane.classList.add('active');
                
                // Reload data sesuai tab yang aktif
                switch(tabId) {
                    case 'manage-peserta':
                        loadPesertaData(state.pesertaPage);
                        break;
                    case 'manage-karyawan':
                        loadKaryawanData(state.karyawanPage);
                        break;
                    case 'manage-kursus':
                        loadKursusData();
                        break;
                    case 'upload-materi':
                        loadMateriData();
                        loadRecentUploads();
                        break;
                    case 'akses-dashboard':
                        loadDropdownPeserta();
                        loadDropdownKaryawan();
                        break;
                    case 'e-learning':
                        setTimeout(setupELearningTab, 100);
                        break;
                }
            }
        });
    });
}

function switchTab(tabId) {
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (tabBtn) {
        tabBtn.click();
    }
}

// ============ LOAD DATA PESERTA ============
function loadPesertaData(page = 1, itemsPerPage = 5) {
    const tableBody = document.getElementById('pesertaTableBody');
    const pesertaCount = document.getElementById('pesertaCount');
    const pesertaStart = document.getElementById('pesertaStart');
    const pesertaEnd = document.getElementById('pesertaEnd');
    const currentPageElem = document.getElementById('currentPesertaPage');
    const totalPagesElem = document.getElementById('totalPesertaPages');
    const prevBtn = document.getElementById('prevPesertaBtn');
    const nextBtn = document.getElementById('nextPesertaBtn');
    
    if (!tableBody) return;
    
    const dataToShow = state.filteredPeserta.length > 0 ? state.filteredPeserta : pesertaData;
    const totalPages = Math.ceil(dataToShow.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataToShow.length);
    const currentData = dataToShow.slice(startIndex, endIndex);

    // Update counter
    if (pesertaCount) pesertaCount.textContent = dataToShow.length;
    if (pesertaStart) pesertaStart.textContent = dataToShow.length > 0 ? startIndex + 1 : 0;
    if (pesertaEnd) pesertaEnd.textContent = endIndex;
    if (currentPageElem) currentPageElem.textContent = page;
    if (totalPagesElem) totalPagesElem.textContent = totalPages || 1;
    
    // Update pagination buttons
    if (prevBtn) {
        prevBtn.disabled = page <= 1;
        prevBtn.onclick = () => page > 1 && loadPesertaData(page - 1, itemsPerPage);
    }
    
    if (nextBtn) {
        nextBtn.disabled = page >= totalPages || totalPages === 0;
        nextBtn.onclick = () => page < totalPages && loadPesertaData(page + 1, itemsPerPage);
    }
    
    // Render table
    tableBody.innerHTML = '';
    
    if (currentData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="7" class="text-center py-8 text-gray-500">Tidak ada data peserta</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    currentData.forEach((item) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = getStatusClass(item.status);
        
        row.innerHTML = `
            <td class="font-mono text-xs lg:text-sm">${item.id}</td>
            <td class="font-semibold text-sm">${item.name}</td>
            <td class="hidden md:table-cell text-sm">${item.email}</td>
            <td class="text-sm">${item.kursus}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td class="hidden lg:table-cell text-sm">${formatDate(item.tanggalDaftar)}</td>
            <td>
                <div class="flex items-center gap-2">
                    <button onclick="editPeserta('${item.id}')" class="action-btn edit" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deletePeserta('${item.id}')" class="action-btn delete" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button onclick="viewPeserta('${item.id}')" class="action-btn view" title="Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ============ LOAD DATA KARYAWAN ============
function loadKaryawanData(page = 1, itemsPerPage = 5) {
    const tableBody = document.getElementById('karyawanTableBody');
    const karyawanCount = document.getElementById('karyawanCount');
    const karyawanStart = document.getElementById('karyawanStart');
    const karyawanEnd = document.getElementById('karyawanEnd');
    const currentPageElem = document.getElementById('currentKaryawanPage');
    const totalPagesElem = document.getElementById('totalKaryawanPages');
    const prevBtn = document.getElementById('prevKaryawanBtn');
    const nextBtn = document.getElementById('nextKaryawanBtn');
    
    if (!tableBody) return;
    
    const dataToShow = state.filteredKaryawan.length > 0 ? state.filteredKaryawan : karyawanData;
    const totalPages = Math.ceil(dataToShow.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dataToShow.length);
    const currentData = dataToShow.slice(startIndex, endIndex);

    // Update counter
    if (karyawanCount) karyawanCount.textContent = dataToShow.length;
    if (karyawanStart) karyawanStart.textContent = dataToShow.length > 0 ? startIndex + 1 : 0;
    if (karyawanEnd) karyawanEnd.textContent = endIndex;
    if (currentPageElem) currentPageElem.textContent = page;
    if (totalPagesElem) totalPagesElem.textContent = totalPages || 1;
    
    // Update pagination buttons
    if (prevBtn) {
        prevBtn.disabled = page <= 1;
        prevBtn.onclick = () => page > 1 && loadKaryawanData(page - 1, itemsPerPage);
    }
    
    if (nextBtn) {
        nextBtn.disabled = page >= totalPages || totalPages === 0;
        nextBtn.onclick = () => page < totalPages && loadKaryawanData(page + 1, itemsPerPage);
    }
    
    // Render table
    tableBody.innerHTML = '';
    
    if (currentData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="7" class="text-center py-8 text-gray-500">Tidak ada data karyawan</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    currentData.forEach((item) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = getStatusClass(item.status);
        let deptClass = getDepartmentClass(item.department);
        
        row.innerHTML = `
            <td class="font-mono text-xs lg:text-sm">${item.id}</td>
            <td class="font-semibold text-sm">${item.name}</td>
            <td class="hidden md:table-cell text-sm">${item.email}</td>
            <td><span class="status-badge ${deptClass}">${item.department}</span></td>
            <td class="hidden lg:table-cell text-sm">${item.position}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <div class="flex items-center gap-2">
                    <button onclick="editKaryawan('${item.id}')" class="action-btn edit" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteKaryawan('${item.id}')" class="action-btn delete" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button onclick="viewKaryawan('${item.id}')" class="action-btn view" title="Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ============ LOAD DATA KURSUS ============
function loadKursusData() {
    const kursusContainer = document.getElementById('kursusListContainer');
    if (!kursusContainer) return;
    
    kursusContainer.innerHTML = '';
    
    if (kursusData.length === 0) {
        kursusContainer.innerHTML = '<div class="text-center py-8 text-gray-500">Belum ada kursus</div>';
        return;
    }
    
    kursusData.forEach((kursus, index) => {
        const kursusElement = document.createElement('div');
        kursusElement.className = 'course-card p-5 rounded-xl animate-fade-in-up';
        kursusElement.style.animationDelay = `${index * 0.1}s`;
        
        let levelColor = getLevelClass(kursus.level);
        
        kursusElement.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                    <h3 class="font-bold text-lg text-white mb-2">${kursus.name}</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="text-xs px-3 py-1 ${levelColor} rounded-full">${kursus.level}</span>
                        <span class="text-xs px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full">
                            <i class="fas fa-users mr-1"></i>${kursus.peserta} Peserta
                        </span>
                    </div>
                </div>
                <div class="text-right w-full sm:w-auto">
                    <div class="text-sm text-gray-400">Coach</div>
                    <div class="font-semibold text-amber-400">${kursus.coach}</div>
                </div>
            </div>
            
            <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                    <span class="text-gray-400">Progress Kursus</span>
                    <span class="font-semibold text-white">${kursus.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${kursus.progress}%"></div>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-400">
                    <i class="fas fa-calendar mr-2"></i>${kursus.sesi} Sesi
                </div>
                <div class="flex gap-2">
                    <button onclick="editKursus(${kursus.id})" class="px-4 py-2 bg-amber-400/10 text-amber-400 rounded-lg text-sm hover:bg-amber-400/20 transition-all">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                    <button onclick="deleteKursus(${kursus.id})" class="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-all">
                        <i class="fas fa-trash mr-1"></i>Hapus
                    </button>
                </div>
            </div>
        `;
        
        kursusContainer.appendChild(kursusElement);
    });
}

// ============ LOAD DATA MATERI ============
function loadMateriData() {
    const tableBody = document.getElementById('materiTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (materiData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="6" class="text-center py-8 text-gray-500">Belum ada materi yang diupload</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }
    
    materiData.forEach((materi, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = materi.status === 'Published' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400';
        
        row.innerHTML = `
            <td class="font-semibold text-sm">${materi.kursus}</td>
            <td>
                <div class="font-medium text-white text-sm">${materi.judul}</div>
                <div class="text-xs text-gray-400 mt-1">${materi.kategori}</div>
            </td>
            <td class="hidden md:table-cell">
                <div class="flex items-center gap-2">
                    <i class="fas ${getFileIconClass(materi.file)}"></i>
                    <span class="font-mono text-xs">${materi.file}</span>
                    <span class="text-xs text-gray-500">(${materi.ukuran})</span>
                </div>
            </td>
            <td class="hidden lg:table-cell text-sm">${formatDate(materi.tanggal)}</td>
            <td><span class="status-badge ${statusClass} text-xs">${materi.status}</span></td>
            <td>
                <div class="flex items-center gap-2">
                    <button onclick="previewMateri(${materi.id})" class="action-btn view" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="downloadMateri('${materi.file}')" class="action-btn download" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button onclick="deleteMateri(${materi.id})" class="action-btn delete" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Update statistik
    const statTotalMateri = document.getElementById('statTotalMateri');
    if (statTotalMateri) statTotalMateri.textContent = materiData.length;
}

function loadRecentUploads() {
    const recentContainer = document.getElementById('recentUploads');
    if (!recentContainer) return;
    
    recentContainer.innerHTML = '';
    
    const recentMateri = [...materiData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)).slice(0, 3);
    
    recentMateri.forEach(materi => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg';
        item.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                <i class="fas ${getFileIconClass(materi.file)}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-white truncate">${materi.judul}</div>
                <div class="text-xs text-gray-400">${materi.kursus} • ${formatDate(materi.tanggal)}</div>
            </div>
        `;
        recentContainer.appendChild(item);
    });
}

// ============ LOAD AKTIVITAS ============
function loadAktivitasData() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    aktivitasData.forEach(aktivitas => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon bg-${aktivitas.color}-500/20">
                <i class="fas fa-${aktivitas.icon} text-${aktivitas.color}-400"></i>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="font-semibold text-white text-sm">${aktivitas.user}</span>
                        <span class="text-gray-400 text-sm ml-1">${aktivitas.action}</span>
                    </div>
                    <span class="text-xs text-gray-500">${aktivitas.time}</span>
                </div>
                <p class="text-xs text-gray-400 mt-1">${aktivitas.detail}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// ============ UPLOAD DROPZONE ============
function setupUploadDropzone() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileMateri');
    const fileInfo = document.getElementById('fileInfo');
    
    if (!dropZone || !fileInput) return;
    
    // Click to upload
    dropZone.addEventListener('click', () => fileInput.click());
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            updateFileInfo(file);
        }
    });
    
    // Drag & drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        }, false);
    });
    
    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        
        if (files.length > 0) {
            updateFileInfo(files[0]);
        }
    });
    
    function updateFileInfo(file) {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        fileInfo.innerHTML = `
            <div class="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <i class="fas fa-check-circle text-emerald-400 text-lg"></i>
                <div class="flex-1">
                    <div class="font-medium text-white text-sm">${file.name}</div>
                    <div class="text-xs text-gray-400">${sizeInMB} MB • ${file.type || 'Unknown'}</div>
                </div>
                <button type="button" onclick="removeFile()" class="text-gray-400 hover:text-red-400">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
}

function removeFile() {
    const fileInput = document.getElementById('fileMateri');
    const fileInfo = document.getElementById('fileInfo');
    if (fileInput) fileInput.value = '';
    if (fileInfo) fileInfo.innerHTML = '';
}

function resetFormMateri() {
    const form = document.getElementById('formUploadMateri');
    if (form) form.reset();
    removeFile();
}

// ============ DROPDOWN DATA ============
function loadDropdownPeserta() {
    const selectPeserta = document.getElementById('selectPeserta');
    if (!selectPeserta) return;
    
    selectPeserta.innerHTML = '<option value="">-- Pilih Peserta --</option>';
    pesertaData.forEach(peserta => {
        const option = document.createElement('option');
        option.value = peserta.id;
        option.textContent = `${peserta.name} (${peserta.id}) - ${peserta.kursus}`;
        selectPeserta.appendChild(option);
    });
}

function loadDropdownKaryawan() {
    const selectKaryawan = document.getElementById('selectKaryawan');
    if (!selectKaryawan) return;
    
    selectKaryawan.innerHTML = '<option value="">-- Pilih Karyawan --</option>';
    karyawanData.forEach(karyawan => {
        const option = document.createElement('option');
        option.value = karyawan.id;
        option.textContent = `${karyawan.name} (${karyawan.id}) - ${karyawan.department}`;
        selectKaryawan.appendChild(option);
    });
}


function aksesDashboardPeserta(type) {
    let peserta;
    
    if (type === 'semua') {
        peserta = pesertaData[0];
        if (peserta) {
            const loginData = {
                type: 'peserta',
                id: peserta.id,
                name: peserta.name,
                email: peserta.email,
                kursus: peserta.kursus,
                status: peserta.status,
                tanggalDaftar: peserta.tanggalDaftar,
                loginTime: new Date().toISOString(),
                mode: 'admin_access'
            };
            
            saveLoginData(loginData, 'peserta');
            localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
            window.open('participant.html', '_blank');
            showAlert('success', 'Dashboard Peserta', 'Membuka dashboard peserta...');
        }
    } else if (type === 'presensi') {
        peserta = pesertaData[0];
        if (peserta) {
            const loginData = {
                type: 'peserta',
                id: peserta.id,
                name: peserta.name,
                email: peserta.email,
                kursus: peserta.kursus,
                status: peserta.status,
                tanggalDaftar: peserta.tanggalDaftar,
                loginTime: new Date().toISOString(),
                mode: 'admin_access',
                redirect: 'presensi'
            };
            
            saveLoginData(loginData, 'peserta');
            localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
            window.open('participant.html?page=presensi', '_blank');
            showAlert('success', 'Dashboard Presensi', 'Membuka halaman presensi...');
        }
    }
}


function aksesDashboardKaryawan(type) {
    let karyawan;
    
    if (type === 'semua') {
        karyawan = karyawanData[0];
        if (karyawan) {
            const loginData = {
                type: 'karyawan',
                id: karyawan.id,
                name: karyawan.name,
                email: karyawan.email,
                department: karyawan.department,
                position: karyawan.position,
                status: karyawan.status,
                joinDate: karyawan.joinDate,
                loginTime: new Date().toISOString(),
                mode: 'admin_access'
            };
            
            saveLoginData(loginData, 'karyawan');
            localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
            window.open('employee.html', '_blank');
            showAlert('success', 'Dashboard Karyawan', 'Membuka dashboard karyawan...');
        }
    } else if (type === 'presensi') {
        karyawan = karyawanData.find(k => k.department === 'Coach') || karyawanData[0];
        if (karyawan) {
            const loginData = {
                type: 'karyawan',
                id: karyawan.id,
                name: karyawan.name,
                email: karyawan.email,
                department: karyawan.department,
                position: karyawan.position,
                status: karyawan.status,
                joinDate: karyawan.joinDate,
                loginTime: new Date().toISOString(),
                mode: 'admin_access',
                redirect: 'input-presensi'
            };
            
            saveLoginData(loginData, 'karyawan');
            localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
            window.open('employee.html?page=presensi', '_blank');
            showAlert('success', 'Input Presensi', 'Membuka halaman input presensi...');
        }
    }
}


function loginSebagaiPeserta() {
    const select = document.getElementById('selectPeserta');
    const selectedId = select?.value;
    
    if (!selectedId) {
        showAlert('warning', 'Peringatan', 'Silakan pilih peserta terlebih dahulu');
        return;
    }
    
    const peserta = pesertaData.find(p => p.id === selectedId);
    if (peserta) {
        const loginData = {
            type: 'peserta',
            id: peserta.id,
            name: peserta.name,
            email: peserta.email,
            kursus: peserta.kursus,
            status: peserta.status,
            tanggalDaftar: peserta.tanggalDaftar,
            loginTime: new Date().toISOString(),
            mode: 'admin_access'
        };
        
        saveLoginData(loginData, 'peserta');
        localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
        
        showAlert('success', 'Login Berhasil', `Selamat datang, ${peserta.name}`);
        
        setTimeout(() => {
            window.location.href = 'participant.html';
        }, 1000);
    }
}


function loginSebagaiKaryawan() {
    const select = document.getElementById('selectKaryawan');
    const selectedId = select?.value;
    
    if (!selectedId) {
        showAlert('warning', 'Peringatan', 'Silakan pilih karyawan terlebih dahulu');
        return;
    }
    
    const karyawan = karyawanData.find(k => k.id === selectedId);
    if (karyawan) {
        const loginData = {
            type: 'karyawan',
            id: karyawan.id,
            name: karyawan.name,
            email: karyawan.email,
            department: karyawan.department,
            position: karyawan.position,
            status: karyawan.status,
            joinDate: karyawan.joinDate,
            loginTime: new Date().toISOString(),
            mode: 'admin_access'
        };
        
        saveLoginData(loginData, 'karyawan');
        localStorage.setItem('presensinex_temp_user', JSON.stringify(loginData));
        
        showAlert('success', 'Login Berhasil', `Selamat datang, ${karyawan.name}`);
        
        setTimeout(() => {
            window.location.href = 'employee.html';
        }, 1000);
    }
}

// ============ FILTER FUNCTIONS ============
function filterPeserta() {
    const searchTerm = document.getElementById('searchPeserta')?.value.toLowerCase() || '';
    const kursusFilter = document.getElementById('filterKursusPeserta')?.value || '';
    const statusFilter = document.getElementById('filterStatusPeserta')?.value || '';
    
    state.filteredPeserta = pesertaData.filter(peserta => {
        const matchSearch = searchTerm === '' || 
            peserta.name.toLowerCase().includes(searchTerm) || 
            peserta.email.toLowerCase().includes(searchTerm) ||
            peserta.id.toLowerCase().includes(searchTerm);
        
        const matchKursus = kursusFilter === '' || peserta.kursus === kursusFilter;
        const matchStatus = statusFilter === '' || peserta.status === statusFilter;
        
        return matchSearch && matchKursus && matchStatus;
    });
    
    state.pesertaPage = 1;
    loadPesertaData(1);
    
    showAlert('success', 'Filter Diterapkan', `${state.filteredPeserta.length} peserta ditemukan`);
}

function resetFilterPeserta() {
    document.getElementById('searchPeserta').value = '';
    document.getElementById('filterKursusPeserta').value = '';
    document.getElementById('filterStatusPeserta').value = '';
    
    state.filteredPeserta = [...pesertaData];
    state.pesertaPage = 1;
    loadPesertaData(1);
    
    showAlert('info', 'Filter Direset', 'Menampilkan semua peserta');
}

function filterKaryawan() {
    const searchTerm = document.getElementById('searchKaryawan')?.value.toLowerCase() || '';
    const deptFilter = document.getElementById('filterDepartment')?.value || '';
    const statusFilter = document.getElementById('filterStatusKaryawan')?.value || '';
    
    state.filteredKaryawan = karyawanData.filter(karyawan => {
        const matchSearch = searchTerm === '' || 
            karyawan.name.toLowerCase().includes(searchTerm) || 
            karyawan.email.toLowerCase().includes(searchTerm) ||
            karyawan.id.toLowerCase().includes(searchTerm);
        
        const matchDept = deptFilter === '' || karyawan.department === deptFilter;
        const matchStatus = statusFilter === '' || karyawan.status === statusFilter;
        
        return matchSearch && matchDept && matchStatus;
    });
    
    state.karyawanPage = 1;
    loadKaryawanData(1);
    
    showAlert('success', 'Filter Diterapkan', `${state.filteredKaryawan.length} karyawan ditemukan`);
}

// ============ CRUD OPERATIONS ============
function tambahPeserta() {
    const modal = document.getElementById('tambahPesertaModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }
}

function editPeserta(id) {
    const peserta = pesertaData.find(p => p.id === id);
    if (peserta) {
        showAlert('info', 'Edit Mode', `Mengedit data: ${peserta.name}`);
    }
}

function deletePeserta(id) {
    showConfirmation('Hapus Peserta', 'Apakah Anda yakin ingin menghapus peserta ini?', () => {
        pesertaData = pesertaData.filter(p => p.id !== id);
        state.filteredPeserta = state.filteredPeserta.filter(p => p.id !== id);
        adminData.totalPeserta--;
        document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
        loadPesertaData(state.pesertaPage);
        showAlert('success', 'Berhasil!', 'Peserta berhasil dihapus');
    });
}

function viewPeserta(id) {
    const peserta = pesertaData.find(p => p.id === id);
    if (peserta) {
        Swal.fire({
            title: peserta.name,
            html: `
                <div class="text-left space-y-2">
                    <p><strong>ID:</strong> ${peserta.id}</p>
                    <p><strong>Email:</strong> ${peserta.email}</p>
                    <p><strong>Kursus:</strong> ${peserta.kursus}</p>
                    <p><strong>Status:</strong> ${peserta.status}</p>
                    <p><strong>Tanggal Daftar:</strong> ${formatDate(peserta.tanggalDaftar)}</p>
                </div>
            `,
            icon: 'info',
            background: '#1e293b',
            color: '#cbd5e1',
            confirmButtonColor: '#fbbf24'
        });
    }
}

function tambahKaryawan() {
    const modal = document.getElementById('tambahKaryawanModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }
}

function editKaryawan(id) {
    const karyawan = karyawanData.find(k => k.id === id);
    if (karyawan) {
        showAlert('info', 'Edit Mode', `Mengedit data: ${karyawan.name}`);
    }
}

function deleteKaryawan(id) {
    showConfirmation('Hapus Karyawan', 'Apakah Anda yakin ingin menghapus karyawan ini?', () => {
        karyawanData = karyawanData.filter(k => k.id !== id);
        state.filteredKaryawan = state.filteredKaryawan.filter(k => k.id !== id);
        adminData.totalKaryawan--;
        document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
        loadKaryawanData(state.karyawanPage);
        showAlert('success', 'Berhasil!', 'Karyawan berhasil dihapus');
    });
}

function viewKaryawan(id) {
    const karyawan = karyawanData.find(k => k.id === id);
    if (karyawan) {
        Swal.fire({
            title: karyawan.name,
            html: `
                <div class="text-left space-y-2">
                    <p><strong>ID:</strong> ${karyawan.id}</p>
                    <p><strong>Email:</strong> ${karyawan.email}</p>
                    <p><strong>Departemen:</strong> ${karyawan.department}</p>
                    <p><strong>Posisi:</strong> ${karyawan.position}</p>
                    <p><strong>Status:</strong> ${karyawan.status}</p>
                    <p><strong>Bergabung:</strong> ${formatDate(karyawan.joinDate)}</p>
                </div>
            `,
            icon: 'info',
            background: '#1e293b',
            color: '#cbd5e1',
            confirmButtonColor: '#fbbf24'
        });
    }
}

function tambahKursus() {
    const modal = document.getElementById('tambahKursusModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }
}

function editKursus(id) {
    showAlert('info', 'Edit Mode', `Mengedit kursus ID: ${id}`);
}

function deleteKursus(id) {
    showConfirmation('Hapus Kursus', 'Apakah Anda yakin ingin menghapus kursus ini?', () => {
        kursusData = kursusData.filter(k => k.id !== id);
        adminData.totalKursus--;
        document.getElementById('totalKursus').textContent = adminData.totalKursus;
        loadKursusData();
        showAlert('success', 'Berhasil!', 'Kursus berhasil dihapus');
    });
}


function previewMateri(id) {
    const materi = materiData.find(m => m.id === id);
    if (materi) {
        showAlert('info', 'Preview Materi', `Membuka: ${materi.judul}`);
    }
}

function downloadMateri(filename) {
    showAlert('success', 'Download', `Mengunduh: ${filename}`);
    setTimeout(() => {
        showAlert('success', 'Download Selesai', `File ${filename} berhasil diunduh`);
    }, 1500);
}

function deleteMateri(id) {
    showConfirmation('Hapus Materi', 'Apakah Anda yakin ingin menghapus materi ini?', () => {
        materiData = materiData.filter(m => m.id !== id);
        loadMateriData();
        loadRecentUploads();
        showAlert('success', 'Berhasil!', 'Materi berhasil dihapus');
    });
}

function filterMateri() {
    const searchTerm = document.getElementById('searchMateri')?.value.toLowerCase() || '';
    
    if (searchTerm === '') {
        loadMateriData();
        return;
    }
    
    const filteredMateri = materiData.filter(m => 
        m.judul.toLowerCase().includes(searchTerm) || 
        m.kursus.toLowerCase().includes(searchTerm) ||
        m.kategori.toLowerCase().includes(searchTerm)
    );
    
    const tableBody = document.getElementById('materiTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (filteredMateri.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">Materi tidak ditemukan</td></tr>';
        return;
    }
    
    filteredMateri.forEach(materi => {
        const row = document.createElement('tr');
        let statusClass = materi.status === 'Published' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400';
        
        row.innerHTML = `
        `;
        tableBody.appendChild(row);
    });
    
    showAlert('info', 'Pencarian', `${filteredMateri.length} materi ditemukan`);
}

// ============ SYSTEM FUNCTIONS ============
function generateLaporan() {
    showAlert('info', 'Generate Laporan', 'Membuat laporan bulanan...');
    setTimeout(() => {
        showAlert('success', 'Berhasil!', 'Laporan bulanan siap diunduh');
    }, 2000);
}

function backupDatabase() {
    showAlert('info', 'Backup Database', 'Membuat backup database...');
    setTimeout(() => {
        showAlert('success', 'Berhasil!', 'Database berhasil di-backup');
    }, 2000);
}

function restoreDatabase() {
    showAlert('info', 'Restore Database', 'Fitur restore akan segera tersedia');
}

function exportData(type) {
    showAlert('success', 'Export Data', `Data ${type} berhasil diexport`);
}

function importData(type) {
    showAlert('info', 'Import Data', `Fitur import data ${type} akan segera tersedia`);
}

function exportAllData() {
    showAlert('success', 'Export Semua Data', 'Data berhasil diexport ke Excel');
}

function refreshAktivitas() {
    loadAktivitasData();
    showAlert('success', 'Refresh', 'Aktivitas terbaru dimuat');
}


function loadVideoData(filterKategori = 'all', filterLevel = '') {
    const videoGrid = document.getElementById('videoGrid');
    const totalVideoCount = document.getElementById('totalVideoCount');
    
    if (!videoGrid) return;
    
    // Filter video
    let filteredVideos = [...videoData];
    
    if (filterKategori !== 'all') {
        filteredVideos = filteredVideos.filter(v => v.kategori === filterKategori);
    }
    
    if (filterLevel) {
        filteredVideos = filteredVideos.filter(v => v.level === filterLevel);
    }
    
    
    const sortBy = document.getElementById('sortVideo')?.value || 'terbaru';
    if (sortBy === 'terbaru') {
        filteredVideos.sort((a, b) => new Date(b.tanggalUpload) - new Date(a.tanggalUpload));
    } else if (sortBy === 'terpopuler') {
        filteredVideos.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'a-z') {
        filteredVideos.sort((a, b) => a.judul.localeCompare(b.judul));
    }
    
    if (totalVideoCount) {
        totalVideoCount.textContent = filteredVideos.length;
    }
    
    videoGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        videoGrid.innerHTML = `

        `;
        videoGrid.appendChild(videoCard);
    };
    
    // Update statistik kategori
    updateVideoStats();
}

// Filter Video berdasarkan Kategori
function filterVideoCategory(category) {
    // Update active class
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    const levelFilter = document.getElementById('filterVideoLevel')?.value || '';
    loadVideoData(category, levelFilter);
    
    showAlert('info', 'Filter Video', `Menampilkan kategori: ${category === 'all' ? 'Semua Video' : category}`);
}

// Filter Video berdasarkan Level
function applyVideoFilter() {
    const categoryBtn = document.querySelector('.category-btn.active');
    const category = categoryBtn ? 
        (categoryBtn.textContent.includes('Semua') ? 'all' : 
         categoryBtn.textContent.toLowerCase().split(' ')[0]) : 'all';
    const levelFilter = document.getElementById('filterVideoLevel')?.value || '';
    
    loadVideoData(category, levelFilter);
    showAlert('info', 'Filter Diterapkan', 'Video telah difilter');
}

// Sort Video
function sortVideo() {
    const categoryBtn = document.querySelector('.category-btn.active');
    const category = categoryBtn ? 
        (categoryBtn.textContent.includes('Semua') ? 'all' : 
         categoryBtn.textContent.toLowerCase().split(' ')[0]) : 'all';
    const levelFilter = document.getElementById('filterVideoLevel')?.value || '';
    
    loadVideoData(category, levelFilter);
}

// Search Video
function searchVideo() {
    const searchTerm = document.getElementById('searchVideo')?.value.toLowerCase() || '';
    
    if (searchTerm === '') {
        loadVideoData('all', '');
        return;
    }
    
    const filteredVideos = videoData.filter(v => 
        v.judul.toLowerCase().includes(searchTerm) || 
        v.deskripsi.toLowerCase().includes(searchTerm) ||
        v.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    videoGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        videoGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-4xl text-gray-600 mb-3"></i>
                <h4 class="text-lg font-semibold text-white mb-2">Video Tidak Ditemukan</h4>
                <p class="text-gray-400">Coba dengan kata kunci lain</p>
            </div>
        `;
        return;
    }
    
    filteredVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card group';
        videoCard.innerHTML = `...`; 
        videoGrid.appendChild(videoCard);
    });
    
    showAlert('info', 'Pencarian', `${filteredVideos.length} video ditemukan`);
}

// Upload Video Baru
function uploadVideoBaru(event) {
    event.preventDefault();
    
    const videoUrl = document.getElementById('videoUrl')?.value;
    const videoTitle = document.getElementById('videoTitle')?.value;
    const videoCategory = document.getElementById('videoCategory')?.value;
    const videoLevel = document.getElementById('videoLevel')?.value;
    const videoDescription = document.getElementById('videoDescription')?.value || '';
    const videoTags = document.getElementById('videoTags')?.value || '';
    const thumbnailUrl = document.getElementById('thumbnailUrl')?.value || '';
    
    if (!videoUrl || !videoTitle || !videoCategory || !videoLevel) {
        showAlert('error', 'Error', 'Harap isi semua field yang wajib');
        return;
    }
    
    
    let finalThumbnail = thumbnailUrl;
    if (!finalThumbnail && videoUrl.includes('youtube.com')) {
        const videoId = extractYouTubeId(videoUrl);
        if (videoId) {
            finalThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    }
    
    const durasi = `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`;
    
    // Buat video baru
    const newVideo = {
        id: videoData.length > 0 ? Math.max(...videoData.map(v => v.id)) + 1 : 1,
        judul: videoTitle,
        deskripsi: videoDescription,
        url: videoUrl,
        thumbnail: finalThumbnail || 'https://via.placeholder.com/640x360/1e293b/ffffff?text=PresensiNex+Video',
        kategori: videoCategory,
        level: videoLevel,
        durasi: durasi,
        tags: videoTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        uploader: adminData.name,
        tanggalUpload: new Date().toISOString().split('T')[0],
        views: 0,
        status: 'published'
    };
    
    videoData.unshift(newVideo);
    
    // Reload video grid
    loadVideoData('all', '');
    
    // Update statistik
    updateVideoStats();
    
    // Tutup modal
    tutupModal('uploadVideoModal');
    
    // Reset form
    document.getElementById('formUploadVideo')?.reset();
    
    showAlert('success', 'Berhasil!', 'Video berhasil diupload dan akan muncul di dashboard E-Learning');
    
    
    setTimeout(() => {
        switchTab('e-learning');
    }, 1500);
}


function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function playVideo(videoId) {
    const video = videoData.find(v => v.id === videoId);
    if (video) {
        
        video.views++;
        
    
        localStorage.setItem('presensinex_current_video', JSON.stringify(video));
        
        Swal.fire({
            title: video.judul,
            html: `
            `,
            background: '#1e293b',
            color: '#cbd5e1',
            width: '800px',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: {
                popup: 'rounded-2xl border border-amber-400/30'
            }
        });
        
        
        updateVideoStats();
    }
}

function editVideo(id) {
    const video = videoData.find(v => v.id === id);
    if (video) {
        showAlert('info', 'Edit Video', `Fitur edit untuk video "${video.judul}" akan segera tersedia`);
    }
}


function deleteVideo(id) {
    showConfirmation('Hapus Video', 'Apakah Anda yakin ingin menghapus video ini?', () => {
        videoData = videoData.filter(v => v.id !== id);
        loadVideoData('all', '');
        updateVideoStats();
        showAlert('success', 'Berhasil!', 'Video berhasil dihapus');
    });
}

function updateVideoStats() {
    const totalVideoSpan = document.getElementById('totalVideoCount');
    
    if (totalVideoSpan) {
        totalVideoSpan.textContent = videoData.length;
    }
    

    const tutorialCount = videoData.filter(v => v.kategori === 'tutorial').length;
    const webinarCount = videoData.filter(v => v.kategori === 'webinar').length;
    const workshopCount = videoData.filter(v => v.kategori === 'workshop').length;
    
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes('tutorial')) {
            const span = btn.querySelector('span:last-child');
            if (span) span.textContent = tutorialCount;
        } else if (text.includes('webinar')) {
            const span = btn.querySelector('span:last-child');
            if (span) span.textContent = webinarCount;
        } else if (text.includes('workshop')) {
            const span = btn.querySelector('span:last-child');
            if (span) span.textContent = workshopCount;
        }
    });
}
function getKategoriIcon(kategori) {
    const icons = {
        'tutorial': 'code',
        'webinar': 'users',
        'workshop': 'tools'
    };
    return icons[kategori] || 'video';
}

function formatViews(views) {
    if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views;
}

function openVideoUploadModal() {
    const modal = document.getElementById('uploadVideoModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }
}

function setupELearningTab() {
    loadVideoData('all', '');
    updateVideoStats();
    
    
    const searchInput = document.getElementById('searchVideo');
    if (searchInput) {
        
        searchInput.removeEventListener('input', debounceSearch);
        searchInput.addEventListener('input', debounceSearch);
    }
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debounceSearch = debounce(searchVideo, 500);


function updateELearningTabContent() {
    const eLearningTab = document.getElementById('e-learningTab');
    if (!eLearningTab) return;
    
    eLearningTab.innerHTML = `
    `;
}

function tutupModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    }
}


function getStatusClass(status) {
    const classes = {
        'Aktif': 'bg-emerald-500/20 text-emerald-400',
        'Lulus': 'bg-blue-500/20 text-blue-400',
        'Nonaktif': 'bg-red-500/20 text-red-400',
        'Cuti': 'bg-amber-500/20 text-amber-400'
    };
    return classes[status] || 'bg-gray-500/20 text-gray-400';
}

function getDepartmentClass(department) {
    const classes = {
        'Coach': 'bg-purple-500/20 text-purple-400',
        'IT': 'bg-blue-500/20 text-blue-400',
        'Administrasi': 'bg-gray-500/20 text-gray-400',
        'HRD': 'bg-pink-500/20 text-pink-400',
        'Marketing': 'bg-emerald-500/20 text-emerald-400',
        'Finance': 'bg-amber-500/20 text-amber-400'
    };
    return classes[department] || 'bg-gray-500/20 text-gray-400';
}

function getLevelClass(level) {
    const classes = {
        'Basic': 'bg-blue-500/20 text-blue-400',
        'Content': 'bg-emerald-500/20 text-emerald-400',
        'Design': 'bg-pink-500/20 text-pink-400',
        'Marketing': 'bg-amber-500/20 text-amber-400',
        'Intermediate': 'bg-purple-500/20 text-purple-400',
        'Advanced': 'bg-red-500/20 text-red-400'
    };
    return classes[level] || 'bg-gray-500/20 text-gray-400';
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
    // Logout
    const logoutBtn = document.getElementById('logoutDropdownBtn');
    const confirmLogout = document.getElementById('confirmLogout');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('logoutModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('show');
            }
        });
    }
    
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            clearLoginData();
            showAlert('success', 'Logout', 'Anda telah logout dari sistem');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
    
    // Form submissions
    const formTambahPeserta = document.getElementById('formTambahPeserta');
    if (formTambahPeserta) {
        formTambahPeserta.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newId = `PES-2026-${(pesertaData.length + 1).toString().padStart(3, '0')}`;
            
            const newPeserta = {
                id: newId,
                name: formData.get('nama') || 'Peserta Baru',
                email: formData.get('email') || 'email@example.com',
                kursus: formData.get('kursus') || 'Komputer Dasar',
                status: 'Aktif',
                tanggalDaftar: new Date().toISOString().split('T')[0]
            };
            
            pesertaData.unshift(newPeserta);
            state.filteredPeserta.unshift(newPeserta);
            adminData.totalPeserta++;
            document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
            
            loadPesertaData(1);
            tutupModal('tambahPesertaModal');
            showAlert('success', 'Berhasil!', 'Peserta baru berhasil ditambahkan');
            this.reset();
        });
    }
    
    const formTambahKaryawan = document.getElementById('formTambahKaryawan');
    if (formTambahKaryawan) {
        formTambahKaryawan.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newId = `KRY-2026-${(karyawanData.length + 1).toString().padStart(3, '0')}`;
            
            const newKaryawan = {
                id: newId,
                name: formData.get('nama') || 'Karyawan Baru',
                email: formData.get('email') || 'karyawan@nexgen.com',
                department: formData.get('departemen') || 'Administrasi',
                position: formData.get('posisi') || 'Staff',
                status: 'Aktif',
                joinDate: formData.get('tanggal') || new Date().toISOString().split('T')[0]
            };
            
            karyawanData.unshift(newKaryawan);
            state.filteredKaryawan.unshift(newKaryawan);
            adminData.totalKaryawan++;
            document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
            
            loadKaryawanData(1);
            tutupModal('tambahKaryawanModal');
            showAlert('success', 'Berhasil!', 'Karyawan baru berhasil ditambahkan');
            this.reset();
        });
    }
    
    const formTambahKursus = document.getElementById('formTambahKursus');
    if (formTambahKursus) {
        formTambahKursus.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newId = kursusData.length > 0 ? Math.max(...kursusData.map(k => k.id)) + 1 : 1;
            
            const newKursus = {
                id: newId,
                name: formData.get('nama') || 'Kursus Baru',
                coach: formData.get('coach') || 'Coach',
                level: formData.get('level') || 'Basic',
                peserta: parseInt(formData.get('kapasitas') || '20'),
                sesi: 12,
                progress: 0
            };
            
            kursusData.unshift(newKursus);
            adminData.totalKursus++;
            document.getElementById('totalKursus').textContent = adminData.totalKursus;
            
            loadKursusData();
            tutupModal('tambahKursusModal');
            showAlert('success', 'Berhasil!', 'Kursus baru berhasil ditambahkan');
            this.reset();
        });
    }
    
    const formUploadMateri = document.getElementById('formUploadMateri');
    if (formUploadMateri) {
        formUploadMateri.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const kursus = document.getElementById('selectKursusMateri')?.value;
            const kategori = document.getElementById('selectJenisMateri')?.value;
            const judul = document.getElementById('judulMateri')?.value;
            const sesi = document.getElementById('sesiMateri')?.value;
            const fileInput = document.getElementById('fileMateri');
            
            if (!kursus || !kategori || !judul || !sesi || !fileInput?.files[0]) {
                showAlert('error', 'Error', 'Harap isi semua field yang wajib');
                return;
            }
            
            const file = fileInput.files[0];
            const newId = materiData.length > 0 ? Math.max(...materiData.map(m => m.id)) + 1 : 1;
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            
            materiData.unshift({
                id: newId,
                kursus: kursus,
                kategori: kategori,
                judul: judul,
                file: file.name,
                ukuran: `${sizeInMB} MB`,
                tanggal: new Date().toISOString().split('T')[0],
                status: 'Published',
                tipe: file.type.split('/')[0]
            });
            
            loadMateriData();
            loadRecentUploads();
            resetFormMateri();
            showAlert('success', 'Berhasil!', 'Materi berhasil diupload');
        });
    }
    
    const formUploadVideo = document.getElementById('formUploadVideo');
    if (formUploadVideo) {
        formUploadVideo.addEventListener('submit', uploadVideoBaru);
    }
}

function setupUserProfileDropdown() {
    const userProfile = document.getElementById('userProfile');
    
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
        });
        
        document.addEventListener('click', function() {
            const dropdown = document.querySelector('.dropdown-menu');
            if (dropdown && !dropdown.classList.contains('hidden')) {
                dropdown.classList.add('hidden');
            }
        });
    }
}

        window.adminData = {
            name: "Super Admin",
            role: "Administrator",
            totalPeserta: 120,
            totalKaryawan: 25,
            totalKursus: 8,
            totalAktivitas: 47
        };

function clearAllLoginData() {
    const keysToRemove = [
        'presensinex_currentUser',
        'presensinex_userRole', 
        'presensinex_isLoggedIn',
        'presensinex_loginTime',
        'presensinex_temp_user',
        'presensinex_current_video'
    ];
    
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
    

    sessionStorage.clear();
    
    console.log(' Semua data login telah dibersihkan');
}


function prosesLogout() {

    clearAllLoginData();
    

    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: 'Logout Berhasil',
            text: 'Anda telah keluar dari sistem',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#1e293b',
            color: '#cbd5e1',
            customClass: {
                popup: 'rounded-2xl border border-amber-400/30'
            }
        });
    } else {
        alert('Logout berhasil! Anda akan dialihkan...');
    }
    

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}


function tampilkanModalLogout() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
    } else {

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Konfirmasi Logout',
                text: 'Apakah Anda yakin ingin keluar dari sistem?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#fbbf24',
                cancelButtonColor: '#ef4444',
                confirmButtonText: 'Ya, Logout',
                cancelButtonText: 'Batal',
                background: '#1e293b',
                color: '#cbd5e1',
                customClass: {
                    popup: 'rounded-2xl border border-amber-400/30'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    prosesLogout();
                }
            });
        } else {
            const confirmLogout = confirm('Apakah Anda yakin ingin logout?');
            if (confirmLogout) {
                prosesLogout();
            }
        }
    }
}

function setupEventListenersYangBenar() {
    console.log('Setup event listeners...');
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        
        logoutBtn.removeEventListener('click', handleLogoutClick);
        
        logoutBtn.addEventListener('click', handleLogoutClick);
        console.log(' Event listener logout button dipasang');
    } else {
        console.warn(' Tombol logout tidak ditemukan!');
    }
    
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    if (confirmLogoutBtn) {
        confirmLogoutBtn.removeEventListener('click', handleConfirmLogout);
        confirmLogoutBtn.addEventListener('click', handleConfirmLogout);
        console.log(' Event listener confirm logout dipasang');
    }
    
    
    const closeModalBtn = document.querySelector('#logoutModal .modal-header button');
    if (closeModalBtn) {
        closeModalBtn.removeEventListener('click', closeModalHandler);
        closeModalBtn.addEventListener('click', closeModalHandler);
    }
}


function handleLogoutClick(e) {
    e.preventDefault();
    e.stopPropagation();
    tampilkanModalLogout();
}

function handleConfirmLogout(e) {
    e.preventDefault();
    e.stopPropagation();
    
    
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    }
    
    
    prosesLogout();
}
function closeModalHandler(e) {
    e.preventDefault();
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('show');
        modal.classList.add('hidden');
    }
}

window.setupEventListeners = function() {
    setupEventListenersYangBenar();
    

}
window.clearLoginData = function() {
    clearAllLoginData();
};

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupEventListenersYangBenar();
    }, 100); 
});


window.addEventListener('load', function() {
    setupEventListenersYangBenar();
});
document.addEventListener('DOMContentLoaded', function() {

    setupTabNavigation();
    loadPesertaData();
    loadKaryawanData();
    setupEventListenersYangBenar();
});

window.adminData = adminData;
window.pesertaData = pesertaData;
window.karyawanData = karyawanData;
window.kursusData = kursusData;
window.materiData = materiData;
window.videoData = videoData;
window.state = state;

// Export functions ke global scope
window.tambahPeserta = tambahPeserta;
window.editPeserta = editPeserta;
window.deletePeserta = deletePeserta;
window.viewPeserta = viewPeserta;
window.tambahKaryawan = tambahKaryawan;
window.editKaryawan = editKaryawan;
window.deleteKaryawan = deleteKaryawan;
window.viewKaryawan = viewKaryawan;
window.tambahKursus = tambahKursus;
window.editKursus = editKursus;
window.deleteKursus = deleteKursus;
window.previewMateri = previewMateri;
window.downloadMateri = downloadMateri;
window.deleteMateri = deleteMateri;
window.resetFormMateri = resetFormMateri;
window.removeFile = removeFile;
window.filterPeserta = filterPeserta;
window.resetFilterPeserta = resetFilterPeserta;
window.filterKaryawan = filterKaryawan;
window.filterMateri = filterMateri;
window.loginSebagaiPeserta = loginSebagaiPeserta;
window.loginSebagaiKaryawan = loginSebagaiKaryawan;
window.aksesDashboardPeserta = aksesDashboardPeserta;
window.aksesDashboardKaryawan = aksesDashboardKaryawan;
window.generateLaporan = generateLaporan;
window.backupDatabase = backupDatabase;
window.restoreDatabase = restoreDatabase;
window.exportData = exportData;
window.importData = importData;
window.exportAllData = exportAllData;
window.refreshAktivitas = refreshAktivitas;
window.switchTab = switchTab;
window.tutupModal = tutupModal;
window.showAlert = showAlert;
window.filterVideoCategory = filterVideoCategory;
window.applyVideoFilter = applyVideoFilter;
window.playVideo = playVideo;
window.editVideo = editVideo;
window.deleteVideo = deleteVideo;
window.uploadVideoBaru = uploadVideoBaru;
window.openVideoUploadModal = openVideoUploadModal;
window.sortVideo = sortVideo;
window.searchVideo = searchVideo;
window.loadVideoData = loadVideoData;

console.log('PresensiNex Dashboard Admin loaded successfully!');