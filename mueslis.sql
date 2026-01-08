-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 06. 11:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mueaslis`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mueslis`
--

CREATE TABLE `mueslis` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `mueslis`
--

INSERT INTO `mueslis` (`id`, `name`, `price`) VALUES
(1, 'Cerbona étcsokis müzli 20g', 329),
(2, 'Big Corny cereal 31g', 619),
(3, 'Cerbona Müzli Max epres-csokoládés 30g', 255),
(4, 'Cerbona Müzli Max csokoládés-karamellás 30g', 255),
(5, 'Cerbona mézes müzli 200g', 659),
(6, 'Cerbona Áfonyás müzli 200g', 679),
(7, 'Cerbona étcsokoládés müzli 200g', 699),
(8, 'Cerbona étcsokoládés-epres müzli 200g', 699),
(9, 'Cerbona karamellás müzliszelet 20g', 329),
(10, 'Cerbona csokoládés müzliszelet 20g', 329),
(11, 'Cerbona epres müzliszelet 20g', 329),
(12, 'Cerbona joghurtos müzliszelet 20g', 349),
(13, 'Nestlé Fitness Original 375g', 1350),
(14, 'Nestlé Fitness Joghurt 375g', 1390),
(15, 'Nestlé Fitness Csokoládé 375g', 1390),
(16, 'Nestlé Corn Flakes 375g', 1229),
(17, 'Nestlé Müslimix epres-joghurtos 40g', 399),
(18, 'Nestlé GoFree Honey Flakes 500g', 1849),
(19, 'Corny Big Chocolate 50g', 289),
(20, 'Corny Big Banana 50g', 289),
(21, 'Corny Big Coconut 50g', 289),
(22, 'ENERGIE Müzliszelet mogyorós 25g', 49),
(23, 'ENERGIE Müzliszelet kakaós 25g', 49),
(24, 'Schär Müsli 375g', 1950),
(25, 'Paula müzliszelet kakaós 25g', 49),
(26, 'Paula müzliszelet epres 25g', 49),
(27, 'Glutenix rizsmüzli csokoládés 200g', 690),
(28, 'Vitalia Müzli Crunchy epres 350g', 799),
(29, 'Vitalia Müzli Crunchy csokis 350g', 799),
(30, 'Vitalia klasszikus müzli 350g', 750),
(31, 'Vitalia teljes kiőrlésű müzli 350g', 750),
(32, 'Bona Vita Müzli kakaós 350g', 849),
(33, 'Bona Vita Müzli epres 350g', 849),
(34, 'Bona Vita Müzli joghurtos 350g', 849),
(35, 'Bauckhof bio zabmüzli 375g', 1890),
(36, 'Cerbona Max protein müzliszelet 40g', 449),
(37, 'Cerbona cukormentes áfonyás szelet 35g', 349),
(38, 'Cerbona cukormentes epres szelet 35g', 349),
(39, 'Cerbona almás-fahéjas szelet 25g', 249),
(40, 'Cerbona mogyorós-étcsokis szelet 25g', 249),
(41, 'Cerbona ropogós magvas müzli 225g', 1150),
(42, 'Nestlé Cini Minis Müzliszelet 25g', 185),
(43, 'Nestlé Chocapic Müzliszelet 25g', 185),
(44, 'Nestlé Nesquik Müzliszelet 25g', 185),
(45, 'Cerbona Max Kókuszos-barackos 30g', 255),
(46, 'Cerbona Max Diós 30g', 255),
(47, 'Cerbona Max Kakaós 30g', 255),
(48, 'Corny Free Málnás 20g', 219),
(49, 'Corny Free Citromos-joghurtos 20g', 219),
(50, 'Corny Free Csokis 20g', 219),
(51, 'Corny Protein Caramel 35g', 349),
(52, 'Corny Protein Almond 35g', 349),
(53, 'Corny Protein Chocolate 35g', 349),
(54, 'Sante Granola Kakaós 300g', 1200),
(55, 'Sante Granola Epres 300g', 1200),
(56, 'Sante Granola Mogyorós 300g', 1200),
(57, 'Sante cukormentes müzli 300g', 1700),
(58, 'Sante zabszelet csokis 40g', 179),
(59, 'Sante zabszelet epres 40g', 179),
(60, 'Sante zabszelet mogyorós 40g', 179),
(61, 'Cerbona Kakaós zabkása 50g', 309),
(62, 'Cerbona Almás zabkása 50g', 309),
(63, 'Cerbona Fahéjas zabkása 50g', 309),
(64, 'Cerbona Áfonyás zabkása 50g', 309),
(65, 'Cerbona natúr zabpehely 500g', 509);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `mueslis`
--
ALTER TABLE `mueslis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_name` (`name`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `mueslis`
--
ALTER TABLE `mueslis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
