CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, 
  active TINYINT(1) DEFAULT 0, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);