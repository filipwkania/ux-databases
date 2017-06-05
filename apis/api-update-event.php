<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];
	$sName = $_POST['name'];
	$sDescription = $_POST['description'];
	$sAgenda = $_POST['agenda'];
	$sStart = $_POST['start'];
	$sEnd = $_POST['end'];
	// $sSustenance = $_POST['sustenance'];
	$sSustenance = '0';
	$sLevel = $_POST['level'];
	$sCatchPhrase = $_POST['catchPhrase'];
	$sBriefDescription = $_POST['briefDescription'];
	$sCategory = $_POST['category'];
	$sLocation = $_POST['location'];
	$sMainPartner = $_POST['mainPartner'];
	// $sPrice = $_POST['price'];
	$sPrice = '0';
	$sExtraPartners = $_POST['extraPartners'];
	$sSpeakers = $_POST['speakers'];

	$sPicture = 'event.jpg';

	// $aExtraPartners = json_decode($sExtraPartners);
	// $aSpeakers = json_decode($sSpeakers);

	//Insert event
	$query = $pdo->prepare("UPDATE `ux_databases`.`event`
		SET
		`name` = :name,`description` = :description,`agenda` = :agenda,`start` = :start,`end` = :end,`picture` = :picture, `price` = :price, `main_partner` = nullif(:mainPartner,''), `sustenance` = :sustenance, `level` = :level,`is_active` = 1,`is_canceled` = 0,`catch_phrase` = :catchPhrase,`brief_description` = :briefDescription,`location` = :location,`category` = :category 
		WHERE `id_event` = :id;");

	$query->execute(['name'=>$sName, 'description'=>$sDescription, 'agenda'=>$sAgenda, 'start'=> $sStart, 'end'=>$sEnd, 'picture'=>$sPicture, 'price'=>$sPrice, 'mainPartner'=>$sMainPartner, 'sustenance'=> $sSustenance, 'level'=>$sLevel, 'catchPhrase'=>$sCatchPhrase, 'briefDescription'=>$sBriefDescription, 'location'=>$sLocation, 'category'=>$sCategory, 'id'=>$sId]);

	if($query->rowCount() > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>