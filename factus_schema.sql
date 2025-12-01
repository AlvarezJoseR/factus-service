-- FACTUS API Database Schema
-- Sistema simplificado para peticiones a la API de FACTUS

CREATE DATABASE IF NOT EXISTS factus_api;
USE factus_api;

-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires DATETIME,
    last_login DATETIME,
    failed_login_attempts INT DEFAULT 0,
    locked_until DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de servicios disponibles en FACTUS
CREATE TABLE factus_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(100) NOT NULL,
    service_code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla principal de peticiones a FACTUS
CREATE TABLE factus_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    request_uuid VARCHAR(36) UNIQUE NOT NULL,
    request_data JSON NOT NULL,
    response_data JSON,
    status ENUM('pending', 'processing', 'success', 'error', 'failed') DEFAULT 'pending',
    attempts INT DEFAULT 0,
    max_attempts INT DEFAULT 3,
    last_attempt_at DATETIME,
    success_at DATETIME,
    error_message TEXT,
    factus_response_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES factus_services(id)
);

-- Tabla de logs del sistema
CREATE TABLE system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT,
    log_level ENUM('info', 'warning', 'error', 'debug') DEFAULT 'info',
    message TEXT NOT NULL,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES factus_requests(id)
);

-- Índices para optimización
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(active);
CREATE INDEX idx_requests_user_id ON factus_requests(user_id);
CREATE INDEX idx_requests_status ON factus_requests(status);
CREATE INDEX idx_requests_uuid ON factus_requests(request_uuid);
CREATE INDEX idx_requests_created_at ON factus_requests(created_at);
CREATE INDEX idx_logs_request_id ON system_logs(request_id);
CREATE INDEX idx_logs_level ON system_logs(log_level);

-- Datos iniciales de servicios FACTUS
INSERT INTO factus_services (service_name, service_code, description) VALUES
('Timbrado CFDI', 'stamp_cfdi', 'Servicio para timbrar facturas CFDI'),
('Cancelación CFDI', 'cancel_cfdi', 'Servicio para cancelar facturas CFDI'),
('Consulta Estatus', 'check_status', 'Consulta el estatus de una factura'),
('Validación RFC', 'validate_rfc', 'Validación de RFC con SAT');

-- Usuarios de prueba
INSERT INTO users (business_name, email, password, phone, address, active, email_verified) VALUES
('Empresa Test S.A. de C.V.', 'test@factus.com', '$2b$10$example_hash_password', '+52 55 1234 5678', 'Calle Test #123, CDMX', TRUE, TRUE),
('Negocio Example', 'cliente@example.com', '$2b$10$example_hash_password2', '+52 55 9876 5432', 'Av. Example #456, Guadalajara', TRUE, FALSE);