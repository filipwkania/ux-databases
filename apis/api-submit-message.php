<?php
	$FILENAME = '../messages.txt';
	$sSubject = $_POST['subject'];
	$sFullname = $_POST['fullname'];
	$sEmail = $_POST['email'];
	$sPhone = $_POST['phone'];
	$sMessage = $_POST['message'];

	// Create an empty array that may contain data after
	$ajMessages = [];
	// open the file and get the contents of it
	$sMessages = file_get_contents($FILENAME);
	if( $sMessages != null ){
		// convert the text to an object
		$ajMessages = json_decode( $sMessages ); // array with json
	}
	// Create a string that looks like JSON
	$sMessage = '{}';
	// create a JSON object for the property 
	$jMessage = json_decode($sMessage);
	$jMessage->subject = $sSubject;
	$jMessage->fullname = $sFullname;
	$jMessage->email = $sEmail;
	$jMessage->phone = $sPhone;
	$sMessage->message = $sMessage;

	// push the json object to the array
	array_push($ajMessages, $jMessage);

	// NOW THE OPPOSITE
	// convert the array to text and make it look nice
	$sajMessages = json_encode($ajMessages , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

	// save the text back to the file 
	file_put_contents($FILENAME, $sajMessages);
	echo '{"status":"ok", "message":"Message submitted"}';
?>
