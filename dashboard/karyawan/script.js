// ==================== KONFIGURASI DAN DATA ====================
const CONFIG = {
    appName: "PresensiNex",
    appVersion: "v2.1.0",
    company: "LKP NexGen",
    itemsPerPage: 10,
    attendanceItemsPerPage: 8
};

// Data karyawan contoh
const EMPLOYEE_DATA = [
    {
        id: "KRY-2026-001",
        name: "Ahmad Fauzi",
        nik: "1234567890123456",
        department: "Administrasi",
        position: "Staff Administrasi",
        email: "ahmad.fauzi@nexgen.com",
        phone: "0812-3456-7890",
        joinDate: "01 Januari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-002",
        name: "Budi Santoso",
        nik: "2345678901234567",
        department: "IT",
        position: "Frontend Developer",
        email: "budi.santoso@nexgen.com",
        phone: "0813-4567-8901",
        joinDate: "15 Januari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-003",
        name: "Citra Dewi",
        nik: "3456789012345678",
        department: "HRD",
        position: "HR Specialist",
        email: "citra.dewi@nexgen.com",
        phone: "0814-5678-9012",
        joinDate: "20 Januari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-004",
        name: "Dedi Pratama",
        nik: "4567890123456789",
        department: "Marketing",
        position: "Marketing Executive",
        email: "dedi.pratama@nexgen.com",
        phone: "0815-6789-0123",
        joinDate: "05 Februari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-005",
        name: "Eka Putri",
        nik: "5678901234567890",
        department: "Finance",
        position: "Accountant",
        email: "eka.putri@nexgen.com",
        phone: "0816-7890-1234",
        joinDate: "10 Februari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-006",
        name: "Fajar Ramadan",
        nik: "6789012345678901",
        department: "IT",
        position: "Backend Developer",
        email: "fajar.ramadan@nexgen.com",
        phone: "0817-8901-2345",
        joinDate: "25 Februari 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-007",
        name: "Gita Maharani",
        nik: "7890123456789012",
        department: "Administrasi",
        position: "Admin Support",
        email: "gita.maharani@nexgen.com",
        phone: "0818-9012-3456",
        joinDate: "01 Maret 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-008",
        name: "Hendra Wijaya",
        nik: "8901234567890123",
        department: "Marketing",
        position: "Digital Marketing",
        email: "hendra.wijaya@nexgen.com",
        phone: "0819-0123-4567",
        joinDate: "15 Maret 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-009",
        name: "Indra Permana",
        nik: "9012345678901234",
        department: "HRD",
        position: "Recruitment Officer",
        email: "indra.permana@nexgen.com",
        phone: "0820-1234-5678",
        joinDate: "20 Maret 2025",
        status: "Aktif"
    },
    {
        id: "KRY-2026-010",
        name: "Joko Wibowo",
        nik: "0123456789012345",
        department: "Finance",
        position: "Financial Analyst",
        email: "joko.wibowo@nexgen.com",
        phone: "0821-2345-6789",
        joinDate: "25 Maret 2025",
        status: "Aktif"
    }
];

// Data tugas contoh
const TASK_DATA = [
    {
        id: 1,
        title: "Update Laporan Bulanan",
        description: "Menyelesaikan laporan kinerja departemen untuk bulan ini",
        status: "pending",
        priority: "tinggi",
        deadline: "2025-03-15",
        assignedTo: "Ahmad Fauzi"
    },
    {
        id: 2,
        title: "Persiapan Meeting Investor",
        description: "Mempersiapkan presentasi dan dokumen untuk meeting investor",
        status: "progress",
        priority: "sangat tinggi",
        deadline: "2025-03-10",
        assignedTo: "Ahmad Fauzi"
    },
    {
        id: 3,
        title: "Perbaikan Sistem Database",
        description: "Optimasi dan maintenance database utama",
        status: "completed",
        priority: "sedang",
        deadline: "2025-03-05",
        assignedTo: "Ahmad Fauzi"
    },
    {
        id: 4,
        title: "Training Karyawan Baru",
        description: "Mengadakan training untuk karyawan baru batch Maret",
        status: "pending",
        priority: "tinggi",
        deadline: "2025-03-20",
        assignedTo: "Ahmad Fauzi"
    }
];

// Data presensi contoh untuk tanggal tertentu
let ATTENDANCE_DATA = [];
let currentAttendanceDate = new Date().toISOString().split('T')[0];

// ==================== STATE MANAGEMENT ====================
let state = {
    currentUser: {
        name: "Ahmad Fauzi",
        id: "KRY-2026-001",
        role: "Karyawan",
        department: "Administrasi"
    },
    currentTab: "data-karyawan",
    employeePage: 1,
    attendancePage: 1,
    filteredEmployees: [...EMPLOYEE_DATA],
    filteredAttendance: [],
    attendanceStats: {
        hadir: 0,
        izin: 0,
        alpa: 0,
        total: 0
    }
};

// ==================== DOM ELEMENTS ====================
const elements = {
    // Loading
    loadingScreen: document.getElementById('loadingScreen'),
    
    // User Profile
    userName: document.getElementById('userName'),
    userRole: document.getElementById('userRole'),
    userAvatar: document.getElementById('userAvatar'),
    welcomeName: document.getElementById('welcomeName'),
    employeeId: document.getElementById('employeeId'),
    
    // Tab System
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    
    // Data Karyawan
    employeeFullName: document.getElementById('employeeFullName'),
    employeePosition: document.getElementById('employeePosition'),
    employeeNik: document.getElementById('employeeNik'),
    employeeDepartment: document.getElementById('employeeDepartment'),
    employeeJoinDate: document.getElementById('employeeJoinDate'),
    employeeEmail: document.getElementById('employeeEmail'),
    employeePhone: document.getElementById('employeePhone'),
    karyawanTableBody: document.getElementById('karyawanTableBody'),
    btnRefresh: document.getElementById('btnRefresh'),
    startRow: document.getElementById('startRow'),
    endRow: document.getElementById('endRow'),
    totalRows: document.getElementById('totalRows'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    pageNumbers: document.getElementById('pageNumbers'),
    
    // Presensi
    currentAttendanceDate: document.getElementById('currentAttendanceDate'),
    filterPresensiDate: document.getElementById('filterPresensiDate'),
    filterPresensiDepartment: document.getElementById('filterPresensiDepartment'),
    searchPresensi: document.getElementById('searchPresensi'),
    countHadir: document.getElementById('countHadir'),
    countIzin: document.getElementById('countIzin'),
    countAlpa: document.getElementById('countAlpa'),
    countTotal: document.getElementById('countTotal'),
    presensiTableBody: document.getElementById('presensiTableBody'),
    prevPresensiBtn: document.getElementById('prevPresensiBtn'),
    nextPresensiBtn: document.getElementById('nextPresensiBtn'),
    currentPresensiPage: document.getElementById('currentPresensiPage'),
    totalPresensiPages: document.getElementById('totalPresensiPages'),
    presensiCount: document.getElementById('presensiCount'),
    
    // Tugas
    taskTable: document.getElementById('taskTable'),
    
    // Modals
    presensiModal: document.getElementById('presensiModal'),
    logoutModal: document.getElementById('logoutModal'),
    
    // Presensi Modal Elements
    modalTitle: document.getElementById('modalTitle'),
    modalSubtitle: document.getElementById('modalSubtitle'),
    modalEmployeeName: document.getElementById('modalEmployeeName'),
    modalEmployeeId: document.getElementById('modalEmployeeId'),
    modalDepartment: document.getElementById('modalDepartment'),
    modalPosition: document.getElementById('modalPosition'),
    modalDate: document.getElementById('modalDate'),
    modalTime: document.getElementById('modalTime'),
    cancelPresensiModal: document.getElementById('cancelPresensiModal'),
    
    // Logout Modal Elements
    cancelLogout: document.getElementById('cancelLogout'),
    confirmLogout: document.getElementById('confirmLogout'),
    
    // Logout Button
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Theme Toggle
    themeToggle: document.getElementById('themeToggle')
};

// ==================== UTILITY FUNCTIONS ====================
const utils = {
    formatDate: (date) => {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(date).toLocaleDateString('id-ID', options);
    },

    formatTime: (date) => {
        return new Date(date).toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    },

    getCurrentDateTime: () => {
        const now = new Date();
        return {
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            fullDate: utils.formatDate(now),
            fullTime: utils.formatTime(now)
        };
    },

    showLoading: () => {
        elements.loadingScreen.classList.remove('hidden');
    },

    hideLoading: () => {
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 1000);
    },

    showNotification: (message, type = 'success') => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-500' : type === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} text-white text-xl"></i>
                <span class="text-white font-medium">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    generateInitials: (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
    }
};

// ==================== DATA MANAGEMENT FUNCTIONS ====================
const dataManager = {
    initializeAttendanceData: () => {
        const today = utils.getCurrentDateTime().date;
        ATTENDANCE_DATA = EMPLOYEE_DATA.map(employee => {
            // Generate random attendance status for demonstration
            const statuses = ['hadir', 'izin', 'alpa'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            return {
                employeeId: employee.id,
                employeeName: employee.name,
                department: employee.department,
                position: employee.position,
                date: today,
                status: randomStatus,
                checkInTime: randomStatus === 'hadir' ? utils.getCurrentDateTime().time : null,
                checkOutTime: null,
                notes: ''
            };
        });
        return ATTENDANCE_DATA;
    },

    updateAttendanceData: (employeeId, status) => {
        const now = utils.getCurrentDateTime();
        const attendanceIndex = ATTENDANCE_DATA.findIndex(item => 
            item.employeeId === employeeId && item.date === now.date
        );

        if (attendanceIndex !== -1) {
            ATTENDANCE_DATA[attendanceIndex] = {
                ...ATTENDANCE_DATA[attendanceIndex],
                status: status,
                checkInTime: status === 'hadir' ? now.time : null,
                checkOutTime: null
            };
        } else {
            const employee = EMPLOYEE_DATA.find(emp => emp.id === employeeId);
            if (employee) {
                ATTENDANCE_DATA.push({
                    employeeId: employee.id,
                    employeeName: employee.name,
                    department: employee.department,
                    position: employee.position,
                    date: now.date,
                    status: status,
                    checkInTime: status === 'hadir' ? now.time : null,
                    checkOutTime: null,
                    notes: ''
                });
            }
        }
    },

    getAttendanceStats: (attendanceData) => {
        const stats = {
            hadir: 0,
            izin: 0,
            alpa: 0,
            total: attendanceData.length
        };

        attendanceData.forEach(attendance => {
            if (attendance.status === 'hadir') stats.hadir++;
            else if (attendance.status === 'izin') stats.izin++;
            else if (attendance.status === 'alpa') stats.alpa++;
        });

        return stats;
    }
};

// ==================== RENDER FUNCTIONS ====================
const render = {
    // Render profil karyawan
    renderProfile: () => {
        elements.employeeFullName.textContent = state.currentUser.name;
        elements.employeePosition.textContent = "Staff Administrasi";
        elements.employeeNik.textContent = "1234567890123456";
        elements.employeeDepartment.textContent = state.currentUser.department;
        elements.employeeJoinDate.textContent = "01 Januari 2025";
        elements.employeeEmail.textContent = "ahmad.fauzi@nexgen.com";
        elements.employeePhone.textContent = "0812-3456-7890";
        
        // Update user info
        elements.userName.textContent = state.currentUser.name;
        elements.userRole.textContent = state.currentUser.role;
        elements.welcomeName.textContent = state.currentUser.name.split(' ')[0];
        elements.employeeId.textContent = state.currentUser.id;
        
        // Set avatar initials
        elements.userAvatar.textContent = utils.generateInitials(state.currentUser.name);
    },

    // Render tabel karyawan dengan pagination
    renderEmployeeTable: () => {
        const startIndex = (state.employeePage - 1) * CONFIG.itemsPerPage;
        const endIndex = startIndex + CONFIG.itemsPerPage;
        const paginatedEmployees = state.filteredEmployees.slice(startIndex, endIndex);
        
        elements.karyawanTableBody.innerHTML = '';
        
        paginatedEmployees.forEach(employee => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-800/30 transition-colors';
            row.innerHTML = `
                <td class="pl-6 py-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                            ${utils.generateInitials(employee.name)}
                        </div>
                        <div>
                            <div class="font-semibold">${employee.name}</div>
                            <div class="text-sm text-gray-400">${employee.email}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4">
                    <span class="font-mono text-sm bg-gray-800/50 px-3 py-1 rounded">${employee.id}</span>
                </td>
                <td class="py-4">
                    <span class="department-badge">${employee.department}</span>
                </td>
                <td class="py-4">${employee.position}</td>
                <td class="py-4">
                    <span class="status-badge status-hadir">${employee.status}</span>
                </td>
            `;
            elements.karyawanTableBody.appendChild(row);
        });
        
        // Update pagination info
        elements.startRow.textContent = startIndex + 1;
        elements.endRow.textContent = Math.min(endIndex, state.filteredEmployees.length);
        elements.totalRows.textContent = state.filteredEmployees.length;
        
        // Update pagination controls
        elements.prevPage.disabled = state.employeePage === 1;
        elements.nextPage.disabled = endIndex >= state.filteredEmployees.length;
        
        // Render page numbers
        render.renderPageNumbers();
    },

    // Render nomor halaman
    renderPageNumbers: () => {
        const totalPages = Math.ceil(state.filteredEmployees.length / CONFIG.itemsPerPage);
        elements.pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `px-3 py-1 rounded-md text-sm ${i === state.employeePage ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                state.employeePage = i;
                render.renderEmployeeTable();
            });
            elements.pageNumbers.appendChild(pageBtn);
        }
    },

    // Render tabel presensi
    renderAttendanceTable: () => {
        const startIndex = (state.attendancePage - 1) * CONFIG.attendanceItemsPerPage;
        const endIndex = startIndex + CONFIG.attendanceItemsPerPage;
        const paginatedAttendance = state.filteredAttendance.slice(startIndex, endIndex);
        
        elements.presensiTableBody.innerHTML = '';
        
        paginatedAttendance.forEach(attendance => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-800/30 transition-colors';
            row.innerHTML = `
                <td class="pl-6 py-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                            ${utils.generateInitials(attendance.employeeName)}
                        </div>
                        <div>
                            <div class="font-semibold">${attendance.employeeName}</div>
                            <div class="text-sm text-gray-400">${attendance.position}</div>
                        </div>
                    </div>
                </td>
                <td class="py-4">
                    <span class="font-mono text-sm bg-gray-800/50 px-3 py-1 rounded">${attendance.employeeId}</span>
                </td>
                <td class="py-4">
                    <span class="department-badge">${attendance.department}</span>
                </td>
                <td class="py-4">${attendance.position}</td>
                <td class="py-4">
                    <div class="flex flex-col">
                        <span class="text-sm font-medium">${attendance.checkInTime || '-'}</span>
                        ${attendance.checkOutTime ? `<span class="text-xs text-gray-400">Keluar: ${attendance.checkOutTime}</span>` : ''}
                    </div>
                </td>
                <td class="py-4">
                    ${render.getAttendanceStatusBadge(attendance.status)}
                </td>
                <td class="pr-6 py-4">
                    <button class="input-attendance-btn" data-employee-id="${attendance.employeeId}" data-employee-name="${attendance.employeeName}">
                        <i class="fas fa-edit mr-2"></i>Input Presensi
                    </button>
                </td>
            `;
            elements.presensiTableBody.appendChild(row);
        });
        
        // Update stats
        const stats = dataManager.getAttendanceStats(state.filteredAttendance);
        elements.countHadir.textContent = stats.hadir;
        elements.countIzin.textContent = stats.izin;
        elements.countAlpa.textContent = stats.alpa;
        elements.countTotal.textContent = stats.total;
        
        // Update attendance stats in state
        state.attendanceStats = stats;
        
        // Update pagination info
        const totalPages = Math.ceil(state.filteredAttendance.length / CONFIG.attendanceItemsPerPage);
        elements.currentPresensiPage.textContent = state.attendancePage;
        elements.totalPresensiPages.textContent = totalPages;
        elements.presensiCount.textContent = state.filteredAttendance.length;
        
        // Update pagination buttons
        elements.prevPresensiBtn.disabled = state.attendancePage === 1;
        elements.nextPresensiBtn.disabled = endIndex >= state.filteredAttendance.length;
    },

    // Helper untuk badge status presensi
    getAttendanceStatusBadge: (status) => {
        const badges = {
            hadir: '<span class="status-badge status-hadir"><i class="fas fa-check-circle mr-1"></i>Hadir</span>',
            izin: '<span class="status-badge status-izin"><i class="fas fa-user-clock mr-1"></i>Izin</span>',
            alpa: '<span class="status-badge status-alpa"><i class="fas fa-times-circle mr-1"></i>Belum Input</span>'
        };
        return badges[status] || badges.alpa;
    },

    // Render tabel tugas
    renderTaskTable: () => {
        elements.taskTable.innerHTML = '';
        
        TASK_DATA.forEach(task => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-800/30 transition-colors';
            row.innerHTML = `
                <td class="py-4">
                    <div>
                        <div class="font-semibold">${task.title}</div>
                        <div class="text-sm text-gray-400">${task.description}</div>
                    </div>
                </td>
                <td class="py-4">
                    ${render.getTaskStatusBadge(task.status)}
                </td>
                <td class="py-4">
                    ${render.getPriorityBadge(task.priority)}
                </td>
                <td class="py-4">
                    <div class="flex items-center">
                        <i class="fas fa-calendar-day mr-2 text-gray-400"></i>
                        <span>${utils.formatDate(task.deadline)}</span>
                    </div>
                </td>
                <td class="py-4">
                    <button class="task-action-btn" data-task-id="${task.id}">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </td>
            `;
            elements.taskTable.appendChild(row);
        });
    },

    // Helper untuk badge status tugas
    getTaskStatusBadge: (status) => {
        const badges = {
            pending: '<span class="status-badge status-pending"><i class="fas fa-clock mr-1"></i>Pending</span>',
            progress: '<span class="status-badge status-progress"><i class="fas fa-spinner mr-1"></i>Progress</span>',
            completed: '<span class="status-badge status-completed"><i class="fas fa-check-circle mr-1"></i>Selesai</span>'
        };
        return badges[status] || badges.pending;
    },

    // Helper untuk badge prioritas
    getPriorityBadge: (priority) => {
        const badges = {
            'sangat tinggi': '<span class="priority-badge priority-critical"><i class="fas fa-exclamation-circle mr-1"></i>Sangat Tinggi</span>',
            tinggi: '<span class="priority-badge priority-high"><i class="fas fa-exclamation-triangle mr-1"></i>Tinggi</span>',
            sedang: '<span class="priority-badge priority-medium"><i class="fas fa-info-circle mr-1"></i>Sedang</span>',
            rendah: '<span class="priority-badge priority-low"><i class="fas fa-arrow-down mr-1"></i>Rendah</span>'
        };
        return badges[priority] || badges.sedang;
    },

    // Update date display
    updateDateDisplay: () => {
        const now = utils.getCurrentDateTime();
        elements.currentAttendanceDate.textContent = now.fullDate;
        elements.filterPresensiDate.value = now.date;
    }
};

// ==================== EVENT HANDLERS ====================
const eventHandlers = {
    // Tab switching
    setupTabSwitching: () => {
        elements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Update active tab button
                elements.tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active tab pane
                elements.tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.classList.add('hidden');
                });
                
                const activePane = document.getElementById(`${tabId}Tab`);
                if (activePane) {
                    activePane.classList.remove('hidden');
                    activePane.classList.add('active');
                }
                
                // Update state
                state.currentTab = tabId;
                
                // Load data for the tab if needed
                if (tabId === 'presensi') {
                    eventHandlers.filterAttendance();
                }
            });
        });
    },

    // Employee pagination
    setupEmployeePagination: () => {
        elements.prevPage.addEventListener('click', () => {
            if (state.employeePage > 1) {
                state.employeePage--;
                render.renderEmployeeTable();
            }
        });

        elements.nextPage.addEventListener('click', () => {
            const maxPage = Math.ceil(state.filteredEmployees.length / CONFIG.itemsPerPage);
            if (state.employeePage < maxPage) {
                state.employeePage++;
                render.renderEmployeeTable();
            }
        });

        elements.btnRefresh.addEventListener('click', () => {
            state.filteredEmployees = [...EMPLOYEE_DATA];
            state.employeePage = 1;
            render.renderEmployeeTable();
            utils.showNotification('Data karyawan diperbarui', 'success');
        });
    },

    // Attendance filtering and pagination
    setupAttendanceHandlers: () => {
        // Filter handlers
        elements.filterPresensiDate.addEventListener('change', eventHandlers.filterAttendance);
        elements.filterPresensiDepartment.addEventListener('change', eventHandlers.filterAttendance);
        elements.searchPresensi.addEventListener('input', eventHandlers.filterAttendance);

        // Pagination handlers
        elements.prevPresensiBtn.addEventListener('click', () => {
            if (state.attendancePage > 1) {
                state.attendancePage--;
                render.renderAttendanceTable();
            }
        });

        elements.nextPresensiBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(state.filteredAttendance.length / CONFIG.attendanceItemsPerPage);
            if (state.attendancePage < maxPage) {
                state.attendancePage++;
                render.renderAttendanceTable();
            }
        });

        // Date filter - set to today by default
        elements.filterPresensiDate.value = currentAttendanceDate;
    },

    filterAttendance: () => {
        const selectedDate = elements.filterPresensiDate.value;
        const selectedDept = elements.filterPresensiDepartment.value;
        const searchQuery = elements.searchPresensi.value.toLowerCase();
        
        currentAttendanceDate = selectedDate;
        
        // Filter attendance data
        state.filteredAttendance = ATTENDANCE_DATA.filter(attendance => {
            const matchesDate = attendance.date === selectedDate;
            const matchesDept = selectedDept === 'all' || attendance.department === selectedDept;
            const matchesSearch = attendance.employeeName.toLowerCase().includes(searchQuery) ||
                                attendance.employeeId.toLowerCase().includes(searchQuery);
            
            return matchesDate && matchesDept && matchesSearch;
        });
        
        state.attendancePage = 1;
        render.renderAttendanceTable();
    },

    // Attendance input modal
    setupAttendanceModal: () => {
        let currentEmployee = null;
        
        // Delegate event untuk tombol input presensi
        document.addEventListener('click', (e) => {
            if (e.target.closest('.input-attendance-btn')) {
                const button = e.target.closest('.input-attendance-btn');
                const employeeId = button.getAttribute('data-employee-id');
                const employeeName = button.getAttribute('data-employee-name');
                
                currentEmployee = { id: employeeId, name: employeeName };
                eventHandlers.openAttendanceModal(currentEmployee);
            }
            
            // Tombol pilihan status presensi
            if (e.target.closest('.attendance-option-btn')) {
                const button = e.target.closest('.attendance-option-btn');
                const status = button.getAttribute('data-status');
                
                if (currentEmployee) {
                    eventHandlers.submitAttendance(currentEmployee.id, status);
                }
            }
        });
        
        // Modal buttons
        elements.cancelPresensiModal.addEventListener('click', () => {
            elements.presensiModal.classList.remove('show');
            elements.presensiModal.classList.add('hidden');
        });
    },

    openAttendanceModal: (employee) => {
        const employeeData = EMPLOYEE_DATA.find(emp => emp.id === employee.id);
        const now = utils.getCurrentDateTime();
        
        // Update modal content
        elements.modalEmployeeName.textContent = employeeData.name;
        elements.modalEmployeeId.textContent = employeeData.id;
        elements.modalDepartment.textContent = employeeData.department;
        elements.modalPosition.textContent = employeeData.position;
        elements.modalDate.textContent = now.fullDate;
        elements.modalTime.textContent = now.fullTime;
        
        // Show modal
        elements.presensiModal.classList.remove('hidden');
        elements.presensiModal.classList.add('show');
    },

    submitAttendance: (employeeId, status) => {
        // Update attendance data
        dataManager.updateAttendanceData(employeeId, status);
        
        // Update UI
        eventHandlers.filterAttendance();
        
        // Show notification
        const employee = EMPLOYEE_DATA.find(emp => emp.id === employeeId);
        utils.showNotification(`Presensi ${employee.name} berhasil diupdate: ${status.toUpperCase()}`, 'success');
        
        // Close modal
        elements.presensiModal.classList.remove('show');
        elements.presensiModal.classList.add('hidden');
    },

    // Logout functionality
    setupLogoutHandlers: () => {
        elements.logoutBtn.addEventListener('click', () => {
            elements.logoutModal.classList.remove('hidden');
            elements.logoutModal.classList.add('show');
        });

        elements.cancelLogout.addEventListener('click', () => {
            elements.logoutModal.classList.remove('show');
            elements.logoutModal.classList.add('hidden');
        });

        elements.confirmLogout.addEventListener('click', () => {
            utils.showNotification('Logout berhasil. Mengarahkan ke halaman login...', 'success');
            
            setTimeout(() => {
                // Redirect to login page
                window.location.href = 'login.html';
            }, 1500);
        });
    },

    // Theme toggle
    setupThemeToggle: () => {
        const savedTheme = localStorage.getItem('presensinex-theme') || 'dark';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        
        elements.themeToggle.innerHTML = savedTheme === 'dark' 
            ? '<i class="fas fa-sun text-yellow-400 text-xl"></i>'
            : '<i class="fas fa-moon text-gray-800 text-xl"></i>';
        
        elements.themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('presensinex-theme', isDark ? 'dark' : 'light');
            
            elements.themeToggle.innerHTML = isDark 
                ? '<i class="fas fa-sun text-yellow-400 text-xl"></i>'
                : '<i class="fas fa-moon text-gray-800 text-xl"></i>';
        });
    }
};

// ==================== INITIALIZATION ====================
const initializeApp = () => {
    utils.showLoading();
    
    // Initialize data
    dataManager.initializeAttendanceData();
    state.filteredAttendance = [...ATTENDANCE_DATA];
    
    // Setup event handlers
    eventHandlers.setupTabSwitching();
    eventHandlers.setupEmployeePagination();
    eventHandlers.setupAttendanceHandlers();
    eventHandlers.setupAttendanceModal();
    eventHandlers.setupLogoutHandlers();
    eventHandlers.setupThemeToggle();
    
    // Render initial views
    render.renderProfile();
    render.renderEmployeeTable();
    render.renderTaskTable();
    render.updateDateDisplay();
    render.renderAttendanceTable();
    
    // Auto-refresh time every minute
    setInterval(() => {
        if (state.currentTab === 'presensi') {
            render.updateDateDisplay();
        }
    }, 60000);
    
    // Simulate loading completion
    setTimeout(() => {
        utils.hideLoading();
        utils.showNotification('Dashboard berhasil dimuat! Selamat bekerja.', 'success');
    }, 1500);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close modals
        if (e.key === 'Escape') {
            elements.presensiModal.classList.remove('show');
            elements.presensiModal.classList.add('hidden');
            elements.logoutModal.classList.remove('show');
            elements.logoutModal.classList.add('hidden');
        }
        
        // Ctrl+R to refresh employee data
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            state.filteredEmployees = [...EMPLOYEE_DATA];
            state.employeePage = 1;
            render.renderEmployeeTable();
            utils.showNotification('Data diperbarui dengan shortcut Ctrl+R', 'info');
        }
    });
};

// ==================== STYLES DYNAMIC ====================
// Tambahkan style dinamis untuk komponen yang belum ada
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Status Badge Styles */
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .status-hadir {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        .status-izin {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
            color: #f59e0b;
            border: 1px solid rgba(245, 158, 11, 0.3);
        }
        
        .status-alpa {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .status-pending {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
            color: #fbbf24;
            border: 1px solid rgba(251, 191, 36, 0.3);
        }
        
        .status-progress {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%);
            color: #3b82f6;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .status-completed {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.3);
        }
        
        /* Priority Badge Styles */
        .priority-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .priority-critical {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .priority-high {
            background: linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(234, 88, 12, 0.2) 100%);
            color: #f97316;
            border: 1px solid rgba(249, 115, 22, 0.3);
        }
        
        .priority-medium {
            background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
            color: #fbbf24;
            border: 1px solid rgba(251, 191, 36, 0.3);
        }
        
        .priority-low {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(21, 128, 61, 0.2) 100%);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.3);
        }
        
        /* Department Badge */
        .department-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
            border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        /* Input Attendance Button */
        .input-attendance-btn {
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 120px;
        }
        
        .input-attendance-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        
        /* Task Action Button */
        .task-action-btn {
            padding: 0.5rem;
            background: rgba(30, 41, 59, 0.8);
            border: 2px solid rgba(251, 191, 36, 0.3);
            color: var(--gold-primary);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .task-action-btn:hover {
            background: rgba(251, 191, 36, 0.1);
            border-color: var(--gold-primary);
            transform: translateY(-2px);
        }
        
        /* Dark Mode */
        .dark-mode {
            --text-primary: #ffffff;
            --text-secondary: #cbd5e1;
            --text-muted: #94a3b8;
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --bg-card: #1e293b;
            --bg-hover: #334155;
            --border-color: #334155;
            --border-hover: #fbbf24;
        }
        
       
       
        
        /* Loading Screen Enhancements */
        .loading-screen .relative.w-28.h-28 {
            position: relative;
            width: 7rem;
            height: 7rem;
        }
        
        .loading-screen .absolute.inset-0
         {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        
        .loading-screen .absolute.inset-2 {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            bottom: 0.5rem;
            left: 0.5rem;
        }
        
        .loading-screen .absolute.-inset-2 {
            position: absolute;
            top: -0.5rem;
            right: -0.5rem;
            bottom: -0.5rem;
            left: -0.5rem;
        }
    `;
    document.head.appendChild(style);
};

// ==================== START APPLICATION ====================
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    initializeApp();
    
    // Tambahkan event listener untuk resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    });
    
    // Initial check
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-view');
    }
});

