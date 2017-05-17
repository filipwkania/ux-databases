<?php 
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM user");
	$query->execute();
	$aUsers = $query->fetchAll();

	if($aUsers != false) {
		echo '{"status":"ok", "data:'.$aUsers.'}';
	} else {
		echo '{"status":"error", "message":"User not found"}';
	}

 ?>