-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 08 mars 2023 à 08:26
-- Version du serveur : 5.7.33
-- Version de PHP : 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vdata`
--

-- --------------------------------------------------------

--
-- Structure de la table `data_collected_facebook`
--

CREATE TABLE `data_collected_facebook` (
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

--
-- Déchargement des données de la table `data_collected_facebook`
--

INSERT INTO `data_collected_facebook` (`id`, `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `callback_time`, `status`, `created_at`) VALUES
(1, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-21 19:21:24'),
(2, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-22 07:21:24'),
(3, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '409', NULL, 'en attente', '2023-02-22 08:21:24'),
(4, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '44778855', 'ok', '500', NULL, 'en attente', '2023-02-22 08:21:24'),
(5, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-23 19:21:24'),
(6, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 10:56:07'),
(7, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 11:33:37'),
(8, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 09:56:48'),
(9, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-02-28 23:56:48'),
(10, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 07:56:48');

-- --------------------------------------------------------

--
-- Structure de la table `data_collected_tiktok`
--

CREATE TABLE `data_collected_tiktok` (
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

--
-- Déchargement des données de la table `data_collected_tiktok`
--

INSERT INTO `data_collected_tiktok` (`id`, `formulaire`, `adset_name`, `campagne`, `leadgen_id`, `fai_actuel`, `fai_actuel_val`, `code_postal`, `email`, `telephone`, `retour_api`, `code_retour_api`, `callback_time`, `status`, `created_at`) VALUES
(1, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-21 18:21:24'),
(2, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-22 06:21:24'),
(3, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '409', NULL, 'en attente', '2023-02-22 07:21:24'),
(4, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '44778855', 'ok', '500', NULL, 'en attente', '2023-02-22 07:21:24'),
(5, 'lead', 'tik', 'fibre', '22', 'orange', '2', '0223', 'ser@gmail.com', '22553366', 'ok', '200', NULL, 'en attente', '2023-02-23 18:21:24'),
(6, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 09:56:07'),
(7, 'lead', 'free', 'fibre', '1', 'freeu', '5', '0022', 'gtg@ggg.com', '8899641', 'ok', '409', NULL, 'en attente', '2023-02-24 10:33:37'),
(8, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 08:56:48'),
(9, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-02-28 22:56:48'),
(10, 'ok', 'free', 'fibre', '2', 'free', '5', '033', 'klgjmlkg@ksfgm.com', '852', 'ok', '409', NULL, 'en attente', '2023-03-01 06:56:48');

-- --------------------------------------------------------

--
-- Structure de la table `log_api`
--

CREATE TABLE `log_api` (
  `id` int(11) NOT NULL,
  `code_erreur` int(11) NOT NULL,
  `message_erreur` longtext NOT NULL,
  `form_id` varchar(250) NOT NULL,
  `data_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `log_connexion`
--

CREATE TABLE `log_connexion` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `message` varchar(250) NOT NULL,
  `statuts` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `user_ip` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(250) DEFAULT NULL,
  `user_surname` varchar(250) DEFAULT NULL,
  `_password` text,
  `pseudo` varchar(250) DEFAULT NULL,
  `user_role` enum('admin','user') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `user_name`, `user_surname`, `_password`, `pseudo`, `user_role`) VALUES
(7, 'Aymar', 'Serge', '$2y$10$mPcluvC0dzRwlmQOIpBBLuEZt3W8fpj1S1OgPCQKalzvoUlXQfmvq', 'Aymar', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `data_collected_facebook`
--
ALTER TABLE `data_collected_facebook`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `log_api`
--
ALTER TABLE `log_api`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `log_connexion`
--
ALTER TABLE `log_connexion`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
