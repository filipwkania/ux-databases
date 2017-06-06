<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("
		SELECT 
		event.*, 
		location.location_name AS location_name 
		FROM event
		LEFT JOIN location ON location.id_location = event.location;");
	$query->execute();
	$aEvents = $query->fetchAll();

	$ajEvents = json_encode($aEvents);
	if($aEvents != false) {
		echo '{"status":"ok", "data":'.$ajEvents.'}';
	} else {
		echo '{"status":"error", "message":"Event not found"}';
	}
?>