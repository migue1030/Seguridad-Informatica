create database biblioteca;

use biblioteca;

CREATE TABLE Libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion YEAR,
    genero VARCHAR(100),
    isbn VARCHAR(13) UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_keys (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	secret_key VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMP
);

SELECT * FROM api_keys;
SELECT * FROM Libros;