<?php 
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT u.*, user_role.role_name AS role_name FROM user u LEFT JOIN user_role ON u.role = user_role.id_user_role");
	$query->execute();
	$aUsers = $query->fetchAll();

	if($aUsers != false) {
		$saUsers = json_encode($aUsers);
		echo '{"status":"ok", "data":'.$saUsers.'}';
	} else {
		echo '{"status":"error", "message":"User not found"}';
	}

 ?>