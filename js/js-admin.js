$(document).on("click", "#btnLogin", function() {
	fnLogin();
});

$(document).on("click", ".user-edit", function(source) {
	fnPrepareToEditUser($(source.target).parent());
});

$(document).on("click", "#btnEditSave", function() {
	fnSaveUser();
});

$(document).on("click", ".user-delete", function(source) {
	fnDeleteUser($(source.target).parent());
});

$(document).on("click", "#btnSaveLocation", function() {
	fnSaveLocation();
});

$(document).on("change", "#select-location", function(source) {
	fnPrepareToEditLocation(source.target);
});

$(document).on("click", "#btnSavePartner", function() {
	fnSavePartner();
});

//PSEUDO MENU
$(document).on("click", "#btnMenuEvents", function() {
	fnOpenWindow("wdw-events");
});

$(document).on("click", "#btnMenuAccounts", function() {
	fnOpenWindow("wdw-accounts");
});
//END OF PSEUDO MENU

function fnLogin() {
	// get values from fields
	let sUsername = $('#txtUsername').val();
	let sPassword = $('#txtPassword').val();

	//AJAX for login
	let sUrl = "../apis/login.php";
	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON",
		method: "POST",
		data: {username:sUsername, password:sPassword}
	});

	ajaxRequest.done(function(jData){
		//If user credentials correct, load event management page
		if(jData.status === "ok") {
			//if logged in user is admin show accounts page
			if(jData.userRole === "admin") {
				fnOpenWindow("wdw-accounts");
				fnLoadUsers();
				//if logged in user is board member show event management page
			} else if (jData.userRole === "member") {
				fnOpenWindow("wdw-events");
			}
		} else {
			// else display incorrect login credentials
			alert("incorrect credentials");
		}
	});
}

function fnOpenWindow(sWindow) {
	$('.wdw').hide();
	$('#'+sWindow).css("display","flex");

	switch(sWindow) {
		case "wdw-events":
			fnFetchLocations();
			fnFetchPartners();
			break;
		case "wdw-accounts":
			fnLoadUsers();
			break;
		default: 
			break;
	}
}

function fnLoadUsers() {
	//AJAX for getting users
	let sUrl = "../apis/api-get-users.php";
	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON"
	});
	ajaxRequest.done(function(jData) {
		//if users are found in db, load them to table
		if(jData.status === "ok") {
			fnPopulateUserTable(jData.data);
		} else{
			//else display error
			alert("problem loading users from db");
		}
	});
}

function fnPopulateUserTable(aUsers) {
	//clear table body
	$("#tbody-users").empty();

	//blueprint for table row with user
	let blueprint =
	'<tr class="user-row">\
		<input type="hidden" class="user-id" value="{{id}}"></input>\
		<td class="text-left user-fullName">{{fullName}}</td>\
		<td class="text-left user-username">{{username}}</td>\
		<td class="text-left user-email">{{email}}</td>\
		<td class="text-left user-password">{{password}}</td>\
		<td class="text-left user-userRole">{{userRole}}</td>\
		<td class="text-center user-edit"><span class="fa fa-fw fa-edit"></span></td>\
		<td class="text-center user-delete"><span class="fa fa-fw fa-remove"></span></td>\
	</tr>';

	//replace place holders with actual data
	for(let i = 0; i < aUsers.length; i++) {
		let sHtmlToAppend = blueprint;
		sHtmlToAppend = sHtmlToAppend.replace("{{id}}", aUsers[i]['id_user']);
		sHtmlToAppend = sHtmlToAppend.replace("{{fullName}}", aUsers[i]['full_name']);
		sHtmlToAppend = sHtmlToAppend.replace("{{username}}", aUsers[i]['username']);
		sHtmlToAppend = sHtmlToAppend.replace("{{email}}", aUsers[i]['email']);
		sHtmlToAppend = sHtmlToAppend.replace("{{password}}", aUsers[i]['password']);
		sHtmlToAppend = sHtmlToAppend.replace("{{userRole}}", aUsers[i]['role']);
		// append user row to table
		$('#tbody-users').append(sHtmlToAppend);
	}
}

function fnPrepareToEditUser(oSource) {
	//get values from clicked user
	let sId = $(oSource).siblings('.user-id').val();
	let sFullName = $(oSource).siblings('.user-fullName').text();
	let sUsername = $(oSource).siblings('.user-username').text();
	let sEmail = $(oSource).siblings('.user-email').text();
	let sPassword = $(oSource).siblings('.user-password').text();
	let sUserRole = $(oSource).siblings('.user-userRole').text();

	//put values into edit input elements
	$('#txtEditId').val(sId);
	$('#txtEditName').val(sFullName);
	$('#txtEditUsername').val(sUsername);
	$('#txtEditEmail').val(sEmail);
	$('#txtEditPassword').val(sPassword);
	$('#selectEditRole').val(sUserRole);
}

function fnSaveUser() {
	//get values for updating/creating user
	let sId = $('#txtEditId').val();
	let sFullName = $('#txtEditName').val();
	let sUsername = $('#txtEditUsername').val();
	let sEmail = $('#txtEditEmail').val();
	let sPassword = $('#txtEditPassword').val();
	let iRole = $('#selectEditRole').val();
	//check if we are updating or saving new user
	//by looking at the id in the hidden field
	if($('#txtEditId').val() != "") {
		//update user in database
		let sUrl = "../apis/api-update-user.php";
		
		let formData = {};
		formData.id = sId;
		formData.fullName = sFullName;
		formData.username = sUsername;
		formData.email = sEmail;
		formData.password = sPassword;
		formData.role = iRole;

		let ajaxRequest = $.ajax({
			url: sUrl,
			data: formData,
			dataType: "JSON",
			method: "POST"
		});

		ajaxRequest.done(function(jData) {
			if(jData.status === "ok") {
				fnUpdateUserInTable();
				fnClearEdit();
				alert("User updated in database!");
			} else {
				alert("Error updating the user");	
			}
		});
	} else {
		//else create new user
		let sUrl = "../apis/api-create-user.php";
		let formData = {};

		formData.fullName = sFullName;
		formData.username = sUsername;
		formData.email = sEmail;
		formData.password = sPassword;
		formData.role = iRole;

		let ajaxRequest = $.ajax({
			url: sUrl,
			data: formData,
			dataType: "JSON",
			method: "POST"
		});

		ajaxRequest.done(function(jData) {
			if(jData.status === "ok") {
				//if status is ok, reload users and clear edit fields
				fnLoadUsers();
				fnClearEdit();
				alert("User added to database!");
			} else {
				alert("Error creating the user");	
			}
		});
	}
}

function fnUpdateUserInTable() {
	//get values from input fields
	let sId = $('#txtEditId').val();
	let sFullName = $('#txtEditName').val();
	let sUsername = $('#txtEditUsername').val();
	let sEmail = $('#txtEditEmail').val();
	let sPassword = $('#txtEditPassword').val();
	let iRole = $('#selectEditRole').val();

	//get row with the user to update his data
	let oUserRowId = $('.user-id[value='+sId+']');

	//update values in user row
	$(oUserRowId).siblings('.user-fullName').text(sFullName);
	$(oUserRowId).siblings('.user-username').text(sUsername);
	$(oUserRowId).siblings('.user-email').text(sEmail);
	$(oUserRowId).siblings('.user-password').text(sPassword);
	$(oUserRowId).siblings('.user-userRole').text(iRole);
}

function fnClearEdit(){
	//clear edit input fields
	$('#txtEditId').val("");
	$('#txtEditName').val("");
	$('#txtEditUsername').val("");
	$('#txtEditEmail').val("");
	$('#txtEditPassword').val("");
	$('#selectEditRole').val("");	
}

function fnDeleteUser(oSource) {
	//get id of the user we want to delete
	let sId = $(oSource).siblings('.user-id').val();

	let sUrl = '../apis/api-delete-user.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		data: {id:sId},
		dataType: "JSON",
		method: "POST"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			//remove deleted user from the table
			$(oSource).parent().remove();
			alert("User removed from database");
		} else {
			alert("Failed to remove user from database");
		}
	});
}

function fnSaveLocation() {
	//get values from fields
	let sId = $('#txtLocationId').val();
	let sName = $('#txtLocationName').val();
	let sAddress = $('#txtLocationAddress').val();
	let iSeats = $('#txtLocationSeats').val();
	let sUrl = '../apis/api-create-location.php';
	let formData = {};

	formData.id = sId;
	formData.name = sName;
	formData.address = sAddress;
	formData.seats = iSeats;

	//if id is not empty, we are updating existing location
	if(sId != "") {
		//set url to update location
		sUrl = '../apis/api-update-location.php';
	}

	let ajaxRequest = $.ajax({
		data: formData,
		url: sUrl,
		dataType: "JSON",
		method: "POST"
	});
	// DEBUGGING CODE FOR AJAX REQUEST
	// ajaxRequest.error(function(xhr, status, error) {
	// 	console.log(xhr.responseText);	
	// });
	// END OF DEBUGGING
	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnFetchLocations();
			fnClearLocationEdit();
			alert('Location saved in database!');
		} else {
			alert('Error while saving location to database');
		}
	});
}

function fnFetchLocations() {
	let sUrl = '../apis/api-get-locations.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnPopulateLocationSelector(jData.data);
		} else {
			console.log("Could not load locations from db");
		}
	});
}

function fnPopulateLocationSelector(aLocations) {
	//clear location selector
	$('#select-location').empty();
	$('#select-location').append("<option>No location</option>");

	//blueprint for location option
	let blueprint = "<option value='{{optionValue}}'>{{locationName}}</option>";
	
	//populatin location selector with options
	for(let i = 0; i < aLocations.length; i++) {
		//working copy of blueprint
		let temp = blueprint;

		//put json string with location data in the option value
		temp = temp.replace("{{optionValue}}", JSON.stringify(aLocations[i]));
		//set location name
		temp = temp.replace("{{locationName}}", aLocations[i].location_name);

		//append location to selector
		$('#select-location').append(temp);
	}
}

function fnPrepareToEditLocation(oSource){
	oLocation = JSON.parse($(oSource).val());

	$("#txtLocationId").val(oLocation.id_location);
	$("#txtLocationAddress").val(oLocation.address);
	$("#txtLocationSeats").val(oLocation.seats);
	$("#txtLocationName").val(oLocation.location_name);
}

function fnClearLocationEdit() {
	$('#container-location-create > input').val('');
}

function fnClearPartnerEdit() {
	$('#container-partner-create > input').val('');
}

function fnSavePartner() {
	let sId = $("#txtPartnerId").val();
	let sName = $("#txtPartnerName").val();
	let sWebsite = $("#txtPartnerWebsite").val();
	let sEmail = $("#txtPartnerEmail").val();
	let sPhone = $("#txtPartnerPhone").val();
	let formData = {};

	formData.id = sId;
	formData.name = sName;
	formData.website = sWebsite;
	formData.email = sEmail;
	formData.phone = sPhone;

	let sUrl = "../apis/api-create-partner.php";

	//If id is not empty it means we are updating, not creating
	if(sId != "") {
		sUrl = "../apis/api-update-partner.php";
	}

	let ajaxRequest = $.ajax({
		url: sUrl,
		data: formData,
		dataType: "JSON",
		method: "POST"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnClearPartnerEdit();
			fnFetchPartners();
			alert("Partner added to database");
		} else {
			alert("Error while adding partner to db");
		}
	});
}

function fnFetchPartners() {
	let sUrl = '../apis/api-get-partners.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnPopulateMainPartnerSelector(jData.data);
		} else {
			console.log("Could not load partners from db");
		}
	});
}

function fnPopulateMainPartnerSelector(aPartners) {
	//clear main-partner selector
	$('#select-main-partner').empty();
	$('#select-main-partner').append("<option>No main-partner</option>");

	//blueprint for main-partner option
	let blueprint = "<option value='{{optionValue}}'>{{mainPartnerName}}</option>";
	
	//populatin main-partner selector with options
	for(let i = 0; i < aPartners.length; i++) {
		//working copy of blueprint
		let temp = blueprint;

		//put json string with main-partner data in the option value
		temp = temp.replace("{{optionValue}}", JSON.stringify(aPartners[i]));
		//set main-partner name
		temp = temp.replace("{{mainPartnerName}}", aPartners[i].full_name);

		//append main-partner to selector
		$('#select-main-partner').append(temp);
	}
}