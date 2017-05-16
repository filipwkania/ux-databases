<?php
	$FILENAME = "../speakers.txt";
	// get data from file
	$sajSpeakers = file_get_contents($FILENAME);
	// convert it to JSON
	$ajSpeakers = json_decode($sajSpeakers);
	// error
	if(!is_array($ajSpeakers)){
		echo '{"status":"error", "message":"Could not work with the database."}';
		exit;
	}
	// success
	$sajSpeakers = json_encode($ajSpeakers, JSON_UNESCAPED_UNICODE);
	echo $sajSpeakers;
?>