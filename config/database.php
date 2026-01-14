<?php

$HOST = 'localhost';
$USERNAME = 'root';
$PASSWORD = '';
$DB_NAME = 'db_lkp_nexgen';

$conn = mysqli_connect($HOST, $USERNAME, $PASSWORD, $DB_NAME);

if(!$conn){
    die('Koneksi gagal');
}