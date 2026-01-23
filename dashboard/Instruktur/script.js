// Data Instruktur
const instructorData = {
    nama: "Ekal Arga Fraizy",
    id: "INS-2026-001",
    spesialisasi: "Komputer Dasar & Office"
};

// Data Peserta
const studentsData = [
    { id: "PES-2024-001", nama: "Ahmad Fauzi", kursus: "Komputer Dasar", batch: "04", kehadiran: "100%", terakhirHadir: "Hari ini", status: "Aktif" },
    { id: "PES-2024-002", nama: "Budi Santoso", kursus: "Komputer Dasar", batch: "04", kehadiran: "68%", terakhirHadir: "5 hari lalu", status: "Perlu Perhatian" },
    { id: "PES-2024-003", nama: "Siti Rahma", kursus: "Komputer Dasar Lanjutan", batch: "03", kehadiran: "72%", terakhirHadir: "2 hari lalu", status: "Aktif" },
    { id: "PES-2024-004", nama: "Rina Wijaya", kursus: "Komputer Dasar", batch: "04", kehadiran: "95%", terakhirHadir: "Hari ini", status: "Aktif" },
    { id: "PES-2024-005", nama: "Dewi Kurnia", kursus: "Komputer Dasar Lanjutan", batch: "03", kehadiran: "88%", terakhirHadir: "Hari ini", status: "Aktif" }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            showToast("Selamat datang di Dashboard Instruktur!");
        }, 500);
    }, 1500);
    
    // Load data
    loadInstructorData();
    loadStudentsList();
    initializeCharts();
    
    // Setup event listeners
    setupEventListeners();
});

// Load instructor data
function loadInstructorData() {
    document.getElementById('userName').textContent = instructorData.nama;
    document.getElementById('welcomeName').textContent = instructorData.nama.split(' ')[0];
}

// Load students list
function loadStudentsList() {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';
    
    studentsData.forEach(student => {
        let statusColor = 'status-present';
        if (student.status === 'Perlu Perhatian') {
            statusColor = 'status-absent';
        }
        
        const row = document.createElement('tr');
        row.className = 'student-list-item';
        row.innerHTML = `
            <td class="font-medium">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-user text-blue-400"></i>
                    </div>
                    ${student.nama}
                </div>
            </td>
            <td>${student.id}</td>
            <td>${student.kursus}</td>
            <td>${student.batch}</td>
            <td>
                <div class="flex items-center">
                    <div class="w-16 mr-2">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${parseInt(student.kehadiran)}%"></div>
                        </div>
                    </div>
                    <span class="font-semibold ${parseInt(student.kehadiran) < 75 ? 'text-amber-400' : 'text-emerald-400'}">${student.kehadiran}</span>
                </div>
            </td>
            <td>${student.terakhirHadir}</td>
            <td>
                <span class="status-badge ${statusColor}">${student.status}</span>
            </td>
            <td>
                <div class="flex space-x-2">
                    <button class="text-blue-400 hover:text-blue-300 transition-colors tooltip" title="Detail" onclick="viewStudentDetail('${student.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="text-emerald-400 hover:text-emerald-300 transition-colors tooltip" title="Edit" onclick="editStudent('${student.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-400 hover:text-red-300 transition-colors tooltip" title="Hapus" onclick="deleteStudent('${student.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        studentsList.appendChild(row);
    });
}

// Initialize charts
function initializeCharts() {
    // Attendance Chart (Doughnut)
    const ctx1 = document.getElementById('attendanceChart');
    if (ctx1) {
        new Chart(ctx1.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Hadir', 'Terlambat', 'Tidak Hadir'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            padding: 20
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    // Stats Chart (Bar)
    const ctx2 = document.getElementById('detailedStatsChart');
    if (ctx2) {
        new Chart(ctx2.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
                datasets: [
                    {
                        label: 'Hadir',
                        data: [45, 42, 48, 46],
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderColor: 'rgba(16, 185, 129, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Terlambat',
                        data: [3, 5, 2, 4],
                        backgroundColor: 'rgba(245, 158, 11, 0.7)',
                        borderColor: 'rgba(245, 158, 11, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Tidak Hadir',
                        data: [2, 3, 0, 0],
                        backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    }
                }
            }
        });
    }
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
    
    // Update step indicator
    updateStepIndicator(tabName);
    
    // Show toast for tab switch
    showToast(`Berpindah ke tab ${getTabName(tabName)}`);
}

function getTabName(tabKey) {
    const tabNames = {
        'dashboard': 'Dashboard',
        'presensi': 'Presensi',
        'peserta': 'Peserta',
        'laporan': 'Laporan',
        'jadwal': 'Jadwal'
    };
    return tabNames[tabKey] || tabKey;
}

function updateStepIndicator(tabName) {
    const steps = document.querySelectorAll('.step');
    if (tabName === 'presensi') {
        steps[0].classList.add('active');
        steps[1].classList.remove('active', 'completed');
        steps[2].classList.remove('active', 'completed');
    }
}

// QR Scanner functions
function startQRScanner() {
    const selectedSession = document.getElementById('sessionSelect').value;
    const sessionText = document.getElementById('sessionSelect').options[document.getElementById('sessionSelect').selectedIndex].text;
    
    document.getElementById('qrScannerModal').style.display = 'flex';
    
    // Simulate scanning after 2 seconds
    setTimeout(() => {
        document.getElementById('lastScannedData').innerHTML = `
            <div class="text-left">
                <div class="mb-1"><span class="text-gray-400">Nama:</span> Ahmad Fauzi</div>
                <div class="mb-1"><span class="text-gray-400">ID:</span> PES-2024-001</div>
                <div class="mb-1"><span class="text-gray-400">Sesi:</span> ${sessionText}</div>
                <div><span class="text-gray-400">Waktu:</span> ${new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        
        showToast("QR Code berhasil di-scan!");
    }, 2000);
}

function stopQRScanner() {
    showToast("Scanner QR Code dihentikan");
}

// Manual attendance functions
let selectedManualStatus = null;

function selectManualStatus(status) {
    selectedManualStatus = status;
    
    // Remove active class from all buttons
    document.querySelectorAll('.manual-status-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
    });
    
    // Add active class to clicked button
    event.target.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
    
    showToast(`Status dipilih: ${status}`);
}

function saveManualAttendance() {
    const studentSelect = document.getElementById('studentSelect');
    const selectedStudent = studentSelect.options[studentSelect.selectedIndex].text;
    const note = document.getElementById('manualAttendanceNote').value;
    
    if (!studentSelect.value) {
        showToast("Pilih peserta terlebih dahulu!", "error");
        return;
    }
    
    if (!selectedManualStatus) {
        showToast("Pilih status kehadiran terlebih dahulu!", "error");
        return;
    }
    
    // Add to today's attendance table
    const tableBody = document.getElementById('todayAttendanceTable');
    const newRow = document.createElement('tr');
    
    let statusClass = 'status-present';
    let statusIcon = 'fa-check';
    if (selectedManualStatus === 'Terlambat') {
        statusClass = 'status-late';
        statusIcon = 'fa-clock';
    } else if (selectedManualStatus === 'Tidak Hadir') {
        statusClass = 'status-absent';
        statusIcon = 'fa-times';
    }
    
    newRow.innerHTML = `
        <td>${selectedStudent.split(' (')[0]}</td>
        <td>PES-2024-00${studentSelect.value}</td>
        <td>${new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</td>
        <td>
            <span class="status-badge ${statusClass}">
                <i class="fas ${statusIcon} mr-1"></i> ${selectedManualStatus}
            </span>
        </td>
        <td>${note || '-'}</td>
        <td>
            <button class="text-blue-400 hover:text-blue-300 text-sm" onclick="editAttendance('PES-2024-00${studentSelect.value}')">
                <i class="fas fa-edit"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    
    // Reset form
    studentSelect.value = '';
    document.getElementById('manualAttendanceNote').value = '';
    selectedManualStatus = null;
    document.querySelectorAll('.manual-status-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
    });
    
    showToast(`Presensi ${selectedStudent.split(' (')[0]} berhasil disimpan!`);
}

// Modal functions
function showAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'flex';
}

function showMaterialModal() {
    document.getElementById('uploadMaterialModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Save new student
function saveNewStudent() {
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const course = document.getElementById('studentCourse').value;
    
    if (!name || !email || !phone || !course) {
        showToast("Harap lengkapi semua data!", "error");
        return;
    }
    
    // Add to students list
    const newStudent = {
        id: `PES-2024-00${studentsData.length + 1}`,
        nama: name,
        kursus: course === "1" ? "Komputer Dasar" : "Komputer Dasar Lanjutan",
        batch: "04",
        kehadiran: "100%",
        terakhirHadir: "Hari ini",
        status: "Aktif"
    };
    
    studentsData.push(newStudent);
    loadStudentsList();
    
    // Reset form
    document.getElementById('studentName').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentPhone').value = '';
    document.getElementById('studentCourse').value = '';
    
    closeModal('addStudentModal');
    showToast(`Peserta ${name} berhasil ditambahkan!`);
}

// Upload material
function uploadMaterial() {
    const title = document.getElementById('materialTitle').value;
    const description = document.getElementById('materialDescription').value;
    const course = document.getElementById('materialCourse').value;
    const file = document.getElementById('materialFile').files[0];
    
    if (!title || !course) {
        showToast("Judul materi dan kursus wajib diisi!", "error");
        return;
    }
    
    if (!file) {
        showToast("Pilih file materi terlebih dahulu!", "error");
        return;
    }
    
    // Reset form
    document.getElementById('materialTitle').value = '';
    document.getElementById('materialDescription').value = '';
    document.getElementById('materialCourse').value = '';
    document.getElementById('materialFile').value = '';
    
    closeModal('uploadMaterialModal');
    showToast(`Materi "${title}" berhasil diupload!`);
}

// Toast notification
function showToast(message, type = "success") {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set different colors based on type
    if (type === "error") {
        toast.style.background = "linear-gradient(135deg, var(--accent-red), #f87171)";
    } else if (type === "warning") {
        toast.style.background = "linear-gradient(135deg, var(--accent-amber), #fbbf24)";
    } else {
        toast.style.background = "linear-gradient(135deg, var(--accent-emerald), #34d399)";
    }
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Student functions
function viewStudentDetail(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        Swal.fire({
            title: `Detail Peserta - ${student.nama}`,
            html: `
                <div class="text-left">
                    <div class="mb-2"><span class="font-semibold">ID:</span> ${student.id}</div>
                    <div class="mb-2"><span class="font-semibold">Kursus:</span> ${student.kursus}</div>
                    <div class="mb-2"><span class="font-semibold">Batch:</span> ${student.batch}</div>
                    <div class="mb-2"><span class="font-semibold">Kehadiran:</span> ${student.kehadiran}</div>
                    <div class="mb-2"><span class="font-semibold">Terakhir Hadir:</span> ${student.terakhirHadir}</div>
                    <div><span class="font-semibold">Status:</span> ${student.status}</div>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Tutup',
            background: '#1e293b',
            color: '#f8fafc'
        });
    }
}

function editStudent(studentId) {
    showToast(`Mengedit data peserta ${studentId}`);
}

function deleteStudent(studentId) {
    Swal.fire({
        title: 'Hapus Peserta?',
        text: 'Apakah Anda yakin ingin menghapus peserta ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        background: '#1e293b',
        color: '#f8fafc'
    }).then((result) => {
        if (result.isConfirmed) {
            showToast('Peserta berhasil dihapus!');
        }
    });
}

// Utility functions
function sendMessage(studentName) {
    showToast(`Mengirim pesan ke ${studentName}`);
}

function callStudent(studentName) {
    showToast(`Memanggil ${studentName}`);
}

function editAttendance(studentId) {
    showToast(`Mengedit presensi ${studentId}`);
}

function searchStudents() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const courseFilter = document.getElementById('filterCourse').value;
    const batchFilter = document.getElementById('filterBatch').value;
    
    showToast(`Mencari peserta dengan filter yang dipilih`);
}

function generateReport(format) {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const course = document.getElementById('reportCourse').value;
    
    const formatText = format || 'PDF';
    showToast(`Membuat laporan ${formatText} untuk periode ${startDate} - ${endDate}`);
}

// Setup event listeners
function setupEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // QR Scanner modal buttons
    const cancelScanBtn = document.getElementById('cancelScan');
    const confirmAttendanceBtn = document.getElementById('confirmAttendance');
    
    if (cancelScanBtn) {
        cancelScanBtn.addEventListener('click', function() {
            document.getElementById('qrScannerModal').style.display = 'none';
            document.getElementById('lastScannedData').textContent = 'Belum ada data';
        });
    }
    
    if (confirmAttendanceBtn) {
        confirmAttendanceBtn.addEventListener('click', function() {
            Swal.fire({
                icon: 'success',
                title: 'Presensi Berhasil!',
                text: 'Presensi peserta telah dicatat',
                timer: 2000,
                showConfirmButton: false,
                background: '#1e293b',
                color: '#f8fafc'
            });
            
            document.getElementById('qrScannerModal').style.display = 'none';
            document.getElementById('lastScannedData').textContent = 'Belum ada data';
            
            // Update pending attendance count
            const pendingElement = document.getElementById('pendingAttendance');
            if (pendingElement) {
                let current = parseInt(pendingElement.textContent);
                if (current > 0) {
                    pendingElement.textContent = (current - 1).toString();
                }
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Logout Instruktur',
                text: 'Apakah Anda yakin ingin logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3b82f6',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Ya, Logout',
                cancelButtonText: 'Batal',
                background: '#1e293b',
                color: '#f8fafc'
            }).then((result) => {
                if (result.isConfirmed) {
                    showToast('Logout berhasil!');
                    // In a real app, you would redirect to login page
                    // window.location.href = 'login.html';
                }
            });
        });
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // File upload
    const materialFileInput = document.getElementById('materialFile');
    if (materialFileInput) {
        materialFileInput.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                showToast(`File "${fileName}" siap diupload`);
            }
        });
    }
}