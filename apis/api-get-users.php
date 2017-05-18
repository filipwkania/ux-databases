<?php 
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM user");
	$query->execute();
	$aUsers = $query->fetchAll();

	if($aUsers != false) {
		$saUsers = json_encode($aUsers);
		echo '{"status":"ok", "data":'.$saUsers.'}';
	} else {
		echo '{"status":"error", "message":"User not found"}';
	}

 ?>