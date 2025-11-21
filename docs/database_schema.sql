-- Esquema de base de datos para los reportes ciudadanos en SIGA-Titicaca

-- Tabla: citizen_reports
-- Descripción: Almacena los reportes de incidentes ambientales enviados por los ciudadanos.

CREATE TABLE citizen_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reporter_name VARCHAR(255),
    reporter_email VARCHAR(255),
    incident_type ENUM(
        'Vertido de Residuos',
        'Contaminación del Agua',
        'Fauna Afectada',
        'Deforestación en Orillas',
        'Otro'
    ) NOT NULL,
    description TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    photo_evidence LONGTEXT COMMENT 'Imagen codificada en Base64',
    report_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX (incident_type),
    INDEX (status),
    INDEX (report_timestamp)
);

-- Descripción de los campos:
-- id: Identificador único autoincremental para cada reporte.
-- reporter_name: Nombre de la persona que realiza el reporte (opcional).
-- reporter_email: Correo electrónico de la persona que realiza el reporte (opcional, para seguimiento).
-- incident_type: Categoría del incidente reportado, usando un tipo ENUM para consistencia.
-- description: Descripción detallada del incidente observado.
-- latitude: Coordenada de latitud del incidente.
-- longitude: Coordenada de longitud del incidente.
-- photo_evidence: Campo para almacenar la evidencia fotográfica. Se usa LONGTEXT para guardar la imagen como un string Base64.
-- report_timestamp: Fecha y hora en que se registró el incidente.
-- status: Estado del reporte en el flujo de trabajo de validación (pendiente, aprobado, rechazado).
-- created_at: Fecha y hora de creación del registro en la base de datos.
-- updated_at: Fecha y hora de la última actualización del registro.
