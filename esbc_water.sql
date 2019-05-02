-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- 主機: localhost:3306
-- 產生時間： 2019 年 05 月 02 日 17:43
-- 伺服器版本: 5.7.26-0ubuntu0.18.10.1
-- PHP 版本： 7.2.17-0ubuntu0.18.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `esbc_water`
--

-- --------------------------------------------------------

--
-- 資料表結構 `blockn`
--

CREATE TABLE `blockn` (
  `Rindex` bigint(20) NOT NULL,
  `blockn` bigint(20) NOT NULL,
  `block_detail` text,
  `txhash` varchar(130) NOT NULL,
  `dateadd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `esbc_clog`
--

CREATE TABLE `esbc_clog` (
  `Bindex` bigint(20) NOT NULL,
  `BlockN` varchar(30) DEFAULT NULL,
  `txHash` varchar(255) NOT NULL,
  `fromacc` varchar(60) NOT NULL,
  `Gas` varchar(20) DEFAULT NULL,
  `costeth` varchar(30) DEFAULT NULL,
  `inputdata` text,
  `time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `WaterLog`
--

CREATE TABLE `WaterLog` (
  `Rindex` bigint(20) NOT NULL,
  `id` varchar(20) NOT NULL,
  `Rtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TDS1` float NOT NULL,
  `TDS2` float NOT NULL,
  `COD` float NOT NULL,
  `TOC` float NOT NULL,
  `UV254` float NOT NULL,
  `flow` float NOT NULL,
  `BlockN` bigint(20) DEFAULT NULL,
  `Hash` varchar(140) DEFAULT NULL,
  `RecordTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `WLB`
--

CREATE TABLE `WLB` (
  `Rindex` bigint(20) NOT NULL,
  `id` varchar(20) NOT NULL,
  `Rtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TDS1` float NOT NULL,
  `TDS2` float NOT NULL,
  `COD` float NOT NULL,
  `TOC` float NOT NULL,
  `UV254` float NOT NULL,
  `flow` varchar(12) NOT NULL,
  `BlockN` bigint(20) DEFAULT NULL,
  `Hash` varchar(75) DEFAULT NULL,
  `RecordTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `blockn`
--
ALTER TABLE `blockn`
  ADD PRIMARY KEY (`Rindex`);

--
-- 資料表索引 `esbc_clog`
--
ALTER TABLE `esbc_clog`
  ADD PRIMARY KEY (`Bindex`);

--
-- 資料表索引 `WaterLog`
--
ALTER TABLE `WaterLog`
  ADD PRIMARY KEY (`Rindex`);

--
-- 資料表索引 `WLB`
--
ALTER TABLE `WLB`
  ADD PRIMARY KEY (`Rindex`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `blockn`
--
ALTER TABLE `blockn`
  MODIFY `Rindex` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;
--
-- 使用資料表 AUTO_INCREMENT `esbc_clog`
--
ALTER TABLE `esbc_clog`
  MODIFY `Bindex` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6464;
--
-- 使用資料表 AUTO_INCREMENT `WaterLog`
--
ALTER TABLE `WaterLog`
  MODIFY `Rindex` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `WLB`
--
ALTER TABLE `WLB`
  MODIFY `Rindex` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17537;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
