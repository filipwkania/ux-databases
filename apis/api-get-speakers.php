<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM speaker");
	$query->execute();
	$aSpeakers = $query->fetchAll();

	$ajSpeakers = json_encode($aSpeakers);
	if($aSpeakers != false) {
		echo '{"status":"ok", "data":'.$ajSpeakers.'}';
	} else {
		echo '{"status":"error", "message":"Speaker not found"}';
	}
?>