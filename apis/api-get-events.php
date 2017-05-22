<?php
	require_once('db-connection.php');

	$query = $pdo->prepare("SELECT * FROM event_level");
	$query->execute();
	$aLevels = $query->fetchAll();

	$query = $pdo->prepare("SELECT * FROM event_category");
	$query->execute();
	$aCategories = $query->fetchAll();

	$query = $pdo->prepare("SELECT * FROM event");
	$query->execute();
	$aEvents = $query->fetchAll();

	for($i = 0; $i < count($aEvents); $i++){
		for($j = 0; $j < count($aLevels); $j++){
			if($aEvents[$i]['level'] == $aLevels[$j]['id_event_level']){
				$aEvents[$i]['level'] = $aLevels[$j]['level_name'];
			}
		}
		for($k = 0; $k < count($aCategories); $k++){
			if($aEvents[$i]['category'] == $aCategories[$k]['id_event_category']){
				$aEvents[$i]['category'] = $aCategories[$k]['category_name'];
			}
		}
	}

	$ajEvents = json_encode($aEvents);

	if($aEvents != false) {
		echo '{"status":"ok", "data":'.$ajEvents.'}';
	} else {
		echo '{"status":"error", "message":"Event not found"}';
	}
?>