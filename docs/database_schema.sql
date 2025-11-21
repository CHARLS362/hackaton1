-- Esquema de base de datos para el Sistema de Información Geográfica Ambiental (SIGA-Titicaca)
-- Motor de base de datos: MySQL

-- -----------------------------------------------------
-- Tabla para almacenar los reportes de incidentes ambientales enviados por los ciudadanos.
-- -----------------------------------------------------
CREATE TABLE citizen_reports (
    -- ID único para cada reporte.
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Nombre del ciudadano que realiza el reporte (opcional).
    reporter_name VARCHAR(255) NULL,

    -- Email del ciudadano (opcional, para seguimiento).
    reporter_email VARCHAR(255) NULL,

    -- Tipo de incidente seleccionado de la lista (ej: "Vertido de Residuos", "Contaminación del Agua").
    incident_type VARCHAR(100) NOT NULL,

    -- Coordenadas geográficas del incidente.
    latitude DECIMAL(10, 8) NOT NULL COMMENT 'Latitud del lugar del incidente.',
    longitude DECIMAL(11, 8) NOT NULL COMMENT 'Longitud del lugar del incidente.',

    -- Descripción detallada proporcionada por el usuario.
    description TEXT NULL,

    -- Evidencia fotográfica guardada como una cadena de texto en formato Base64.
    -- LONGTEXT se utiliza para almacenar cadenas de gran longitud, como una imagen.
    photo_evidence LONGTEXT NULL COMMENT 'Imagen codificada en Base64.',

    -- Fecha y hora en que se recibió el reporte.
    report_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Estado del reporte, para ser usado en la mesa de trabajo (triaje).
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',

    -- Fecha de creación del registro en la base de datos.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT='Tabla para almacenar los reportes de incidentes ambientales de los ciudadanos.';

-- Ejemplo de inserción de datos:
-- INSERT INTO citizen_reports (reporter_name, reporter_email, incident_type, latitude, longitude, description, photo_evidence)
-- VALUES
-- ('Juan Pérez', 'juan.perez@email.com', 'Contaminación del Agua', -15.84233, -69.33241, 'Mancha de aceite cerca del muelle.', 'data:image/jpeg;base64,/9j/4AAQSkZJRg...');