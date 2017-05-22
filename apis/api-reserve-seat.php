<?php
	require_once('db-connection.php');
	$iEventId = $_POST['event'];
	$sFullname = $_POST['fullname'];
	$sEmail = $_POST['email'];

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