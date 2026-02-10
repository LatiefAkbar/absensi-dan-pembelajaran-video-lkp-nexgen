<?php
// Daftar file di Drive
$driveFiles = [
    "1yvTIbLP_DOnIn5VNafTHf3E6FcxuF0aC" => "Latihan_Soal.mp4",
    "ANOTHER_FILE_ID" => "Materi_Pendukung.pptx"
];

if (!isset($_GET['file_id'])) {
    die("File tidak tersedia!");
}

$fileId = $_GET['file_id'];

if (!isset($driveFiles[$fileId])) {
    die("File tidak ditemukan!");
}

$filename = $driveFiles[$fileId];
$driveUrl = "https://drive.google.com/uc?export=download&id=$fileId";

// Ambil file dari Drive
$data = file_get_contents($driveUrl);
if ($data === false) {
    die("Gagal mengambil file dari Drive");
}

// Kirim file ke browser
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Content-Length: ' . strlen($data));
echo $data;
exit;
?>
