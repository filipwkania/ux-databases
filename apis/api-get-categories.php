<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM event_category");
	$query->execute();
	$aCategories = $query->fetchAll();

	$ajCategories = json_encode($aCategories);
	if($aCategories != false) {
		echo '{"status":"ok", "data":'.$ajCategories.'}';
	} else {
		echo '{"status":"error", "message":"Category not found"}';
	}
?>