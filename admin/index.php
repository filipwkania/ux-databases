<!DOCTYPE html>
<html>
<head>
	<title>Admin Page</title>
	<link rel="stylesheet" type="text/css" href="../style/app.css">
	<script src="https://use.fontawesome.com/fa11f26e3b.js"></script>
</head>
<body>
<!-- PSEUDO MENU -->
<div id="menu-admin">
	<button id="btn-menu-events">Events</button>
	<button id="btn-menu-accounts">Accounts</button>
</div>
<!-- END OF PSEUDO MENU -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-login" class="wdw">
	<div id="container-login">
		<input id="txt-username" type="text" placeholder="username"></input>
		<input id="txt-password" type="text" placeholder="password"></input>
		<button id="btn-login">Login</button>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-accounts" class="wdw">
	<div id="container-edit">
		<input type="hidden" id="txt-edit-id"></input>
		<input id="txt-edit-username" placeholder="username"></input>
		<input id="txt-edit-password" placeholder="password"></input>
		<input id="txt-edit-name" placeholder="name"></input>
		<input id="txt-edit-email" placeholder="email"></input>
		<select id="select-edit-role">
			<option value="1">Admin</option>
			<option value="3">Member</option>
		</select>
		<button id="btn-edit-save">Save</button>
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
	<div id="container-event">
		<h2>Event details</h2>
		<div id="container-event-list">
			<select id="select-event">
				<option>No events to edit</option>
			</select>
			<div id="container-event-create">
				<input id="txt-event-name"></input>
				<input id="txt-event-description"></input>
				<input id="txt-event-agenda"></input>
				<input id="txt-event-start"></input>
				<input id="txt-event-end"></input>
				<input id="check-event-sustenance" type="checkbox">Sustenance</input>
				<select id="select-event-level">
					<option value="1">For all</option>
					<option value="2">Intermediate</option>
					<option value="3">Advanced</option>
				</select>
				<input id="txt-catch-phrase"></input>
				<input id="txt-brief-description"></input>
				<select id="select-event-category">
					<option value="1">Tech talk</option>
					<option value="2">Business/Administration</option>
					<option value="3">General</option>
				</select>
				<input id="txt-event-price">0</input>
			</div>
		</div>
	</div>
	<div id="container-event-location">
		<h2>Event location</h2>
		<div id="container-location-list">
			<select id="select-location">
				<option>No locations yet</option>
			</select>
		</div>
		<div id="container-location-create">
			<input type="hidden" id="txt-location-id">
			<input id="txt-location-name" placeholder="name">
			<input id="txt-location-address" placeholder="address">
			<input id="txt-location-seats" placeholder="seats">
			<button id="btn-save-location">Save</button>
		</div>
	</div>
	<div id="container-event-partners">
		<h2>Event partners</h2>
		<div id="container-main-partner">
			<select id="select-main-partner">
				<option>No main partner</option>
			</select>
		</div>
		<div id="container-extra-partners">
			<input type="checkbox" checked> No extra partners</input>	
		</div>
		<div id="container-partner-create">
			<input type="hidden" id="txt-partner-id">
			<input id="txt-partner-name" placeholder="name"></input>
			<input id="txt-partner-website" placeholder="website"></input>
			<input id="txt-partner-email" placeholder="email"></input>
			<input id="txt-partner-phone" placeholder="phone"></input>
			<button id="btn-save-partner">Save</button>
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