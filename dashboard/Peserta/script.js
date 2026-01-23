// Data
const pesertaData = {
    nama: "Ahmad Fauzi",
    id: "PES-2026-001",
    email: "ahmad.fauzi@email.com"
};

// Data jadwal minggu ini
const jadwalMingguIni = [
    { hari: "Senin", tanggal: "18 Mar", kursus: "Komputer Dasar", waktu: "08:00 - 12:00", ruang: "Lab Komputer 1" },
    { hari: "Selasa", tanggal: "19 Mar", kursus: "Content Creator", waktu: "13:00 - 17:00", ruang: "Studio Multimedia" },
    { hari: "Rabu", tanggal: "20 Mar", kursus: "Desain Grafis", waktu: "08:00 - 12:00", ruang: "Lab Desain" },
    { hari: "Rabu", tanggal: "20 Mar", kursus: "Digital Marketing", waktu: "13:00 - 17:00", ruang: "Lab Komputer 2" },
    { hari: "Kamis", tanggal: "21 Mar", kursus: "Komputer Dasar", waktu: "08:00 - 12:00", ruang: "Lab Komputer 1" },
    { hari: "Jumat", tanggal: "22 Mar", kursus: "Content Creator", waktu: "13:00 - 17:00", ruang: "Studio Multimedia" },
    { hari: "Sabtu", tanggal: "23 Mar", kursus: "Desain Grafis", waktu: "08:00 - 12:00", ruang: "Lab Desain" }
];

// Data materi terbaru
const materiTerbaru = [
    { kursus: "Komputer Dasar", judul: "Microsoft Excel: Formula Dasar", tanggal: "14 Mar 2026", jenis: "PDF", icon: "fa-file-pdf", color: "text-red-400" },
    { kursus: "Desain Grafis", judul: "Adobe Photoshop: Layer & Masking", tanggal: "13 Mar 2026", jenis: "Video", icon: "fa-video", color: "text-red-400" },
    { kursus: "Komputer Dasar", judul: "Microsoft Word: Formatting Dokumen", tanggal: "11 Mar 2026", jenis: "PDF", icon: "fa-file-pdf", color: "text-red-400" },
    { kursus: "Digital Marketing", judul: "Analytics & Reporting: Dashboard", tanggal: "10 Mar 2026", jenis: "PDF", icon: "fa-file-pdf", color: "text-red-400" }
];

// Variables
let selectedAttendanceStatus = null;
let selectedCourseForAttendance = null;

// Theme Management
function initTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    
    // Apply theme
    document.body.className = savedTheme;
    
    // Update icon visibility
    updateThemeIcon();
}

function toggleTheme() {
    // Toggle between dark and light mode
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
    
    // Update icon visibility
    updateThemeIcon();
}

function updateThemeIcon() {
    const sunIcon = document.querySelector('.theme-icon.sun');
    const moonIcon = document.querySelector('.theme-icon.moon');
    
    if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0.5';
    } else {
        sunIcon.style.opacity = '0.5';
        moonIcon.style.opacity = '1';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            
            // Show welcome message
            Swal.fire({
                title: 'Selamat Datang!',
                text: `Halo ${pesertaData.nama}, selamat belajar di LKP NexGen`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
                color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b'
            });
        }, 500);
    }, 1500);
    
    // Load data
    loadUserData();
    loadWeeklySchedule();
    loadRecentMaterials();
    loadOverallProgress();
    
    // Setup event listeners
    setupEventListeners();
});

// Load user data
function loadUserData() {
    document.getElementById('userName').textContent = pesertaData.nama;
    document.getElementById('welcomeName').textContent = pesertaData.nama.split(' ')[0];
}

// Load weekly schedule
function loadWeeklySchedule() {
    const scheduleContainer = document.getElementById('weeklySchedule');
    scheduleContainer.innerHTML = '';
    
    jadwalMingguIni.forEach(jadwal => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'p-4 border border-gray-800 rounded-xl';
        
        if (jadwal.kursus === '-') {
            scheduleItem.innerHTML = `
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-home text-gray-500"></i>
                    </div>
                    <div>
                        <div class="font-semibold text-gray-500">${jadwal.hari}, ${jadwal.tanggal}</div>
                        <div class="text-sm text-gray-600">Tidak ada jadwal kursus</div>
                    </div>
                </div>
            `;
        } else {
            // Determine color based on course
            let borderColor = 'border-gray-800';
            if (jadwal.kursus === 'Komputer Dasar') borderColor = 'border-blue-500/30';
            if (jadwal.kursus === 'Content Creator') borderColor = 'border-emerald-500/30';
            if (jadwal.kursus === 'Desain Grafis') borderColor = 'border-pink-500/30';
            if (jadwal.kursus === 'Digital Marketing') borderColor = 'border-amber-500/30';
            
            scheduleItem.innerHTML = `
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mr-3">
                        <i class="fas fa-calendar-day ${jadwal.kursus === 'Komputer Dasar' ? 'text-blue-400' : 
                                                      jadwal.kursus === 'Content Creator' ? 'text-emerald-400' : 
                                                      jadwal.kursus === 'Desain Grafis' ? 'text-pink-400' : 
                                                      'text-amber-400'}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-white">${jadwal.kursus}</div>
                        <div class="text-sm text-gray-400">${jadwal.hari}, ${jadwal.tanggal} • ${jadwal.waktu}</div>
                        <div class="text-xs text-gray-500 mt-1">${jadwal.ruang}</div>
                    </div>
                </div>
            `;
            
            scheduleItem.className = `p-4 border ${borderColor} rounded-xl bg-gray-800/30`;
        }
        
        scheduleContainer.appendChild(scheduleItem);
    });
}

// Load recent materials
function loadRecentMaterials() {
    const materialsContainer = document.getElementById('recentMaterials');
    materialsContainer.innerHTML = '';
    
    materiTerbaru.forEach(materi => {
        const materialItem = document.createElement('div');
        materialItem.className = 'p-4 border border-gray-800 rounded-xl';
        
        materialItem.innerHTML = `
            <div class="flex items-start">
                <div class="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mr-3 mt-1">
                    <i class="fas ${materi.icon} ${materi.color}"></i>
                </div>
                <div class="flex-1">
                    <div class="font-semibold text-white">${materi.judul}</div>
                    <div class="text-sm text-gray-400">${materi.kursus} • ${materi.tanggal}</div>
                    <div class="flex justify-between items-center mt-3">
                        <span class="text-xs px-2 py-1 bg-gray-800 rounded-lg text-gray-400">${materi.jenis}</span>
                        <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                            <i class="fas fa-download mr-1"></i>Unduh
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        materialsContainer.appendChild(materialItem);
    });
}

// Load overall progress
function loadOverallProgress() {
    const progressContainer = document.getElementById('overallProgress');
    progressContainer.innerHTML = '';
    
    // Calculate average progress
    const courses = [
        { name: 'Komputer Dasar', progress: 83, color: 'blue' },
        { name: 'Content Creator', progress: 92, color: 'emerald' },
        { name: 'Desain Grafis', progress: 83, color: 'pink' },
        { name: 'Digital Marketing', progress: 92, color: 'amber' }
    ];
    
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    const averageProgress = Math.round(totalProgress / courses.length);
    
    progressContainer.innerHTML = `
        <div class="text-center mb-6">
            <div class="text-5xl font-bold gradient-text mb-2">${averageProgress}%</div>
            <div class="text-gray-400">Progress Rata-rata Semua Kursus</div>
        </div>
        
        <div class="space-y-4">
            ${courses.map(course => `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-8 h-8 ${course.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 
                                           course.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 
                                           course.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : 
                                           'bg-amber-500/20 text-amber-400'} rounded-lg flex items-center justify-center mr-3">
                            <i class="fas ${course.color === 'blue' ? 'fa-desktop' : 
                                          course.color === 'emerald' ? 'fa-video' : 
                                          course.color === 'pink' ? 'fa-paint-brush' : 
                                          'fa-chart-line'} text-sm"></i>
                        </div>
                        <div>
                            <div class="font-medium text-white">${course.name}</div>
                            <div class="text-xs text-gray-500">${course.progress}% selesai</div>
                        </div>
                    </div>
                    <div class="w-24">
                        <div class="progress-bar">
                            <div class="progress-fill ${course.progress >= 90 ? 'from-emerald-500 to-green-500' : 
                                                      course.progress >= 70 ? 'from-blue-500 to-teal-500' : 
                                                      'from-amber-500 to-red-500'}" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Open presensi modal
function openPresensiModal(kursusNama) {
    selectedCourseForAttendance = kursusNama;
    
    // Set modal content
    document.getElementById('modalCourseTitle').textContent = `Presensi ${kursusNama}`;
    document.getElementById('modalCourseName').textContent = kursusNama;
    
    // Set current date and time
    const now = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    
    document.getElementById('modalDate').textContent = now.toLocaleDateString('id-ID', optionsDate);
    document.getElementById('modalTime').textContent = now.toLocaleTimeString('id-ID', optionsTime);
    
    // Reset status
    selectedAttendanceStatus = null;
    document.getElementById('attendanceNote').value = '';
    
    // Remove active classes
    document.querySelectorAll('#presensiModal button').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-emerald-500', 'ring-amber-500', 'ring-red-500');
    });
    
    // Show modal
    document.getElementById('presensiModal').style.display = 'flex';
}

// Select attendance status
function selectAttendanceStatus(status) {
    selectedAttendanceStatus = status;
    
    // Remove active classes
    document.querySelectorAll('#presensiModal button').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-emerald-500', 'ring-amber-500', 'ring-red-500');
    });
    
    // Add active class to selected button
    const buttons = document.querySelectorAll('#presensiModal button');
    if (status === 'Hadir') {
        buttons[0].classList.add('ring-2', 'ring-offset-2', 'ring-emerald-500');
    } else if (status === 'Terlambat') {
        buttons[1].classList.add('ring-2', 'ring-offset-2', 'ring-amber-500');
    } else if (status === 'Tidak Hadir') {
        buttons[2].classList.add('ring-2', 'ring-offset-2', 'ring-red-500');
    }
}

// Submit presensi
function submitPresensi() {
    if (!selectedCourseForAttendance) {
        Swal.fire({
            icon: 'error',
            title: 'Kesalahan',
            text: 'Tidak ada kursus yang dipilih!',
            background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
            color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b',
            confirmButtonColor: '#3b82f6'
        });
        return;
    }
    
    if (!selectedAttendanceStatus) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Silakan pilih status kehadiran terlebih dahulu!',
            background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
            color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b',
            confirmButtonColor: '#3b82f6'
        });
        return;
    }
    
    const waktuHadir = document.getElementById('attendanceTime').value;
    const keterangan = document.getElementById('attendanceNote').value;
    
    // Show success message
    Swal.fire({
        icon: 'success',
        title: 'Presensi Berhasil!',
        html: `
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <i class="fas fa-check text-2xl text-white"></i>
                </div>
                <p class="text-gray-300">Presensi Anda telah dicatat</p>
                <div class="mt-4 p-4 bg-gray-800/50 rounded-xl text-left border border-gray-700">
                    <p class="mb-2"><span class="text-gray-400">Kursus:</span> <span class="font-semibold text-white">${selectedCourseForAttendance}</span></p>
                    <p class="mb-2"><span class="text-gray-400">Status:</span> <span class="font-semibold text-emerald-400">${selectedAttendanceStatus}</span></p>
                    <p class="mb-2"><span class="text-gray-400">Waktu:</span> <span class="font-semibold text-white">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span></p>
                    ${keterangan ? `<p><span class="text-gray-400">Keterangan:</span> <span class="font-semibold text-white">${keterangan}</span></p>` : ''}
                </div>
            </div>
        `,
        showConfirmButton: false,
        timer: 3000,
        background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
        color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b'
    });
    
    // Close modal
    document.getElementById('cancelPresensi').click();
    
    // Reset variables
    selectedCourseForAttendance = null;
    selectedAttendanceStatus = null;
}

// View full history
function viewFullHistory() {
    let historyHtml = `
        <div class="text-left max-h-96 overflow-y-auto pr-2">
            <h4 class="font-semibold mb-4 text-white">Riwayat Presensi 30 Hari Terakhir</h4>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gray-800/50">
                            <th class="py-2 px-3 text-left text-xs font-semibold text-gray-400">Tanggal</th>
                            <th class="py-2 px-3 text-left text-xs font-semibold text-gray-400">Kursus</th>
                            <th class="py-2 px-3 text-left text-xs font-semibold text-gray-400">Status</th>
                            <th class="py-2 px-3 text-left text-xs font-semibold text-gray-400">Waktu</th>
                            <th class="py-2 px-3 text-left text-xs font-semibold text-gray-400">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Generate sample data
    const riwayatLengkap = [];
    const now = new Date();
    const kursusNames = ['Komputer Dasar', 'Content Creator', 'Desain Grafis', 'Digital Marketing'];
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const tanggal = date.toISOString().split('T')[0];
        const hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
        
        // Random status
        const statuses = ['Hadir', 'Hadir', 'Hadir', 'Terlambat', 'Tidak Hadir', 'Libur'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Random course
        const randomCourse = kursusNames[Math.floor(Math.random() * kursusNames.length)];
        
        riwayatLengkap.push({
            tanggal: tanggal,
            hari: hari,
            kursus: randomStatus === 'Libur' ? '-' : randomCourse,
            waktu: randomStatus === 'Libur' ? '-' : '08:15',
            status: randomStatus,
            keterangan: randomStatus === 'Libur' ? 'Hari Libur Nasional' : ''
        });
    }
    
    riwayatLengkap.forEach(riwayat => {
        let statusClass = '';
        switch(riwayat.status) {
            case 'Hadir': statusClass = 'bg-emerald-500/20 text-emerald-400'; break;
            case 'Terlambat': statusClass = 'bg-amber-500/20 text-amber-400'; break;
            case 'Tidak Hadir': statusClass = 'bg-red-500/20 text-red-400'; break;
            default: statusClass = 'bg-gray-800 text-gray-400';
        }
        
        historyHtml += `
            <tr class="border-b border-gray-800">
                <td class="py-2 px-3">${riwayat.tanggal}<br><span class="text-xs text-gray-500">${riwayat.hari}</span></td>
                <td class="py-2 px-3 text-gray-300">${riwayat.kursus}</td>
                <td class="py-2 px-3">
                    <span class="px-2 py-1 text-xs rounded ${statusClass}">${riwayat.status}</span>
                </td>
                <td class="py-2 px-3 text-gray-300">${riwayat.waktu}</td>
                <td class="py-2 px-3 text-gray-400">${riwayat.keterangan}</td>
            </tr>
        `;
    });
    
    historyHtml += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    Swal.fire({
        title: 'Riwayat Presensi 30 Hari Terakhir',
        html: historyHtml,
        width: 800,
        icon: 'info',
        background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
        color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Tutup'
    });
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.classList.add('hidden');
    });
    document.getElementById(`${tabName}Tab`).classList.remove('hidden');
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Add animation
    document.querySelectorAll('.tab-pane.active .animate-fade-in-up').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        document.getElementById('logoutModal').style.display = 'flex';
    });
    
    // Presensi modal buttons
    document.getElementById('cancelPresensi').addEventListener('click', function() {
        document.getElementById('presensiModal').style.display = 'none';
        selectedCourseForAttendance = null;
        selectedAttendanceStatus = null;
    });
    
    document.getElementById('submitPresensi').addEventListener('click', submitPresensi);
    
    // Logout modal buttons
    document.getElementById('cancelLogout').addEventListener('click', function() {
        document.getElementById('logoutModal').style.display = 'none';
    });
    
    document.getElementById('confirmLogout').addEventListener('click', function() {
        Swal.fire({
            title: 'Logout Berhasil!',
            text: 'Anda telah berhasil logout dari sistem',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
            color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b'
        }).then(() => {
            // Redirect to login page
            window.location.href = 'login.html';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const presensiModal = document.getElementById('presensiModal');
        const logoutModal = document.getElementById('logoutModal');
        
        if (event.target === presensiModal) {
            presensiModal.style.display = 'none';
            selectedCourseForAttendance = null;
            selectedAttendanceStatus = null;
        }
        
        if (event.target === logoutModal) {
            logoutModal.style.display = 'none';
        }
    });
    
    // Material download buttons
    document.querySelectorAll('.material-item').forEach(item => {
        item.addEventListener('click', function() {
            const materialName = this.querySelector('span').textContent;
            Swal.fire({
                title: 'Materi: ' + materialName,
                text: 'Materi akan segera diunduh...',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false,
                background: document.body.classList.contains('dark-mode') ? '#1e293b' : '#ffffff',
                color: document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e293b'
            });
        });
    });
    
    // Course cards hover effect
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

window.openPresensiModal = openPresensiModal;
window.selectAttendanceStatus = selectAttendanceStatus;
window.viewFullHistory = viewFullHistory;
window.switchTab = switchTab;