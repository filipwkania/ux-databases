<?php 
	require_once('db-connection.php');

	$sName = $_POST['name'];
	$sWebsite = $_POST['website'];
	$sEmail = $_POST['email'];
	$sPhone = $_POST['phone'];

	$sLogo = 'defaultLogo.jpg';

	//create user in db
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`partner`
													(`id_partner`,`full_name`,`website`,
														`email`,`phone`,`is_premium`,`logo`)
													VALUES
													(:id, :name, :website,
														:email, :phone, :is_premium, :logo);");
	//execute query
	$query->execute(['id'=>null,'name'=>$sName, 'website'=>$sWebsite,
									 'email'=>$sEmail,'phone'=>$sPhone, 'is_premium'=>0,
									 'logo'=>$sLogo]);

	//check how many rows were created
	$created = $query->rowCount();

	if($created != null) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>