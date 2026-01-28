const userData = {
    name: "Ahmad Fauzi",
    id: "PES-2026-001",
    courses: 4,
    sessions: 96,
    attendance: "92.7%",
    pendingTasks: 3
};

const coursesData = [
    {
        id: 1,
        name: "Komputer Dasar",
        coach: "Ekal Arga Fraizy",
        progress: 83,
        attendance: { hadir: 25, izin: 0, alpha: 0 },
        schedule: "Senin, Kamis (08:00 - 12:00)",
        level: "Basic",
        color: "blue",
        materials: [
            { 
                id: 1, 
                name: "Microsoft Word: Formatting Dokumen", 
                type: "pdf", 
                size: "2.4 MB", 
                downloads: 24,
                fileUrl: "#",
                date: "2026-03-11",
                description: "Modul lengkap Microsoft Word untuk pemula"
            },
            { 
                id: 2, 
                name: "Microsoft Excel: Formula Dasar", 
                type: "video", 
                size: "45 MB", 
                downloads: 22,
                fileUrl: "#",
                date: "2026-03-14",
                description: "Video tutorial formula dasar Excel"
            },
            { 
                id: 3, 
                name: "Microsoft PowerPoint: Template", 
                type: "zip", 
                size: "4.7 MB", 
                downloads: 20,
                fileUrl: "#",
                date: "2026-01-25",
                description: "Template dan tutorial presentasi"
            }
        ]
    },
    {
        id: 2,
        name: "Content Creator",
        coach: "Faizal Arya Putu Nirmansyah",
        progress: 92,
        attendance: { hadir: 11, izin: 1, alpha: 0 },
        schedule: "Selasa, Jumat (13:00 - 17:00)",
        level: "Content",
        color: "emerald",
        materials: [
            { 
                id: 1, 
                name: "Content Ethics", 
                type: "pdf", 
                size: "1.8 MB", 
                downloads: 18,
                fileUrl: "#",
                date: "2026-01-16",
                description: "Panduan etika konten untuk media sosial"
            },
            { 
                id: 2, 
                name: "Video Editing Tutorial", 
                type: "video", 
                size: "85 MB", 
                downloads: 15,
                fileUrl: "#",
                date: "2026-01-22",
                description: "Tutorial editing video untuk pemula"
            }
        ]
    },
    {
        id: 3,
        name: "Desain Grafis",
        coach: "Afdhal Fauzan",
        progress: 83,
        attendance: { hadir: 10, izin: 1, alpha: 1 },
        schedule: "Rabu, Sabtu (08:00 - 12:00)",
        level: "Design",
        color: "pink",
        materials: [
            { 
                id: 1, 
                name: "Adobe Photoshop: Layer & Masking", 
                type: "video", 
                size: "62 MB", 
                downloads: 17,
                fileUrl: "#",
                date: "2026-03-13",
                description: "Video tutorial layer dan masking Photoshop"
            },
            { 
                id: 2, 
                name: "Canva Pro Templates", 
                type: "zip", 
                size: "6.3 MB", 
                downloads: 16,
                fileUrl: "#",
                date: "2026-01-17",
                description: "Koleksi template Canva premium"
            },
            { 
                id: 3, 
                name: "Motion Graphics Project", 
                type: "pdf", 
                size: "3.5 MB", 
                downloads: 12,
                fileUrl: "#",
                date: "2026-01-23",
                description: "Proyek motion graphics step-by-step"
            }
        ]
    },
    {
        id: 4,
        name: "Digital Marketing",
        coach: "Latif Akbar Maulana",
        progress: 92,
        attendance: { hadir: 11, izin: 0, alpha: 0 },
        schedule: "Rabu, Sabtu (13:00 - 17:00)",
        level: "Marketing",
        color: "amber",
        materials: [
            { 
                id: 1, 
                name: "Analytics & Reporting: Dashboard", 
                type: "video", 
                size: "58 MB", 
                downloads: 19,
                fileUrl: "#",
                date: "2026-03-10",
                description: "Video tutorial dashboard analytics"
            },
            { 
                id: 2, 
                name: "SEO Optimization Guide", 
                type: "pdf", 
                size: "2.9 MB", 
                downloads: 17,
                fileUrl: "#",
                date: "2026-01-24",
                description: "Panduan optimasi SEO lengkap"
            }
        ]
    }
];

// Data presensi
let presensiData = [
    { id: 1, kursus: "Komputer Dasar", materi: "Microsoft Word", sesi: "Pertemuan 1", tanggal: "2026-01-20", status: "Hadir", coach: "Ekal Arga Fraizy" },
    { id: 2, kursus: "Content Creator", materi: "Fondasi & Strategi Konten", sesi: "Pertemuan 2", tanggal: "2026-01-21", status: "Terlambat", coach: "Faizal Arya Putu Nirmansyah" },
    { id: 3, kursus: "Desain Grafis", materi: "Canva", sesi: "Pertemuan 3", tanggal: "2026-01-22", status: "Hadir", coach: "Afdhal Fauzan" },
    { id: 4, kursus: "Digital Marketing", materi: "Riset Data Bisnis Digital", sesi: "Pertemuan 1", tanggal: "2026-01-23", status: "Hadir", coach: "Latif Akbar Maulana" },
    { id: 5, kursus: "Komputer Dasar", materi: "Microsoft Excel", sesi: "Pertemuan 2", tanggal: "2026-01-20", status: "Izin", coach: "Ekal Arga Fraizy" },
    { id: 6, kursus: "Content Creator", materi: "Produksi Konten Video", sesi: "Pertemuan 4", tanggal: "2026-01-24", status: "Hadir", coach: "Faizal Arya Putu Nirmansyah" }
];

// Data tugas
const tasksData = [
    { id: 1, name: "Project Microsoft Word", course: "Komputer Dasar", status: "pending", coach: "Ekal Arga Fraizy", deadline: "2026-01-27", submission: "-", grade: "-" },
    { id: 2, name: "Video Content Plan", course: "Content Creator", status: "submitted", coach: "Faizal Arya Putu Nirmansyah", deadline: "2026-01-25", submission: "2026-01-24", grade: "-" },
    { id: 3, name: "Desain Logo dengan Canva", course: "Desain Grafis", status: "graded", coach: "Afdhal Fauzan", deadline: "2026-01-20", submission: "2026-01-19", grade: "A" },
    { id: 4, name: "Analisis Pasar Digital", course: "Digital Marketing", status: "pending", coach: "Latif Akbar Maulana", deadline: "2026-01-30", submission: "-", grade: "-" },
    { id: 5, name: "Laporan Excel", course: "Komputer Dasar", status: "overdue", coach: "Ekal Arga Fraizy", deadline: "2026-01-18", submission: "-", grade: "-" },
    { id: 6, name: "Motion Graphics Project", course: "Desain Grafis", status: "graded", coach: "Afdhal Fauzan", deadline: "2026-01-15", submission: "2026-01-14", grade: "B+" }
];

// Data jadwal dengan informasi materi
const scheduleData = [
    { 
        day: "Senin", 
        date: "26 Jan", 
        course: "Komputer Dasar", 
        time: "08:00 - 12:00", 
        room: "Lab 1", 
        coach: "Ekal Arga Fraizy",
        topic: "Microsoft Word: Formatting teks, page layout, dan pembuatan dokumen profesional"
    },
    { 
        day: "Selasa", 
        date: "27 Jan", 
        course: "Content Creator", 
        time: "13:00 - 17:00", 
        room: "Studio", 
        coach: "Faizal Arya Putu Nirmansyah",
        topic: "Fondasi & Strategi Konten: Personal branding dan content planning"
    },
    { 
        day: "Rabu", 
        date: "28 Jan", 
        course: "Desain Grafis", 
        time: "08:00 - 12:00", 
        room: "Lab 2", 
        coach: "Afdhal Fauzan",
        topic: "Canva & Adobe Photoshop: Design elements dan photo editing dasar"
    },
    { 
        day: "Kamis", 
        date: "29 Jan", 
        course: "Komputer Dasar", 
        time: "08:00 - 12:00", 
        room: "Lab 1", 
        coach: "Ekal Arga Fraizy",
        topic: "Microsoft Excel: Formula dasar, penggunaan fungsi, dan pembuatan chart"
    },
    { 
        day: "Jumat", 
        date: "30 Jan", 
        course: "Content Creator", 
        time: "13:00 - 17:00", 
        room: "Studio", 
        coach: "Faizal Arya Putu Nirmansyah",
        topic: "Produksi Konten Video: Script writing, shooting, dan basic editing"
    }
];

    document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
    
    // Set user data
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('welcomeName').textContent = userData.name.split(' ')[0];
    document.getElementById('totalCourses').textContent = userData.courses;
    document.getElementById('totalSessions').textContent = userData.sessions;
    document.getElementById('totalAttendance').textContent = userData.attendance;
    document.getElementById('pendingTasks').textContent = userData.pendingTasks;
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.textContent = userData.name.charAt(0);
    }
    
    setupTabNavigation();
    setupMaterialDropdowns();
    setupTaskFilters();
    loadPresensiData();
    loadTasksData('all');
    loadScheduleData();
    setupEventListeners();
    initTheme();
});

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
                
                if (tabId === 'presensi') {
                    loadPresensiData();
                } else if (tabId === 'tugas') {
                    loadTasksData('all');
                } else if (tabId === 'jadwal') {
                    loadScheduleData();
                }
            }
        });
    });
}

function setupMaterialDropdowns() {
    const dropdownBtns = document.querySelectorAll('.material-dropdown-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.closest('.material-dropdown');
            const content = dropdown.querySelector('.material-dropdown-content');
            const icon = btn.querySelector('.fa-chevron-down');
            
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
            
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherDropdown = otherBtn.closest('.material-dropdown');
                    const otherContent = otherDropdown.querySelector('.material-dropdown-content');
                    const otherIcon = otherBtn.querySelector('.fa-chevron-down');
                    
                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('rotate-180');
                }
            });
        });
    });
    
    document.addEventListener('click', () => {
        document.querySelectorAll('.material-dropdown-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.querySelectorAll('.material-dropdown-btn .fa-chevron-down').forEach(icon => {
            icon.classList.remove('rotate-180');
        });
    });
}

function setupTaskFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            loadTasksData(filter);
        });
    });
}

function loadPresensiData(page = 1, itemsPerPage = 5) {
    const tableBody = document.getElementById('presensiTableBody');
    const presensiCount = document.getElementById('presensiCount');
    const currentPageElem = document.getElementById('currentPresensiPage');
    const totalPagesElem = document.getElementById('totalPresensiPages');
    const prevBtn = document.getElementById('prevPresensiBtn');
    const nextBtn = document.getElementById('nextPresensiBtn');
    const totalPages = Math.ceil(presensiData.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = presensiData.slice(startIndex, endIndex);

    presensiCount.textContent = presensiData.length;
    currentPageElem.textContent = page;
    totalPagesElem.textContent = totalPages;
    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
    prevBtn.onclick = () => page > 1 && loadPresensiData(page - 1, itemsPerPage);
    nextBtn.onclick = () => page < totalPages && loadPresensiData(page + 1, itemsPerPage);
    tableBody.innerHTML = '';
    
    currentData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        let statusClass = '';
        switch(item.status) {
            case 'Hadir': statusClass = 'bg-emerald-500/20 text-emerald-400'; break;
            case 'Izin': statusClass = 'bg-blue-500/20 text-blue-400'; break;
            case 'Alpa': statusClass = 'bg-red-500/20 text-red-400'; break;
        }
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${startIndex + index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">${item.kursus}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.materi}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.sesi}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${formatDate(item.tanggal)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">${item.status}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${item.coach}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="editPresensi(${item.id})" class="text-blue-400 hover:text-blue-300 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePresensi(${item.id})" class="text-red-400 hover:text-red-300">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadTasksData(filter = 'all') {
    const tableBody = document.getElementById('taskTableBody');
    const taskCount = document.getElementById('taskCount');
    let filteredTasks = tasksData;
    if (filter !== 'all') {
        filteredTasks = tasksData.filter(task => task.status === filter);
    }
    taskCount.textContent = filteredTasks.length;
    tableBody.innerHTML = '';
    filteredTasks.forEach(task => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-900/30 transition-colors';
        let statusClass = '', statusText = '';
        switch(task.status) {
            case 'pending': 
                statusClass = 'bg-amber-500/20 text-amber-400'; 
                statusText = 'Belum Dikerjakan';
                break;
            case 'submitted': 
                statusClass = 'bg-blue-500/20 text-blue-400'; 
                statusText = 'Sudah Dikumpulkan';
                break;
            case 'graded': 
                statusClass = 'bg-emerald-500/20 text-emerald-400'; 
                statusText = 'Sudah Dinilai';
                break;
            case 'overdue': 
                statusClass = 'bg-red-500/20 text-red-400'; 
                statusText = 'Terlambat';
                break;
        }
        let gradeClass = 'text-gray-300';
        if (task.grade === 'A') gradeClass = 'text-emerald-400 font-bold';
        if (task.grade === 'B+') gradeClass = 'text-blue-400 font-bold';
        if (task.grade === 'B') gradeClass = 'text-amber-400 font-bold';
        let actionBtn = '';
        if (task.status === 'pending' || task.status === 'overdue') {
            actionBtn = `<button onclick="submitTask(${task.id})" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs rounded-lg font-semibold hover:opacity-90 transition-all">
                            <i class="fas fa-upload mr-1"></i>Kumpulkan
                        </button>`;
        } else if (task.status === 'submitted') {
            actionBtn = `<span class="text-blue-400 text-sm">Menunggu penilaian</span>`;
        } else {
            actionBtn = `<span class="text-emerald-400 text-sm">Selesai</span>`;
        }
        
        row.innerHTML = `
            <td class="px-6 py-4">
                <div>
                    <div class="text-sm font-medium text-white">${task.name}</div>
                    <div class="text-xs text-gray-500">${task.course}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">${statusText}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${task.coach}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm ${task.status === 'overdue' ? 'text-red-400' : 'text-gray-300'}">
                ${formatDate(task.deadline)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${task.submission !== '-' ? formatDate(task.submission) : '-'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm ${gradeClass}">
                ${task.grade}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                ${actionBtn}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadScheduleData() {
    const scheduleContainer = document.getElementById('weeklySchedule');
    
    // Render jadwal mingguan dengan materi
    scheduleContainer.innerHTML = '';
    scheduleData.forEach((schedule, index) => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'card mb-6 overflow-hidden border-2 border-gray-800 hover:border-yellow-500/50 transition-all duration-300';
        scheduleItem.style.animationDelay = `${index * 0.1}s`;
        
        const materials = getMaterialsForCourse(schedule.course);
        const courseData = coursesData.find(c => c.name === schedule.course);
        
        scheduleItem.innerHTML = `
            <div class="p-6">
                <!-- Header Jadwal - NAVY THEME -->
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gray-800/50">
                    <div class="mb-4 md:mb-0">
                        <div class="flex items-start mb-4">
                            <div class="mr-4 text-center min-w-16">
                                <div class="text-sm font-extrabold text-yellow-400 uppercase tracking-wider">${schedule.day}</div>
                                <div class="text-2xl font-black text-white mt-1">${schedule.date.split(' ')[0]}</div>
                                <div class="text-xs text-gray-400 font-medium">${schedule.date.split(' ')[1]}</div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <h3 class="text-xl font-black text-white">${schedule.course}</h3>
                                    <span class="px-3 py-1 text-xs font-extrabold rounded-full ${courseData?.badgeColor || 'from-gray-600 to-gray-700'} bg-gradient-to-r text-white">
                                        ${courseData?.level || 'Course'}
                                    </span>
                                </div>
                                <div class="flex flex-wrap gap-4 mt-3">
                                    <span class="text-sm text-gray-300 font-medium flex items-center">
                                        <i class="fas fa-clock mr-2 text-yellow-500"></i>${schedule.time}
                                    </span>
                                    <span class="text-sm text-gray-300 font-medium flex items-center">
                                        <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>${schedule.room}
                                    </span>
                                    <span class="text-sm text-gray-300 font-medium flex items-center">
                                        <i class="fas fa-user mr-2 text-yellow-500"></i>${schedule.coach}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center">
                        <div class="text-right bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                            <div class="text-sm text-gray-400 font-medium">Materi Tersedia</div>
                            <div class="text-2xl font-black text-yellow-400">${materials.length}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Materi yang Akan Dibahas - NAVY THEME -->
                <div class="mb-6">
                    <h4 class="text-lg font-bold text-white mb-3 flex items-center">
                        <i class="fas fa-book-open mr-3 text-yellow-400"></i>
                        Materi yang Akan Dibahas
                    </h4>
                    <p class="text-gray-300 bg-gray-900/30 p-4 rounded-xl border-l-4 border-yellow-500 font-medium">
                        ${schedule.topic}
                    </p>
                </div>
                
                <!-- Materi yang Bisa Diunduh - NAVY THEME -->
                ${materials.length > 0 ? `
                <div>
                    <h4 class="text-lg font-bold text-white mb-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-download mr-3 text-yellow-400"></i>
                            Materi untuk Diunduh
                        </div>
                        <span class="text-sm text-gray-400 font-medium">Total: ${materials.length}</span>
                    </h4>
                    
                    <div class="space-y-3 mb-4">
                        ${materials.slice(0, 3).map(material => `
                        <div class="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-gray-800/50 transition-colors group border border-gray-800 hover:border-yellow-500/30">
                            <div class="flex items-center">
                                <div class="mr-4">
                                    ${getFileIcon(material.type)}
                                </div>
                                <div>
                                    <div class="font-bold text-white mb-1">${material.name}</div>
                                    <div class="text-xs text-gray-400 flex items-center gap-4">
                                        <span class="flex items-center font-medium">
                                            <i class="fas fa-file mr-2 text-yellow-500"></i> ${material.type.toUpperCase()}
                                        </span>
                                        <span class="flex items-center font-medium">
                                            <i class="fas fa-weight-hanging mr-2 text-yellow-500"></i> ${material.size}
                                        </span>
                                        <span class="flex items-center font-medium">
                                            <i class="fas fa-download mr-2 text-yellow-500"></i> ${material.downloads || 0}x
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onclick="downloadMaterial(${material.id}, '${schedule.course}', '${material.name}')" 
                                    class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-navy-900 font-bold hover:opacity-90 transition-all text-sm flex items-center rounded-lg border-2 border-yellow-500">
                                <i class="fas fa-download mr-2"></i>
                                Download
                            </button>
                        </div>
                        `).join('')}
                    </div>
                    
                    ${materials.length > 3 ? `
                    <div class="mt-4 text-center">
                        <button onclick="showAllMaterials('${schedule.course}')" 
                                class="text-yellow-400 hover:text-yellow-300 font-bold text-sm flex items-center justify-center mx-auto gap-2 px-4 py-2 bg-gray-900/50 hover:bg-gray-800/70 rounded-lg transition-colors border border-gray-800 hover:border-yellow-500/50">
                            <i class="fas fa-chevron-down"></i>
                            Lihat semua ${materials.length} materi
                        </button>
                    </div>
                    ` : ''}
                </div>
                ` : `
                <div class="text-center py-8 bg-gray-900/30 rounded-xl border border-gray-800">
                    <i class="fas fa-folder-open text-4xl text-gray-600 mb-3"></i>
                    <p class="text-gray-400 font-medium">Belum ada materi untuk diunduh</p>
                </div>
                `}
            </div>
        `;
        
        scheduleContainer.appendChild(scheduleItem);
    });
}

function getMaterialsForCourse(courseName) {
    const course = coursesData.find(c => c.name === courseName);
    return course?.materials || [];
}

function getFileIcon(fileType) {
    const icons = {
        'pdf': 'fa-file-pdf text-red-500',
        'zip': 'fa-file-archive text-yellow-500',
        'video': 'fa-file-video text-blue-500',
        'doc': 'fa-file-word text-blue-400',
        'xls': 'fa-file-excel text-emerald-400',
        'ppt': 'fa-file-powerpoint text-orange-400',
        'image': 'fa-file-image text-purple-400'
    };
    
    const iconClass = icons[fileType] || 'fa-file text-gray-400';
    return `<i class="fas ${iconClass} text-2xl"></i>`;
}

function downloadMaterial(materialId, courseName, materialName) {
    const materials = getMaterialsForCourse(courseName);
    const material = materials.find(m => m.id === materialId);
    
    if (!material) {
        showAlert('error', 'Gagal', 'Materi tidak ditemukan');
        return;
    }
    material.downloads = (material.downloads || 0) + 1;
    
    showAlert('info', 'Mengunduh...', 
        `<div class="flex items-center gap-3">
            <i class="fas fa-download text-yellow-500 text-xl"></i>
            <div>
                <div class="font-bold text-white">${materialName}</div>
                <div class="text-sm text-gray-300">${material.size} • ${material.type.toUpperCase()}</div>
            </div>
        </div>`);
    
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = material.fileUrl || '#';
        link.download = `${materialName.replace(/[^a-z0-9]/gi, '_')}.${material.type}`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        loadScheduleData();

        showAlert('success', 'Berhasil!', 
            `<div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <i class="fas fa-check text-white"></i>
                </div>
                <div>
                    <div class="font-bold text-white">${materialName}</div>
                    <div class="text-sm text-gray-300">Berhasil diunduh • ${material.size}</div>
                </div>
            </div>`);
        
    }, 1500);
}

function showAllMaterials(courseName) {
    const materials = getMaterialsForCourse(courseName);
    const courseData = coursesData.find(c => c.name === courseName);

    const modalContent = `
        <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-r ${courseData?.badgeColor || 'from-gray-600 to-gray-700'} flex items-center justify-center">
                    <i class="fas fa-book text-white"></i>
                </div>
                <div>
                    <div>Semua Materi</div>
                    <div class="text-sm text-gray-400 font-medium">${courseName}</div>
                </div>
            </h3>
            
            <div class="space-y-3 max-h-96 overflow-y-auto pr-2">
                ${materials.map((material, index) => `
                <div class="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-800/70 transition-colors border border-gray-800">
                    <div class="flex items-center">
                        <div class="mr-4">
                            ${getFileIcon(material.type)}
                        </div>
                        <div>
                            <div class="font-bold text-white mb-1">${index + 1}. ${material.name}</div>
                            <div class="text-sm text-gray-400 mb-2">${material.description}</div>
                            <div class="flex items-center gap-4">
                                <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <i class="fas fa-file text-yellow-500"></i> ${material.type.toUpperCase()}
                                </span>
                                <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <i class="fas fa-weight-hanging text-yellow-500"></i> ${material.size}
                                </span>
                                <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <i class="fas fa-calendar text-yellow-500"></i> ${formatDate(material.date)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-xs bg-gray-800 px-3 py-1 rounded-lg font-bold border border-gray-700">
                            ${material.downloads || 0} downloads
                        </span>
                        <button onclick="downloadMaterial(${material.id}, '${courseName}', '${material.name}')" 
                                class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-navy-900 font-bold hover:opacity-90 transition-all text-sm rounded-lg border-2 border-yellow-500">
                            <i class="fas fa-download mr-1"></i>
                            Download
                        </button>
                    </div>
                </div>
                `).join('')}
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-800">
                <div class="flex justify-between items-center">
                    <div class="text-center">
                        <div class="text-sm text-gray-400 font-medium">Total Materi</div>
                        <div class="text-xl font-black text-white">${materials.length}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-400 font-medium">Total Downloads</div>
                        <div class="text-xl font-black text-yellow-400">
                            ${materials.reduce((sum, m) => sum + (m.downloads || 0), 0)}
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-400 font-medium">Total Ukuran</div>
                        <div class="text-xl font-black text-blue-400">
                            ${materials.reduce((sum, m) => {
                                const size = parseFloat(m.size) || 0;
                                return sum + size;
                            }, 0).toFixed(1)} MB
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <button onclick="closeMaterialModal()" 
                        class="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700">
                    Tutup
                </button>
            </div>
        </div>
    `;
    
    showMaterialModal(modalContent);
}

function showMaterialModal(content) {
    const existingModal = document.getElementById('materialModal');
    if (existingModal) existingModal.remove();
    const modal = document.createElement('div');
    modal.id = 'materialModal';
    modal.className = 'modal fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" onclick="closeMaterialModal()"></div>
        <div class="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border-2 border-yellow-500/30 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div class="sticky top-0 bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 border-b border-yellow-500">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-black text-white">Detail Materi</h3>
                    <button onclick="closeMaterialModal()" 
                            class="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('opacity-100'), 10);
}

function closeMaterialModal() {
    const modal = document.getElementById('materialModal');
    if (modal) {
        modal.classList.remove('opacity-100');
        setTimeout(() => modal.remove(), 300);
    }
}

function tambahPresensi() {
    const kursus = document.getElementById('inputCourse').value;
    const materi = document.getElementById('inputMateri').value;
    const sesi = document.getElementById('inputSesi').value;
    const tanggal = document.getElementById('inputTanggal').value;
    const status = document.getElementById('inputStatus').value;
    if (!kursus || !materi || !sesi || !tanggal || !status) {
        showAlert('error', 'Data tidak lengkap', 'Harap isi semua field yang diperlukan');
        return;
    }
    
    const newPresensi = {
        id: presensiData.length > 0 ? Math.max(...presensiData.map(p => p.id)) + 1 : 1,
        kursus: kursus,
        materi: document.querySelector(`#inputMateri option[value="${materi}"]`).textContent,
        sesi: `Sesi ${sesi}`,
        tanggal: tanggal,
        status: status,
        coach: getCoachByCourse(kursus)
    };
    presensiData.unshift(newPresensi);
    
    document.getElementById('inputCourse').value = '';
    document.getElementById('inputMateri').value = '';
    document.getElementById('inputSesi').value = '';
    document.getElementById('inputStatus').value = 'Hadir';
    
    loadPresensiData();
    showAlert('success', 'Berhasil!', 'Presensi berhasil ditambahkan');
}

function editPresensi(id) {
    const presensi = presensiData.find(p => p.id === id);
    if (!presensi) return;
    document.getElementById('inputCourse').value = presensi.kursus;
    
    // Temukan nilai materi yang sesuai
    const materiSelect = document.getElementById('inputMateri');
    for (let option of materiSelect.options) {
        if (option.textContent === presensi.materi) {
            materiSelect.value = option.value;
            break;
        }
    }
    
    // Ekstrak nomor sesi
    const sesiNumber = presensi.sesi.split(' ')[1];
    document.getElementById('inputSesi').value = sesiNumber;
    document.getElementById('inputTanggal').value = presensi.tanggal;
    document.getElementById('inputStatus').value = presensi.status;
    
    // Hapus data lama
    deletePresensi(id, false);
    
    // Scroll ke form
    document.getElementById('inputCourse').focus();
    showAlert('info', 'Edit mode', 'Silakan edit data dan klik "Tambah Presensi" untuk menyimpan perubahan');
}

// Fungsi untuk menghapus presensi
function deletePresensi(id, showNotification = true) {
    const index = presensiData.findIndex(p => p.id === id);
    if (index !== -1) {
        presensiData.splice(index, 1);
        loadPresensiData();
        
        if (showNotification) {
            showAlert('success', 'Berhasil!', 'Presensi berhasil dihapus');
        }
    }
}

// Fungsi untuk mengumpulkan tugas
function submitTask(id) {
    const task = tasksData.find(t => t.id === id);
    if (task) {
        task.status = 'submitted';
        task.submission = new Date().toISOString().split('T')[0];
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        loadTasksData(activeFilter);
        
        const pendingTasks = tasksData.filter(t => t.status === 'pending' || t.status === 'overdue').length;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        userData.pendingTasks = pendingTasks;
        
        showAlert('success', 'Berhasil!', 'Tugas berhasil dikumpulkan');
    }
}

// function format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// function coach berdasarkan kursus
function getCoachByCourse(courseName) {
    const course = coursesData.find(c => c.name === courseName);
    return course ? course.coach : "Unknown";
}

// Fungsi untuk menampilkan alert
function showAlert(icon, title, text) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl ${
        icon === 'success' ? 'bg-emerald-900/90 border border-emerald-700' :
        icon === 'error' ? 'bg-red-900/90 border border-red-700' :
        'bg-blue-900/90 border border-blue-700'
    }`;
    alertDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${icon === 'success' ? 'check-circle' : icon === 'error' ? 'exclamation-circle' : 'info-circle'} 
                mr-3 text-${icon === 'success' ? 'emerald' : icon === 'error' ? 'red' : 'blue'}-400 text-xl"></i>
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
    const logoutDropdownBtn = document.getElementById('logoutDropdownBtn');
    if (logoutDropdownBtn) {
        logoutDropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Tampilkan konfirmasi logout
            if (confirm('Apakah Anda yakin ingin logout?')) {
                showAlert('info', 'Logout Berhasil', 'Anda telah keluar dari sistem');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    document.addEventListener('click', (e) => {
        const materialModal = document.getElementById('materialModal');
        if (materialModal && e.target === materialModal) {
            closeMaterialModal();
        }
    });
    
    console.log('Event listeners berhasil dipasang');
}

// Fungsi untuk toggle tema
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.theme-icon.sun');
    const moonIcon = document.querySelector('.theme-icon.moon');
    
    if (theme === 'light') {
        sunIcon.classList.add('text-yellow-500');
        moonIcon.classList.remove('text-blue-300');
    } else {
        sunIcon.classList.remove('text-yellow-500');
        moonIcon.classList.add('text-blue-300');
    }
}