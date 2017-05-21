// open event details window
$(document).on('click', '.card-event-image', function(){
  // get event id
  var iEventId = $(this).parent().attr('id');
  // get event info from session storage
  var sEvent = sessionStorage.getItem(iEventId);
  var oEvent = JSON.parse(sEvent);
  var sEventImagePath = oEvent.picture;
  // hide event overview and show event details
  $('.wdw').css("display", "none");
  $('#wdw-event').css("display", "flex");
  // add event info
  $('#header-image-event').css("background-image", 'url("./images/'+sEventImagePath+'")');
  $('#header-image-event').css("background-size", "cover");
  $('#header-image-event').css("background-repeat", "no-repeat");

  $('#wdw-event-title').text(oEvent.name);
  $('#wdw-event-catch-phrase').text(oEvent.catch_phrase);
  $('#wdw-event-time-start').text(oEvent.start);
  $('#wdw-event-time-end').text(oEvent.end);
  $('#wdw-event-location').text(oEvent.location);
  $('#wdw-event-category').text(oEvent.category);
  $('#wdw-event-level').text(oEvent.level);

  $('#event-description-text').text(oEvent.description);
  // ADD MISSING MAP !!!

  $('#map-caption').text(oEvent.location);

  var ajSpeakers = [];
  var sSpeakerBluePrint = '<div class="card-speaker">\
                          <div class="card-speaker-header">\
                            <div class="card-speaker-header-background"></div>\
                            <img src="./images/{{image-path}}">\
                          </div>\
                          <div class="speaker-card-details">\
                            <h2 id="speaker-card-name">{{name}}</div>\
                            <span id="speaker-card-occupation">{{occupation}}</span>\
                            <div id="speaker-card-description">{{description}}</div>\
                          </div>\
                        </div>'
  // AJAX WITH THE SERVER
  var sUrl = 'apis/api-get-event-speakers.php?id='+iEventId;

  $.getJSON(sUrl, function(jData){
    var ajSpeakerIds = jData.data;
    for(i = 0; i < ajSpeakerIds.length; i++){
      var iSpeakerId = ajSpeakerIds[i].id_speaker;
      var sSpeaker = sessionStorage.getItem('speaker-'+iSpeakerId);
      ajSpeakers.push(JSON.parse(sSpeaker));
    }

  for(i = 0; i < ajSpeakers.length; i++){
    var sSpeakerImage = ajSpeakers[i].picture;
    var sSpeakerName = ajSpeakers[i].full_name;
    var sSpeakerOccupation = ajSpeakers[i].occupation;
    var sSpeakerDescription = ajSpeakers[i].description;

    var sTempSpeaker = sSpeakerBluePrint;
    sTempSpeaker = sTempSpeaker.replace("{{image-path}}", sSpeakerImage);
    sTempSpeaker = sTempSpeaker.replace("{{name}}", sSpeakerName);
    sTempSpeaker = sTempSpeaker.replace("{{occupation}}", sSpeakerOccupation);
    sTempSpeaker = sTempSpeaker.replace("{{description}}", sSpeakerDescription);

    $('#event-contributors-container').append(sTempSpeaker);
  }
  })
})