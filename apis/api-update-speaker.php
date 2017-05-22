<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];
	$sName = $_POST['name'];
	$sDescription = $_POST['description'];
	$sOccupation = $_POST['occupation'];

	//update speaker values where id matches given id
	$query = $pdo->prepare("UPDATE `ux_databases`.`speaker` 
												SET 
												`full_name` = :name,
												`description` = :description,
												`occupation` = :occupation 
												WHERE `id_speaker` = :id;");
	//execute query
	$query->execute(['fullName'=>$sName, 'description'=>$sDescription, 
										'occupation'=>$sOccupation,'id'=>$sId]);

	$updated = $query->rowCount();

	//check how many rows were updated
	if($updated > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>