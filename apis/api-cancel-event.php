<?php 
	require_once('db-connection.php');

	$sId = $_POST['id'];

	//Cancel event
	$query = $pdo->prepare("UPDATE `ux_databases`.`event`
							SET
							`is_active` = 0,
							`is_canceled` = 1
							WHERE `id_event` = :id;");

	$query->execute(['id'=>$sId]);

	if($query->rowCount() > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}
 ?>