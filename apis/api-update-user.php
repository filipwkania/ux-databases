<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];
	$sFullName = $_POST['fullName'];
	$sUsername = $_POST['username'];
	$sEmail = $_POST['email'];
	$sRole = $_POST['role'];
	$sPassword = $_POST['password'];

	$iRole = intval($sRole);
	$iId = intval($sId);
	
	//update user values where id matches given id
	$query = $pdo->prepare("UPDATE `ux_databases`.`user` 
												SET 
												`full_name` = :fullName,
												`username` = :username,
												`email` = :email,
												`role` = :role,
												`password` = :password 
												WHERE `id_user` = :id;");
	//execute query
	$query->execute(['fullName'=>$sFullName, 'username'=>$sUsername, 'email'=>$sEmail,
										'role'=>$iRole, 'password'=>$sPassword, 'id'=>$iId]);

	$updated = $query->rowCount();

	//check how many rows were updated
	if($updated > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>