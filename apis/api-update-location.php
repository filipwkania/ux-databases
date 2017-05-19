 <?php 
	require_once('db-connection.php');
	require_once('google-geocode.php');

	$sId = $_POST['id'];
	$sName = $_POST['name'];
	$sAddress = $_POST['address'];
	$sSeats = $_POST['seats'];

	//Loading google geocode data, function returns array with lat, lng and formatted address
	$aGeocodeInfo = fnLoadInfoFromAddress($sAddress);

	$fLat = $aGeocodeInfo[0];
	$fLng = $aGeocodeInfo[1];
	$sFormattedAddress = $aGeocodeInfo[2];

	$query = $pdo->prepare("UPDATE `ux_databases`.`location` 
													SET 
													`location_name` = :name, 
													`address` = :address,
													`lng` = :lng,
													`lat` = :lat,
													`seats` = :seats 
													WHERE `id_location` = :id;");

	$query->execute(['name'=>$sName, 'address'=>$sFormattedAddress,
		'lng'=>$fLng, 'lat'=>$fLat, 'seats'=>$sSeats, 'id'=>$sId]);

	$createdRows = $query->rowCount();

	if($createdRows > 0) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}

 ?>