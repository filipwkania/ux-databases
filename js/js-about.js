$(document).on('click', '.menu-link[data-go-to="wdw-about"]', function(){
	fnDisplaySpeakers();	
})

function fnDisplaySpeakers(){
	var sSpeakerBluePrint = '<div id="{{id}}" class="card-speaker">\
								<div class="front">\
									<img class="img-speaker" src="images/{{image-path}}">\
								</div>\
								<div class="back">\
									<div class="txt-speaker-name">{{fullname}}</div>\
									<div class="txt-speaker-occupation">{{occupation}}</div>\
									<div clas="txt-speaker-description">{{description}}</div>\
								</div>\
							</div>';
	// AJAX with the server
	var sUrl = 'apis/api-get-speakers.php';
	$.getJSON(sUrl, function(jData){
		if(jData.status == 'ok'){
			var ajSpeakers = jData.data;
			for(i = 0; i < ajSpeakers.length; i++){
				var sSpeakerId = ajSpeakers[i].id_speaker;
				var sSpeakerName = ajSpeakers[i].full_name;
				var sSpeakerOccupation = ajSpeakers[i].occupation;
				var sSpeakerDescription = ajSpeakers[i].description;
				var sSpeakerImagePath = ajSpeakers[i].picture;
				// copy the blueprint
				var sTempSpeaker = sSpeakerBluePrint;
		      	// replace the placeholders
		      	sTempSpeaker = sTempSpeaker.replace("{{id}}", sSpeakerId);
		      	sTempSpeaker = sTempSpeaker.replace("{{fullname}}", sSpeakerName);
		      	sTempSpeaker = sTempSpeaker.replace("{{occupation}}", sSpeakerOccupation);
		      	sTempSpeaker = sTempSpeaker.replace("{{description}}", sSpeakerDescription);
		      	sTempSpeaker = sTempSpeaker.replace("{{image-path}}", sSpeakerImagePath);
		      	// append blueprint to speaker list
		      	$('#speaker-container').append(sTempSpeaker);
			}
		}else{
			alert('Error - Speakers not found');
		}
	})
}
// DISPLAY CONTACT MODAL
$('#btn-contact').click(function(){
	$('#mdl-contact').css("display", "flex");	
})

// HIDE CONTACT MODAL / CANCEL
$('#btn-cancel-message').click(function(){
	$('#mdl-contact').css("display", "none");
})

// SEND MESSAGE
$('#btn-send-message').click(function(){
	// get data from form
	var formData = $('#frm-contact').serialize();
	// determine message type (radio buttons)
	var sMessageType = undefined;
	if($('#message-subject-application').is(':checked')){
		sMessageType = 'application';
	}else if($('#message-subject-feedback').is(':checked')){
		sMessageType = 'feedback';
	}else if($('#message-subject-question').is(':checked')){
		sMessageType = 'question';
	}
	// add message type to form data
	formData = formData + '&type=' + sMessageType;
	console.log(formData);
	// post data to api
    $.ajax(
      {
          "type"            : "post",
          "url"             : "apis/api-submit-message.php",
          "data"            : formData,
          "dataType"        : "json"      
      }
    ).done(function(jData){
    	if(jData.status == "ok"){
    		$('#mdl-contact').css("display", "none");
    		$('#frm-contact').trigger('reset');
    		alert("Thanks, your message has been successfully submitted!");
	  	}else{
	  		$('#mdl-contact').css("display", "none");
    		$('#frm-contact').trigger('reset');
    		alert("Sorry, there has been a problem with your message. Please try again!");
	  	}
	})
})
