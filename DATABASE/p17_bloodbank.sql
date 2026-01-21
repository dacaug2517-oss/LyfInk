-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: p17_bloodbank
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blood_component`
--

create database p17_bloodbank;
use p17_bloodbank;

DROP TABLE IF EXISTS `blood_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_component` (
  `bcid` int NOT NULL AUTO_INCREMENT,
  `bc_name` varchar(10) DEFAULT NULL,
  `category` int DEFAULT NULL,
  PRIMARY KEY (`bcid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_component`
--

LOCK TABLES `blood_component` WRITE;
/*!40000 ALTER TABLE `blood_component` DISABLE KEYS */;
INSERT INTO `blood_component` VALUES (1,'A+',1),(2,'A-',1),(3,'B+',1),(4,'B-',1),(5,'AB+',1),(6,'AB-',1),(7,'O+',1),(8,'O-',1),(9,'Bombay+',1),(10,'Bombay-',1),(11,'plasma',2),(12,'platelets',3),(13,'cryo',4),(14,'RBC',5);
/*!40000 ALTER TABLE `blood_component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_request`
--

DROP TABLE IF EXISTS `blood_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_request` (
  `brid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `bcid` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `request_date` date DEFAULT NULL,
  `requiredby` date DEFAULT NULL,
  `purpose` varchar(30) DEFAULT NULL,
  `contact_no` varchar(12) DEFAULT NULL,
  `stateid` int DEFAULT NULL,
  `cityid` int DEFAULT NULL,
  PRIMARY KEY (`brid`),
  KEY `uid_idx` (`uid`),
  KEY `bc_id__idx` (`bcid`),
  KEY `s_id_idx` (`stateid`),
  KEY `c_id_idx` (`cityid`),
  CONSTRAINT `bc_id_` FOREIGN KEY (`bcid`) REFERENCES `blood_component` (`bcid`),
  CONSTRAINT `c_id` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `s_id` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`),
  CONSTRAINT `user_id` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_request`
--

LOCK TABLES `blood_request` WRITE;
/*!40000 ALTER TABLE `blood_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_response`
--

DROP TABLE IF EXISTS `blood_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_response` (
  `resid` int NOT NULL AUTO_INCREMENT,
  `brid` int NOT NULL,
  `comment` tinyblob,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`resid`),
  KEY `brid_idx` (`brid`),
  CONSTRAINT `brid` FOREIGN KEY (`brid`) REFERENCES `blood_request` (`brid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_response`
--

LOCK TABLES `blood_response` WRITE;
/*!40000 ALTER TABLE `blood_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blood_stock`
--

DROP TABLE IF EXISTS `blood_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blood_stock` (
  `bsid` int NOT NULL AUTO_INCREMENT,
  `hbid` int DEFAULT NULL,
  `bcid` int DEFAULT NULL,
  `ml` int NOT NULL,
  `expiry_date` date NOT NULL,
  PRIMARY KEY (`bsid`),
  KEY `bcid_idx` (`bcid`),
  KEY `hbid_idx` (`hbid`),
  CONSTRAINT `bc_id` FOREIGN KEY (`bcid`) REFERENCES `blood_component` (`bcid`),
  CONSTRAINT `hb_id` FOREIGN KEY (`hbid`) REFERENCES `hb_details` (`hbid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_stock`
--

LOCK TABLES `blood_stock` WRITE;
/*!40000 ALTER TABLE `blood_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `blood_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `cityid` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(45) NOT NULL,
  `sid` int DEFAULT NULL,
  PRIMARY KEY (`cityid`),
  KEY `sid_idx` (`sid`),
  CONSTRAINT `sid` FOREIGN KEY (`sid`) REFERENCES `state` (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'mumbai',1),(2,'pune',1),(3,'nagpur',1),(4,'amravati',1),(5,'dharbhanga',2),(6,'patna',2),(7,'gaya',2),(8,'satna',3),(9,'indore',3),(10,'rewa',3),(11,'ujjain',3),(12,'jabalpur',3),(13,'panji',6),(14,'lakhnow',4),(15,'kanpur',4);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_camp`
--

DROP TABLE IF EXISTS `donation_camp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_camp` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `hbid` int DEFAULT NULL,
  `camp_name` varchar(45) NOT NULL,
  `venue` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `from_time` datetime(6) NOT NULL,
  `to_time` datetime(6) DEFAULT NULL,
  `contact_person` varchar(45) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `stateid` int NOT NULL,
  `cityid` int NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `hb_id_idx` (`hbid`),
  KEY `stateid_idx` (`stateid`),
  KEY `city_id_idx` (`cityid`),
  CONSTRAINT `city_id` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `hb_id_` FOREIGN KEY (`hbid`) REFERENCES `hb_details` (`hbid`),
  CONSTRAINT `state_id` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_camp`
--

LOCK TABLES `donation_camp` WRITE;
/*!40000 ALTER TABLE `donation_camp` DISABLE KEYS */;
/*!40000 ALTER TABLE `donation_camp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor` (
  `did` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `dob` date NOT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `bcid` int NOT NULL,
  `medical_history` blob,
  PRIMARY KEY (`did`),
  KEY `uid_idx` (`uid`),
  KEY `bcid_idx` (`bcid`),
  CONSTRAINT `bcid` FOREIGN KEY (`bcid`) REFERENCES `blood_component` (`bcid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor_donations`
--

DROP TABLE IF EXISTS `donor_donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donor_donations` (
  `ddid` int NOT NULL AUTO_INCREMENT,
  `did` int NOT NULL,
  `donated_date` date NOT NULL,
  `hbid` int NOT NULL,
  `units` int NOT NULL,
  PRIMARY KEY (`ddid`),
  KEY `did_idx` (`did`),
  KEY `hbid_idx` (`hbid`),
  CONSTRAINT `did` FOREIGN KEY (`did`) REFERENCES `donor` (`did`),
  CONSTRAINT `hbid` FOREIGN KEY (`hbid`) REFERENCES `hb_details` (`hbid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor_donations`
--

LOCK TABLES `donor_donations` WRITE;
/*!40000 ALTER TABLE `donor_donations` DISABLE KEYS */;
/*!40000 ALTER TABLE `donor_donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hb_details`
--

DROP TABLE IF EXISTS `hb_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hb_details` (
  `hbid` int NOT NULL AUTO_INCREMENT,
  `hb_name` varchar(50) NOT NULL,
  `hb_email` varchar(20) NOT NULL,
  `hb_phno` bigint NOT NULL,
  `reg_no` varchar(20) NOT NULL,
  `gst_no` varchar(20) NOT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`hbid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `userid` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hb_details`
--

LOCK TABLES `hb_details` WRITE;
/*!40000 ALTER TABLE `hb_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `hb_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'donor'),(3,'hospital/blood_bank');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `stateid` int NOT NULL AUTO_INCREMENT,
  `statename` varchar(20) NOT NULL,
  PRIMARY KEY (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'maharashtra'),(2,'bihar'),(3,'madhya pradesh'),(4,'uttar pradesh'),(5,'uttarakhand'),(6,'goa');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `password` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mobno` bigint NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `stateid` int DEFAULT NULL,
  `cityid` int DEFAULT NULL,
  `rid` int DEFAULT NULL,
  `security_question` varchar(100) DEFAULT NULL,
  `security_answer` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `rid_idx` (`rid`),
  KEY `stateid_idx` (`stateid`),
  KEY `cityid_idx` (`cityid`),
  CONSTRAINT `cityid` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `stateid` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'p17_bloodbank'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-20 13:49:06
