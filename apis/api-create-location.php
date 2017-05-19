<?php 
	require_once('db-connection.php');
	require_once('google-geocode.php');

	$sName = $_POST['name'];
	$sAddress = $_POST['address'];
	$sSeats = $_POST['seats'];

	//Loading google geocode data, function returns array with lat, lng and formatted address
	$aGeocodeInfo = fnLoadInfoFromAddress($sAddress);

	$fLat = $aGeocodeInfo[0];
	$fLng = $aGeocodeInfo[1];
	$sFormattedAddress = $aGeocodeInfo[2];

	$query = $pdo->prepare("INSERT INTO `ux_databases`.`location` 
													(`id_location`,`location_name`, 
														`address`,`lng`,`lat`,`seats`) 
													VALUES 
													(null,:name,:address,:lng,:lat,:seats);");

	$query->execute(['name'=>$sName, 'address'=>$sFormattedAddress,
		'lng'=>$fLng, 'lat'=>$fLat, 'seats'=>$sSeats]);

	$createdRows = $query->rowCount();

	if($createdRows > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}

 ?>