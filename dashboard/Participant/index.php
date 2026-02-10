<?php

session_start();
// Cek apakah user sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: ../../login.php");
    exit();
}

$user_id = $_SESSION['user_id']; // ID user yang login

// Koneksi database
require_once '../../config/database.php';
$database = new Database();
$conn = $database->getConnection();

// =============================================
// QUERY DATA DARI DATABASE
// =============================================

// 1. DATA USER
$queryUser = "
    SELECT u.*, 
           (SELECT COUNT(*) FROM user_courses WHERE user_id = u.id) as total_courses,
           (SELECT SUM(total_sesi) FROM courses c 
            JOIN user_courses uc ON c.id = uc.course_id 
            WHERE uc.user_id = u.id) as total_sessions
    FROM users u 
    WHERE u.id = :user_id
";
$stmtUser = $conn->prepare($queryUser);
$stmtUser->execute(['user_id' => $user_id]);
$userData = $stmtUser->fetch(PDO::FETCH_ASSOC);

// 2. DATA COURSES untuk user ini
$queryCourses = "
    SELECT 
        c.*,
        ch.nama as coach_name,
        uc.progress,
        (SELECT COUNT(*) FROM attendance a 
         WHERE a.user_id = :user_id AND a.course_id = c.id AND a.status = 'Hadir') as hadir,
        (SELECT COUNT(*) FROM attendance a 
         WHERE a.user_id = :user_id AND a.course_id = c.id AND a.status = 'Izin') as izin,
        (SELECT COUNT(*) FROM attendance a 
         WHERE a.user_id = :user_id AND a.course_id = c.id AND a.status = 'Alpa') as alpha
    FROM user_courses uc
    JOIN courses c ON uc.course_id = c.id
    LEFT JOIN coaches ch ON uc.coach_id = ch.id
    WHERE uc.user_id = :user_id AND uc.status = 'active'
";
$stmtCourses = $conn->prepare($queryCourses);
$stmtCourses->execute(['user_id' => $user_id]);
$coursesData = $stmtCourses->fetchAll(PDO::FETCH_ASSOC);

// 3. DATA MATERIALS per course
$materialsByCourse = [];
foreach ($coursesData as $course) {
    $queryMaterials = "
        SELECT * FROM course_materials 
        WHERE course_id = :course_id 
        ORDER BY tanggal_upload DESC
    ";
    $stmtMaterials = $conn->prepare($queryMaterials);
    $stmtMaterials->execute(['course_id' => $course['id']]);
    $materialsByCourse[$course['id']] = $stmtMaterials->fetchAll(PDO::FETCH_ASSOC);
}

// 4. DATA PRESENSI
$queryPresensi = "
    SELECT 
        a.*,
        c.nama_kursus as kursus,
        ch.nama as coach_name,
        CONCAT('Pertemuan ', a.sesi_ke) as sesi
    FROM attendance a
    JOIN courses c ON a.course_id = c.id
    LEFT JOIN coaches ch ON a.coach_id = ch.id
    WHERE a.user_id = :user_id 
    ORDER BY a.tanggal DESC, a.sesi_ke DESC
";
$stmtPresensi = $conn->prepare($queryPresensi);
$stmtPresensi->execute(['user_id' => $user_id]);
$presensiData = $stmtPresensi->fetchAll(PDO::FETCH_ASSOC);

// 5. DATA TUGAS
$queryTasks = "
    SELECT 
        t.*,
        c.nama_kursus as course_name,
        ch.nama as coach_name
    FROM tasks t
    JOIN courses c ON t.course_id = c.id
    LEFT JOIN coaches ch ON t.coach_id = ch.id
    WHERE t.user_id = :user_id 
    ORDER BY 
        CASE t.status 
            WHEN 'overdue' THEN 1
            WHEN 'pending' THEN 2
            WHEN 'submitted' THEN 3
            ELSE 4
        END,
        t.deadline ASC
";
$stmtTasks = $conn->prepare($queryTasks);
$stmtTasks->execute(['user_id' => $user_id]);
$tasksData = $stmtTasks->fetchAll(PDO::FETCH_ASSOC);

// 6. DATA JADWAL minggu ini
$querySchedule = "
    SELECT 
        s.*,
        c.nama_kursus as course_name,
        ch.nama as coach_name,
        c.level,
        c.warna
    FROM schedule s
    JOIN courses c ON s.course_id = c.id
    LEFT JOIN coaches ch ON (
        SELECT id FROM coaches WHERE courses_id = c.id LIMIT 1
    )
    WHERE s.course_id IN (
        SELECT course_id FROM user_courses 
        WHERE user_id = :user_id AND status = 'active'
    )
    ORDER BY 
        FIELD(s.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'),
        s.waktu
    LIMIT 5
";
$stmtSchedule = $conn->prepare($querySchedule);
$stmtSchedule->execute(['user_id' => $user_id]);
$scheduleData = $stmtSchedule->fetchAll(PDO::FETCH_ASSOC);

// 7. HITUNG TOTAL ATTENDANCE (persentase)
$queryAttendanceStats = "
    SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Hadir' THEN 1 ELSE 0 END) as hadir
    FROM attendance 
    WHERE user_id = :user_id
";
$stmtStats = $conn->prepare($queryAttendanceStats);
$stmtStats->execute(['user_id' => $user_id]);
$stats = $stmtStats->fetch(PDO::FETCH_ASSOC);

$attendancePercentage = ($stats['total'] > 0) 
    ? round(($stats['hadir'] / $stats['total']) * 100, 1) . '%'
    : '0%';

// 8. HITUNG PENDING TASKS
$queryPendingTasks = "
    SELECT COUNT(*) as pending FROM tasks 
    WHERE user_id = :user_id AND status IN ('pending', 'overdue')
";
$stmtPending = $conn->prepare($queryPendingTasks);
$stmtPending->execute(['user_id' => $user_id]);
$pendingResult = $stmtPending->fetch(PDO::FETCH_ASSOC);
$pendingTasks = $pendingResult['pending'];

// Format data user untuk JavaScript
$userDataForJS = [
    'name' => $userData['nama'],
    'id' => $userData['id_pelatihan'],
    'courses' => $userData['total_courses'] ?? 0,
    'sessions' => $userData['total_sessions'] ?? 0,
    'attendance' => $attendancePercentage,
    'pendingTasks' => $pendingTasks
];

// Fungsi helper
function formatDatePHP($dateString) {
    if ($dateString == '-' || empty($dateString) || $dateString == '0000-00-00') return '-';
    $date = new DateTime($dateString);
    return $date->format('d M Y');
}

function getFileIconPHP($fileType) {
    $icons = [
        'pdf' => 'fa-file-pdf text-red-500',
        'zip' => 'fa-file-archive text-yellow-500',
        'video' => 'fa-file-video text-blue-500',
        'doc' => 'fa-file-word text-blue-400',
        'xls' => 'fa-file-excel text-emerald-400',
        'ppt' => 'fa-file-powerpoint text-orange-400'
    ];
    
    $iconClass = $icons[$fileType] ?? 'fa-file text-gray-400';
    return '<i class="fas ' . $iconClass . ' text-2xl"></i>';
}

function getBadgeColor($level) {
    $colors = [
        'Basic' => 'from-blue-600 to-blue-700',
        'Content' => 'from-emerald-600 to-emerald-700',
        'Design' => 'from-pink-600 to-pink-700',
        'Marketing' => 'from-amber-600 to-amber-700'
    ];
    return $colors[$level] ?? 'from-gray-600 to-gray-700';
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PresensiNex - Dashboard Peserta</title>
    <link rel="icon" type="image/png" href="logonex.png">
    <link rel="shortcut icon" href="logonex.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Data dari PHP untuk JavaScript
        window.phpData = {
            userData: <?= json_encode($userDataForJS) ?>,
            coursesData: <?= json_encode($coursesData) ?>,
            materialsByCourse: <?= json_encode($materialsByCourse) ?>,
            presensiData: <?= json_encode($presensiData) ?>,
            tasksData: <?= json_encode($tasksData) ?>,
            scheduleData: <?= json_encode($scheduleData) ?>
        };
    </script>
</head>
<body class="text-gray-100 dark-mode">
    <div class="fixed top-4 right-4 z-50">
        <div class="theme-toggle" id="themeToggle">
            <button disabled 
             title="Fitur belum tersedia"
             class="p-2 rounded-full bg-gray-800
           opacity-60 grayscale
           cursor-not-allowed">
                <i class="fas fa-sun theme-icon sun text-yellow-500"></i>
                <i class="fas fa-moon theme-icon moon text-blue-300 hidden"></i>
            </button>
        </div>
    </div>

    <!-- Loading Screen -->
    <div class="loading-screen hidden" id="loadingScreen">
        <div class="loading-logo">
            <div class="relative w-28 h-28">
                <!-- Gradient ring background -->
                <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 p-1 animate-spin-slow">
                    <div class="w-full h-full rounded-full bg-gray-900"></div>
                </div>
                
                <!-- Logo di tengah -->
                <div class="absolute inset-2 rounded-full overflow-hidden border-4 border-white/30">
                    <img src="logonex.png" alt="PresensiNex Logo" class="w-full h-full object-cover">
                </div>
                
                <!-- Glow effect -->
                <div class="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-xl animate-pulse"></div>
            </div>
        </div>
        <div class="spinner"></div>
        <div class="loading-text">Menyiapkan Dashboard Anda...</div>
    </div>

    <!-- Navigation Header -->
    <nav class="nav-header shadow-2xl py-4 px-6 sticky top-0 z-40">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                    <img src="logonex.png" alt="PresensiNex" class="w-full h-full object-cover">
                </div>
                <div>
                    <h1 class="text-xl font-bold text-white">Presensi<span style="
    background: linear-gradient(135deg, gold, orange);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">Nex</span></h1> 
                    <p class="text-gray-300 text-sm">Dashboard Peserta Kursus</p> 
                </div>
            </div>
            
            <div class="flex items-center space-x-4">
                <div class="text-right hidden md:block">
                    <div class="font-semibold text-white"><?= htmlspecialchars($userData['nama']) ?></div>
                    <div class="text-sm text-gray-300"><?= $userData['id_pelatihan'] ?></div>
                </div>
                
                <div class="user-avatar w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    <?= substr($userData['nama'], 0, 1) ?>
                </div>
                
                <a href="../../logout.php" class="text-gray-300 hover:text-white ml-2" title="Logout">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
        <!-- Dashboard Header -->
        <div class="dashboard-header p-8 mb-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-2">
                        Selamat Datang, <span style="
    background: linear-gradient(135deg, gold, orange);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;" id="welcomeName">
                            <?= explode(' ', $userData['nama'])[0] ?>
                        </span>!
                    </h2>
                    <p class="text-gray-400">Pantau perkembangan kursus dan kehadiran Anda di LKP NexGen</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <div class="text-sm text-gray-400">ID Peserta:</div>
                    <div class="font-mono font-semibold text-blue-300"><?= $userData['id_pelatihan'] ?></div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="stat-card px-4 py-3">
                    <div class="text-sm text-gray-400">Kursus Diambil</div>
                    <div class="text-2xl font-bold text-white" id="totalCourses"><?= $userDataForJS['courses'] ?></div>
                </div>
                <div class="stat-card px-4 py-3">
                    <div class="text-sm text-gray-400">Total Sesi</div>
                    <div class="text-2xl font-bold text-white" id="totalSessions"><?= $userDataForJS['sessions'] ?></div>
                </div>
                <div class="stat-card px-4 py-3">
                    <div class="text-sm text-gray-400">Kehadiran</div>
                    <div class="text-2xl font-bold text-emerald-400" id="totalAttendance"><?= $userDataForJS['attendance'] ?></div>
                </div>
                <div class="stat-card px-4 py-3">
                    <div class="text-sm text-gray-400">Tugas Pending</div>
                    <div class="text-2xl font-bold text-amber-400" id="pendingTasks"><?= $userDataForJS['pendingTasks'] ?></div>
                </div>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-nav">
            <button class="tab-btn active" data-tab="courses">
                <i class="fas fa-graduation-cap mr-2"></i>Kursus Saya
            </button>
            <button class="tab-btn" data-tab="presensi">
                <i class="fas fa-calendar-check mr-2"></i>Presensi
            </button>
            <button class="tab-btn" data-tab="tugas">
                <i class="fas fa-tasks mr-2"></i>Tugas
            </button>
            <button class="tab-btn" data-tab="jadwal">
                <i class="fas fa-calendar-alt mr-2"></i>Jadwal
            </button>
        </div>

        <!-- Tab Content -->
        <div id="tabContent">
            <!-- Kursus Saya -->
            <div class="tab-pane active" id="coursesTab">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <?php foreach ($coursesData as $index => $course): ?>
                    <?php 
                    $totalAttendance = ($course['hadir'] ?? 0) + ($course['izin'] ?? 0) + ($course['alpha'] ?? 0);
                    $attendanceRate = $totalAttendance > 0 ? round(($course['hadir'] / $totalAttendance) * 100, 1) . '%' : '0%';
                    ?>
                    <div class="course-card p-5 rounded-xl animate-fade-in-up" style="animation-delay: <?= $index * 0.1 ?>s">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-bold text-lg text-white mb-1"><?= htmlspecialchars($course['nama_kursus']) ?></h3>
                                <span class="text-xs px-2 py-1 bg-<?= $course['warna'] ?>-500/20 text-<?= $course['warna'] ?>-400 rounded">
                                    <?= $course['level'] ?>
                                </span>
                            </div>
                            <div class="text-right">
                                <div class="text-sm text-gray-400">Coach</div>
                                <div class="font-semibold text-<?= $course['warna'] ?>-300">
                                    <?= htmlspecialchars($course['coach_name'] ?? 'Belum ada coach') ?>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Progress</span>
                                <span class="font-semibold text-white"><?= $course['progress'] ?>%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: <?= $course['progress'] ?>%"></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-3 mb-4">
                            <div class="text-center p-2 bg-gray-800/50 rounded-lg">
                                <div class="text-emerald-400 font-bold"><?= $course['hadir'] ?? 0 ?></div>
                                <div class="text-xs text-gray-400">Hadir</div>
                            </div>
                            <div class="text-center p-2 bg-gray-800/50 rounded-lg">
                                <div class="text-amber-400 font-bold"><?= $course['izin'] ?? 0 ?></div>
                                <div class="text-xs text-gray-400">Izin</div>
                            </div>
                            <div class="text-center p-2 bg-gray-800/50 rounded-lg">
                                <div class="text-red-400 font-bold"><?= $course['alpha'] ?? 0 ?></div>
                                <div class="text-xs text-gray-400">Alpha</div>
                            </div>
                        </div>
                        
                        <!-- Materi -->
                        <?php if (isset($materialsByCourse[$course['id']]) && !empty($materialsByCourse[$course['id']])): ?>
                        <div class="space-y-3 mb-4">
                            <div class="text-sm font-semibold text-gray-300">Materi:</div>
                            <?php foreach ($materialsByCourse[$course['id']] as $material): ?>
                            <div class="material-dropdown">
                                <button class="material-dropdown-btn w-full flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
                                    <div class="flex items-center">
                                        <?= getFileIconPHP($material['tipe_file']) ?>
                                        <span class="text-sm text-white ml-3"><?= htmlspecialchars($material['nama_materi']) ?></span>
                                    </div>
                                    <i class="fas fa-chevron-down text-gray-400 text-xs transition-transform"></i>
                                </button>
                                <div class="material-dropdown-content hidden bg-gray-900/50 rounded-b-lg p-4">
                                    <div class="overflow-x-auto">
                                        <table class="w-full text-sm">
                                            <thead>
                                                <tr class="text-gray-400 border-b border-gray-700">
                                                    <th class="pb-2 text-left">Detail</th>
                                                    <th class="pb-2 text-left">Ukuran</th>
                                                    <th class="pb-2 text-left">Downloads</th>
                                                    <th class="pb-2 text-left">Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="py-2 text-gray-300"><?= htmlspecialchars($material['deskripsi'] ?? '-') ?></td>
                                                    <td class="py-2 text-gray-300"><?= $material['ukuran'] ?? '-' ?></td>
                                                    <td class="py-2 text-gray-300"><?= $material['downloads'] ?? 0 ?></td>
                                                    <td class="py-2 text-gray-300"><?= formatDatePHP($material['tanggal_upload']) ?></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="mt-3 text-center">
                                        <button onclick="downloadMaterial(<?= $material['id'] ?>, '<?= $course['nama_kursus'] ?>', '<?= addslashes($material['nama_materi']) ?>')" 
                                                class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold hover:opacity-90 transition-all text-sm rounded-lg">
                                            <i class="fas fa-download mr-2"></i>Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>
                        
                        <!-- Jadwal -->
                        <?php 
                        $queryCourseSchedule = "SELECT * FROM schedule WHERE course_id = :course_id ORDER BY FIELD(hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu')";
                        $stmtCourseSchedule = $conn->prepare($queryCourseSchedule);
                        $stmtCourseSchedule->execute(['course_id' => $course['id']]);
                        $courseSchedules = $stmtCourseSchedule->fetchAll(PDO::FETCH_ASSOC);
                        
                        if (!empty($courseSchedules)): 
                        ?>
                        <div class="text-sm text-gray-400 mt-4">
                            <i class="fas fa-calendar mr-2"></i>
                            <?php 
                            $scheduleText = [];
                            foreach ($courseSchedules as $sched) {
                                $scheduleText[] = $sched['hari'] . ' (' . date('H:i', strtotime($sched['waktu'])) . ')';
                            }
                            echo implode(', ', $scheduleText);
                            ?>
                        </div>
                        <?php endif; ?>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Presensi -->
            <div class="tab-pane hidden" id="presensiTab">
                <div class="card mb-8">
                    <div class="p-6 border-b border-gray-800">
                        <h3 class="text-xl font-bold text-white flex items-center">
                            <i class="fas fa-table mr-3 text-emerald-400"></i>
                            Presensi Kursus
                        </h3>
                        <p class="text-gray-400 text-sm mt-1">Input dan kelola kehadiran untuk semua kursus</p>
                    </div>
                    
                    <!-- Form Input Presensi -->
                    <div class="p-6 border-b border-gray-800 bg-gray-900/30">
                        <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
                            <i class="fas fa-plus-circle mr-2 text-blue-400"></i> Input Presensi Baru
                        </h4>
                        
                        <form id="presensiForm" action="logic/presensi_process.php" method="POST" onsubmit="event.preventDefault(); submitPresensi();">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label class="block text-gray-400 text-sm mb-2">Kursus</label>
                                    <select name="course_id" id="inputCourse" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" style="background-color: #1f2937;" required>
                                        <option value="">Pilih kursus...</option>
                                        <?php foreach ($coursesData as $course): ?>
                                        <option value="<?= $course['id'] ?>"><?= htmlspecialchars($course['nama_kursus']) ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-gray-400 text-sm mb-2">Materi</label>
                                    <input type="text" name="materi" id="inputMateri" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" placeholder="Nama materi..." required>
                                </div>
                                
                                <div>
                                    <label class="block text-gray-400 text-sm mb-2">Sesi</label>
                                    <select name="sesi_ke" id="inputSesi" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" required>
                                        <option value="">Pilih sesi...</option>
                                        <?php for ($i = 1; $i <= 12; $i++): ?>
                                        <option value="<?= $i ?>">Pertemuan <?= $i ?></option>
                                        <?php endfor; ?>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-gray-400 text-sm mb-2">Tanggal</label>
                                    <input type="date" name="tanggal" id="inputTanggal" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" value="<?= date('Y-m-d') ?>" required>
                                </div>
                                
                                <div>
                                    <label class="block text-gray-400 text-sm mb-2">Status</label>
                                    <select name="status" id="inputStatus" class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" required>
                                        <option value="Hadir">Hadir</option>
                                        <option value="Izin">Izin</option>
                                        <option value="Alpa">Alpa</option>
                                    </select>
                                </div>
                                
                                <div class="flex items-end">
                                    <button type="submit" class="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all">
                                        <i class="fas fa-plus mr-2"></i>Tambah Presensi
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <!-- Tabel Presensi -->
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="text-left">No</th>
                                    <th class="text-left">Kursus</th>
                                    <th class="text-left">Materi</th>
                                    <th class="text-left">Sesi</th>
                                    <th class="text-left">Tanggal</th>
                                    <th class="text-left">Status</th>
                                    <th class="text-left">Coach</th>
                                </tr>
                            </thead>
                            <tbody id="presensiTableBody">
                                <?php if (empty($presensiData)): ?>
                                <tr>
                                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                        <i class="fas fa-calendar-times text-3xl mb-3 block"></i>
                                        Belum ada data presensi
                                    </td>
                                </tr>
                                <?php else: ?>
                                <?php foreach ($presensiData as $index => $presensi): ?>
                                <?php $isNew = false;
                                      if(!empty($presensi['created_at'])) {
                                        $isNew = (time() - strtotime($presensi["created_at"])) < 30; // 5 menit
                                      }
                                ?>
                                <?php
                                $statusClass = '';
                                switch($presensi['status']) {
                                    case 'Hadir': $statusClass = 'bg-emerald-500/20 text-emerald-400'; break;
                                    case 'Izin': $statusClass = 'bg-blue-500/20 text-blue-400'; break;
                                    case 'Alpa': $statusClass = 'bg-red-500/20 text-red-400'; break;
                                }
                                ?>
                                <tr class="hover:bg-gray-900/30 transition-colors
                                           <?= $isNew ? 'border-l-4 border-emerald-400 bg-emerald-500/5' : '' ?>">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><?= $index + 1 ?></td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        <?= htmlspecialchars($presensi['kursus']) ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= htmlspecialchars($presensi['materi']) ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= $presensi['sesi'] ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= formatDatePHP($presensi['tanggal']) ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 text-xs font-semibold rounded-full <?= $statusClass ?>">
                                            <?= $presensi['status'] ?>
                                        </span>
                                        
                                        <?php if ($isNew) : ?>
                                            <span class="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">
                                                BARU
                                            </span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= htmlspecialchars($presensi['coach_name'] ?? '-') ?>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="p-4 bg-gray-900/50 border-t border-gray-800">
                        <div class="text-sm text-gray-400">
                            Menampilkan <?= count($presensiData) ?> data presensi
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tugas -->
            <div class="tab-pane hidden" id="tugasTab">
                <div class="card">
                    <div class="p-6 border-b border-gray-800">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 class="text-xl font-bold text-white flex items-center">
                                    <i class="fas fa-tasks mr-3 text-emerald-400"></i>
                                    Daftar Tugas
                                </h3>
                                <p class="text-gray-400 text-sm mt-1">Kelola semua tugas dari semua kursus</p>
                            </div>
                            
                            <!-- Filter -->
                            <div class="flex flex-wrap gap-2">
                                <button class="filter-btn active" data-filter="all">
                                    <i class="fas fa-list mr-1"></i> Semua
                                </button>
                                <button class="filter-btn" data-filter="pending">
                                    <i class="fas fa-clock mr-1"></i> Belum Dikerjakan
                                </button>
                                <button class="filter-btn" data-filter="submitted">
                                    <i class="fas fa-upload mr-1"></i> Sudah Dikumpulkan
                                </button>
                                <button class="filter-btn" data-filter="graded">
                                    <i class="fas fa-star mr-1"></i> Sudah Dinilai
                                </button>
                                <button class="filter-btn" data-filter="overdue">
                                    <i class="fas fa-exclamation-triangle mr-1"></i> Terlambat
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-800">
                            <thead>
                                <tr class="bg-gray-900/50">
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tugas</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Coach</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Batas Waktu</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Pengumpulan</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nilai</th>
                                    <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-800" id="taskTableBody">
                                <?php if (empty($tasksData)): ?>
                                <tr>
                                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                                        <i class="fas fa-tasks text-3xl mb-3 block"></i>
                                        Belum ada tugas
                                    </td>
                                </tr>
                                <?php else: ?>
                                <?php foreach ($tasksData as $task): ?>
                                <?php
                                $statusClass = '';
                                $statusText = '';
                                switch($task['status']) {
                                    case 'pending': 
                                        $statusClass = 'bg-amber-500/20 text-amber-400'; 
                                        $statusText = 'Belum Dikerjakan';
                                        break;
                                    case 'submitted': 
                                        $statusClass = 'bg-blue-500/20 text-blue-400'; 
                                        $statusText = 'Sudah Dikumpulkan';
                                        break;
                                    case 'graded': 
                                        $statusClass = 'bg-emerald-500/20 text-emerald-400'; 
                                        $statusText = 'Sudah Dinilai';
                                        break;
                                    case 'overdue': 
                                        $statusClass = 'bg-red-500/20 text-red-400'; 
                                        $statusText = 'Terlambat';
                                        break;
                                }
                                
                                $gradeClass = 'text-gray-300';
                                if ($task['nilai'] === 'A') $gradeClass = 'text-emerald-400 font-bold';
                                if ($task['nilai'] === 'B+') $gradeClass = 'text-blue-400 font-bold';
                                if ($task['nilai'] === 'B') $gradeClass = 'text-amber-400 font-bold';
                                ?>
                                <tr class="hover:bg-gray-900/30 transition-colors" data-status="<?= $task['status'] ?>">
                                    <td class="px-6 py-4">
                                        <div>
                                            <div class="text-sm font-medium text-white"><?= htmlspecialchars($task['nama_tugas']) ?></div>
                                            <div class="text-xs text-gray-500"><?= htmlspecialchars($task['course_name']) ?></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-3 py-1 text-xs font-semibold rounded-full <?= $statusClass ?>"><?= $statusText ?></span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= htmlspecialchars($task['coach_name'] ?? '-') ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm <?= $task['status'] === 'overdue' ? 'text-red-400' : 'text-gray-300' ?>">
                                        <?= formatDatePHP($task['deadline']) ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <?= $task['tanggal_kumpul'] ? formatDatePHP($task['tanggal_kumpul']) : '-' ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm <?= $gradeClass ?>">
                                        <?= $task['nilai'] ?: '-' ?>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        <?php if ($task['status'] === 'pending' || $task['status'] === 'overdue'): ?>
                                        <button onclick="submitTask(<?= $task['id'] ?>)" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs rounded-lg font-semibold hover:opacity-90 transition-all">
                                            <i class="fas fa-upload mr-1"></i>Kumpulkan
                                        </button>
                                        <?php elseif ($task['status'] === 'submitted'): ?>
                                        <span class="text-blue-400 text-sm">Menunggu penilaian</span>
                                        <?php else: ?>
                                        <span class="text-emerald-400 text-sm">Selesai</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Jadwal -->
            <div class="tab-pane hidden" id="jadwalTab">
                <div class="card mb-8">
                    <div class="p-6 border-b border-gray-800">
                        <h3 class="text-xl font-bold text-white flex items-center">
                            <i class="fas fa-calendar-alt mr-3 text-emerald-400"></i>
                            Jadwal Minggu Ini
                        </h3>
                        <p class="text-gray-400 text-sm mt-1">Rencana pembelajaran untuk 7 hari ke depan</p>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4" id="weeklySchedule">
                            <?php if (empty($scheduleData)): ?>
                            <div class="text-center py-12 text-gray-500">
                                <i class="fas fa-calendar-times text-4xl mb-3"></i>
                                <p>Belum ada jadwal untuk minggu ini</p>
                            </div>
                            <?php else: ?>
                            <?php foreach ($scheduleData as $index => $schedule): ?>
                            <div class="card mb-6 overflow-hidden border-2 border-gray-800 hover:border-yellow-500/50 transition-all duration-300" style="animation-delay: <?= $index * 0.1 ?>s">
                                <div class="p-6">
                                    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gray-800/50">
                                        <div class="mb-4 md:mb-0">
                                            <div class="flex items-start mb-4">
                                                <div class="mr-4 text-center min-w-16">
                                                    <div class="text-sm font-extrabold text-yellow-400 uppercase tracking-wider"><?= $schedule['hari'] ?></div>
                                                    <div class="text-2xl font-black text-white mt-1">
                                                        <?= date('d', strtotime('next ' . $schedule['hari'])) ?>
                                                    </div>
                                                    <div class="text-xs text-gray-400 font-medium">
                                                        <?= date('M', strtotime('next ' . $schedule['hari'])) ?>
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="flex items-center gap-3 mb-2">
                                                        <h3 class="text-xl font-black text-white"><?= $schedule['course_name'] ?></h3>
                                                        <span class="px-3 py-1 text-xs font-extrabold rounded-full <?= getBadgeColor($schedule['level']) ?> bg-gradient-to-r text-white">
                                                            <?= $schedule['level'] ?>
                                                        </span>
                                                    </div>
                                                    <div class="flex flex-wrap gap-4 mt-3">
                                                        <span class="text-sm text-gray-300 font-medium flex items-center">
                                                            <i class="fas fa-clock mr-2 text-yellow-500"></i>
                                                            <?= date('H:i', strtotime($schedule['waktu'])) ?> 
                                                            (<?= $schedule['durasi'] ?> menit)
                                                        </span>
                                                        <span class="text-sm text-gray-300 font-medium flex items-center">
                                                            <i class="fas fa-map-marker-alt mr-2 text-yellow-500"></i>
                                                            <?= $schedule['ruangan'] ?>
                                                        </span>
                                                        <span class="text-sm text-gray-300 font-medium flex items-center">
                                                            <i class="fas fa-user mr-2 text-yellow-500"></i>
                                                            <?= $schedule['coach_name'] ?? '-' ?>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <?php if (!empty($schedule['topik'])): ?>
                                    <div class="mb-6">
                                        <h4 class="text-lg font-bold text-white mb-3 flex items-center">
                                            <i class="fas fa-book-open mr-3 text-yellow-400"></i>
                                            Materi yang Akan Dibahas
                                        </h4>
                                        <p class="text-gray-300 bg-gray-900/30 p-4 rounded-xl border-l-4 border-yellow-500 font-medium">
                                            <?= htmlspecialchars($schedule['topik']) ?>
                                        </p>
                                    </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-12 py-8">
        <div class="container mx-auto px-4 text-center">
            <div class="mb-6">
                <div class="inline-flex w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                    <img src="logonex.png" alt="PresensiNex Logo" class="w-full h-full object-cover">
                </div>
            </div>
            
            <h3 class="text-lg font-bold mb-2 gradient-text">PresensiNex - LKP NexGen</h3>
            <p class="text-gray-500 text-sm mb-6">Sistem Presensi Digital Peserta</p>
            
            <div class="flex justify-center space-x-6 mb-6">
                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                    <i class="fab fa-whatsapp text-lg"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                    <i class="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                    <i class="fab fa-facebook text-lg"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">
                    <i class="fas fa-envelope text-lg"></i>
                </a>
            </div>
            
            <p class="text-gray-600 text-sm">
                &copy;v2.1.0 © 2026 LKP NexGen.
            </p>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>