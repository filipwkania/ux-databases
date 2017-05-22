<?php
	require_once('db-connection.php');

	$iEventId = $_GET['id'];

	$query = $pdo->prepare("SELECT id_speaker FROM event_speakers WHERE id_event ='".$iEventId."'");
	$query->execute();
	$aSpeakers = $query->fetchAll();

	$ajSpeakers = json_encode($aSpeakers);

	if($aSpeakers != false) {
		echo '{"status":"ok", "data":'.$ajSpeakers.'}';
	} else {
		echo '{"status":"error", "message":"Speaker not found"}';
	}
?>