<?php 
	require_once('db-connection.php');
	
	$query = $pdo->prepare(
	"SELECT 
	 event.id_event, event.name, event.description,
	 event.agenda, event.start, event.end, event.picture,
	 event.price, event.available_seats, event.sustenance,
	 event.catch_phrase, event.brief_description,
	 event_level.level_name AS level, 
	 event_category.category_name AS category, 
	 location.address AS location_address, 
	 location.location_name AS location_name, 
	 location.lat AS location_lat, 
	 location.lng AS location_lng
	 FROM event
	 INNER JOIN event_level ON event_level.id_event_level  = event.level 
	 INNER JOIN event_category ON event_category.id_event_category = event.category
	 INNER JOIN partner ON partner.id_partner = event.main_partner
	 INNER JOIN location ON location.id_location = event.location;");

	$query->execute();

	$aEvents = $query->fetchAll();

	if($aEvents != false) {
		$saEvents = json_encode($aEvents);
		echo '{"status":"ok", "data":'.$saEvents.'};';
	} else {
		echo '{"status":"error"}';
	}
 ?>