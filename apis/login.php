<?php 
	session_start();
	require_once('db-connection.php');

	$sUsername = $_POST['username'];
	$sPassword = $_POST['password'];

	$query = $pdo->prepare("SELECT user_role.role_name FROM user_role 
							JOIN user ON user_role.id_user_role = user.id_user
							WHERE user.username = :username AND user.password = :password;");
	$query->execute(['username'=>$sUsername, 'password'=>$sPassword]);
	$user = $query->fetch();

	if($user != false) {
		$_SESSION['userRole'] = $user["role_name"];
		echo '{"status":"ok", "message":"User logged in"}';
	} else {
		echo '{"status":"error", "message":"User not found"}';
	}
 ?>