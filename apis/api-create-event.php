<?php 
	require_once('db-connection.php');

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

	$sPicture = 'defaultEvent.jpg';

	$aExtraPartners = json_decode($sExtraPartners);
	$aSpeakers = json_decode($sSpeakers);

	try {
    $pdo->beginTransaction();
    	//Insert event
		$query = $pdo->prepare("INSERT INTO `ux_databases`.`event` (`id_event`, `name`, `description`, `agenda`, `start`, `end`, `picture`, `price`, `main_partner`, `sustenance`, `level`, `catch_phrase`, `brief_description`, `location`, `category`) 
			VALUES (NULL , :name, :description, :agenda, :start, :end, :picture, :price, nullif(:mainPartner,''), :sustenance, :level, :catchPhrase, :briefDescription, :location, :category);");

		$query->execute(['name'=>$sName, 'description'=>$sDescription, 'agenda'=>$sAgenda, 'start'=> $sStart, 'end'=>$sEnd, 'picture'=>$sPicture, 'price'=>$sPrice, 'mainPartner'=>$sMainPartner, 'sustenance'=> $sSustenance, 'level'=>$sLevel, 'catchPhrase'=>$sCatchPhrase, 'briefDescription'=>$sBriefDescription, 'location'=>$sLocation, 'category'=>$sCategory]);

		$sEventId = $pdo->lastInsertId();

		//Insert event extra parters
		$iLength = count($aExtraPartners);
		$sValues = '';
		for($i = 0 ; $i < $iLength; $i++) {
			$sValues .= '('.$sEventId.', ?)';
			if($i+1 != $iLength) {
				$sValues .= ',';
			}
		}

		$query = $pdo->prepare("INSERT INTO `ux_databases`.`event_extra_partners`
			(`id_event`,`id_partner`)
			VALUES ".$sValues);

		$query->execute($aExtraPartners);

		//Insert event speakers
		$iLength = count($aSpeakers);
		$sValues = '';
		for($i = 0 ; $i < $iLength; $i++) {
			$sValues .= '('.$sEventId.', ?)';
			if($i+1 != $iLength) {
				$sValues .= ',';
			}
		}
		$query = $pdo->prepare("INSERT INTO `ux_databases`.`event_speakers`
			(`id_event`,`id_speaker`)
			VALUES ".$sValues);

		$query->execute($aSpeakers);

    $pdo->commit();

	}	catch (Exception $e){
	    $pdo->rollback();
	    echo '{"status":"error", "message":"'.$e.'"}';
	    exit();
	}

	if($query->rowCount() > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>