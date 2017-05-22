<?php
	require_once('db-connection.php');
	$iEventId = $_POST['event'];
	$sFullname = $_POST['fullname'];
	$sEmail = $_POST['email'];

	//create participant in db
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`participant`
													(`id_participant`,`full_name`,`email`,`id_user`)
													VALUES
													(:id,:fullname,:email,:idUser);");
	//execute query
	$query->execute(['id'=>null,'fullname'=>$sFullname, 'email'=>$sEmail, 'idUser'=>null]);

	$iParticipantId = $pdo->lastInsertId();

	//add participant id and event id to event_participants
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`event_participants`
													(`id_event`,`id_participant`)
													VALUES
													(:id_event,:id_participant);");

	//execute query
	$query->execute(['id_event'=>$iEventId, 'id_participant'=>$iParticipantId]);

	//check how many rows were created
	$created = $query->rowCount();

	if($created != null) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}

?>