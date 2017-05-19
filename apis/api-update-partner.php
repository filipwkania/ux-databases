<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];
	$sName = $_POST['name'];
	$sWebsite = $_POST['website'];
	$sEmail = $_POST['email'];
	$sPhone = $_POST['phone'];

	//update partner values where id matches given id
	$query = $pdo->prepare("UPDATE `ux_databases`.`partner` 
												SET 
												`full_name` = :fullName,
												`website` = :website,
												`email` = :email,
												`phone` = :phone 
												WHERE `id_partner` = :id;");
	//execute query
	$query->execute(['fullName'=>$sName, 'website'=>$sWebsite, 'email'=>$sEmail,
										'phone'=>$sPhone, 'id'=>$sId]);

	$updated = $query->rowCount();

	//check how many rows were updated
	if($updated > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>