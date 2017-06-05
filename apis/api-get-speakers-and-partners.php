<?php 
	require_once('db-connection.php');

	$sEventIds = $_POST['id'];
	// $sEventIds = '1';

	//load speakers
	$query = $pdo->prepare("
	 SELECT es.id_event, s.full_name, s.occupation, s.description, s.picture 
	 FROM speaker s
	 JOIN event_speakers es ON s.id_speaker = es.id_speaker 
	 AND es.id_event IN (:ids);");

	$query->execute(["ids"=>$sEventIds]);

	$aSpeakers = $query->fetchAll();

	//load partners
	$query = $pdo->prepare("
	 SELECT eep.id_event, p.logo, p.website
	 FROM partner p
	 JOIN event_extra_partners eep ON p.id_partner = eep.id_partner 
	 AND eep.id_event IN (:ids);");

	$query->execute(["ids"=>$sEventIds]);

	$aPartners = $query->fetchAll();
		
	$saSpeakers = json_encode($aSpeakers);
	$saPartners = json_encode($aPartners);

	echo '{"status":"ok", "speakers":'.$saSpeakers.', "partners":'.$saPartners.'}';
 ?>