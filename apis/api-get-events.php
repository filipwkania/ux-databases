<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM event");
	$query->execute();
	$aEvents = $query->fetchAll();

	$ajEvents = json_encode($aEvents);
	if($aEvents != false) {
		echo '{"status":"ok", "data":'.$ajEvents.'}';
	} else {
		echo '{"status":"error", "message":"Event not found"}';
	}
?>