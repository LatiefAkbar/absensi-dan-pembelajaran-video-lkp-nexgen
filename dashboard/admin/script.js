
const adminData = {
    name: "Super Admin",
    role: "Administrator",
    totalPeserta: 120,
    totalKaryawan: 25,
    totalKursus: 8,
    totalAktivitas: 47
};

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

let karyawanData = [
    { id: "KRY-2026-001", name: "Ekal Arga Fraizy", email: "ekal@nexgen.com", department: "Coach", position: "Coach Komputer", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-002", name: "Faizal Arya Putu Nirmansyah", email: "faizal@nexgen.com", department: "Coach", position: "Coach Content", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-003", name: "Afdhal Fauzan", email: "afdhal@nexgen.com", department: "Coach", position: "Coach Design", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-004", name: "Latif Akbar Maulana", email: "latif@nexgen.com", department: "Coach", position: "Coach Marketing", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-005", name: "Admin NexGen", email: "admin@nexgen.com", department: "Administrasi", position: "Admin", status: "Aktif", joinDate: "2025-01-01" },
    { id: "KRY-2026-006", name: "Staff IT", email: "it@nexgen.com", department: "IT", position: "IT Support", status: "Aktif", joinDate: "2025-01-15" }
];

let kursusData = [
    { id: 1, name: "Komputer Dasar", coach: "Ekal Arga Fraizy", level: "Basic", peserta: 25, sesi: 12, progress: 83 },
    { id: 2, name: "Content Creator", coach: "Faizal Arya Putu Nirmansyah", level: "Content", peserta: 20, sesi: 12, progress: 92 },
    { id: 3, name: "Desain Grafis", coach: "Afdhal Fauzan", level: "Design", peserta: 20, sesi: 12, progress: 83 },
    { id: 4, name: "Digital Marketing", coach: "Latif Akbar Maulana", level: "Marketing", peserta: 22, sesi: 12, progress: 92 }
];

//  Kursus
let materiData = [
    { id: 1, kursus: "Komputer Dasar", materi: "Microsoft Word", judul: "Pengenalan Microsoft Word Dasar", file: "word-dasar.pdf", tanggal: "2026-02-01", status: "Published" },
    { id: 2, kursus: "Content Creator", materi: "Fondasi & Strategi Konten", judul: "Membangun Strategi Konten yang Efektif", file: "strategi-konten.mp4", tanggal: "2026-02-02", status: "Published" },
    { id: 3, kursus: "Desain Grafis", materi: "Canva", judul: "Mendesain dengan Canva untuk Pemula", file: "canva-tutorial.zip", tanggal: "2026-02-03", status: "Draft" }
];

// pagination
let state = {
    pesertaPage: 1,
    karyawanPage: 1,
    itemsPerPage: 5
};

// ==================== SISTEM LOGIN ====================
function saveLoginData(userData, role) {
    localStorage.setItem('presensinex_currentUser', JSON.stringify(userData));
    localStorage.setItem('presensinex_userRole', role);
    localStorage.setItem('presensinex_isLoggedIn', 'true');
    localStorage.setItem('presensinex_loginTime', new Date().toISOString());
}

// menghapus data login
function clearLoginData() {
    localStorage.removeItem('presensinex_currentUser');
    localStorage.removeItem('presensinex_userRole');
    localStorage.removeItem('presensinex_isLoggedIn');
    localStorage.removeItem('presensinex_loginTime');
}

//  mendapatkan data login
function getLoginData() {
    return {
        currentUser: JSON.parse(localStorage.getItem('presensinex_currentUser')),
        userRole: localStorage.getItem('presensinex_userRole'),
        isLoggedIn: localStorage.getItem('presensinex_isLoggedIn') === 'true'
    };
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);

    // Set user data
    document.getElementById('userName').textContent = adminData.name;
    document.getElementById('userAvatar').textContent = adminData.name.split(' ').map(n => n[0]).join('');
    document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
    document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
    document.getElementById('totalKursus').textContent = adminData.totalKursus;
    document.getElementById('totalAktivitas').textContent = adminData.totalAktivitas;

    setupTabNavigation();
    loadPesertaData();
    loadKaryawanData();
    loadKursusData();
    loadMateriData();
    setupEventListeners();
    setupUserProfileDropdown();
});

// ==================== NAVIGATION ====================
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.classList.add('hidden');
            });
            
            const activePane = document.getElementById(`${tabId}Tab`);
            if (activePane) {
                activePane.classList.remove('hidden');
                activePane.classList.add('active');
                switch(tabId) {
                    case 'manage-peserta':
                        loadPesertaData();
                        break;
                    case 'manage-karyawan':
                        loadKaryawanData();
                        break;
                    case 'manage-kursus':
                        loadKursusData();
                        break;
                    case 'upload-materi':
                        loadMateriData();
                        loadDropdownPeserta();
                        loadDropdownKaryawan();
                        break;
                    case 'akses-dashboard':
                        loadDropdownPeserta();
                        loadDropdownKaryawan();
                        break;
                }
            }
        });
    });
}

function loadPesertaData(page = 1, itemsPerPage = 5) {
    const tableBody = document.getElementById('pesertaTableBody');
    const pesertaCount = document.getElementById('pesertaCount');
    const currentPageElem = document.getElementById('currentPesertaPage');
    const totalPagesElem = document.getElementById('totalPesertaPages');
    const prevBtn = document.getElementById('prevPesertaBtn');
    const nextBtn = document.getElementById('nextPesertaBtn');
    
    const totalPages = Math.ceil(pesertaData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = pesertaData.slice(startIndex, endIndex);

    pesertaCount.textContent = pesertaData.length;
    currentPageElem.textContent = page;
    totalPagesElem.textContent = totalPages;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
    
    prevBtn.onclick = () => page > 1 && loadPesertaData(page - 1, itemsPerPage);
    nextBtn.onclick = () => page < totalPages && loadPesertaData(page + 1, itemsPerPage);
    
    tableBody.innerHTML = '';
    
    currentData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = '';
        switch(item.status) {
            case 'Aktif': statusClass = 'bg-emerald-500/20 text-emerald-400'; break;
            case 'Lulus': statusClass = 'bg-blue-500/20 text-blue-400'; break;
            case 'Nonaktif': statusClass = 'bg-red-500/20 text-red-400'; break;
        }
        
        row.innerHTML = `
            <td class="font-mono text-sm">${item.id}</td>
            <td class="font-semibold">${item.name}</td>
            <td>${item.email}</td>
            <td>${item.kursus}</td>
            <td><span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">${item.status}</span></td>
            <td>${formatDate(item.tanggalDaftar)}</td>
            <td>
                <button onclick="editPeserta('${item.id}')" class="text-blue-400 hover:text-blue-300 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePeserta('${item.id}')" class="text-red-400 hover:text-red-300">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadKaryawanData(page = 1, itemsPerPage = 5) {
    const tableBody = document.getElementById('karyawanTableBody');
    const karyawanCount = document.getElementById('karyawanCount');
    const currentPageElem = document.getElementById('currentKaryawanPage');
    const totalPagesElem = document.getElementById('totalKaryawanPages');
    const prevBtn = document.getElementById('prevKaryawanBtn');
    const nextBtn = document.getElementById('nextKaryawanBtn');
    
    const totalPages = Math.ceil(karyawanData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = karyawanData.slice(startIndex, endIndex);

    karyawanCount.textContent = karyawanData.length;
    currentPageElem.textContent = page;
    totalPagesElem.textContent = totalPages;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
    
    prevBtn.onclick = () => page > 1 && loadKaryawanData(page - 1, itemsPerPage);
    nextBtn.onclick = () => page < totalPages && loadKaryawanData(page + 1, itemsPerPage);
    
    tableBody.innerHTML = '';
    
    currentData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = '';
        switch(item.status) {
            case 'Aktif': statusClass = 'bg-emerald-500/20 text-emerald-400'; break;
            case 'Nonaktif': statusClass = 'bg-red-500/20 text-red-400'; break;
            case 'Cuti': statusClass = 'bg-amber-500/20 text-amber-400'; break;
        }
        
        let deptClass = '';
        switch(item.department) {
            case 'Coach': deptClass = 'bg-purple-500/20 text-purple-400'; break;
            case 'IT': deptClass = 'bg-blue-500/20 text-blue-400'; break;
            case 'Administrasi': deptClass = 'bg-gray-500/20 text-gray-400'; break;
        }
        
        row.innerHTML = `
            <td class="font-mono text-sm">${item.id}</td>
            <td class="font-semibold">${item.name}</td>
            <td>${item.email}</td>
            <td><span class="px-3 py-1 text-xs font-semibold rounded-full ${deptClass}">${item.department}</span></td>
            <td>${item.position}</td>
            <td><span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">${item.status}</span></td>
            <td>${formatDate(item.joinDate)}</td>
            <td>
                <button onclick="editKaryawan('${item.id}')" class="text-blue-400 hover:text-blue-300 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteKaryawan('${item.id}')" class="text-red-400 hover:text-red-300">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadKursusData() {
    const kursusContainer = document.querySelector('#manage-kursusTab .space-y-4');
    if (!kursusContainer) return;
    
    kursusContainer.innerHTML = '';
    
    kursusData.forEach((kursus, index) => {
        const kursusElement = document.createElement('div');
        kursusElement.className = 'course-card p-5 rounded-xl animate-fade-in-up';
        kursusElement.style.animationDelay = `${index * 0.1}s`;
        
        let levelColor = '';
        switch(kursus.level) {
            case 'Basic': levelColor = 'bg-blue-500/20 text-blue-400'; break;
            case 'Content': levelColor = 'bg-emerald-500/20 text-emerald-400'; break;
            case 'Design': levelColor = 'bg-pink-500/20 text-pink-400'; break;
            case 'Marketing': levelColor = 'bg-amber-500/20 text-amber-400'; break;
        }
        
        kursusElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="font-bold text-lg text-white mb-1">${kursus.name}</h3>
                    <span class="text-xs px-2 py-1 ${levelColor} rounded">${kursus.level}</span>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-400">Coach</div>
                    <div class="font-semibold text-blue-300">${kursus.coach}</div>
                </div>
            </div>
            
            <div class="mb-4">
                <div class="flex justify-between text-sm mb-2">
                    <span class="text-gray-400">Progress</span>
                    <span class="font-semibold text-white">${kursus.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${kursus.progress}%"></div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="text-center p-2 bg-gray-800/50 rounded-lg">
                    <div class="text-emerald-400 font-bold">${kursus.peserta}</div>
                    <div class="text-xs text-gray-400">Peserta</div>
                </div>
                <div class="text-center p-2 bg-gray-800/50 rounded-lg">
                    <div class="text-blue-400 font-bold">${kursus.sesi}</div>
                    <div class="text-xs text-gray-400">Sesi</div>
                </div>
            </div>
            
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-400">
                    <i class="fas fa-info-circle mr-2"></i>
                    ID: KURS-${kursus.id.toString().padStart(3, '0')}
                </div>
                <div class="flex gap-2">
                    <button onclick="editKursus(${kursus.id})" class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30">
                        <i class="fas fa-edit mr-1"></i>Edit
                    </button>
                    <button onclick="deleteKursus(${kursus.id})" class="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30">
                        <i class="fas fa-trash mr-1"></i>Hapus
                    </button>
                </div>
            </div>
        `;
        
        kursusContainer.appendChild(kursusElement);
    });
}

// ==================== UPLOAD MATERI ====================
function loadMateriData() {
    const tableBody = document.getElementById('materiTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    materiData.forEach((materi, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        
        let statusClass = materi.status === 'Published' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400';
        
        row.innerHTML = `
            <td class="font-semibold">${materi.kursus}</td>
            <td>
                <div class="font-medium text-white">${materi.materi}</div>
                <div class="text-xs text-gray-400">${materi.judul}</div>
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <i class="fas fa-file ${getFileIconClass(materi.file)}"></i>
                    <span class="font-mono text-sm">${materi.file}</span>
                </div>
            </td>
            <td>${formatDate(materi.tanggal)}</td>
            <td><span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">${materi.status}</span></td>
            <td>
                <button onclick="previewMateri(${materi.id})" class="text-blue-400 hover:text-blue-300 mr-2" title="Preview">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="downloadMateri('${materi.file}')" class="text-emerald-400 hover:text-emerald-300 mr-2" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button onclick="deleteMateri(${materi.id})" class="text-red-400 hover:text-red-300" title="Hapus">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getFileIconClass(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    switch(ext) {
        case 'pdf': return 'text-red-400';
        case 'doc': case 'docx': return 'text-blue-400';
        case 'ppt': case 'pptx': return 'text-amber-400';
        case 'mp4': case 'avi': return 'text-purple-400';
        case 'zip': case 'rar': return 'text-gray-400';
        case 'jpg': case 'png': return 'text-pink-400';
        default: return 'text-gray-400';
    }
}

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
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('dragover');
    }
    
    function unhighlight() {
        dropZone.classList.remove('dragover');
    }
    
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
            <div class="flex items-center gap-2 text-emerald-400">
                <i class="fas fa-check-circle"></i>
                <span class="font-medium">${file.name}</span>
                <span class="text-gray-400">(${sizeInMB} MB)</span>
            </div>
        `;
    }
}

function resetFormMateri() {
    document.getElementById('formUploadMateri').reset();
    document.getElementById('fileInfo').innerHTML = '';
}

function previewMateri(id) {
    const materi = materiData.find(m => m.id === id);
    if (materi) {
        showAlert('info', 'Preview Materi', `Membuka materi: ${materi.judul}`);
    }
}

function downloadMateri(filename) {
    showAlert('success', 'Download', `Mengunduh file: ${filename}`);
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function deleteMateri(id) {
    if (confirm('Apakah Anda yakin ingin menghapus materi ini?')) {
        materiData = materiData.filter(m => m.id !== id);
        loadMateriData();
        showAlert('success', 'Berhasil!', 'Materi berhasil dihapus');
    }
}


function loadDropdownPeserta() {
    const selectPeserta = document.getElementById('selectPeserta');
    if (!selectPeserta) return;
    
    selectPeserta.innerHTML = '<option value="">Pilih Peserta</option>';
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
    
    selectKaryawan.innerHTML = '<option value="">Pilih Karyawan</option>';
    karyawanData.forEach(karyawan => {
        const option = document.createElement('option');
        option.value = karyawan.id;
        option.textContent = `${karyawan.name} (${karyawan.id}) - ${karyawan.department}`;
        selectKaryawan.appendChild(option);
    });
}

function loginSebagaiPeserta() {
    const select = document.getElementById('selectPeserta');
    const selectedId = select.value;
    
    if (!selectedId) {
        showAlert('error', 'Peringatan', 'Silakan pilih peserta terlebih dahulu');
        return;
    }
    
    const peserta = pesertaData.find(p => p.id === selectedId);
    if (peserta) {
        // Simpan data login peserta
        const loginData = {
            type: 'peserta',
            id: peserta.id,
            name: peserta.name,
            email: peserta.email,
            kursus: peserta.kursus,
            status: peserta.status,
            tanggalDaftar: peserta.tanggalDaftar,
            loginTime: new Date().toISOString()
        };
        
        saveLoginData(loginData, 'peserta');
        
        showAlert('success', 'Login Berhasil', `Login sebagai ${peserta.name}`);
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function loginSebagaiKaryawan() {
    const select = document.getElementById('selectKaryawan');
    const selectedId = select.value;
    
    if (!selectedId) {
        showAlert('error', 'Peringatan', 'Silakan pilih karyawan terlebih dahulu');
        return;
    }
    
    const karyawan = karyawanData.find(k => k.id === selectedId);
    if (karyawan) {
        // Simpan data login karyawan
        const loginData = {
            type: 'karyawan',
            id: karyawan.id,
            name: karyawan.name,
            email: karyawan.email,
            department: karyawan.department,
            position: karyawan.position,
            status: karyawan.status,
            joinDate: karyawan.joinDate,
            loginTime: new Date().toISOString()
        };
        
        saveLoginData(loginData, 'karyawan');
        
        showAlert('success', 'Login Berhasil', `Login sebagai ${karyawan.name}`);
        setTimeout(() => {
            window.location.href = 'karyawan.html'; // Asumsi dashboard karyawan menggunakan index.html yang sama
        }, 1000);
    }
}

// Fungsi untuk akses cepat
function aksesDashboardPeserta(type) {
    // Gunakan peserta pertama sebagai demo
    const peserta = pesertaData[0];
    if (peserta) {
        const loginData = {
            type: 'peserta',
            id: peserta.id,
            name: peserta.name,
            email: peserta.email,
            kursus: peserta.kursus,
            status: peserta.status,
            tanggalDaftar: peserta.tanggalDaftar,
            loginTime: new Date().toISOString()
        };
        
        saveLoginData(loginData, 'peserta');
        
        // Redirect langsung ke dashboard peserta
        window.location.href = 'indexpeserta.html';
    }
}

function aksesDashboardKaryawan(type) {
    // Gunakan karyawan pertama sebagai demo
    const karyawan = karyawanData[0];
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
            loginTime: new Date().toISOString()
        };
        
        saveLoginData(loginData, 'karyawan');
        
        // Redirect langsung ke dashboard karyawan
        window.location.href = 'index.html';
    }
}

// ==================== CRUD OPERATIONS ====================
function tambahPeserta() {
    const modal = document.getElementById('tambahPesertaModal');
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function editPeserta(id) {
    const peserta = pesertaData.find(p => p.id === id);
    if (peserta) {
        showAlert('info', 'Edit Mode', `Edit data peserta: ${peserta.name}`);
    }
}

function deletePeserta(id) {
    if (confirm(`Apakah Anda yakin ingin menghapus peserta ${id}?`)) {
        pesertaData = pesertaData.filter(p => p.id !== id);
        adminData.totalPeserta--;
        document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
        loadPesertaData(state.pesertaPage);
        showAlert('success', 'Berhasil!', 'Peserta berhasil dihapus');
    }
}

function tambahKaryawan() {
    const modal = document.getElementById('tambahKaryawanModal');
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function editKaryawan(id) {
    const karyawan = karyawanData.find(k => k.id === id);
    if (karyawan) {
        showAlert('info', 'Edit Mode', `Edit data karyawan: ${karyawan.name}`);
    }
}

function deleteKaryawan(id) {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan ${id}?`)) {
        karyawanData = karyawanData.filter(k => k.id !== id);
        adminData.totalKaryawan--;
        document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
        loadKaryawanData(state.karyawanPage);
        showAlert('success', 'Berhasil!', 'Karyawan berhasil dihapus');
    }
}

function tambahKursus() {
    const modal = document.getElementById('tambahKursusModal');
    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function editKursus(id) {
    showAlert('info', 'Edit Mode', `Edit data kursus ID: ${id}`);
}

function deleteKursus(id) {
    if (confirm(`Apakah Anda yakin ingin menghapus kursus ini?`)) {
        kursusData = kursusData.filter(k => k.id !== id);
        adminData.totalKursus--;
        document.getElementById('totalKursus').textContent = adminData.totalKursus;
        loadKursusData();
        showAlert('success', 'Berhasil!', 'Kursus berhasil dihapus');
    }
}

function tutupModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    modal.classList.add('hidden');
}

// ==================== UTILITY FUNCTIONS ====================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function showAlert(icon, title, text) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
        icon === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
        icon === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
        'bg-gradient-to-r from-blue-500 to-cyan-500'
    }`;
    alertDiv.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${
                icon === 'success' ? 'fa-check-circle' :
                icon === 'error' ? 'fa-exclamation-circle' :
                'fa-info-circle'
            } text-white text-xl"></i>
            <span class="text-white font-medium">${title}: ${text}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        alertDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Logout
    const logoutBtn = document.getElementById('logoutDropdownBtn');
    const cancelLogout = document.getElementById('cancelLogout');
    const confirmLogout = document.getElementById('confirmLogout');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('logoutModal').classList.remove('hidden');
            document.getElementById('logoutModal').classList.add('show');
        });
    }
    
    if (cancelLogout) {
        cancelLogout.addEventListener('click', () => {
            document.getElementById('logoutModal').classList.remove('show');
            document.getElementById('logoutModal').classList.add('hidden');
        });
    }
    
    if (confirmLogout) {
        confirmLogout.addEventListener('click', () => {
            // Hapus semua data login
            clearLoginData();
            
            showAlert('info', 'Logout', 'Anda telah logout dari sistem');
            setTimeout(() => {
                // Redirect ke halaman login (jika ada) atau tetap di halaman ini
                window.location.href = 'login.html';
            }, 1500);
        });
    }
    
    // Setup upload dropzone
    setupUploadDropzone();
    
    // Handle form upload materi
    const formUploadMateri = document.getElementById('formUploadMateri');
    if (formUploadMateri) {
        formUploadMateri.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const kursus = document.getElementById('selectKursusMateri').value;
            const materi = document.getElementById('selectJenisMateri').value;
            const judul = document.getElementById('judulMateri').value;
            const sesi = document.getElementById('sesiMateri').value;
            const deskripsi = document.getElementById('deskripsiMateri').value;
            const fileInput = document.getElementById('fileMateri');
            
            if (!kursus || !materi || !judul || !sesi || !fileInput.files[0]) {
                showAlert('error', 'Error', 'Harap isi semua field yang wajib');
                return;
            }
            
            const file = fileInput.files[0];
            const newId = materiData.length > 0 ? Math.max(...materiData.map(m => m.id)) + 1 : 1;
            
            materiData.unshift({
                id: newId,
                kursus: kursus,
                materi: materi,
                judul: judul,
                file: file.name,
                tanggal: new Date().toISOString().split('T')[0],
                status: 'Published'
            });
            
            loadMateriData();
            resetFormMateri();
            showAlert('success', 'Berhasil!', 'Materi berhasil diupload');
        });
    }
}

function setupUserProfileDropdown() {
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            userProfile.classList.remove('active');
        });
    }
}

// ==================== FORM SUBMISSION HANDLERS ====================
document.getElementById('formTambahPeserta')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const newId = `PES-2026-${(pesertaData.length + 1).toString().padStart(3, '0')}`;
    
    pesertaData.unshift({
        id: newId,
        name: formData.get('nama') || 'Nama Peserta',
        email: formData.get('email') || 'email@example.com',
        kursus: formData.get('kursus') || 'Komputer Dasar',
        status: 'Aktif',
        tanggalDaftar: new Date().toISOString().split('T')[0]
    });
    
    adminData.totalPeserta++;
    document.getElementById('totalPeserta').textContent = adminData.totalPeserta;
    
    loadPesertaData();
    tutupModal('tambahPesertaModal');
    showAlert('success', 'Berhasil!', 'Peserta baru berhasil ditambahkan');
    this.reset();
});

document.getElementById('formTambahKaryawan')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const newId = `KRY-2026-${(karyawanData.length + 1).toString().padStart(3, '0')}`;
    
    karyawanData.unshift({
        id: newId,
        name: formData.get('nama') || 'Nama Karyawan',
        email: formData.get('email') || 'email@nexgen.com',
        department: formData.get('departemen') || 'Administrasi',
        position: formData.get('posisi') || 'Staff',
        status: 'Aktif',
        joinDate: formData.get('tanggal') || new Date().toISOString().split('T')[0]
    });
    
    adminData.totalKaryawan++;
    document.getElementById('totalKaryawan').textContent = adminData.totalKaryawan;
    
    loadKaryawanData();
    tutupModal('tambahKaryawanModal');
    showAlert('success', 'Berhasil!', 'Karyawan baru berhasil ditambahkan');
    this.reset();
});

document.getElementById('formTambahKursus')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const newId = kursusData.length > 0 ? Math.max(...kursusData.map(k => k.id)) + 1 : 1;
    
    kursusData.unshift({
        id: newId,
        name: formData.get('nama') || 'Kursus Baru',
        coach: formData.get('coach') || 'Coach',
        level: formData.get('level') || 'Basic',
        peserta: parseInt(formData.get('kapasitas') || '20'),
        sesi: parseInt(formData.get('sesi') || '12'),
        progress: 0
    });
    
    adminData.totalKursus++;
    document.getElementById('totalKursus').textContent = adminData.totalKursus;
    
    loadKursusData();
    tutupModal('tambahKursusModal');
    showAlert('success', 'Berhasil!', 'Kursus baru berhasil ditambahkan');
    this.reset();
});



window.addEventListener('load', function() {
});
