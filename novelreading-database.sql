-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 02, 2024 at 03:32 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `novelreading`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `writer_id` int(11) NOT NULL,
  `novel_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`writer_id`, `novel_id`, `created_at`) VALUES
(4, 274, '2024-03-21 16:02:44');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(0, ''),
(1, 'Romantic'),
(2, 'Funny'),
(3, 'Drama'),
(4, 'Boy love'),
(5, 'Girl love'),
(6, 'Period'),
(7, 'Feel good'),
(8, 'Short story'),
(9, 'Action'),
(10, 'Mysterious'),
(11, 'Love novel'),
(12, 'Fantasy'),
(13, 'Sci-fi'),
(14, 'Investigate'),
(15, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `novel_id` int(11) NOT NULL,
  `writer_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `CommentText` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `novel_id`, `writer_id`, `chapter_id`, `CommentText`, `Timestamp`) VALUES
(117, 203, 1, 1, 'temkp', '2024-03-11 15:30:53'),
(118, 203, 1, 1, 'temkp', '2024-03-11 15:30:53'),
(121, 203, 1, 1, 'te', '2024-03-11 15:31:02'),
(122, 203, 1, 1, 'te', '2024-03-11 15:31:02'),
(125, 203, 1, 1, 'dada', '2024-03-11 16:38:43'),
(126, 203, 1, 1, 'dadae', '2024-03-11 16:39:03'),
(127, 203, 1, 1, 'best novel', '2024-03-11 16:41:08'),
(128, 203, 1, 1, '3131', '2024-03-11 16:46:03'),
(136, 203, 2, 0, 'dada', '2024-03-30 14:59:58'),
(137, 203, 2, 1, 'Yo ', '2024-03-13 21:20:13'),
(142, 203, 2, 0, 'da', '2024-03-30 14:55:55');

-- --------------------------------------------------------

--
-- Table structure for table `novel`
--

CREATE TABLE `novel` (
  `novel_id` int(11) NOT NULL,
  `novel_name` varchar(255) NOT NULL,
  `novel_desc` varchar(255) NOT NULL,
  `penid` int(11) NOT NULL,
  `novel_img` varchar(255) DEFAULT NULL,
  `novel_contentlevel` varchar(20) NOT NULL,
  `novel_privacy` tinyint(1) NOT NULL DEFAULT 1,
  `novel_chaptercount` int(11) NOT NULL DEFAULT 0,
  `novel_views` int(11) NOT NULL DEFAULT 0,
  `novel_rating` int(11) NOT NULL DEFAULT 0,
  `novel_date` varchar(255) DEFAULT NULL,
  `writer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `novel`
--

INSERT INTO `novel` (`novel_id`, `novel_name`, `novel_desc`, `penid`, `novel_img`, `novel_contentlevel`, `novel_privacy`, `novel_chaptercount`, `novel_views`, `novel_rating`, `novel_date`, `writer_id`) VALUES
(49, 'Blue Exorcist Shimane Illuminati Saga', 'Blue Exorcist Shimane Illuminati Saga', 1, NULL, '12up', 1, 0, 2, 0, '3/3/2024, 3:44:49 PM', 1),
(50, 'Blue Exorcist Shimane Illuminati Saga1', 'Blue Exorcist Shimane Illuminati Saga', 1, NULL, '12up', 1, 0, 10, 0, '3/3/2024, 3:45:46 PM', 1),
(51, 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 89', 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 89', 1, NULL, 'all', 1, 0, 0, 0, '3/3/2024, 3:47:14 PM', 1),
(52, 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 8911', 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 8911', 1, NULL, 'all', 1, 0, 0, 0, '3/3/2024, 3:53:35 PM', 1),
(53, 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 89111', 'วันพีช ซีซั่น 21 วาโนะคุนิ ตอนที่ 89111', 1, NULL, 'all', 1, 0, 2, 0, '3/3/2024, 3:57:44 PM', 1),
(67, 'อิจิคาวะ เคียวทาโร่หนุ่มมืดมนจูนิเบียวสถานหนักกับยามาดะ อันนะสาวฮอตในห้องเรียน ท', 'อิจิคาวะ เคียวทาโร่หนุ่มมืดมนจูนิเบียวสถานหนักกับยามาดะ อันนะสาวฮอตในห้องเรียน ที่แสดงตัวตนไม่สมเป็นสาวสวย ทำให้อิจิคาวะไม่อาจละสายตาจากเธอได้ ในระหว่างที่เคียวทาโร่ยังคงไม่แน่ใจในความรู้สึก ', 15, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 2, 0, '3/7/2024, 8:49:24 PM', 1),
(68, 'อิจิคาวะ เคียวทาโร่หนุ่มมืดมนจูนิเบียวสถานหนักกับยามาดะ อันนะสาวฮอตในห้อง1', 'อิจิคาวะ เคียวทาโร่หนุ่มมืดมนจูนิเบียวสถานหนักกับยามาดะ อันนะสาวฮอตในห้องเรียน ที่แสดงตัวตนไม่สมเป็นสาวสวย ทำให้อิจิคาวะไม่อาจละสายตาจากเธอได้ ในระหว่างที่เคียวทาโร่ยังคงไม่แน่ใจในความรู้สึก ', 15, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 5, 0, '3/7/2024, 8:51:41 PM', 1),
(69, ' 1313131 1', '414141', 16, '01f246ea4fcb9853beb74fe8b6d7e935.webp', 'all', 1, 0, 4, 0, '3/7/2024, 8:53:04 PM', 1),
(71, 'Tsuki ga Michibiku Isekai Douchuu 2nd Season', 'Tsuki ga Michibiku Isekai Douchuu 2nd Season', 15, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 4, 0, '3/7/2024, 9:10:13 PM', 1),
(72, 'Tsuki ga Michibiku Isekai Douchuu 2nd Season 1', 'Tsuki ga Michibiku Isekai Douchuu 2nd Season 1', 15, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 2, 0, '3/7/2024, 9:11:05 PM', 1),
(73, 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu', 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu', 1, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 1, 0, '3/7/2024, 9:12:11 PM', 1),
(74, 'Isekai de Mofumofu Nadenade suru Tame=u', 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu', 15, 'book_detail_large_1.gif', 'all', 1, 0, 0, 0, '3/7/2024, 9:13:17 PM', 1),
(75, 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu 1', 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu 1', 15, '068f486590b7dd089c5843d12aa374dd.webp', '12up', 1, 0, 2, 0, '3/7/2024, 9:15:58 PM', 1),
(76, 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu 32', 'Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu 1', 1, 'osu icon.jpg', 'all', 1, 0, 7, 0, '3/7/2024, 9:16:42 PM', 1),
(79, 'navigate(\"/writer/viewnovel\",{state:{novelid:novel.novel_id}})', 'navigate(\"/writer/viewnovel\",{state:{novelid:novel.novel_id}})', 15, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:04:32 AM', 1),
(80, 'mainCategory', '1111', 1, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:04:56 AM', 1),
(81, 'Healing the Tank Isn\'t Important Any More', 'Healing the Tank Isn\'t Important Any More', 1, 'book_detail_large_2.gif', 'all', 1, 0, 0, 0, '3/8/2024, 3:06:35 AM', 1),
(82, 'dada', 'dada', 1, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:11:01 AM', 1),
(83, 'dadada', 'dad', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:14:31 AM', 1),
(84, 'dadadada', 'dada', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 3, 0, '3/8/2024, 3:18:45 AM', 1),
(86, 'dadad', 'da', 18, '0b57deea047cffee3c58ff31b47d6f77.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:22:30 AM', 1),
(90, 'dad', 'adad', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:28:58 AM', 1),
(91, 'daaaafff', 'fff', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:30:06 AM', 1),
(95, 'xxxx', 'xxx', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 3:32:54 AM', 1),
(96, 'cacdada', 'cacadada', 1, 'b2c2c0bb9a612c949dd56f79fb03cf66.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:34:23 AM', 1),
(97, 'qeqeqe', 'eqeqeq', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', '12up', 1, 0, 0, 0, '3/8/2024, 3:36:32 AM', 1),
(98, 'eaeaea', 'eaeae', 15, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 1, 0, '3/8/2024, 3:37:06 AM', 1),
(99, 'qeqeq', 'eqeq', 1, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 3, 0, '3/8/2024, 3:38:26 AM', 1),
(100, 'eqeqeq', 'eq', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:38:42 AM', 1),
(101, 'acac', 'acaca', 1, '01f246ea4fcb9853beb74fe8b6d7e935.webp', 'all', 1, 0, 1, 0, '3/8/2024, 3:41:59 AM', 1),
(102, 'eqe', 'eq', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 2, 0, '3/8/2024, 3:43:55 AM', 1),
(103, 'dadadadada', 'dada', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 3:46:04 AM', 1),
(104, 'fafafag', 'ga', 1, '01f246ea4fcb9853beb74fe8b6d7e935.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:46:32 AM', 1),
(105, 'console.log(category)', 'console.log(category)', 1, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 3:50:40 AM', 1),
(106, 'eqeq', 'eq', 1, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:52:03 AM', 1),
(108, 'การเดินทางของโปรแกรมเมอร์', 'การเดินทางของโปรแกรมเมอร์ สุดโหด', 24, '01f246ea4fcb9853beb74fe8b6d7e935.webp', 'all', 1, 0, 0, 0, '3/8/2024, 3:56:48 AM', 1),
(110, 'vvvvvvvvvv 111', 'vvvvvv 111', 1, NULL, '20up', 1, 0, 0, 0, '3/8/2024, 3:57:56 AM', 1),
(112, 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย', 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', '12up', 1, 0, 0, 0, '3/8/2024, 6:53:38 PM', 1),
(116, 'afafaf', 'fafafafa', 29, NULL, 'all', 1, 0, 1, 0, '3/8/2024, 7:00:18 PM', 1),
(118, 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย 1', 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย 1', 30, NULL, 'all', 1, 0, 1, 0, '3/8/2024, 7:01:27 PM', 1),
(120, 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย 141', 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซับไทย4141', 32, '068f486590b7dd089c5843d12aa374dd.webp', '20up', 1, 0, 0, 0, '3/8/2024, 7:01:52 PM', 1),
(122, 'adada', 'dadada', 34, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 1, 0, '3/8/2024, 7:04:21 PM', 1),
(123, 'ada', 'fafa', 35, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 1, 0, '3/8/2024, 7:04:41 PM', 1),
(124, 'afafafafa', 'fafa', 36, 'book_detail_large_2.gif', '18up', 1, 0, 2, 0, '3/8/2024, 7:05:17 PM', 1),
(125, 'agag', 'agag', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:06:20 PM', 1),
(126, 'agag1', 'agag1', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:08:14 PM', 1),
(127, 'agag11', 'agag1', 1, NULL, 'all', 1, 0, 2, 0, '3/8/2024, 7:08:24 PM', 1),
(128, 'dafafafaf', 'fafafaf', 1, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 14, 0, '3/8/2024, 7:09:06 PM', 1),
(130, 'aaaaaafafa', 'fafa', 1, 'b2c2c0bb9a612c949dd56f79fb03cf66.jpg', 'all', 1, 0, 1, 0, '3/8/2024, 7:10:51 PM', 1),
(131, 'fafa', 'faf', 35, 'b2c2c0bb9a612c949dd56f79fb03cf66.jpg', 'all', 1, 0, 4, 0, '3/8/2024, 7:13:00 PM', 1),
(132, 'afa', 'fafa', 1, 'b2c2c0bb9a612c949dd56f79fb03cf66.jpg', 'all', 1, 0, 7, 0, '3/8/2024, 7:13:21 PM', 1),
(133, 'adfaf', 'af', 38, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 7:18:32 PM', 1),
(135, 'afafa', 'agaa', 1, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 7:31:16 PM', 1),
(136, 'afaf', 'fafafa', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:31:31 PM', 1),
(137, 'faf', 'fafa', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:31:45 PM', 1),
(138, 'afafaafa', 'agfafa', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:31:59 PM', 1),
(139, 'Urusei Yatsura (2022) 2nd Season', 'Urusei Yatsura (2022) 2nd Season', 1, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 7, 0, '3/8/2024, 7:32:33 PM', 1),
(140, 'Shen Yin Wangzuo ผนึกเทพบัลลังก์ราชันย์ ', 'Shen Yin Wangzuo ผนึกเทพบัลลังก์ราชันย์ ', 1, 'book_detail_large_3.gif', 'all', 1, 0, 20, 0, '3/8/2024, 7:33:31 PM', 1),
(141, 'agagaga', 'gagaga', 1, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 24, 0, '3/8/2024, 7:35:35 PM', 1),
(142, 'vava', 'vava', 1, '4ee7674e1258789e78f844cb44464a41.webp', '12up', 1, 0, 8, 0, '3/8/2024, 7:36:14 PM', 1),
(144, 'fafafa', 'fafafa', 1, 'b2c2c0bb9a612c949dd56f79fb03cf66.jpg', 'all', 1, 0, 4, 0, '3/8/2024, 7:38:25 PM', 1),
(145, 'aaa', 'aa', 1, NULL, '12up', 1, 0, 0, 0, '3/8/2024, 7:40:47 PM', 1),
(146, 'aafafa', 'afa', 1, NULL, '12up', 1, 0, 0, 0, '3/8/2024, 7:40:59 PM', 1),
(147, 'afgaga', 'agaga', 39, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 7:41:13 PM', 1),
(148, 'agagag', 'aga', 1, NULL, 'all', 1, 0, 12, 0, '3/8/2024, 7:41:32 PM', 1),
(149, 'fafafafaf', 'afafaf', 40, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 0, 0, '3/8/2024, 11:31:13 PM', 1),
(151, 'fqfqf', 'fqf', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:31:47 PM', 1),
(152, 'gaga', 'gaga', 1, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 0, 0, '3/8/2024, 11:32:33 PM', 1),
(153, 'agaga', 'gaga', 1, '85321fb3ec6322e60d37abb8e98c3f0b.jpg', 'all', 1, 0, 8, 0, '3/8/2024, 11:33:01 PM', 1),
(154, 'fafaf', 'afafaf', 1, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 0, 0, '3/8/2024, 11:37:12 PM', 1),
(155, 'dadafaf', 'fafa', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:38:49 PM', 1),
(156, 'dadafafd', 'fafa', 1, NULL, 'all', 1, 0, 3, 0, '3/8/2024, 11:39:04 PM', 1),
(157, 'dadafafdd', 'fafa', 1, NULL, 'all', 1, 0, 7, 0, '3/8/2024, 11:39:11 PM', 1),
(158, 'dadafafddd', 'fafa', 1, NULL, 'all', 1, 0, 1, 0, '3/8/2024, 11:39:17 PM', 1),
(159, 'dadafafdddd', 'fafa', 1, NULL, 'all', 1, 0, 5, 0, '3/8/2024, 11:39:26 PM', 1),
(160, 'dadafafddddd', 'fafadad', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:39:44 PM', 1),
(161, 'dadafafddddda', 'fafadad', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:39:50 PM', 1),
(162, 'dadafafdddddaa', 'fafadad', 1, NULL, 'all', 1, 0, 5, 0, '3/8/2024, 11:39:59 PM', 1),
(163, 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA', 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA', 1, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 37, 0, '3/8/2024, 11:40:44 PM', 1),
(164, 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA 1', 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA 2', 1, '01f246ea4fcb9853beb74fe8b6d7e935.webp', 'all', 1, 0, 57, 0, '3/8/2024, 11:41:26 PM', 1),
(165, 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA 2', 'The Story Behind “3.45 x 4.9 x 2.55” | AUTTA 2', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 11:42:04 PM', 1),
(166, 'vavav', 'vava', 1, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/8/2024, 11:42:22 PM', 1),
(167, 'aa', 'a', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:42:41 PM', 1),
(168, 'aad', 'a', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:42:47 PM', 1),
(169, 'aadd', 'a', 1, NULL, 'all', 1, 0, 0, 0, '3/8/2024, 11:42:59 PM', 1),
(170, 'aaddd', 'a', 1, NULL, 'all', 1, 0, 7, 0, '3/8/2024, 11:43:08 PM', 1),
(171, 'aaddda', 'a', 1, NULL, 'all', 1, 0, 1, 0, '3/8/2024, 11:43:11 PM', 1),
(172, 'aadddad', 'a', 1, NULL, 'all', 1, 0, 2, 0, '3/8/2024, 11:43:22 PM', 1),
(174, 'เวทรักษาที่ไหนเขาใช้กันแบบนี้', 'เวทรักษาที่ไหนเขาใช้กันแบบนี้', 42, '0b57deea047cffee3c58ff31b47d6f77.jpg', '12up', 1, 0, 2, 0, '3/9/2024, 2:22:07 AM', 1),
(175, 'dcadfa', 'fafafa', 35, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 0, 0, '3/9/2024, 2:32:54 AM', 1),
(178, 'tqtqt', 'qtqtq', 45, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 2:34:17 AM', 1),
(179, 'aaaaaaaaa', 'a', 46, '4ee7674e1258789e78f844cb44464a41.webp', 'all', 1, 0, 0, 0, '3/9/2024, 8:27:48 PM', 1),
(180, 'afafaa', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:28:51 PM', 1),
(181, '4141', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:31:05 PM', 1),
(182, '4141a', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:32:25 PM', 1),
(183, '4141afa', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:34:44 PM', 1),
(184, '4141afadfaf', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:35:09 PM', 1),
(185, '4141afadfaffa', 'afafa', 1, NULL, 'all', 1, 0, 2, 0, '3/9/2024, 8:36:26 PM', 1),
(186, '4141afadfaffada', 'afafa', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:36:45 PM', 1),
(187, '4141afadfaffadada', 'afafa', 1, NULL, 'all', 1, 0, 1, 0, '3/9/2024, 8:37:38 PM', 1),
(188, '14141', 'afaf', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:38:14 PM', 1),
(189, '14141fa', 'afaf', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:39:17 PM', 1),
(190, 'zcz', 'zczc', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:39:40 PM', 1),
(192, 'zczaa', 'zczc', 1, NULL, 'all', 1, 0, 0, 0, '3/9/2024, 8:40:44 PM', 1),
(193, 'zczaaa', 'zczc', 1, NULL, 'all', 1, 0, 4, 0, '3/9/2024, 8:41:33 PM', 1),
(194, 'การเดินทาง', 'การเดินทางการเดินทาง', 47, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 6, 0, '3/9/2024, 8:43:23 PM', 1),
(203, 'piep', 'piep', 51, 'f3039adaeacea2b60e6a7c797508d9a4.jpg', 'all', 1, 2, 466, 1, '3/10/2024, 1:03:45 AM', 1),
(211, 'Nozomanu Fushi no Boukensha เส้นทางพลิกผันของราชันอมตะ', 'Nozomanu Fushi no Boukensha เส้นทางพลิกผันของราชันอมตะ', 53, '2eafe3fc81fc225637846f7fcd1185ab.jpg', 'all', 1, 0, 0, 0, '3/10/2024, 9:35:55 PM', 1),
(221, 'Saikyou Tank no Meikyuu Kouryaku ตัวแทงก์สุดแกร่ง', 'Saikyou Tank no Meikyuu Kouryaku ตัวแทงก์สุดแกร่ง', 54, NULL, 'all', 1, 0, 14, 0, '3/10/2024, 9:40:34 PM', 1),
(223, 'Yubisaki to Renren ร้อยเรียงรักจากหัวใจ ', 'Yubisaki to Renren ร้อยเรียงรักจากหัวใจ ', 56, 'book_detail_large_3.gif', 'all', 1, 0, 0, 0, '3/10/2024, 9:44:13 PM', 1),
(227, 'Megumi no Daigo Kyuukoku no Orange สิงห์ผจญเพลิง', 'Megumi no Daigo Kyuukoku no Orange สิงห์ผจญเพลิง', 59, 'osu icon.jpg', '12up', 1, 0, 6, 0, '3/10/2024, 9:46:29 PM', 1),
(246, 'นารูโตะ ตำนานวายุสลาตัน', 'นารูโตะ ตำนานวายุสลาตัน', 63, NULL, '18up', 1, 0, 10, 0, '3/11/2024, 7:10:22 PM', 1),
(247, 'การเดินทางของจิ้งจอกอสูร', 'การเดินทางของจิ้งจอกอสูร', 64, 'a78660677af73340b2f1ee578d7679dd.webp', '18up', 1, 1, 34, 0, '3/14/2024, 3:40:55 AM', 2),
(249, 'Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta', 'Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta', 65, '3972f9a2a93bed96b7e4853b9272343f.jpg', '20up', 1, 1, 6, 0, '3/17/2024, 2:11:02 AM', 1),
(250, 'Loop 7-kaime no Akuyaku Reijou w', 'Loop 7-kaime no Akuyaku Reijou w', 66, '9619e782c964ccf9a30f437bae99f2de.jpg', '18up', 1, 0, 2, 0, '3/17/2024, 2:13:00 AM', 1),
(251, 'Dog Signal', 'Dog Signal', 67, '068f486590b7dd089c5843d12aa374dd.webp', 'all', 1, 0, 1, 0, '3/17/2024, 2:13:37 AM', 1),
(267, '333', '333', 1, '6cabddde5840a774722f48af6da25ef7.webp', '18up', 1, 0, 2, 0, '3/17/2024, 9:28:14 PM', 1),
(274, 'Burning Heart', 'Burning Heart', 74, '3972f9a2a93bed96b7e4853b9272343f.jpg', '12up', 1, 0, 39, 0, '3/21/2024, 11:01:35 PM', 4),
(276, 'Test', 'e', 1, '9619e782c964ccf9a30f437bae99f2de.jpg', 'all', 1, 1, 95, 0, '3/30/2024, 5:30:45 PM', 2),
(299, '1311', '13131', 1, 'large.jpg', '12up', 1, 1, 8, 0, '4/1/2024, 6:44:45 PM', 2),
(306, '33', '33', 1, 'images (1).jpg', 'all', 1, 0, 3, 0, '4/1/2024, 7:05:44 PM', 2);

-- --------------------------------------------------------

--
-- Table structure for table `novel_category`
--

CREATE TABLE `novel_category` (
  `novel_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_type` enum('main','subcategory1','subcategory2') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `novel_category`
--

INSERT INTO `novel_category` (`novel_id`, `category_id`, `category_type`) VALUES
(68, 1, 'main'),
(68, 12, 'subcategory2'),
(68, 15, 'subcategory1'),
(69, 1, 'main'),
(69, 11, 'subcategory2'),
(69, 14, 'subcategory1'),
(71, 0, 'subcategory1'),
(71, 3, 'main'),
(71, 14, 'subcategory2'),
(72, 0, 'subcategory1'),
(72, 8, 'main'),
(72, 13, 'subcategory2'),
(73, 1, 'main'),
(73, 14, 'subcategory2'),
(73, 15, 'subcategory1'),
(74, 0, 'subcategory2'),
(74, 2, 'main'),
(74, 13, 'subcategory1'),
(75, 0, 'subcategory1'),
(75, 1, 'main'),
(75, 14, 'subcategory2'),
(76, 0, 'subcategory2'),
(76, 8, 'subcategory1'),
(76, 14, 'main'),
(80, 0, 'subcategory1'),
(80, 9, 'main'),
(81, 0, 'subcategory1'),
(81, 14, 'main'),
(84, 1, 'main'),
(84, 10, 'subcategory1'),
(84, 12, 'subcategory2'),
(90, 12, 'subcategory1'),
(90, 14, 'main'),
(95, 0, 'subcategory1'),
(95, 13, 'main'),
(96, 2, 'main'),
(96, 13, 'subcategory2'),
(97, 2, 'main'),
(97, 14, 'subcategory1'),
(98, 1, 'main'),
(99, 1, 'main'),
(101, 1, 'main'),
(101, 12, 'subcategory2'),
(101, 14, 'subcategory1'),
(102, 1, 'main'),
(103, 2, 'main'),
(105, 10, 'subcategory1'),
(105, 13, 'subcategory2'),
(105, 14, 'main'),
(106, 2, 'main'),
(106, 12, 'subcategory1'),
(108, 12, 'subcategory2'),
(108, 15, 'main'),
(110, 2, 'main'),
(110, 4, 'subcategory2'),
(110, 5, 'subcategory1'),
(112, 9, 'subcategory2'),
(112, 11, 'subcategory1'),
(112, 14, 'main'),
(116, 1, 'main'),
(118, 1, 'main'),
(118, 2, 'subcategory1'),
(118, 5, 'subcategory2'),
(120, 11, 'subcategory1'),
(120, 13, 'main'),
(122, 1, 'main'),
(122, 3, 'subcategory1'),
(122, 9, 'subcategory2'),
(123, 1, 'main'),
(123, 5, 'subcategory1'),
(123, 11, 'subcategory2'),
(124, 1, 'main'),
(124, 5, 'subcategory1'),
(127, 1, 'main'),
(127, 2, 'subcategory1'),
(127, 5, 'subcategory2'),
(128, 7, 'subcategory1'),
(128, 11, 'subcategory2'),
(128, 12, 'main'),
(130, 1, 'main'),
(130, 2, 'subcategory1'),
(131, 1, 'main'),
(131, 2, 'subcategory1'),
(132, 7, 'main'),
(132, 14, 'subcategory2'),
(133, 14, 'main'),
(136, 4, 'main'),
(137, 13, 'main'),
(138, 3, 'main'),
(138, 4, 'subcategory1'),
(138, 10, 'subcategory2'),
(139, 1, 'main'),
(139, 6, 'subcategory1'),
(139, 10, 'subcategory2'),
(140, 9, 'subcategory2'),
(140, 11, 'subcategory1'),
(140, 14, 'main'),
(141, 2, 'main'),
(141, 11, 'subcategory2'),
(141, 13, 'subcategory1'),
(142, 12, 'main'),
(142, 13, 'subcategory2'),
(144, 9, 'main'),
(144, 12, 'subcategory1'),
(145, 3, 'main'),
(146, 1, 'subcategory1'),
(146, 2, 'main'),
(146, 3, 'subcategory2'),
(147, 4, 'subcategory1'),
(147, 10, 'main'),
(148, 6, 'main'),
(148, 7, 'subcategory1'),
(148, 8, 'subcategory2'),
(151, 2, 'main'),
(151, 3, 'subcategory1'),
(151, 14, 'subcategory2'),
(152, 12, 'main'),
(153, 13, 'main'),
(156, 1, 'main'),
(157, 1, 'main'),
(157, 13, 'subcategory1'),
(158, 1, 'main'),
(158, 12, 'subcategory1'),
(159, 1, 'main'),
(159, 7, 'subcategory1'),
(160, 1, 'main'),
(160, 4, 'subcategory1'),
(161, 1, 'main'),
(161, 5, 'subcategory1'),
(162, 1, 'main'),
(162, 5, 'subcategory1'),
(162, 7, 'subcategory2'),
(163, 1, 'main'),
(163, 11, 'subcategory2'),
(163, 14, 'subcategory1'),
(164, 1, 'main'),
(164, 11, 'subcategory2'),
(164, 14, 'subcategory1'),
(169, 1, 'main'),
(169, 14, 'subcategory2'),
(170, 1, 'main'),
(170, 13, 'subcategory1'),
(170, 14, 'subcategory2'),
(171, 1, 'main'),
(171, 10, 'subcategory1'),
(171, 14, 'subcategory2'),
(172, 1, 'main'),
(172, 10, 'subcategory1'),
(172, 14, 'subcategory2'),
(174, 1, 'subcategory2'),
(174, 3, 'subcategory1'),
(174, 5, 'main'),
(182, 0, 'main'),
(186, 0, 'main'),
(187, 1, 'main'),
(187, 3, 'subcategory1'),
(188, 0, 'main'),
(190, 0, 'main'),
(192, 2, 'main'),
(193, 2, 'main'),
(194, 3, 'main'),
(194, 6, 'subcategory1'),
(203, 7, 'main'),
(203, 11, 'subcategory2'),
(203, 14, 'subcategory1'),
(211, 4, 'main'),
(211, 5, 'subcategory1'),
(221, 9, 'main'),
(221, 10, 'subcategory2'),
(221, 12, 'subcategory1'),
(223, 4, 'subcategory1'),
(223, 14, 'main'),
(227, 2, 'main'),
(227, 4, 'subcategory1'),
(227, 10, 'subcategory2'),
(246, 3, 'subcategory1'),
(246, 9, 'main'),
(247, 9, 'main'),
(247, 10, 'subcategory1'),
(247, 13, 'subcategory2'),
(249, 9, 'main'),
(249, 13, 'subcategory1'),
(250, 9, 'main'),
(251, 1, 'main'),
(267, 4, 'main'),
(274, 11, 'subcategory2'),
(274, 12, 'main'),
(274, 13, 'subcategory1'),
(276, 2, 'subcategory1'),
(276, 3, 'main'),
(276, 5, 'subcategory2'),
(299, 2, 'main'),
(306, 13, 'main');

-- --------------------------------------------------------

--
-- Table structure for table `novel_chapter`
--

CREATE TABLE `novel_chapter` (
  `novel_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `chapter_title` varchar(255) NOT NULL,
  `chapter_content` text NOT NULL,
  `chapter_privacy` int(11) NOT NULL DEFAULT 1,
  `chapter_views` int(11) NOT NULL DEFAULT 0,
  `chapter_comment` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `novel_chapter`
--

INSERT INTO `novel_chapter` (`novel_id`, `chapter_id`, `chapter_title`, `chapter_content`, `chapter_privacy`, `chapter_views`, `chapter_comment`) VALUES
(26, 1, 'dadad', '<p>dadadada</p>', 1, 0, 0),
(203, 1, 'ตอนที่ 1 : การเริ่มต้นใหม่', '<p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\"><span class=\"ql-cursor\">﻿</span>\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</span></p>', 1, 105, 0),
(203, 2, 'ตอนที่ 2 : การพบกันของ....', '<p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">﻿\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p><p><span style=\"color: rgb(0, 0, 0);\"><span class=\"ql-cursor\">﻿</span>\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>', 1, 47, 0),
(247, 1, '3', '<p>dadad d<strong>ddddd      dada</strong></p>', 1, 5, 0),
(249, 1, 'dada', '<p>dada</p>', 1, 0, 0),
(276, 1, 'edad', '<p>d</p>', 1, 0, 0),
(299, 1, 'dadada', '<p>dqdqdqdqd</p>', 1, 9, 0);

-- --------------------------------------------------------

--
-- Table structure for table `novel_likes`
--

CREATE TABLE `novel_likes` (
  `novel_id` int(11) NOT NULL,
  `writer_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penname`
--

CREATE TABLE `penname` (
  `penid` int(11) NOT NULL,
  `penname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penname`
--

INSERT INTO `penname` (`penid`, `penname`) VALUES
(1, 'test'),
(2, 'หน้ากาก'),
(3, 'dadadad'),
(4, 'Ben Bizzy ~ Take it off'),
(5, 'Jarom'),
(10, '1313141414'),
(11, '313'),
(12, '31'),
(13, 'dad'),
(14, 'test 1'),
(15, 'testd'),
(16, ' e.preventDefault()'),
(17, 'Oroka'),
(18, 'da'),
(19, 'dadad'),
(20, 'b'),
(21, 'sd'),
(22, 'fff'),
(23, 'fffddd'),
(24, 'สรรทราย'),
(25, 'aaaaaa'),
(26, 'aaaaaaaa'),
(27, 'aaaaaaaaa'),
(28, 'fafafa'),
(29, 'fafada'),
(30, 'Sousou no Frieren คำอธิฐานในวันที่จากลา FRIEREN ซั'),
(31, '41'),
(32, '14141'),
(33, 'ava'),
(34, 'dada'),
(35, 'fafa'),
(36, 'fafaf'),
(37, 'aaa'),
(38, 'af'),
(39, 'gag'),
(40, 'afaf'),
(41, 'fq'),
(42, 'เวทรักษาที่ไหนเขาใช้กันแบบนี้'),
(43, 't3'),
(44, 'qtqtqtq'),
(45, 'tqtqt'),
(46, 'a'),
(47, 'การเดินทาง'),
(48, 'eqeq'),
(49, 'adad'),
(50, 'jame'),
(51, 'piep'),
(52, 'Ragna Crimson ตำนานนักล่ามังกร '),
(53, 'Nozomanu Fushi no Boukensha เส้นทางพลิกผันของราชัน'),
(54, 'Saikyou Tank no Meikyuu Kouryaku ตัวแทงก์สุดแกร่ง'),
(55, 'ตำนานผู้กล้าแห่งแหวน'),
(56, 'Yubisaki to Renren ร้อยเรียงรักจากหัวใจ '),
(57, 'Yubisaki to Renren ร้อยเรียงรักจากหัวใจ  1'),
(58, 'xczc'),
(59, 'Megumi no Daigo Kyuukoku no Orange สิงห์ผจญเพลิง'),
(60, 'dadada'),
(61, 'Metallic Rouge'),
(62, 'Hell\'s Kitchen Thailand'),
(63, 'นารูโตะ ตำนานวายุสลาตัน'),
(64, 'การเดินทางของจิ้งจอกอสูร'),
(65, 'shin'),
(66, 'Loop 7-kaime no Akuyaku Reijou w'),
(67, 'Dog Signal'),
(68, '1111'),
(69, '11111'),
(70, '111'),
(71, '1111111'),
(72, '44444'),
(73, 'Burning Heart'),
(74, 'Burning Heart 1'),
(75, 'test 31'),
(76, 'test2'),
(77, 'การเดินทางของโปรแกรมเมอร์'),
(78, 'รูปนิยาย');

-- --------------------------------------------------------

--
-- Table structure for table `writer`
--

CREATE TABLE `writer` (
  `writer_id` int(11) NOT NULL,
  `writer_name` varchar(255) NOT NULL,
  `writer_password` varchar(255) NOT NULL,
  `writer_email` varchar(255) NOT NULL,
  `writer_img` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `writer`
--

INSERT INTO `writer` (`writer_id`, `writer_name`, `writer_password`, `writer_email`, `writer_img`, `display_name`) VALUES
(1, 'test 31', '$2b$10$BRVrjfg3qE0IgUDLb3.kfe6.71H2kNCTWsDCavX0Fhd5yOhFALWAC', 'Ferm1@gmail.com', '3972f9a2a93bed96b7e4853b9272343f.jpg', 'Ferm 55555'),
(2, 'test', '$2b$10$6r5ElGcfeqbAwMtuwnJqfuUScRENYDp7GsqFGiMjkeQp3CQeBT0aq', 'test@gmail.com', '1711978191113.jpg', 'KOKOKOKO'),
(3, 'Ferm', '$2b$10$l6Xg6O8KCoWF7sxeFbKQieNRs/zRTaNG68SEg1dKGJcmMN2PrRBiq', 'Ferm@gmail.com', NULL, ''),
(4, 'fermgumjor', '$2b$10$WHP5BAGRXxnIWdEBdkEi5uorjrgK3/biV5Essw3zCVoldgeywgg2a', 'fermgumjor@gmail.com', NULL, NULL),
(5, 'Ferm1', '$2b$10$ZxHOJ0HqaBqGLPRpLAOPb.xzWZAVaiAh6HmyZqRirjaSM.0a5D7Eq', 'Ferm@gmaกฟกil.com', NULL, NULL),
(6, 'Ferm11', '$2b$10$LEaUW6zDxjno/WI4KnfRSuUQEERloTrZYdXO8xvM.zscrfJn25dZu', 'Ferm123@gmail.com', NULL, NULL),
(7, 'Ferm112', '$2b$10$suwjkEmovotMWE4gRxyYcOceQrUxHi1ySBGkkw31aPXwnd8VJkM7O', 'Ferm123@gdadaกฟกmail.com', NULL, NULL),
(8, 'lol1234', '$2b$10$vP4zmMCc1pjuLPZrVYTdGe5cWPgNYN3EASqDH.cB9k1gYhQtgxaq6', 'lol1234@gmail.com', '1711988583680.jpg', 'KOKOKOKO 12314');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`writer_id`,`novel_id`),
  ADD KEY `idnovel_bookmark` (`novel_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `writerid` (`writer_id`),
  ADD KEY `novelid` (`novel_id`);

--
-- Indexes for table `novel`
--
ALTER TABLE `novel`
  ADD PRIMARY KEY (`novel_id`),
  ADD KEY `penid` (`penid`),
  ADD KEY `writer_id` (`writer_id`);

--
-- Indexes for table `novel_category`
--
ALTER TABLE `novel_category`
  ADD PRIMARY KEY (`novel_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `novel_chapter`
--
ALTER TABLE `novel_chapter`
  ADD PRIMARY KEY (`novel_id`,`chapter_id`);

--
-- Indexes for table `novel_likes`
--
ALTER TABLE `novel_likes`
  ADD PRIMARY KEY (`novel_id`,`writer_id`),
  ADD KEY `idwriter` (`writer_id`);

--
-- Indexes for table `penname`
--
ALTER TABLE `penname`
  ADD PRIMARY KEY (`penid`);

--
-- Indexes for table `writer`
--
ALTER TABLE `writer`
  ADD PRIMARY KEY (`writer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `novel`
--
ALTER TABLE `novel`
  MODIFY `novel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=318;

--
-- AUTO_INCREMENT for table `penname`
--
ALTER TABLE `penname`
  MODIFY `penid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `writer`
--
ALTER TABLE `writer`
  MODIFY `writer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `idnovel_bookmark` FOREIGN KEY (`novel_id`) REFERENCES `novel` (`novel_id`),
  ADD CONSTRAINT `idwriter_bookmark` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `novelid` FOREIGN KEY (`novel_id`) REFERENCES `novel` (`novel_id`),
  ADD CONSTRAINT `writerid` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`);

--
-- Constraints for table `novel`
--
ALTER TABLE `novel`
  ADD CONSTRAINT `penid` FOREIGN KEY (`penid`) REFERENCES `penname` (`penid`),
  ADD CONSTRAINT `writer_id` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`);

--
-- Constraints for table `novel_category`
--
ALTER TABLE `novel_category`
  ADD CONSTRAINT `novel_category_ibfk_1` FOREIGN KEY (`novel_id`) REFERENCES `novel` (`novel_id`),
  ADD CONSTRAINT `novel_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `novel_likes`
--
ALTER TABLE `novel_likes`
  ADD CONSTRAINT `idnovel` FOREIGN KEY (`novel_id`) REFERENCES `novel` (`novel_id`),
  ADD CONSTRAINT `idwriter` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`writer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
