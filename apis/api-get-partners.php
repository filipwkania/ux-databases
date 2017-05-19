<?php 
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM partner");
	$query->execute();
	$aPartners = $query->fetchAll();

	if($aPartners != false) {
		$saPartners = json_encode($aPartners);
		echo '{"status":"ok", "data":'.$saPartners.'}';
	} else {
		echo '{"status":"error", "message":"Partner not found"}';
	}

 ?>