$(document).on("click", "#btn-login", function() {
	fnLogin();
});

$(document).on("click", "#btn-save-speaker", function() {
	fnSaveSpeaker();
});

$(document).on("click", "#btn-add-new-user", function() {
	fnShowModal('user');
});

$(document).on("click", ".cancel-button", function(source) {
	let sModal = $(source.target).attr("data-mdl");
	fnCloseModal(sModal);
});

$(document).on("click", "#btn-cancel-edit", function () {
	fnClearEdit();
})

$(document).on("click", ".btn-add-new", function(source) {
	let sItem = $(source.target).attr("data-item");
	fnClearForm(sItem);
	fnShowModal(sItem);
})

$(document).on("click", ".remove-extra-partner", function(source) {
	$(source.target).parent().remove();
});

$(document).on("click", ".remove-extra-speaker", function(source) {
	$(source.target).parent().remove();
});

$(document).on("click", "#btn-edit-partner", function() {
	fnShowModal("partner");
});

$(document).on("click", "#btn-edit-speaker", function() {
	fnShowModal("speaker");
});

$(document).on("click", "#btn-edit-location", function() {
	fnShowModal("location");
});

$(document).on("click", "#btn-clear-edit-speaker" ,function() {
	fnClearForm('speaker');
});

$(document).on("click", ".user-edit", function(source) {
	fnPrepareToEditUser($(source.target).parent());
});

$(document).on("click", "#btn-edit-save", function() {
	fnSaveUser();
});

$(document).on("click", ".user-delete", function(source) {
	fnDeleteUser($(source.target).parent());
});

$(document).on("click", "#btn-save-location", function() {
	fnSaveLocation();
});

$(document).on("change", "#select-location", function(source) {
	fnPrepareToEditLocation(source.target);
});

$(document).on("change", "#select-main-partner", function(source) {
	fnPrepareToEditPartner(source.target);
});

$(document).on("change", "#select-extra-partners", function(source) {
	let oPartner = JSON.parse($(source.target).val());
	fnAddExtraPartner(oPartner.id_partner, oPartner.full_name);
});

$(document).on("change", "#select-event", function(source) {
	fnPrepareToEditEvent(source.target);
});

$(document).on("change", "#select-event-speakers", function(source) {
	fnPrepareToEditSpeaker(source.target);
	let oSpeaker = JSON.parse($(source.target).val());
	fnAddExtraSpeaker(oSpeaker.id_speaker, oSpeaker.full_name);
});

$(document).on("click", "#btn-save-partner", function() {
	fnSavePartner();
});

$(document).on("click", "#btn-save-event", function() {
	fnSaveEvent();
});

$(document).on("click", "#btn-clear-edit-event", function() {
	fnClearEventEdit();
}); 

$(document).on("click", "#btn-clear-edit-location", function() {
	fnClearForm('location');
});

$(document).on("click", "#btn-clear-edit-partner", function() {
	fnClearForm('partner');
});

//PSEUDO MENU
$(document).on("click", "#btn-menu-events", function() {
	fnOpenWindow("wdw-events");
	fnHideMenu();
});

$(document).on("click", "#btn-menu-accounts", function() {
	fnOpenWindow("wdw-accounts");
	fnHideMenu();
});
//END OF PSEUDO MENU

function fnLogin() {
	// get values from fields
	let sUsername = $('#txt-username').val();
	let sPassword = $('#txt-password').val();

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

function fnShowModal(sModal) {
	$('#mdl-'+sModal).css('display', 'flex');
}

function fnCloseModal(sModal) {
	$('#mdl-'+sModal).hide();
}

function fnOpenWindow(sWindow) {
	$('.wdw').hide();
	$('#'+sWindow).css("display","flex");

	switch(sWindow) {
		case "wdw-events":
			fnPopulateEventPage();
			break;
		case "wdw-accounts":
			fnLoadUsers();
			fnPopulateSelector('roles', 'edit-role', 'id_user_role', 'role_name');
			break;
		default: 
			break;
	}
}

function fnFetchSpeakers() {
	let sUrl = "../apis/api-get-speakers.php";

	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnLoadSpeakers(jData.data);
		} else {
			console.log("Failed to load speakers");
		}
	});
}

function fnLoadSpeakers(aSpeakers) {
	//empty selector
	$('#select-event-speakers').empty();

	//add basic option
	$('#select-event-speakers').append("<option value = 'select-no-speaker'>No speaker selected</option>");
	let blueprint = "<option id='speaker-{{speakerId}}'	value = '{{speakerValue}}'>{{speakerName}}</option>";

	for(let i = 0; i < aSpeakers.length; i++) {
		let temp = blueprint;

		temp = temp.replace('{{speakerId}}', aSpeakers[i].id_speaker);
		temp = temp.replace('{{speakerValue}}', JSON.stringify(aSpeakers[i]));
		temp = temp.replace('{{speakerName}}', aSpeakers[i].full_name);

		$('#select-event-speakers').append(temp);
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
		<td class="text-left user-fullName" data-th="Full name">{{fullName}}</td>\
		<td class="text-left user-username" data-th="Username">{{username}}</td>\
		<td class="text-left user-email" data-th="Email">{{email}}</td>\
		<td class="text-left user-password" data-th="Password">{{password}}</td>\
		<td class="text-left user-userRole" data-th="Role" data-role-id={{roleId}}>{{userRole}}</td>\
		<td class="text-center user-edit" data-th="Edit"><span class="fa fa-fw fa-edit"></span></td>\
		<td class="text-center user-delete" data-th="Delete"><span class="fa fa-fw fa-remove"></span></td>\
	</tr>';

	//replace place holders with actual data
	for(let i = 0; i < aUsers.length; i++) {
		let sHtmlToAppend = blueprint;
		sHtmlToAppend = sHtmlToAppend.replace("{{id}}", aUsers[i]['id_user']);
		sHtmlToAppend = sHtmlToAppend.replace("{{fullName}}", aUsers[i]['full_name']);
		sHtmlToAppend = sHtmlToAppend.replace("{{username}}", aUsers[i]['username']);
		sHtmlToAppend = sHtmlToAppend.replace("{{email}}", aUsers[i]['email']);
		sHtmlToAppend = sHtmlToAppend.replace("{{password}}", aUsers[i]['password']);
		sHtmlToAppend = sHtmlToAppend.replace("{{userRole}}", aUsers[i]['role_name']);
		sHtmlToAppend = sHtmlToAppend.replace("{{roleId}}", aUsers[i]['role']);
		// append user row to table
		$('#tbody-users').append(sHtmlToAppend);
	}
}

function fnPrepareToEditEvent(oSource) {

	if($(oSource).val() === "select-no-event") {
		fnClearEventEdit();
	} else {
		//get event attributes
		let oEvent = JSON.parse($(oSource).val());

		//load extra partners and speakers from database
		fnFetchEventPartnersSpeakers(oEvent.id_event);

		//put values into the edit fields
		$('#txt-event-id').val(oEvent.id_event);
		$('#txt-event-name').val(oEvent.name);
		$('#txt-event-description').val(oEvent.description);
		$('#txt-event-agenda').val(oEvent.agenda);
		$('#txt-event-start').val(oEvent.start);
		$('#txt-event-end').val(oEvent.end);
		oEvent.sustenance ? $('#check-event-sustenance').attr('checked', true) : 
		$('#check-event-sustenance').attr('checked', false);
		$('#select-event-level').val(oEvent.level);
		$('#txt-event-catch-phrase').val(oEvent.catch_phrase);
		$('#txt-event-brief-description').val(oEvent.brief_description);
		$('#select-event-category').val(oEvent.category);
		$('#txt-event-price').val(oEvent.price);

		//select main partner if any
		oEvent.main_partner > 0 
		? $('#select-main-partner option[id="main-partner-'
			+oEvent.main_partner+'"]').attr("selected", "selected")
		: $('#select-main-partner').val("");
		//select main partner if any
		oEvent.location > 0 
		? $('#select-location option[id="location-'
			+oEvent.location+'"]').attr("selected", "selected")
		: $('#select-location').val("");
	}
}

function fnPrepareToEditUser(oSource) {
	//get values from clicked user
	let sId = $(oSource).siblings('.user-id').val();
	let sFullName = $(oSource).siblings('.user-fullName').text();
	let sUsername = $(oSource).siblings('.user-username').text();
	let sEmail = $(oSource).siblings('.user-email').text();
	let sPassword = $(oSource).siblings('.user-password').text();
	let sUserRole = $(oSource).siblings('.user-userRole').attr('data-role-id');

	//put values into edit input elements
	$('#txt-edit-id').val(sId);
	$('#txt-edit-name').val(sFullName);
	$('#txt-edit-username').val(sUsername);
	$('#txt-edit-email').val(sEmail);
	$('#txt-edit-password').val(sPassword);
	$('#select-edit-role').val(sUserRole);

	fnShowModal('user');
}
function fnSaveSpeaker() {
	let sUrl = "../apis/api-create-speaker.php";
	let formData = {};

	formData.id = $('#txt-speaker-id').val();
	formData.name = $('#txt-speaker-name').val();
	formData.occupation = $('#txt-speaker-occupation').val();
	formData.description = $('#txt-speaker-description').val();

	if(formData.id != "") {
		sUrl = "../apis/api-update-speaker.php";
	}

	let ajaxRequest = $.ajax({
		url: sUrl,
		data: formData,
		dataType: "JSON",
		method: "POST"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnFetchSpeakers();
			fnClearForm('speaker');
			alert("Speaker is now saved in database");
		} else {
			alert("Failed to save speaker in database");
		}
	});
}

function fnSaveUser() {
	//get values for updating/creating user
	let sId = $('#txt-edit-id').val();
	let sFullName = $('#txt-edit-name').val();
	let sUsername = $('#txt-edit-username').val();
	let sEmail = $('#txt-edit-email').val();
	let sPassword = $('#txt-edit-password').val();
	let iRole = $('#select-edit-role').val();
	//check if we are updating or saving new user
	//by looking at the id in the hidden field
	if($('#txt-edit-id').val() != "") {
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
				fnCloseModal('user');
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
				fnCloseModal('user');
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
	let sId = $('#txt-edit-id').val();
	let sFullName = $('#txt-edit-name').val();
	let sUsername = $('#txt-edit-username').val();
	let sEmail = $('#txt-edit-email').val();
	let sPassword = $('#txt-edit-password').val();
	let iRole = $('#select-edit-role').val();

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
	//clear use edit input fields
	$('#container-user-edit input').val("");
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
	let sId = $('#txt-location-id').val();
	let sName = $('#txt-location-name').val();
	let sAddress = $('#txt-location-address').val();
	let iSeats = $('#txt-location-seats').val();
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
			fnClearForm('location');
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
	$('#select-location').append("<option value='select-no-location'>No location</option>");

	//blueprint for location option
	let blueprint = "<option id='location-{{locationId}}' \
		value='{{optionValue}}'>{{locationName}}</option>";
	
	//populatin location selector with options
	for(let i = 0; i < aLocations.length; i++) {
		//working copy of blueprint
		let temp = blueprint;

		//put json string with location data in the option value
		temp = temp.replace("{{optionValue}}", JSON.stringify(aLocations[i]));
		//set location name
		temp = temp.replace("{{locationName}}", aLocations[i].location_name);
		//set id for easy auto-select
		temp = temp.replace("{{locationId}}", aLocations[i].id_location);

		//append location to selector
		$('#select-location').append(temp);
	}
}

function fnPrepareToEditSpeaker(oSource) {
	if($(oSource).val() === 'select-no-speaker') {
		fnClearForm('speaker');
	} else {
		let oSpeaker = JSON.parse($(oSource).val());

		$("#txt-speaker-id").val(oSpeaker.id_speaker);
		$("#txt-speaker-name").val(oSpeaker.full_name);
		$("#txt-speaker-occupation").val(oSpeaker.occupation);
		$("#txt-speaker-description").val(oSpeaker.description);
	}
}

function fnPrepareToEditLocation(oSource){
	if($(oSource).val() === "select-no-location") {
		fnClearForm('location');
	} else {
		let oLocation = JSON.parse($(oSource).val());

		$("#txt-location-id").val(oLocation.id_location);
		$("#txt-location-address").val(oLocation.address);
		$("#txt-location-seats").val(oLocation.seats);
		$("#txt-location-name").val(oLocation.location_name);		
	}
}

function fnPrepareToEditPartner(oSource) {
	if($(oSource).val() === "select-no-main-partner") {
		fnClearForm('partner');
	} else {
		let oPartner = JSON.parse($(oSource).val());

		$("#txt-partner-id").val(oPartner.id_partner);
		$("#txt-partner-name").val(oPartner.full_name);
		$("#txt-partner-website").val(oPartner.website);
		$("#txt-partner-email").val(oPartner.email);
		$("#txt-partner-phone").val(oPartner.phone);
	}
}

function fnSavePartner() {
	let sId = $("#txt-partner-id").val();
	let sName = $("#txt-partner-name").val();
	let sWebsite = $("#txt-partner-website").val();
	let sEmail = $("#txt-partner-email").val();
	let sPhone = $("#txt-partner-phone").val();
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
			fnClearForm('partner');
			fnFetchPartners();
			alert("Partner saved in database");
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
			fnPopulatePartnerSelectors(jData.data);
		} else {
			console.log("Could not load partners from db");
		}
	});
}

function fnPopulatePartnerSelectors(aPartners) {
	//clear partner selectors
	$('#select-main-partner').empty();
	$('#select-extra-partners').empty();

	//add basic option to selectors
	$('#select-main-partner').append("<option value='select-no-main-partner'>No main-partner</option>");
	$('#select-extra-partners').append("<option value='select-no-extra-partners'>No extra partners</option>");
	
	//blueprint for main-partner option
	let blueprint = "<option id = 'main-partner-{{partnerId}}'\
	 value='{{optionValue}}'>{{mainPartnerName}}</option>";
	
	//populatin main-partner selector with options
	for(let i = 0; i < aPartners.length; i++) {
		//working copy of blueprint
		let temp = blueprint;

		//put json string with main-partner data in the option value
		temp = temp.replace("{{optionValue}}", JSON.stringify(aPartners[i]));
		//set main-partner name
		temp = temp.replace("{{mainPartnerName}}", aPartners[i].full_name);
		//set id for easy auto-select
		temp = temp.replace("{{partnerId}}", aPartners[i].id_partner);

		//append main-partner to selector
		$('#select-main-partner').append(temp);
		$('#select-extra-partners').append(temp);
	}
}

function fnPopulateSelector(sItems, sSelector, sValue, sName) {
	let sUrl = '../apis/api-get-'+sItems+'.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON",
	});

	ajaxRequest.done(function(jData) {
		//if we have some items in db, load them into selector
		if(jData.status === "ok") {
			let aItems = jData.data;
			let blueprint = "<option value='{{optionValue}}'>{{itemName}}</option>";
			$('#select-'+sSelector).empty();
			
			for(let i = 0; i < aItems.length; i++) {
				let temp = blueprint;
				//sValue and sName refer to columns names in db
				temp = temp.replace('{{optionValue}}', aItems[i][sValue] );
				temp = temp.replace('{{itemName}}', aItems[i][sName]);

				$('#select-'+sSelector).append(temp);
			}
		}
	});
}

function fnPopulateEventPage() {
	fnFetchLocations();
	fnFetchPartners();
	fnFetchEvents();
	fnFetchSpeakers();
	fnPopulateSelector('categories', 'event-category', 'id_event_category', 'category_name');
	fnPopulateSelector('levels', 'event-level', 'id_event_level', 'level_name');
}

function fnSaveEvent() {
	let sUrl = '../apis/api-create-event.php';
	let sCategory = $('#select-event-category').val();
	let sLevel = $('#select-event-level').val();

	//if sustenance is checked, put 1
	// otherwise put 0
	let iSustenance = $('#check-event-sustenance').is(':checked') ? 1 : 0;

	if($('#select-location').val() === "select-no-location") {
		alert('Select location or create a new one');
	} else if (sCategory === "") {
		alert('Select event category');
	} else if (sLevel === "") {
		alert('Select event level');
	} else {
		//get ids from selectors
		let sLocation = JSON.parse($('#select-location').val()).id_location;
		let sMainPartner = '';
		//if main partner is selected change 0 to his id
		if($('#select-main-partner').val() != "select-no-main-partner") {
			sMainPartner = JSON.parse($('#select-main-partner').val()).id_partner;
		}
		let formData = {};

		formData.name = $('#txt-event-name').val();
		formData.description = $('#txt-event-description').val();
		formData.agenda = $('#txt-event-agenda').val();
		formData.start = $('#txt-event-start').val();
		formData.end = $('#txt-event-end').val();
		formData.catchPhrase = $('#txt-event-catch-phrase').val();
		formData.briefDescription = $('#txt-event-brief-description').val();
		formData.price = $('#txt-event-price').val();
		formData.sustenance = iSustenance;
		formData.level = sLevel;
		formData.category = sCategory;
		formData.location = sLocation;
		formData.mainPartner = sMainPartner;

		console.log(formData);
		
		let ajaxRequest = $.ajax({
			url: sUrl,
			data: formData,
			dataType: "JSON",
			method: "POST"
		});

		ajaxRequest.done(function(jData) {
			if(jData.status === "ok") {
				fnFetchEvents();
				alert('Event saved in database');
			} else {
				alert('Error while saving event in database');
			}
		});
	// DEBUGGING CODE FOR AJAX REQUEST
	// ajaxRequest.error(function(xhr, status, error) {
	// 	console.log(xhr.responseText);	
	// });
	// END OF DEBUGGING
	}
}

function fnFetchEvents() {
	let sUrl = '../apis/api-get-events.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		dataType: "JSON"
	});

	ajaxRequest.done(function(jData) {
		if(jData.status === "ok") {
			fnLoadEventsToSelector(jData.data);
		} else {
			console.log('Could not load events');
		}
	});
}

function fnLoadEventsToSelector(aEvents) {
	$('#select-event').empty();
	$('#select-event').append('<option value="select-no-event">No event selected</option>');

	let blueprint = "<option value='{{optionValue}}'>{{optionName}}</option>";

	for(let i = 0; i < aEvents.length; i++) {
		let temp = blueprint;

		temp = temp.replace('{{optionValue}}', JSON.stringify(aEvents[i]));
		temp = temp.replace('{{optionName}}', aEvents[i]['name']);

		$('#select-event').append(temp);
	}
}

function fnClearEventEdit() {
	$('#container-event-create input').val("");
	$('#container-event-create textarea').val("");
}

function fnClearForm(sItem) {
	$('#container-'+sItem+'-create input').val("");
}

function fnAddExtraPartner(sId, sName) {
	let blueprint = 
					'<div class="extra-partner" value="{{partnerId}}">\
						<span class="extra-partner-name"> {{partnerName}}</span>\
						<span class="fa fa-fw fa-remove remove-extra-partner"></span>\
					</div>';

	blueprint = blueprint.replace('{{partnerId}}', sId);
	blueprint = blueprint.replace('{{partnerName}}', sName);

	$('#container-extra-partners').append(blueprint);
}

function fnAddExtraSpeaker(sId, sName) {
	let blueprint = 
					'<div class="extra-speaker" value="{{speakerId}}">\
						<span class="extra-partner-name"> {{speakerName}}</span>\
						<span class="fa fa-fw fa-remove remove-extra-speaker"></span>\
					</div>';
	
	blueprint = blueprint.replace('{{speakerId}}', sId);
	blueprint = blueprint.replace('{{speakerName}}', sName);

	$('#container-extra-speakers').append(blueprint);
}

function fnFetchEventPartnersSpeakers(sId) {
	let sUrl = '../apis/api-get-speakers-and-partners.php';

	let ajaxRequest = $.ajax({
		url: sUrl,
		data: {id:sId},
		dataType: "JSON",
		method: "POST"
	});

	ajaxRequest.done(function (jData) {
		if(jData.status === "ok") {
			fnLoadEventPartnersSpeakers(jData.partners, jData.speakers);
		} else {
			console.log('Could not load speakers and extra partners');
		}
	});
}

function fnLoadEventPartnersSpeakers(aPartners, aSpeakers){
	//Load extra partners
	if(aPartners != undefined) {
		$('#container-extra-partners').empty();
		for(let i = 0; i < aPartners.length; i++ ) {
			fnAddExtraPartner(aPartners[i].id_partner, aPartners[i].full_name);
		}
	}

	//Load speakers
	if( aSpeakers != undefined) {
		$('#container-extra-speakers').empty();
		for(let i = 0; i <  aSpeakers.length; i++) {
			fnAddExtraSpeaker( aSpeakers[i].id_speaker,  aSpeakers[i].full_name);
		}
	}
}

// MENU
// SHOW MENU
  $('.admin-menu-icon').click(function(){
    fnDisplayMenu();
  })
// HIDE MENU
  $('#admin-content-overlay').click(function(){
    fnHideMenu();
  })
// FUNCTIONS
// MENU
  function fnDisplayMenu(){
    // display menu
    $('#menu-admin').animate({'left':'0px'}, 800);
    // display the content overlay
    $('#admin-content-overlay').css({'display':'flex'});
    $('body').addClass('stop-scrolling');
    }
  function fnHideMenu(){
    // hide menu
    $('#menu-admin').animate({'left':'-250px'}, 800);
    // hide overlay
    $('#admin-content-overlay').css({'display':'none'});
    $('body').removeClass('stop-scrolling');   
  }