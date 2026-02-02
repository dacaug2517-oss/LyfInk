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
  `bc_name` varchar(255) DEFAULT NULL,
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
  `purpose` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `stateid` int DEFAULT NULL,
  `cityid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`brid`),
  KEY `uid_idx` (`uid`),
  KEY `bc_id__idx` (`bcid`),
  KEY `s_id_idx` (`stateid`),
  KEY `c_id_idx` (`cityid`),
  KEY `FKdihr6vf7udbx5b9c5qxo69x4d` (`userid`),
  CONSTRAINT `bc_id_` FOREIGN KEY (`bcid`) REFERENCES `blood_component` (`bcid`),
  CONSTRAINT `c_id` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `FKdihr6vf7udbx5b9c5qxo69x4d` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `s_id` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`),
  CONSTRAINT `user_id` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_request`
--

LOCK TABLES `blood_request` WRITE;
/*!40000 ALTER TABLE `blood_request` DISABLE KEYS */;
INSERT INTO `blood_request` VALUES (5,13,1,2,'2026-01-15','2026-01-16','accident patient','1234567898',1,2,NULL),(6,NULL,2,3,'2026-01-30','2026-01-05','cczxv bnm','19215344',3,10,NULL),(7,NULL,5,5,'2026-01-30','2026-01-23','accident patient','1598745236',1,3,NULL),(8,28,5,2,'2026-01-30','2026-02-02','Emergency surgery','9876543210',1,2,NULL),(9,28,5,2,'2026-01-30','2026-01-18','adasd','47474747474',1,1,NULL),(10,28,7,1,'2026-01-30','2026-01-19','sdasd','4141414141',1,3,NULL),(11,28,1,1,'2026-02-01','2026-02-01','ksdfh','1236547898',6,13,NULL),(12,28,6,12,'2026-02-01','2026-02-01','jashsdjhajsd','1234567895',4,14,NULL),(13,28,4,124,'2026-02-01','2026-02-01','atest','1234567895',6,13,NULL),(14,28,9,1,'2026-02-02','2026-02-26','qwerty','1234567890',1,3,NULL);
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
  `comment` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`resid`),
  KEY `brid_idx` (`brid`),
  CONSTRAINT `brid` FOREIGN KEY (`brid`) REFERENCES `blood_request` (`brid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_response`
--

LOCK TABLES `blood_response` WRITE;
/*!40000 ALTER TABLE `blood_response` DISABLE KEYS */;
INSERT INTO `blood_response` VALUES (9,5,'available','APPROVED'),(10,5,'asdf','APPROVED');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blood_stock`
--

LOCK TABLES `blood_stock` WRITE;
/*!40000 ALTER TABLE `blood_stock` DISABLE KEYS */;
INSERT INTO `blood_stock` VALUES (1,1,1,250,'2026-03-02'),(2,2,6,300,'2026-02-10'),(3,2,3,400,'2026-01-31'),(4,1,4,450,'2026-02-15');
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
  `cityname` varchar(255) DEFAULT NULL,
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
  `camp_name` varchar(255) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `stateid` int NOT NULL,
  `cityid` int NOT NULL,
  `from_time` time DEFAULT NULL,
  `to_time` time DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `hb_id_idx` (`hbid`),
  KEY `stateid_idx` (`stateid`),
  KEY `city_id_idx` (`cityid`),
  CONSTRAINT `city_id` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `hb_id_` FOREIGN KEY (`hbid`) REFERENCES `hb_details` (`hbid`),
  CONSTRAINT `state_id` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_camp`
--

LOCK TABLES `donation_camp` WRITE;
/*!40000 ALTER TABLE `donation_camp` DISABLE KEYS */;
INSERT INTO `donation_camp` VALUES (3,1,'Tata Blood Camp','Gokhale Institute','2026-01-31','Rahul Sharma','asdad',1,2,'00:00:00','00:00:00'),(4,2,'AIIMS , Nagpur','Nagpur','2026-01-31','Rohit Sharma','Nagpur',1,3,'00:00:00','00:00:00'),(5,1,'ABC h ygrtvsgr','sdfsfgh','2026-02-09','sdfafg','hjk dfg',1,2,'00:00:00','00:00:00'),(7,5,'Phelan Mcleod','Dolorum autem conseq','2011-06-01','Similique ipsam aper','Est quis aut conseq',4,14,'00:00:00','00:00:00'),(8,5,'Emery Carter','Maxime ut vero aliqu','2022-08-26','Rerum tenetur ut qui','Omnis eu est volupta',6,13,'00:00:00','00:00:00'),(9,5,'Emery Carter','Maxime ut vero aliqu','2022-08-26','Rerum tenetur ut qui','Omnis eu est volupta',6,13,'00:00:00','00:00:00');
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
  `gender` varchar(255) DEFAULT NULL,
  `bcid` int NOT NULL,
  `medical_history` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`did`),
  KEY `uid_idx` (`uid`),
  KEY `bcid_idx` (`bcid`),
  CONSTRAINT `bcid` FOREIGN KEY (`bcid`) REFERENCES `blood_component` (`bcid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES (1,13,'2002-05-01','Male',1,'None'),(2,14,'2026-01-08','Male',4,'asdfghjk,'),(3,17,'2002-12-21','Male',7,'qwertyuiopolkjhgfds'),(4,18,'2026-01-01','Male',1,'sdfghjkklasdfghjk'),(5,24,'2026-01-23','Male',7,'qwsdfvgbhn'),(6,31,'2026-01-04','Male',1,'qwsedrfgy'),(7,34,'2013-05-05','Male',1,'jhkghfkhgf'),(8,35,'2013-05-05','Male',1,'jhkghfkhgf'),(9,36,'1999-12-26','Male',1,'None'),(10,37,'1999-12-26','Male',2,'Nisi molestiae sint '),(11,38,'1999-12-26','Male',2,'None'),(12,40,'1999-12-26','Male',2,'None'),(13,41,'1999-12-26','Male',2,'None'),(14,42,'1999-12-26','Male',2,'None'),(15,43,'1999-12-26','Male',2,'None'),(16,44,'1999-12-26','Male',2,'None'),(17,45,'2006-01-25','Male',2,'Distinctio Voluptas');
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
  `hb_name` varchar(255) DEFAULT NULL,
  `hb_phno` bigint NOT NULL,
  `reg_no` varchar(255) DEFAULT NULL,
  `gst_no` varchar(255) DEFAULT NULL,
  `uid` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `hb_email` varchar(255) DEFAULT NULL,
  `hb_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hbid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `userid` FOREIGN KEY (`uid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hb_details`
--

LOCK TABLES `hb_details` WRITE;
/*!40000 ALTER TABLE `hb_details` DISABLE KEYS */;
INSERT INTO `hb_details` VALUES (1,'mera hospital',9971459968,'dadawdawdaw','243468348648',16,'Hospital',NULL,NULL),(2,'sxcvbyhwdsoklsaplx ioaskzaidkm,',9971459968,'dadawdawdaw','243468348648',19,'Hospital','abc@gmail.com',NULL),(4,'Zeus Kim',1234567890,'Pariatur Qui nisi l','Alias modi minim lib',27,'Hospital','pejydynad@mailinator.com','$2a$10$k.2HrKIkgOzpk0WxB58n4OIHDKdv0nl83d9cUccDoTS71AxflSqgq'),(5,'Genevieve Davis',1234567890,'Ex id deserunt exce','Adipisicing enim aut',27,'Hospital','test1@gmail.com','$2a$10$VSaWXfunfVtucS11IshjcOMA4OyXSuClnf4IkCISV5fPWFmTtDisC'),(6,'Charde Williams',1234567890,'Et dolore maxime dic','Iste voluptatem aut',27,'BloodBank','gigab@mailinator.com','$2a$10$2jHsBZ388.afUtV7C1xM6eZpOROxw4Lpgsxj0GXIdkjH/0dJ/wPl6'),(7,'Tata hospital',1236547898,'123456','654321',27,'Hospital','Admin@123','$2a$10$0uHfXD8aNzFBRR1F4E.dUO1bey3E5BOIN/wPSwGFoNcYcKzbAHz46'),(8,'Tata Blood Bank',1234567890,'123654','147852',27,'BloodBank','tata@123','$2a$10$9iprTrDgw8twNumgUkjBNeOJnKpfyCETUoGlsVHsTD67Is8hZ5.Mm');
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
  `rname` varchar(255) DEFAULT NULL,
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
  `statename` varchar(255) DEFAULT NULL,
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
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobno` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `stateid` int DEFAULT NULL,
  `cityid` int DEFAULT NULL,
  `rid` int DEFAULT NULL,
  `security_question` varchar(255) DEFAULT NULL,
  `security_answer` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `rid_idx` (`rid`),
  KEY `stateid_idx` (`stateid`),
  KEY `cityid_idx` (`cityid`),
  CONSTRAINT `cityid` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `stateid` FOREIGN KEY (`stateid`) REFERENCES `state` (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'$2a$10$B4IBByYSbD3nk71zeVE6wuwfllUodGSNLbZjGDcJgptQep3FzbWhW','Manav','Chauhan','manav@gmail.com',9999999999,'Pune',1,2,1,'What is your favorite color?','Red',NULL),(14,'$2a$10$3VknLVV18UZGZr/neJ4j4.FhEeFGPjMT9BFgAWdtKFVZWiQ5DFrcm','Manav','chauhan','manav21dec@gmail.com',9971459968,'00 RAMANANDPATH\nRamanandpath\nLaheriasrai',2,5,1,'What is your mother\'s maiden name?','sdxcfvgbhn',NULL),(16,'$2a$10$dVDjT9fcEwc0JqwGi8Kc.OGc0kT7SuSmMGesD/sAEGhWeM/9dfrZC','Manav','chauhan','manav21dec@gmail.com',9971459968,'Vadgaon BK',1,2,2,'What is your mother\'s maiden name?','vdvdvd',NULL),(17,'$2a$10$IkHAXU/Iwr/7RVs94fjrOeXiUzpTlt3XT1JnbUsfA9uxsabmLGn82','sher','singh','sherhoonmain@123',9192789654,'den',1,2,1,'What was the name of your first pet?','sher',NULL),(18,'$2a$10$OghLhXtec11dzsnYiz9C6utzDyTDv8LKeI6xd1qXzr8DLxMDxnwy.','Manav','chauhan','manav21dec@gmail.com',9971459968,'Vadgaon BK',1,2,1,'What was the name of your first pet?','vdvdvd',NULL),(19,'$2a$10$9wikjwkfk.IejPZ/QbDljeCagGmxTO4iMrvJrdM1Mvj1aRJILHbhu','Manav','chauhan','manav21dec@gmail.com',9971459968,'Vadgaon BK',1,2,2,'What was the name of your first pet?','red',NULL),(24,'$2a$10$it1.QTi3FVrtfRrQ0lJ.YOw3Z0ChPm/.tjMsnSVixYvJhFRj.i5Ci','Manav','chauhan','Donor@123',9971459968,'Vadgaon BK',1,2,2,'What is your mother\'s maiden name?','fdxb ',NULL),(27,'$2a$10$jGL.iS47ZZ4lR1BCir8nKeN.dCek2oJNDnkfxFhFbaW2JJ3kk9agm','Manav','chauhan','Admin@123',9971459968,'Vadgaon BK',1,2,1,'What is your mother\'s maiden name?','sher',NULL),(28,'$2a$10$fkr0S3ddOPQTcaIpZXZqXuOqIUGsFBOhUoEC./8lzMzS1Ct1n4oFm','Manav','chauhan','manav21dec@gmail.com',9971459968,'Vadgaon BK',1,2,1,'What is your mother\'s maiden name?','fdxb ',NULL),(31,'$2a$10$.gP6GcYggWDw0i7/khESZefXTJ.DFVbYef7LrA4q9CrYmqLjxi7cC','Manav','chauhan','demo@123',9971459968,'Vadgaon BK',1,2,2,'What was the name of your first pet?','red',NULL),(33,'$2a$10$208gZoOfm6nfNswEB8dfEeT01Ml6sgJUGgx1ahribj.aiSLaJVrcG','prajwal','mahalle','blood@123',1234567898,'jhasgdhj',1,1,3,'dfsdf','ewds',NULL),(34,'$2a$10$hAvbZUZLibuHQNACw./QkOsnRu2L2S3p9pihkcm4Ube3ybF6TwJq.','prajwal','mahalle','prajwal@gmail.com',1234567898,'asdjhgahsd',1,2,2,'What is your mother\'s maiden name?','kjgfkhgf',NULL),(35,'$2a$10$X8ntBif0v3wpQJGG4bcDbucFiX2E.7UNfVqZZvoOJw0brT/FG5x3.','prajwal','mahalle','somesh@gmail.com',1234567898,'asdjhgahsd',1,2,3,'What is your mother\'s maiden name?','kjgfkhgf',NULL),(36,'$2a$10$eIH6SdTUdulrK.KUARZaYeBc9kQtyRuWCd/OpB/JvX9N.ivTb8d1K','Kim','Moran','labemofeb_test@mailinator.com',9876543210,'Test Address',1,1,2,'Q','A',NULL),(37,'$2a$10$94Gb6gtbslv2kxSVZYW1Nup/14..gQN2KZz8OOwsKya02ZJ69Rga6','Kim','Moran','labemofeb_real_2@mailinator.com',9876543210,'Harum molestiae repu',3,9,2,'What is your mother\'s maiden name?','Dignissimos enim vol',NULL),(38,'$2a$10$qjeAGI99dTbRGk5Sm3JmHuwNOw0JMk4X7MK9A1c1zQ1mtUwjN9W1q','Kim','Moran','kim.moran_fixed@mailinator.com',9876543210,'Test',3,9,2,'Q','A',NULL),(39,'$2a$10$fPHVlr6VEEbEjhmfIijrru3IrasaGOnrFYXObgxygvMGdweawPWKO','Admin','Test','admin_test_1@mailinator.com',9876543210,'Test',3,9,1,'Q','A',NULL),(40,'$2a$10$S6sZIkKbqK5sroeWsskBkeLyR.utevLIcowhjGPKd.dBbPn9q5Zr.','Kim','Moran','kim.test.final@mailinator.com',17082576535,'Harum molestiae repu',3,9,2,'Question?','Answer',NULL),(41,'$2a$10$yuXYMybc5XPiRvvZFL8okuRR65ybDyXZAefKoGfdQ5CuavuwiMG5C','Kim','Moran','kim.final@mailinator.com',17082576535,'Harum molestiae repu',3,9,2,'Question?','Answer',NULL),(42,'$2a$10$aAdIVujt/FvVmfMXSRaKbeAemU5QsMVWnjyArtrnOsrWBFIcikidi','SmallNum','Test','smallnum_test@mailinator.com',123456789,'Test',3,9,2,'Q','A',NULL),(43,'$2a$10$DhMmbkFj3T.lRKoUL0gmdecVG8DbR4frRPlHstWQciVI3SkkCuFZS','Kim','Moran','final@mailinator.com',17082576535,'Harum molestiae repu',3,9,2,'Question?','Answer',NULL),(44,'$2a$10$2UJla5LutjHfFqI6F0yZjOZvRtye6kkiNc9waTGX2LP.pW4kzRjKC','Kim','Moran','fnal@mailinator.com',17082576535,'Harum molestiae repu',3,9,2,'Question?','Answer',NULL),(45,'$2a$10$6.fqwUKSH51uEBp9qC8n4.DX5OdZGTQF.tXHQgXCnWX1gA4hhpir2','Carolyn','Knight','hoqydaw@mailinator.com',15967413508,'Ratione sequi exerci',3,9,2,'What was the name of your first pet?','Dolore consectetur ',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'p17_bloodbank'
--

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

-- Dump completed on 2026-02-02 12:23:19
