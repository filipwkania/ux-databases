CREATE DATABASE  IF NOT EXISTS `ux_databases` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ux_databases`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: ux_databases
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archived_event_participants`
--

DROP TABLE IF EXISTS `archived_event_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `archived_event_participants` (
  `id_event` int(11) NOT NULL,
  `id_participant` int(11) NOT NULL,
  KEY `archived_participants_event_idx` (`id_event`),
  KEY `archived_participants_participant_idx` (`id_participant`),
  CONSTRAINT `archived_participants_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `archived_participants_participant` FOREIGN KEY (`id_participant`) REFERENCES `participant` (`id_participant`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archived_event_participants`
--

LOCK TABLES `archived_event_participants` WRITE;
/*!40000 ALTER TABLE `archived_event_participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `archived_event_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarked_events`
--

DROP TABLE IF EXISTS `bookmarked_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarked_events` (
  `id_event` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  KEY `bookmarked_event_idx` (`id_event`),
  KEY `bookmarked_user_idx` (`id_user`),
  CONSTRAINT `bookmarked_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `bookmarked_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarked_events`
--

LOCK TABLES `bookmarked_events` WRITE;
/*!40000 ALTER TABLE `bookmarked_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarked_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `id_event` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `description` text NOT NULL,
  `agenda` text,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `picture` varchar(44) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `available_seats` int(11) DEFAULT NULL,
  `main_partner` int(11) DEFAULT NULL,
  `sustenance` tinyint(1) NOT NULL,
  `level` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_canceled` tinyint(1) NOT NULL DEFAULT '0',
  `catch_phrase` varchar(70) NOT NULL,
  `brief_description` varchar(255) NOT NULL,
  `location` int(11) NOT NULL,
  `taken_seats` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`id_event`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `idevent_UNIQUE` (`id_event`),
  KEY `event_partner_idx` (`main_partner`),
  KEY `event_location_idx` (`location`),
  KEY `event_category_idx` (`category`),
  KEY `event_level_idx` (`level`),
  CONSTRAINT `event_category` FOREIGN KEY (`category`) REFERENCES `event_category` (`id_event_category`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_level` FOREIGN KEY (`level`) REFERENCES `event_level` (`id_event_level`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_location` FOREIGN KEY (`location`) REFERENCES `location` (`id_location`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_partner` FOREIGN KEY (`main_partner`) REFERENCES `partner` (`id_partner`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'New Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.','17:00 Welcome, 17:30 Tech Talk, 20:00 Networking','2017-05-30 17:00:00','2017-05-30 23:00:00','event.jpg',NULL,NULL,NULL,0,1,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',2,0,1),(2,'New Event Vol 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.','17:00 Welcome, 17:30 Tech Talk, 20:00 Networking','2017-05-30 17:00:00','2017-05-30 23:00:00','event.jpg',NULL,1,NULL,0,3,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',1,0,2),(3,'New Event Vol 3','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.','17:00 Welcome, 17:30 Tech Talk, 20:00 Networking','2017-05-30 17:00:00','2017-05-30 23:00:00','event.jpg',NULL,NULL,NULL,0,3,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',2,0,3),(4,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.',NULL,'2017-06-05 17:00:00',NULL,'event.jpg',NULL,NULL,NULL,0,2,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',2,0,3),(5,'Fancy Tech Event Vol 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.',NULL,'2017-06-05 17:00:00',NULL,'event.jpg',NULL,NULL,NULL,0,2,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',2,0,3),(7,'Fancy Tech Event Vol 3','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est, in maximus nunc consectetur ut. Morbi vestibulum ligula vel elit egestas, sed fermentum ligula bibendum. Mauris posuere facilisis cursus. \n\nPhasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh porta vitae. Ut eget dolor rhoncus, convallis libero vel, accumsan justo.','17:00 Welcome, 17:30 Tech Talk, 20:00 Networking','2017-06-12 17:00:00','0000-00-00 00:00:00','event.jpg',NULL,NULL,NULL,0,2,1,0,'Fancy Tech Event','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in orci malesuada nisi n. Nullam mauris urna, scelerisque ac purus vel, luctus eleifend tortor.',2,0,3),(8,'asd','asd','asd','2017-05-24 23:00:00','2017-05-25 22:00:00','defaultEvent.jpg',123,NULL,1,0,3,1,0,'asd','asd',2,0,2),(9,'qweqwe','qweqwe','','2017-06-30 19:00:00','2017-08-12 20:00:00','defaultEvent.jpg',0,NULL,1,0,3,1,0,'qweqwe','',2,0,2),(15,'asdasd','dasdasdasd','','2017-05-24 19:00:00','2017-05-24 21:00:00','defaultEvent.jpg',0,NULL,NULL,0,3,1,0,'asdasd','asdasdas',3,0,2),(19,'asdasdasdasd','dasdasdasd','','2017-05-24 19:00:00','2017-05-24 21:00:00','defaultEvent.jpg',0,NULL,NULL,0,3,1,0,'asdasd','asdasdas',3,0,2),(25,'zxczxc','xcz','zxczxcz','2017-05-24 19:00:00','2017-05-24 20:00:00','defaultEvent.jpg',0,NULL,NULL,0,3,1,0,'zxc','zxcz',3,0,2),(26,'vxcvbcvb','cvbcvb','cvbvcb','2017-05-24 02:00:00','2017-05-24 03:00:00','defaultEvent.jpg',NULL,NULL,NULL,0,3,1,0,'vbcvb','cvbcvb',2,0,2),(28,'vxcvbcvbxcv','cvbcvb','cvbvcb','2017-05-24 02:00:00','2017-05-24 03:00:00','defaultEvent.jpg',0,NULL,NULL,0,3,1,0,'vbcvb','cvbcvb',2,0,2),(30,'hjkhjk','khjkh','hjkhjkh','2017-05-26 04:00:00','2017-05-26 05:00:00','defaultEvent.jpg',0,NULL,2,0,3,1,0,'hjkhjk','hjkhj',2,0,2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_category`
--

DROP TABLE IF EXISTS `event_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_category` (
  `id_event_category` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_event_category`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_category`
--

LOCK TABLES `event_category` WRITE;
/*!40000 ALTER TABLE `event_category` DISABLE KEYS */;
INSERT INTO `event_category` VALUES (2,'Business/administration'),(3,'General'),(1,'Tech talk');
/*!40000 ALTER TABLE `event_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_extra_partners`
--

DROP TABLE IF EXISTS `event_extra_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_extra_partners` (
  `id_event` int(11) NOT NULL,
  `id_partner` int(11) NOT NULL,
  KEY `extra_partners_event_idx` (`id_event`),
  KEY `extra_partners_partner_idx` (`id_partner`),
  CONSTRAINT `extra_partners_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `extra_partners_partner` FOREIGN KEY (`id_partner`) REFERENCES `partner` (`id_partner`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_extra_partners`
--

LOCK TABLES `event_extra_partners` WRITE;
/*!40000 ALTER TABLE `event_extra_partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_extra_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_level`
--

DROP TABLE IF EXISTS `event_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_level` (
  `id_event_level` int(11) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id_event_level`),
  UNIQUE KEY `level_name_UNIQUE` (`level_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_level`
--

LOCK TABLES `event_level` WRITE;
/*!40000 ALTER TABLE `event_level` DISABLE KEYS */;
INSERT INTO `event_level` VALUES (3,'Advanced'),(1,'For All'),(2,'Intermediate');
/*!40000 ALTER TABLE `event_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_participants`
--

DROP TABLE IF EXISTS `event_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_participants` (
  `id_event` int(11) NOT NULL,
  `id_participant` int(11) NOT NULL,
  KEY `participants_event_idx` (`id_event`),
  KEY `participants_participant_idx` (`id_participant`),
  CONSTRAINT `participants_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `participants_participant` FOREIGN KEY (`id_participant`) REFERENCES `participant` (`id_participant`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_participants`
--

LOCK TABLES `event_participants` WRITE;
/*!40000 ALTER TABLE `event_participants` DISABLE KEYS */;
INSERT INTO `event_participants` VALUES (1,5),(3,6),(1,7),(1,8),(1,9),(2,3);
/*!40000 ALTER TABLE `event_participants` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ux_databases`.`event_participants_AFTER_INSERT` AFTER INSERT ON `event_participants` FOR EACH ROW
BEGIN
	UPDATE event AS e
    SET e.available_seats = 1
    WHERE NEW.id_event = e.id_event;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `event_speakers`
--

DROP TABLE IF EXISTS `event_speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_speakers` (
  `id_event` int(11) NOT NULL,
  `id_speaker` int(11) NOT NULL,
  KEY `event_speakers_event_idx` (`id_event`),
  KEY `event_speakers_speaker_idx` (`id_speaker`),
  CONSTRAINT `event_speakers_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_speakers_speaker` FOREIGN KEY (`id_speaker`) REFERENCES `speaker` (`id_speaker`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_speakers`
--

LOCK TABLES `event_speakers` WRITE;
/*!40000 ALTER TABLE `event_speakers` DISABLE KEYS */;
INSERT INTO `event_speakers` VALUES (1,1),(1,2),(1,3),(2,3),(2,4),(3,1),(3,3),(3,5),(4,6),(5,6),(5,7),(5,8);
/*!40000 ALTER TABLE `event_speakers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_tags`
--

DROP TABLE IF EXISTS `event_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_tags` (
  `id_event` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  KEY `event_tags_event_idx` (`id_event`),
  KEY `event_tags_tag_idx` (`id_tag`),
  CONSTRAINT `event_tags_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `event_tags_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_tags`
--

LOCK TABLES `event_tags` WRITE;
/*!40000 ALTER TABLE `event_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fav_tags`
--

DROP TABLE IF EXISTS `fav_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fav_tags` (
  `id_user` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  KEY `fav_tags_user_idx` (`id_user`),
  KEY `fav_tags_tag_idx` (`id_tag`),
  CONSTRAINT `fav_tags_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fav_tags_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fav_tags`
--

LOCK TABLES `fav_tags` WRITE;
/*!40000 ALTER TABLE `fav_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `fav_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id_location` int(11) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `lng` int(11) NOT NULL,
  `lat` int(11) NOT NULL,
  `seats` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_location`),
  UNIQUE KEY `location_name_UNIQUE` (`location_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (2,'KEA Library','Lygten 16, 2400 København NV, Denmark',1,1,150),(3,'IT University of Copenhagen','Rued Langgaards Vej 7, 2300 København S',50,1,400);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `subject` int(11) NOT NULL,
  `is_answered` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_message`),
  KEY `message_subject_idx` (`subject`),
  CONSTRAINT `message_subject` FOREIGN KEY (`subject`) REFERENCES `message_subject` (`id_message_subject`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_subject`
--

DROP TABLE IF EXISTS `message_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message_subject` (
  `id_message_subject` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_message_subject`),
  UNIQUE KEY `subject_name_UNIQUE` (`subject_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_subject`
--

LOCK TABLES `message_subject` WRITE;
/*!40000 ALTER TABLE `message_subject` DISABLE KEYS */;
INSERT INTO `message_subject` VALUES (1,'Application'),(2,'Feedback'),(3,'Question');
/*!40000 ALTER TABLE `message_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participant` (
  `id_participant` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_participant`),
  KEY `participant_user_idx` (`id_user`),
  CONSTRAINT `participant_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
INSERT INTO `participant` VALUES (1,'Bas','xxx',NULL),(2,'Basilissa','basilissa.albers@gmail.com',NULL),(3,'xxx','xxxxx',NULL),(4,'xxx','xxx',NULL),(5,'New Participant','xxx@xxx.com',NULL),(6,'Basilissa Albers','basilissa.albers@gmail.com',NULL),(7,'Basilissa Albers','basilissa.albers@gmail.com',NULL),(8,'Basilissa Albers','basilissa.albers@gmail.com',NULL),(9,'Basilissa Albers','xxxxx',NULL);
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner` (
  `id_partner` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `is_premium` tinyint(1) NOT NULL DEFAULT '0',
  `logo` varchar(44) NOT NULL,
  PRIMARY KEY (`id_partner`),
  UNIQUE KEY `full_name_UNIQUE` (`full_name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
INSERT INTO `partner` VALUES (1,'KEA Ltd','kea.dk','kea@kea.dk','12345678',0,'defaultLogo.jpg'),(2,'Adecco Group','www.adecco.com','info@adecco.com','123456789',0,'svg1.svg'),(3,'Anet','www.anet.co.jp','contact@anet.co.jp','123456789',0,'svg2.svg'),(4,'Comcel','www.comcel.com','info@comcel.com','123456789',0,'svg3.svg'),(5,'FitFinder','www.fitfinder.com','contact@fitfinder.com','123456789',0,'svg4.svg'),(6,'Hampshire College','www.hampshire.edu','administration@hampshire.edu','123456789',0,'svg5.svg'),(7,'Heine Versand','www.heine.com','info@heine.com','123456789',0,'svg6.svg'),(8,'Jabil Circuit','www.jabil.com','info@jabil.com','123456789',0,'svg7.svg'),(9,'Loews Corporation','www.loews.com','info@loews.com','123456789',0,'svg8.svg'),(10,'Agua y Saneamientos','www.agua.com','info@agua.com','123456789',0,'svg9.svg'),(11,'Uddeholms AB','www.uddeholms.com','info@uddeholms.com','123456789',0,'svg10.svg');
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speaker`
--

DROP TABLE IF EXISTS `speaker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speaker` (
  `id_speaker` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `occupation` varchar(100) NOT NULL,
  `picture` varchar(44) DEFAULT NULL,
  PRIMARY KEY (`id_speaker`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speaker`
--

LOCK TABLES `speaker` WRITE;
/*!40000 ALTER TABLE `speaker` DISABLE KEYS */;
INSERT INTO `speaker` VALUES (1,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait.jpg'),(2,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait4.jpg'),(3,'John Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait2.jpg'),(4,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait.jpg'),(5,'John Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait3.jpg'),(6,'John Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait2.jpg'),(7,'John Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait3.jpg'),(8,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait.jpg'),(9,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait4.jpg'),(10,'Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rhoncus suscipit quam, ac pharetra risus tincidunt ut. Aenean orci tortor, condimentum ut maximus quis, interdum eget ex. Sed gravida turpis justo. Etiam eget nibh sit amet enim congue curs','Occupation, Company','portrait.jpg');
/*!40000 ALTER TABLE `speaker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tag`),
  UNIQUE KEY `tag_name_UNIQUE` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `get_notifications` tinyint(1) NOT NULL DEFAULT '0',
  `get_reminders` tinyint(1) NOT NULL DEFAULT '0',
  `picture` varchar(44) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `user_role_idx` (`role`),
  CONSTRAINT `user_role` FOREIGN KEY (`role`) REFERENCES `user_role` (`id_user_role`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'James Smith','admin','aaaaa@b.com',1,0,0,'default.jpg','admin'),(3,'John Doe','member','abc@abc.com',3,0,0,'default.jpg','member'),(4,'abc','abc','abc',3,0,0,'default.jpg','abc');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_messages`
--

DROP TABLE IF EXISTS `user_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_messages` (
  `id_user` int(11) NOT NULL,
  `id_message` int(11) NOT NULL,
  KEY `messages_user_idx` (`id_user`),
  KEY `messages_message_idx` (`id_message`),
  CONSTRAINT `messages_message` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `messages_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_messages`
--

LOCK TABLES `user_messages` WRITE;
/*!40000 ALTER TABLE `user_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id_user_role` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id_user_role`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'admin'),(3,'member');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ux_databases'
--
/*!50003 DROP PROCEDURE IF EXISTS `getNearLocation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getNearLocation`(IN locationid int, IN dist int)
BEGIN
	DECLARE startLng double;
	DECLARE startLat double;
	SELECT lng, lat INTO startLng, startLat FROM location
WHERE locationid = location.id_location; 
SELECT event.*, ( 6371 * acos( cos( radians(startLat) ) * cos( radians( location.lat ) ) 
* cos( radians( location.lng ) - radians(startLng) ) + sin( radians(startLat) ) * sin(radians(location.lat)) ) ) AS distance 
FROM event
LEFT JOIN location ON event.location = location.id_location
HAVING distance < dist 
ORDER BY distance 
LIMIT 0 , 20;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-26  2:58:46
