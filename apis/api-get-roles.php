<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM user_role");
	$query->execute();
	$aRoles = $query->fetchAll();

	$ajRoles = json_encode($aRoles);
	if($aRoles != false) {
		echo '{"status":"ok", "data":'.$ajRoles.'}';
	} else {
		echo '{"status":"error", "message":"Role not found"}';
	}
?>