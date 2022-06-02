-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2022 a las 08:10:17
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_tecnica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ip`
--

CREATE TABLE `ip` (
  `id` int(11) NOT NULL,
  `hora_consulta` datetime NOT NULL DEFAULT current_timestamp(),
  `nombre_pais` varchar(124) NOT NULL,
  `cod_iso` varchar(2) NOT NULL,
  `ip` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ip`
--

INSERT INTO `ip` (`id`, `hora_consulta`, `nombre_pais`, `cod_iso`, `ip`) VALUES
(2, '2022-06-01 20:35:16', 'Singapore', 'SG', '103.4.97.138'),
(3, '2022-06-01 20:40:11', 'Singapore', 'SG', '103.4.97.138'),
(4, '2022-06-01 20:49:04', 'Singapore', 'SG', '103.4.97.138'),
(5, '2022-06-02 00:49:26', 'Singapore', 'SG', '103.4.97.138'),
(6, '2022-06-02 00:51:58', 'Singapore', 'SG', '103.4.97.138'),
(7, '2022-06-02 01:06:03', 'Colombia', 'CO', '167.0.194.48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ip`
--
ALTER TABLE `ip`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ip`
--
ALTER TABLE `ip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
