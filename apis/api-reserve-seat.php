<?php
	require_once('db-connection.php');
	// $iEventId = $_POST['event'];
	// $sFullname = $_POST['fullname'];
	// $sEmail = $_POST['email'];
	$iEventId = 1;
	$sFullname = "Peter Pan";
	$sEmail = "peter@pan.com";

	try {
    $pdo->beginTransaction();
		//add participant id and event id to event_participants
		$query = $pdo->prepare(
			"INSERT INTO `ux_databases`.`participant`
			(`id_participant`,`full_name`,`email`,`id_user`)
			VALUES
			(:id, :fullName, :email, :idUser);");

		//execute query
		$query->execute(['id'=>null, 'fullName'=>$sFullname, 'email'=>$sEmail,
										 'email'=>$sEmail, 'idUser'=> null]);

		//get id of last item created
		$lastItemId = $pdo->lastInsertId();

		if(! $lastItemId > 0) {
			echo '{"status":"error"}';
			exit();
		}

		$query = $pdo->prepare("INSERT INTO `ux_databases`.`event_participants`
														(`id_event`,`id_participant`)
														VALUES
														(:eventId, :participantId);");

		$query->execute(['eventId'=>$iEventId, 'participantId'=>$lastItemId]);
    $pdo->commit();

	}	catch (Exception $e){
	    $pdo->rollback();
	    echo '{"status":"error", "message":"'.$e.'"}';
	}

	if($query->rowCount() > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}

?>