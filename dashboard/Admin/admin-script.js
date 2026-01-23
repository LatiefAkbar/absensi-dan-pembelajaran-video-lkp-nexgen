// Admin Data
const adminData = {
    totalUsers: 158,
    activeInstructors: 8,
    activeCourses: 12,
    todayAttendance: 142
};

const usersData = [
    { id: "ADM-001", name: "Admin Sistem", email: "admin@presensinex.com", role: "admin", status: "active", lastLogin: "10:30" },
    { id: "INS-001", name: "Ekal Arga", email: "ekal@presensinex.com", role: "instructor", status: "active", lastLogin: "09:15" },
    { id: "INS-002", name: "Budi Santoso", email: "budi@presensinex.com", role: "instructor", status: "active", lastLogin: "08:45" },
    { id: "PES-001", name: "Ahmad Fauzi", email: "ahmad@email.com", role: "student", status: "active", lastLogin: "08:45" },
    { id: "PES-002", name: "Siti Rahma", email: "siti@email.com", role: "student", status: "active", lastLogin: "08:30" }
];

const coursesData = [
    { id: "CRS-001", name: "Komputer Dasar", instructor: "Ekal Arga", students: 25, status: "active" },
    { id: "CRS-002", name: "Microsoft Excel", instructor: "Budi Santoso", students: 18, status: "active" },
    { id: "CRS-003", name: "Web Development", instructor: "Siti Rahma", students: 12, status: "active" },
    { id: "CRS-004", name: "Design Grafis", instructor: "Rina Wijaya", students: 15, status: "active" }
];

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                showAdminToast("Dashboard Admin siap digunakan!", "success");
            }, 500);
        }
    }, 1500);
    
    // Load data
    loadUsersTable();
    loadCoursesGrid();
    initializeAdminCharts();
    setupAdminEventListeners();
    
    // Set last access time
    const lastAccessTime = document.getElementById('lastAccessTime');
    if (lastAccessTime) {
        lastAccessTime.textContent = new Date().toLocaleString('id-ID');
    }
});

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeTabBtn = document.querySelector(`.admin-tab-btn[data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.classList.add('hidden');
    });
    const activeTab = document.getElementById(`${tabName}Tab`);
    if (activeTab) {
        activeTab.classList.remove('hidden');
        activeTab.classList.add('active');
    }
}

// Load users table
function loadUsersTable() {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    usersData.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-800 hover:bg-gray-800/50';
        
        let roleBadge = '';
        let statusBadge = '';
        
        switch(user.role) {
            case 'admin':
                roleBadge = '<span class="admin-badge badge-danger">Admin</span>';
                break;
            case 'instructor':
                roleBadge = '<span class="admin-badge badge-purple">Instruktur</span>';
                break;
            case 'student':
                roleBadge = '<span class="admin-badge badge-primary">Peserta</span>';
                break;
        }
        
        statusBadge = user.status === 'active' 
            ? '<span class="admin-badge badge-success">Aktif</span>'
            : '<span class="admin-badge badge-warning">Non-aktif</span>';
        
        row.innerHTML = `
            <td class="p-4">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-user text-blue-400"></i>
                    </div>
                    <div>
                        <div class="font-medium text-white">${user.name}</div>
                        <div class="text-sm text-gray-400">${user.id}</div>
                    </div>
                </div>
            </td>
            <td class="p-4">${roleBadge}</td>
            <td class="p-4">${user.email}</td>
            <td class="p-4">${statusBadge}</td>
            <td class="p-4">
                <div class="text-sm text-gray-300">${user.lastLogin}</div>
                <div class="text-xs text-gray-500">Hari ini</div>
            </td>
            <td class="p-4">
                <div class="flex space-x-2">
                    <button class="text-blue-400 hover:text-blue-300 transition-colors" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="text-red-400 hover:text-red-300 transition-colors" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Load courses grid
function loadCoursesGrid() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'admin-card hover:transform hover:scale-[1.02] transition-transform';
        courseCard.innerHTML = `
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-bold text-white text-lg">${course.name}</h4>
                        <p class="text-gray-400 text-sm">${course.instructor}</p>
                    </div>
                    <span class="admin-badge badge-success">Aktif</span>
                </div>
                
                <div class="mb-4">
                    <div class="text-sm text-gray-400 mb-1">Jumlah Peserta</div>
                    <div class="text-2xl font-bold text-white">${course.students}</div>
                </div>
                
                <div class="flex space-x-3">
                    <button class="flex-1 btn btn-outline border-gray-700 text-gray-300 hover:bg-gray-800 text-sm py-2" onclick="viewCourse('${course.id}')">
                        <i class="fas fa-eye mr-2"></i>Lihat
                    </button>
                    <button class="flex-1 btn btn-primary text-sm py-2" onclick="editCourse('${course.id}')">
                        <i class="fas fa-edit mr-2"></i>Edit
                    </button>
                </div>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

// Initialize charts
function initializeAdminCharts() {
    // Detailed Report Chart
    const ctx = document.getElementById('detailedReportChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Komputer Dasar', 'Microsoft Excel', 'Web Dev', 'Design Grafis'],
                datasets: [{
                    label: 'Jumlah Peserta',
                    data: [25, 18, 12, 15],
                    backgroundColor: 'rgba(139, 92, 246, 0.7)'
                }]
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

// Modal functions
function showAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function showAddCourseModal() {
    const modal = document.getElementById('addCourseModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAdminModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

let selectedUserRole = 'admin';

function selectUserRole(role) {
    selectedUserRole = role;
    
    // Remove active class from all buttons
    document.querySelectorAll('.user-role-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
    });
    
    // Add active class to clicked button
    event.target.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2');
    
    showAdminToast(`Role dipilih: ${role}`, "info");
}

// Save new user
function saveNewUser() {
    const fullName = document.getElementById('userFullName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    if (!fullName || !email || !password) {
        showAdminToast("Harap lengkapi semua data!", "error");
        return;
    }
    
    if (password.length < 8) {
        showAdminToast("Password minimal 8 karakter!", "error");
        return;
    }
    
    // Create new user object
    let roleText = '';
    let roleIdPrefix = '';
    
    switch(selectedUserRole) {
        case 'admin':
            roleText = 'Admin';
            roleIdPrefix = 'ADM';
            break;
        case 'instructor':
            roleText = 'Instruktur';
            roleIdPrefix = 'INS';
            break;
        case 'student':
            roleText = 'Peserta';
            roleIdPrefix = 'PES';
            break;
    }
    
    const newUserId = `${roleIdPrefix}-${String(usersData.length + 1).padStart(3, '0')}`;
    
    // Add to users data
    const newUser = {
        id: newUserId,
        name: fullName,
        email: email,
        role: selectedUserRole,
        status: "active",
        lastLogin: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})
    };
    
    usersData.push(newUser);
    loadUsersTable();
    
    // Reset form
    document.getElementById('userFullName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPassword').value = '';
    document.querySelectorAll('.user-role-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2');
    });
    selectedUserRole = 'admin';
    
    closeAdminModal('addUserModal');
    showAdminToast(`${roleText} baru berhasil ditambahkan!`, "success");
}

// Save new course
function saveNewCourse() {
    const courseName = document.getElementById('courseName').value;
    const courseDescription = document.getElementById('courseDescription').value;
    const courseDuration = document.getElementById('courseDuration').value;
    const courseFee = document.getElementById('courseFee').value;
    const courseInstructor = document.getElementById('courseInstructor').value;
    
    if (!courseName || !courseDescription || !courseDuration || !courseFee || !courseInstructor) {
        showAdminToast("Harap lengkapi semua data!", "error");
        return;
    }
    
    // Get instructor name
    let instructorName = "";
    const instructorSelect = document.getElementById('courseInstructor');
    if (instructorSelect.selectedIndex > 0) {
        instructorName = instructorSelect.options[instructorSelect.selectedIndex].text;
    }
    
    // Create new course
    const newCourseId = `CRS-${String(coursesData.length + 1).padStart(3, '0')}`;
    const newCourse = {
        id: newCourseId,
        name: courseName,
        instructor: instructorName,
        students: 0,
        status: "active"
    };
    
    coursesData.push(newCourse);
    loadCoursesGrid();
    
    // Reset form
    document.getElementById('courseName').value = '';
    document.getElementById('courseDescription').value = '';
    document.getElementById('courseDuration').value = '40';
    document.getElementById('courseFee').value = '';
    document.getElementById('courseInstructor').value = '';
    
    closeAdminModal('addCourseModal');
    showAdminToast(`Kursus "${courseName}" berhasil ditambahkan!`, "success");
}

// System functions
function backupSystem() {
    showAdminToast("Memulai backup sistem...", "info");
    setTimeout(() => {
        showAdminToast("Backup berhasil disimpan!", "success");
    }, 2000);
}

function generateSystemReport() {
    showAdminToast("Membuat laporan sistem...", "info");
    setTimeout(() => {
        showAdminToast("Laporan berhasil di-generate!", "success");
    }, 1500);
}

function generateReport(type) {
    const reportTypes = {
        'attendance': 'Laporan Presensi',
        'financial': 'Laporan Keuangan',
        'performance': 'Laporan Performa',
        'users': 'Laporan Pengguna'
    };
    
    showAdminToast(`Membuat ${reportTypes[type]}...`, "info");
    setTimeout(() => {
        showAdminToast(`${reportTypes[type]} berhasil dibuat!`, "success");
    }, 1500);
}

function showSystemSettings() {
    switchTab('settings');
}

function saveSystemSettings() {
    showAdminToast("Pengaturan berhasil disimpan!", "success");
}

function clearLogs() {
    Swal.fire({
        title: 'Hapus Log Sistem?',
        text: 'Semua log sistem akan dihapus permanen',
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
            showAdminToast("Log sistem berhasil dihapus!", "success");
        }
    });
}

function exportLogs() {
    showAdminToast("Mengekspor log sistem...", "info");
    setTimeout(() => {
        showAdminToast("Log berhasil diekspor!", "success");
    }, 1500);
}

// User management functions
function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (user) {
        showAdminToast(`Mengedit pengguna ${user.name}`, "info");
    }
}

function deleteUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    Swal.fire({
        title: 'Hapus Pengguna?',
        text: `Pengguna ${user.name} akan dihapus dari sistem`,
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
            const index = usersData.findIndex(u => u.id === userId);
            if (index !== -1) {
                usersData.splice(index, 1);
                loadUsersTable();
                showAdminToast("Pengguna berhasil dihapus!", "success");
            }
        }
    });
}

// Course management functions
function viewCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        showAdminToast(`Melihat detail kursus ${course.name}`, "info");
    }
}

function editCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        showAdminToast(`Mengedit kursus ${course.name}`, "info");
    }
}

// Toast notification
function showAdminToast(message, type = "info") {
    const toast = document.getElementById('adminToast');
    const toastMessage = document.getElementById('adminToastMessage');
    
    if (!toast || !toastMessage) return;
    
    // Reset classes
    toast.className = 'toast';
    
    // Add type-based styling
    if (type === "success") {
        toast.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    } else if (type === "error") {
        toast.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
    } else if (type === "warning") {
        toast.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
    } else {
        toast.style.background = 'linear-gradient(135deg, #3b82f6, #60a5fa)';
    }
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Setup event listeners
function setupAdminEventListeners() {
    // Tab switching
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Logout Admin?',
                text: 'Anda akan keluar dari sistem',
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
                    showAdminToast("Logout berhasil!", "success");
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
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + B for backup
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            backupSystem();
        }
        
        // Ctrl + U to add user
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showAddUserModal();
        }
        
        // Ctrl + C to add course
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            showAddCourseModal();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}