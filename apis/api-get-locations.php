<?php 
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM location");
	$query->execute();
	$aLocations = $query->fetchAll();

	if($aLocations != false) {
		$saLocations = json_encode($aLocations);
		echo '{"status":"ok", "data":'.$saLocations.'}';
	} else {
		echo '{"status":"error", "message":"Location not found"}';
	}

 ?>