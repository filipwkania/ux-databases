<?php
	require_once('db-connection.php');

	// get speakers - fake data
	$FILENAME = '../speakers.txt';
	$sajSpeakers = file_get_contents($FILENAME);
	// convert it to JSON
	$ajSpeakers = json_decode($sajSpeakers);
	// success
	$sajSpeakers = json_encode($ajSpeakers, JSON_UNESCAPED_UNICODE);

	$query = $pdo->prepare("SELECT * FROM event");
	$query->execute();
	$aEvents = $query->fetchAll();

	$ajEvents = json_encode($aEvents);
	if($aEvents != false) {
		echo '{"status":"ok", "data":'.$ajEvents.', "speakers":'.$sajSpeakers.'}';
	} else {
		echo '{"status":"error", "message":"Event not found"}';
	}
?>