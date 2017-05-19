<?php 
	require_once('db-connection.php');

	$sName = $_POST['name'];
	$sDescription = $_POST['description'];
	$sAgenda = $_POST['agenda'];
	$sStart = $_POST['start'];
	$sEnd = $_POST['end'];
	$sSustenance = $_POST['sustenance'];
	$sLevel = $_POST['level'];
	$sCatchPhrase = $_POST['catchPhrase'];
	$sBriefDescription = $_POST['briefDescription'];
	$sCategory = $_POST['category'];
	$sLocation = $_POST['location'];
	$sMainPartner = $_POST['mainPartner'];
	$sPrice = $_POST['price'];

	$pdo->prepare("INSERT INTO `ux_databases`.`event` (`id_event`, `name`, `description`, `agenda`, `start`, `end`, `picture`, `price`, `available_sits`, `main_partner`, `sustenance`, `level`, `is_active`, `is_canceled`, `catch_phrase`, `brief_description`, `location`, `taken_sits`, `category`) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);")

 ?>