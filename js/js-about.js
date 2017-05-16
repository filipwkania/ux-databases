$(document).on('click', '.menu-link[data-go-to="wdw-about"]', function(){
	fnDisplaySpeakers();	
})

function fnDisplaySpeakers(){
	var sSpeakerBluePrint = '<div id="{{id}}" class="card-speaker">\
								<div class="front">\
									<img class="img-speaker" src="{{image-path}}">\
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
		// loop through all speakers
		for(i = 0; i < jData.length; i++){
			var sSpeakerId = jData[i].id;
			var sSpeakerName = jData[i].fullname;
			var sSpeakerOccupation = jData[i].occupation;
			var sSpeakerDescription = jData[i].description;
			var sSpeakerImagePath = jData[i].image;
			// copy blueprint
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
	})
}