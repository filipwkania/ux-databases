<!DOCTYPE html>
<html>
<head>
	<title>Admin Page</title>
	<link rel="stylesheet" type="text/css" href="../style/app.css">
	<script src="https://use.fontawesome.com/fa11f26e3b.js"></script>
</head>
<body>
<div id="menu-admin">
	<button id="btnMenuEvents">Events</button>
	<button id="btnMenuAccounts">Accounts</button>
</div>
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-login" class="wdw">
	<div id="container-login">
		<input id="txtUsername" type="text" placeholder="username"></input>
		<input id="txtPassword" type="text" placeholder="password"></input>
		<button id="btnLogin">Login</button>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-accounts" class="wdw">
	<div id="container-edit">
		<input type="hidden" id="txtEditId"></input>
		<input id="txtEditUsername" placeholder="username"></input>
		<input id="txtEditPassword" placeholder="password"></input>
		<input id="txtEditName" placeholder="name"></input>
		<input id="txtEditEmail" placeholder="email"></input>
		<select id="selectEditRole">
			<option value="1">Admin</option>
			<option value="3">Member</option>
		</select>
		<button id="btnEditSave">Save</button>
	</div>
	<div id="container-users">
		<table id="table-users">
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Username</th>
					<th class="text-left">Email</th>
					<th class="text-left">Password</th>
					<th class="text-left">Role</th>
					<th class="text-center">Edit</th>
					<th class="text-center">Delete</th>
				</tr>
			</thead>
			<tbody id="tbody-users">
				<!-- placeholder for users -->

			</tbody>
		</table>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-events" class="wdw">
	<div id="container-event-location">
	<h2>Event location</h2>
		<div id="container-location-list">
			<select id="select-location">
				<option>No locations yet</option>
			</select>
		</div>
		<div id="container-location-create">
			<input type="hidden" id="txtLocationId">
			<input id="txtLocationName" placeholder="name">
			<input id="txtLocationAddress" placeholder="address">
			<input id="txtLocationSeats" placeholder="seats">
			<button id="btnSaveLocation">Save</button>
		</div>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="../js/js-admin.js"></script>
<script>
	fnOpenWindow('wdw-events');
</script>
</body>
</html>