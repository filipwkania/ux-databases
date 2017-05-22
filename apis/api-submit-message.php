<?php
	require_once('db-connection.php'); 
	$sSubject = $_POST['type'];
	$sFullname = $_POST['fullname'];
	$sEmail = $_POST['email'];
	$sPhone = $_POST['phone'];
	$sMessage = $_POST['message'];

	if($sSubject == 'application'){
		$sSubject = 1;
	}elseif($sSubject == 'feedback'){
		$sSubject = 2;
	}elseif($sSubject == 'question'){
		$sSubject = 3;
	}

	//create message in db
	$query = $pdo->prepare("INSERT INTO `ux_databases`.`message`
													(`id_message`,`text`,`name`,`phone`,`email`,
													`subject`,`is_answered`)
													VALUES
													(:id,:text,:fullname,:phone,:email,
													:subject,:is_answered);");
	//execute query
	$query->execute(['id'=>null,'text'=>$sMessage, 'fullname'=>$sFullname, 'phone'=>$sPhone,
									 'email'=>$sEmail,'subject'=>$sSubject, 'is_answered'=>false]);

	//check how many rows were created
	$created = $query->rowCount();

	if($created != null) {
		echo '{"status":"ok"}';
	} else {
		echo '{"status":"error"}';
	}

?>
