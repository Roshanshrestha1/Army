<?php
require_once __DIR__ . '/db.php';

// Auth via bearer token
$headers = getallheaders();
$auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
if (stripos($auth, 'Bearer ') !== 0) {
  json_response(['error' => 'Unauthorized'], 401);
}
$token = substr($auth, 7);

$stmt = $pdo->prepare('SELECT user_id FROM sessions WHERE token = :token');
$stmt->execute([':token' => $token]);
$row = $stmt->fetch();
if (!$row) {
  json_response(['error' => 'Invalid token'], 401);
}
$userId = (int)$row['user_id'];

// Table ensure
$pdo->exec("CREATE TABLE IF NOT EXISTS progress (
  user_id INT PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $stmt = $pdo->prepare('SELECT data FROM progress WHERE user_id = :uid');
  $stmt->execute([':uid' => $userId]);
  $row = $stmt->fetch();
  json_response(['ok' => true, 'data' => $row ? json_decode($row['data'], true) : null]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $payload = json_decode(file_get_contents('php://input'), true);
  $data = $payload['data'] ?? null;
  if ($data === null) json_response(['error' => 'Missing data'], 400);
  $stmt = $pdo->prepare('REPLACE INTO progress (user_id, data) VALUES (:uid, :data)');
  $stmt->execute([':uid' => $userId, ':data' => json_encode($data)]);
  json_response(['ok' => true]);
}

json_response(['error' => 'Method not allowed'], 405);


