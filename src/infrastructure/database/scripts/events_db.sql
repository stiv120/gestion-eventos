SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Base de datos: `events_db`
-- Crear base de datos solo si no existe
CREATE DATABASE IF NOT EXISTS `events_db`;
USE `events_db`;

-- Estructura de tabla para la tabla `attendees`
DROP TABLE IF EXISTS `attendees`;

CREATE TABLE `attendees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_users_id` (`user_id`),
  KEY `foreign_event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TRIGGER `d_update_attendees` BEFORE UPDATE ON `attendees` FOR EACH ROW SET NEW.updated_at = NOW();

-- Estructura de tabla para la tabla `events`
DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TRIGGER `d_update_events` BEFORE UPDATE ON `events` FOR EACH ROW SET NEW.updated_at = NOW();

-- Estructura de tabla para la tabla `users`
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TRIGGER `d_update_users` BEFORE UPDATE ON `users` FOR EACH ROW SET NEW.updated_at = NOW();

-- Restricciones para la tabla `attendees`
ALTER TABLE `attendees`
  ADD CONSTRAINT `foreign_event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `foreign_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;