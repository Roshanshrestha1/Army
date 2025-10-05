<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['action'] ?? '';

if ($method !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
  json_response(['error' => 'Invalid email or password'], 400);
}

if ($path === 'register') {
  // Create users table if not exists
  $pdo->exec("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

  // Insert
  $stmt = $pdo->prepare('INSERT INTO users (email, password_hash) VALUES (:email, :hash)');
  try {
    $stmt->execute([
      ':email' => $email,
      ':hash' => password_hash($password, PASSWORD_BCRYPT)
    ]);
  } catch (Exception $e) {
    json_response(['error' => 'Email in use'], 409);
  }

  json_response(['ok' => true]);
}

if ($path === 'login') {
  $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE email = :email');
  $stmt->execute([':email' => $email]);
  $user = $stmt->fetch();
  if (!$user || !password_verify($password, $user['password_hash'])) {
    json_response(['error' => 'Invalid credentials'], 401);
  }
  // Issue a simple token (not JWT) for demo; in shared hosting, store tokens server-side
  $token = bin2hex(random_bytes(24));
  $pdo->exec("CREATE TABLE IF NOT EXISTS sessions (
    token VARCHAR(64) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
  $stmt = $pdo->prepare('REPLACE INTO sessions (token, user_id) VALUES (:token, :user_id)');
  $stmt->execute([':token' => $token, ':user_id' => $user['id']]);
  json_response(['ok' => true, 'token' => $token]);
}

json_response(['error' => 'Not found'], 404);


