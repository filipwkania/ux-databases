<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];

	$query = $pdo->prepare("DELETE FROM `ux_databases`.`partner`
													WHERE id_partner = :id;");
	$query->execute(['id'=>$sId]);

	$rowsAffected = $query->rowCount();

	if($rowsAffected > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';		
	}
 ?>