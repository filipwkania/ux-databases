<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM event_level");
	$query->execute();
	$aLevels = $query->fetchAll();

	$ajLevels = json_encode($aLevels);
	if($aLevels != false) {
		echo '{"status":"ok", "data":'.$ajLevels.'}';
	} else {
		echo '{"status":"error", "message":"Level not found"}';
	}
?>