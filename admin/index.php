<!DOCTYPE html>
<html>
<head>
	<title>Admin Page</title>
	<link rel="stylesheet" type="text/css" href="../style/app.css">
	<link rel="stylesheet" type="text/css" href="../dist/jquery.datetimepicker.min.css"/ >
	<script src="https://use.fontawesome.com/fa11f26e3b.js"></script>
</head>
<body>


<!-- PSEUDO MENU -->
	<div id="menu-admin">
		<div id="btn-menu-events">Events</div>
		<div id="btn-menu-accounts">Accounts</div>
	</div>

	<div id="admin-content-overlay"></div>

<!-- END OF PSEUDO MENU -->
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<!-- HEADER -->
	<div class="header">
		<span class="admin-menu-icon fa fa-bars"></span>
		<span class="logo fa fa-tag"></span>
	</div>


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
	<div id="accounts-wrapper">
		<div id="container-user-edit">
			<h2>User details:</h2>
			<input type="hidden" id="txt-edit-id"></input>
			<input id="txt-edit-username" placeholder="username"></input>
			<input id="txt-edit-password" placeholder="password"></input>
			<input id="txt-edit-name" placeholder="name"></input>
			<input id="txt-edit-email" placeholder="email"></input>
			<select id="select-edit-role">
	<!-- 			<option value="1">Admin</option>
				<option value="3">Member</option> -->
			</select>
			<div id="container-user-edit-buttons">
				<button id="btn-edit-clear" class="cancel-button">Clear</button>
				<button id="btn-edit-save" class="button">Save</button>
			</div>
		</div>
		<div id="container-users">
			<h2>Users list:</h2>
			<table id="table-users">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Password</th>
						<th>Role</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody id="tbody-users">
					<!-- placeholder for users -->

				</tbody>
			</table>
		</div>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="wdw-events" class="wdw">
	<div id="events-header">
		<h2>Select event to edit</h2>
		<div id="container-event-list">
			<select id="select-event">
				<option>No events to edit</option>
			</select>
<!-- 			<button id="btn-add-new-event"><span class="fa fa-fw fa-plus"></span> add new</button> -->
		</div>
	</div>
	<div id="events-content">
		<div class="tab-admin-event">
			<h2>Event edit panel</h2>
			<div id="container-event-create">
				<div id="container-event-left">
					<input id="txt-event-id" type="hidden"></input>
					<div class="input-row">
						<input id="txt-event-name" class="field" placeholder="event name" required></input>
						<label class="floating-label">Event name:</label>
					</div>
					<div class="input-row">
						<textarea id="txt-event-catch-phrase" class="field" placeholder="catch phrase" required></textarea>
						<label class="floating-label">Catch phrase:</label>
					</div>
					<div class="input-row">
						<textarea id="txt-event-brief-description" class="field" placeholder="brief description" required></textarea>
						<label class="floating-label">Brief description:</label>						
					</div>	
					<div class="input-row">
						<textarea id="txt-event-description" class="field" placeholder="full description" required></textarea>
						<label class="floating-label">Full description:</label>
					</div>
					<div class="input-row">
						<input id="txt-event-price" class="field" placeholder="price" required></input>
						<label class="floating-label">Price:</label>
					</div>
					<div class="input-row">
						<input id="check-event-sustenance" type="checkbox">Sustenance</input>
					</div>
				</div>
				<div id="container-event-right">
					<div class="label-row"><label>Event level </label></div>
					<select id="select-event-level">
						<option value="1">For all</option>
						<option value="2">Intermediate</option>
						<option value="3">Advanced</option>
					</select>
					<div class="label-row"><label>Event category </label></div>
					<select id="select-event-category">
						<option value="1">Tech talk</option>
						<option value="2">Business/Administration</option>
						<option value="3">General</option>
					</select>
					<div class="input-row">
						<input id="txt-event-start" class="field" placeholder="start date time" required></input>
						<label class="floating-label">Start:</label>
					</div>
					<div class="input-row">
						<input id="txt-event-end" class="field" placeholder="end date time" required></input>
						<label class="floating-label">End:</label>
					</div>
					<div class="input-row">
						<textarea id="txt-event-agenda" class="field" placeholder="agenda" required></textarea>
						<label class="floating-label">Agenda:</label>
					</div>
				</div>
			</div>
		</div>
		<div class="tab-admin-event">
			<div id="container-event-extras">
				<div id="container-event-main-partner">
					<h4>Main partner</h4>
					<div id="container-main-partner">
						<select id="select-main-partner">
							<option>No main partner</option>
						</select>
						<div id="container-buttons-box">
							<button id="btn-edit-partner" class="btn-edit">Edit</button>
							<button data-item="partner" class="btn-edit btn-add-new">Add new</button>
						</div>
					</div>
				</div>
				<div id="container-event-location">
					<h4>Location</h4>
					<div id="container-location-list">
						<select id="select-location">
							<option>No locations yet</option>
						</select>
						<div id="container-buttons-box">
							<button id="btn-edit-location" class="btn-edit">Edit</button>
							<button data-item="location" class="btn-edit btn-add-new">Add new</button>
						</div>
					</div>
				</div>
				<div id="container-event-speakers">
					<h4>Speakers</h4>	
					<div id="container-speaker-list">
						<select id="select-event-speakers">
							<option>No event speakers</option>
						</select>
						<div id="container-buttons-box">
							<button id="btn-edit-speaker" class="btn-edit">Edit</button>
							<button data-item="speaker" class="btn-edit btn-add-new">Add new</button>
						</div>
					</div>
					<div id="container-extra-speakers">
					<!-- speakers list placeholder -->
					</div>
				</div>
			</div>
		</div>
		<div class="tab-admin-event">
			<div id="container-event-partners">
				<h4>Add extra partners</h4>
				<select id="select-extra-partners">
					<option>No extra partners</option>
				</select>
				<div id="container-extra-partners">
				<!-- extra partners placeholder -->
				</div>
			</div>
		</div>
	</div>
	<div id="container-edit-event-buttons">
		<button id="btn-save-event">Save event</button>
		<button id="btn-clear-edit-event">Clear </button>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<!-- ************************************************** -->
<div id="modals-admin">
	<div id="mdl-partner" class="modal">
		<div class="modal-content">
			<h2>Partner details</h2>
			<div id="container-partner-create">
				<input type="hidden" id="txt-partner-id">
				<input id="txt-partner-name" placeholder="name"></input>
				<input id="txt-partner-website" placeholder="website"></input>
				<input id="txt-partner-email" placeholder="email"></input>
				<input id="txt-partner-phone" placeholder="phone"></input>
			</div>
			<div class="modal-buttons">
				<button id="btn-cancel-partner" class="cancel-button" data-mdl="partner" type="button">Cancel</button>
				<button id="btn-save-partner" class="button" type="button">Save</button>
			</div>
		</div>
	</div>

	<div id="mdl-speaker" class="modal">
		<div class="modal-content">
			<h2>Speaker details</h2>
			<div id="container-speaker-create">
				<input id="txt-speaker-id" type="hidden"></input>
				<input id="txt-speaker-name" placeholder="full name"></input>
				<input id="txt-speaker-occupation" placeholder="occupation"></input>
				<input id="txt-speaker-description" placeholder="description"></input>
			</div>
			<div class="modal-buttons">
				<button id="btn-cancel-speaker" class="cancel-button" data-mdl="speaker" type="button">Cancel</button>
				<button id="btn-save-speaker" class="button" type="button">Save</button>
			</div>
		</div>
	</div>

	<div id="mdl-location" class="modal">
		<div class="modal-content">
			<h2>Location details</h2>
			<div id="container-location-create">
				<input type="hidden" id="txt-location-id">
				<input id="txt-location-name" placeholder="name">
				<input id="txt-location-address" placeholder="address">
				<input id="txt-location-seats" placeholder="seats">
			</div>
			<div class="modal-buttons">
				<button id="btn-cancel-location" class="cancel-button" data-mdl="location" type="button">Cancel</button>
				<button id="btn-save-location" class="button" type="button">Save</button>
			</div>
		</div>
	</div>
</div>
<!-- ************************************************** -->
<!-- **************************************************************************************************** -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="../dist/jquery.datetimepicker.full.min.js"></script>
<script src="../js/js-admin.js"></script>
<script>
	fnOpenWindow('wdw-events');
	let currentDate = new Date();
	$('#txt-event-start').datetimepicker({startDate: 'currentDate'});
	$('#txt-event-end').datetimepicker({startDate: 'currentDate'});
</script>
</body>
</html>