<?php
// Basic configuration for database connection on profreehost
// Rename this file to config.local.php to override locally and avoid committing secrets

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_NAME = getenv('DB_NAME') ?: 'your_db_name';
$DB_USER = getenv('DB_USER') ?: 'your_db_user';
$DB_PASS = getenv('DB_PASS') ?: 'your_db_pass';

// Load local overrides if present
if (file_exists(__DIR__ . '/config.local.php')) {
  include __DIR__ . '/config.local.php';
}

function json_response($data, $status = 200) {
  http_response_code($status);
  echo json_encode($data);
  exit;
}


