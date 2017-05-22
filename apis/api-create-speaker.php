<?php 
	require_once('db-connection.php');

	$sName = $_POST['name'];
	$sDescription = $_POST['description'];
	$sOccupation = $_POST['occupation'];

	$sPicture = 'defaultSpeaker.jpg';

	//create speaker in db
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`speaker`
													(`id_speaker`,`full_name`,`description`,
														`occupation`, `picture`)
													VALUES
													(:id, :name, :description,
														:occupation, :picture);");
	//execute query
	$query->execute(['id'=>null,'name'=>$sName, 'description'=>$sDescription,
									 'occupation'=>$sOccupation, 'picture'=>$sPicture]);

	//check how many rows were created
	$created = $query->rowCount();

	if($created != null) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>