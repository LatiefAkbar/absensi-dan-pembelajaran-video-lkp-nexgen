<?php
session_start();
include "../../../config/database.php";

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $user_id = $_SESSION['user_id'] ?? null;

    if (!$user_id) {
        echo json_encode([
            "status" => "error",
            "message" => "User tidak login"
        ]);
        exit;
    }

    try {

        $database = new Database();
        $conn = $database->getConnection();

        $course_id = $_POST['course_id'] ?? null;
        $materi = $_POST['materi'] ?? '';
        $sesi_ke = $_POST['sesi_ke'] ?? null;
        $tanggal = $_POST['tanggal'] ?? date('Y-m-d');
        $status = $_POST['status'] ?? 'Hadir';

        // cari coach
        $queryCoach = "SELECT id FROM coaches WHERE courses_id = :course_id LIMIT 1";
        $stmtCoach = $conn->prepare($queryCoach);
        $stmtCoach->execute(['course_id' => $course_id]);
        $coach = $stmtCoach->fetch(PDO::FETCH_ASSOC);
        $coach_id = $coach['id'] ?? null;

        // insert attendance
        $query = "
            INSERT INTO attendance
            (user_id, course_id, sesi_ke, materi, tanggal, status, coach_id, created_at)
            VALUES
            (:user_id, :course_id, :sesi_ke, :materi, :tanggal, :status, :coach_id, NOW())
        ";

        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            'user_id' => $user_id,
            'course_id' => $course_id,
            'sesi_ke' => $sesi_ke,
            'materi' => $materi,
            'tanggal' => $tanggal,
            'status' => $status,
            'coach_id' => $coach_id
        ]);

        if ($result) {

            echo json_encode([
                "status" => "success",
                "message" => "Presensi berhasil disimpan"
            ]);

        } else {

            echo json_encode([
                "status" => "error",
                "message" => "Gagal menyimpan presensi"
            ]);
        }

    } catch (Exception $e) {

        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}
?>
