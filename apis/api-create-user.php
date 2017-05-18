<?php 
	require_once('db-connection.php');

	$sFullName = $_POST['fullName'];
	$sUsername = $_POST['username'];
	$sEmail = $_POST['email'];
	$iRole = $_POST['role'];
	$sPassword = $_POST['password'];

	$sPicture = 'default.jpg';

	//create user in db
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`user`
													(`id_user`,`full_name`,`username`,`email`,`role`,
													`get_notifications`,`get_reminders`,`picture`,`password`)
													VALUES
													(:id,:fullName,:username,:email,:role,
													:get_notifications,:get_reminders,:picture,:password);");
	//execute query
	$query->execute(['id'=>null,'fullName'=>$sFullName, 'username'=>$sUsername,
									 'email'=>$sEmail,'role'=>$iRole, 'get_notifications'=>0,
									 'get_reminders'=>0, 'picture'=>$sPicture, 'password'=>$sPassword]);

	//check how many rows were created
	$created = $query->rowCount();

	if($created != null) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>