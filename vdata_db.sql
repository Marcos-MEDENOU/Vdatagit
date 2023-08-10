-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour vdata
CREATE DATABASE IF NOT EXISTS `vdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `vdata`;

-- Listage de la structure de la table vdata. data_collected
CREATE TABLE IF NOT EXISTS `data_collected` (
  `id` int(11) NOT NULL,
  `formulaire` varchar(255) DEFAULT NULL,
  `adset_name` text,
  `campagne` varchar(100) DEFAULT NULL,
  `leadgen_id` varchar(255) DEFAULT NULL,
  `fai_actuel` varchar(255) DEFAULT NULL,
  `fai_actuel_val` varchar(100) DEFAULT NULL,
  `code_postal` varchar(15) DEFAULT NULL,
  `email` text,
  `telephone` varchar(15) DEFAULT NULL,
  `retour_api` text,
  `code_retour_api` varchar(10) DEFAULT NULL,
  `callback_time` timestamp(6) NULL DEFAULT NULL,
  `status` enum('envoyé','en attente') NOT NULL DEFAULT 'en attente',
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.data_collected : ~16 rows (environ)
/*!40000 ALTER TABLE `data_collected` DISABLE KEYS */;
INSERT INTO `data_collected` (`id`, `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `callback_time`, `status`, `created_at`) VALUES
	(1, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-21 20:21:24'),
	(2, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-22 08:21:24'),
	(3, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '409', NULL, 'en attente', '2023-02-22 09:21:24'),
	(4, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '44778855', 'ok', '500', NULL, 'en attente', '2023-02-22 09:21:24'),
	(5, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-23 20:21:24'),
	(6, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 11:56:07'),
	(7, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 12:33:37'),
	(8, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 10:56:48'),
	(9, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 00:56:48'),
	(10, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 22:59:59'),
	(11, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-02 23:00:01'),
	(13, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-02 22:59:59'),
	(14, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-06-06 22:59:59'),
	(15, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-07-19 07:59:59'),
	(16, 'ok', 'F001-free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-07-19 07:59:59'),
	(17, 'ok', 'F001-free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-07-19 07:59:59');
/*!40000 ALTER TABLE `data_collected` ENABLE KEYS */;

-- Listage de la structure de la table vdata. data_collected_tiktok
CREATE TABLE IF NOT EXISTS `data_collected_tiktok` (
  `id` int(11) NOT NULL,
  `formulaire` varchar(255) DEFAULT NULL,
  `adset_name` text,
  `campagne` varchar(100) DEFAULT NULL,
  `leadgen_id` varchar(255) DEFAULT NULL,
  `fai_actuel` varchar(255) DEFAULT NULL,
  `fai_actuel_val` varchar(100) DEFAULT NULL,
  `code_postal` varchar(15) DEFAULT NULL,
  `email` text,
  `telephone` varchar(15) DEFAULT NULL,
  `retour_api` text,
  `code_retour_api` varchar(10) DEFAULT NULL,
  `callback_time` timestamp(6) NULL DEFAULT NULL,
  `status` enum('envoyé','en attente') NOT NULL DEFAULT 'en attente',
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.data_collected_tiktok : ~10 rows (environ)
/*!40000 ALTER TABLE `data_collected_tiktok` DISABLE KEYS */;
INSERT INTO `data_collected_tiktok` (`id`, `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `callback_time`, `status`, `created_at`) VALUES
	(1, 'lead', 'tiktok', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-21 19:21:24'),
	(2, 'lead', 'tiktok', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-22 07:21:24'),
	(3, 'lead', 'tiktok', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '409', NULL, 'en attente', '2023-02-22 08:21:24'),
	(4, 'lead', 'tiktok', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '44778855', 'ok', '500', NULL, 'en attente', '2023-02-22 08:21:24'),
	(5, 'lead', 'tiktok', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-23 19:21:24'),
	(6, 'lead', 'freetok', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 10:56:07'),
	(7, 'lead', 'freetok', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 11:33:37'),
	(8, 'ok', 'freetok', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 09:56:48'),
	(9, 'ok', 'freetok', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-02-28 23:56:48'),
	(10, 'ok', 'freetok', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-06-01 07:56:48');
/*!40000 ALTER TABLE `data_collected_tiktok` ENABLE KEYS */;

-- Listage de la structure de la table vdata. log_api
CREATE TABLE IF NOT EXISTS `log_api` (
  `id` int(11) NOT NULL,
  `code_erreur` int(11) NOT NULL,
  `message_erreur` longtext NOT NULL,
  `form_id` varchar(250) NOT NULL,
  `data_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.log_api : ~0 rows (environ)
/*!40000 ALTER TABLE `log_api` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_api` ENABLE KEYS */;

-- Listage de la structure de la table vdata. log_connexion
CREATE TABLE IF NOT EXISTS `log_connexion` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `message` varchar(250) NOT NULL,
  `statuts` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `user_ip` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.log_connexion : ~0 rows (environ)
/*!40000 ALTER TABLE `log_connexion` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_connexion` ENABLE KEYS */;

-- Listage de la structure de la table vdata. title
CREATE TABLE IF NOT EXISTS `title` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Formulaire` varchar(50) DEFAULT NULL,
  `Adset_name` varchar(50) DEFAULT NULL,
  `Campagne` varchar(50) DEFAULT NULL,
  `Leadgen_id` varchar(50) DEFAULT NULL,
  `Fai_actuel` varchar(50) DEFAULT NULL,
  `Fai_actuel_val` varchar(50) DEFAULT NULL,
  `Code_postal` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Telephone` varchar(50) DEFAULT NULL,
  `Retour_api` varchar(50) DEFAULT NULL,
  `Code_retour_api` varchar(50) DEFAULT NULL,
  `Callback_time` varchar(50) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Created_at` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.title : ~0 rows (environ)
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
/*!40000 ALTER TABLE `title` ENABLE KEYS */;

-- Listage de la structure de la table vdata. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(250) DEFAULT NULL,
  `user_surname` varchar(250) DEFAULT NULL,
  `_password` text,
  `pseudo` varchar(250) DEFAULT NULL,
  `user_role` enum('admin','user') DEFAULT 'admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Listage des données de la table vdata.user : ~4 rows (environ)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user_name`, `user_surname`, `_password`, `pseudo`, `user_role`) VALUES
	(8, 'ADJAHO', 'Serge', '$2y$10$pJSqlAQlo8J4FWPyrCS5V.t3xi6emx/x6VUAnKylDwNIfVWgTSo5i', 'serge', 'admin'),
	(10, 'Josue', 'Josue', '$2y$10$A7YAbJ1UWBJlU4FwIE5Pj.fkGN0k1PJAX5ttr1JuvyvHAt/4AEYH2', 'josue', 'user'),
	(11, 'marcos', 'marcos', '$2y$10$8WMA3cjbobwK7kg2Hh0LZu.J.Yl.m39hA8U6rhnpVugWDp6MF/KPu', 'marcos', 'admin'),
	(12, 'ericaz99', 'eric', '$2y$10$Lvldf8LqnK.N1W93/6LomudrLRzdF6JGmHR6OUsDITolrQRj.1Ybe', 'eric', 'admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
