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

	$sPicture = 'defaultEvent.jpg';

	$query = $pdo->prepare("INSERT INTO `ux_databases`.`event` (`id_event`, `name`, `description`, `agenda`, `start`, `end`, `picture`, `price`, `main_partner`, `sustenance`, `level`, `catch_phrase`, `brief_description`, `location`, `category`) 
		VALUES (NULL , :name, :description, :agenda, :start, :end, :picture, :price, nullif(:mainPartner,''), :sustenance, :level, :catchPhrase, :briefDescription, :location, :category);");

	$query->execute(['name'=>$sName, 'description'=>$sDescription, 'agenda'=>$sAgenda, 'start'=> $sStart, 'end'=>$sEnd, 'picture'=>$sPicture, 'price'=>$sPrice, 'mainPartner'=>$sMainPartner, 'sustenance'=> $sSustenance, 'level'=>$sLevel, 'catchPhrase'=>$sCatchPhrase, 'briefDescription'=>$sBriefDescription, 'location'=>$sLocation, 'category'=>$sCategory]);

	$createdRows = $query->rowCount();

	if($createdRows > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>