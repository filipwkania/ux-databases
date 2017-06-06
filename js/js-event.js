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
  $('#wdw-event').append('<input id="details-event-id" type="hidden" value="'+iEventId+'">');
  // add event info
  $('#header-image-event').css("background-image", 'url("./images/'+sEventImagePath+'")');
  $('#header-image-event').css("background-size", "cover");
  $('#header-image-event').css("background-repeat", "no-repeat");

  $('#wdw-event-title').text(oEvent.name);
  $('#wdw-event-catch-phrase').text(oEvent.catch_phrase);
  $('#wdw-event-time-start').text(oEvent.start);
  $('#wdw-event-time-end').text(oEvent.end);
  $('#wdw-event-location').text(oEvent.location_name);
  $('#wdw-event-category').text(oEvent.category);
  $('#wdw-event-level').text(oEvent.level);
  $('#event-description-text').text(oEvent.description);

  $('#location-name').text(oEvent.location_name);
  $('#location-address').text(oEvent.location_address);
  // remove agenda from previous event
  if($('#separator-agenda').length != 0){
    $('#separator-agenda').remove();
    $('#event-agenda-container').remove();
    $('#event-agenda').remove();
  }
  // check if there is an agenda
  if(oEvent.agenda != null){
    var aAgenda = oEvent.agenda.split(',');
    for(i = 0; i < aAgenda.length; i++){
      aAgenda[i] = aAgenda[i]+' </br>';
    }
    var sAgendaBluePrint = '<div id="separator-agenda" class="separator">Agenda</div>\
                            <div id="event-agenda-container">\
                              <div id="event-agenda">'+aAgenda.join('')+'</div>\
                            </div>';
    $('#separator-contributors').before(sAgendaBluePrint);
  }

  var ajSpeakers = [];
  var sSpeakerBluePrint = '<div class="card-speaker">\
                          <div class="card-speaker-header">\
                            <div class="card-speaker-header-background"></div>\
                            <img src="./images/{{image-path}}">\
                          </div>\
                          <div class="speaker-card-details">\
                            <h2 id="speaker-card-name">{{name}}</h2>\
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

// open event details window tablet/mobile
$(document).on('click', '.btn-display-event-details', function(){
  // get event id
  var iEventId = $(this).parent().parent().parent().attr('id');
  // get event info from session storage
  var sEvent = sessionStorage.getItem(iEventId);
  var oEvent = JSON.parse(sEvent);
  var sEventImagePath = oEvent.picture;
  // hide event overview and show event details
  $('.wdw').css("display", "none");
  $('#wdw-event').css("display", "flex");
  $('#wdw-event').append('<input id="details-event-id" type="hidden" value="'+iEventId+'">');
  // add event info
  $('#header-image-event').css("background-image", 'url("./images/'+sEventImagePath+'")');
  $('#header-image-event').css("background-size", "cover");
  $('#header-image-event').css("background-repeat", "no-repeat");

  $('#wdw-event-title').text(oEvent.name);
  $('#wdw-event-catch-phrase').text(oEvent.catch_phrase);
  $('#wdw-event-time-start').text(oEvent.start);
  $('#wdw-event-time-end').text(oEvent.end);
  $('#wdw-event-location').text(oEvent.location_name);
  $('#wdw-event-category').text(oEvent.category);
  $('#wdw-event-level').text(oEvent.level);
  $('#event-description-text').text(oEvent.description);

  $('#location-name').text(oEvent.location_name);
  $('#location-address').text(oEvent.location_address);

  var ajSpeakers = [];
  var sSpeakerBluePrint = '<div class="card-speaker">\
                          <div class="card-speaker-header">\
                            <div class="card-speaker-header-background"></div>\
                            <img src="./images/{{image-path}}">\
                          </div>\
                          <div class="speaker-card-details">\
                            <h2 id="speaker-card-name">{{name}}</h2>\
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
    if(ajSpeakers == []){
      $('#event-message-no-speakers').css("display", "flex");
    }
  }
  })
})

// RESERVE SEAT
$('#btn-reserve-seat').click(function(){
  fnDisplayReservationModal();
})
$('#btn-cancel-reservation').click(function(){
  fnHideReservationModal();
})
$('#btn-confirm-reservation').click(function(){
  // get data from form
  var formData = $('#frm-reservation').serialize();
  var iEventId = $('#details-event-id').val();
  formData = formData+'&event='+iEventId;

  // post data to api
    $.ajax(
      {
          "type"            : "post",
          "url"             : "apis/api-reserve-seat.php",
          "data"            : formData,
          "dataType"        : "json"      
      }
    ).done(function(jData){
      console.log(jData);
      if(jData.status == "ok"){
        $('#mdl-reservation').css("display", "none");
        $('#frm-reservation').trigger('reset');
        $('body').removeClass('stop-scrolling');
        alert("Thanks, your reservation has been successfully submitted!");
      }else{
        $('#mdl-reservation').css("display", "none");
        $('#frm-reservation').trigger('reset');
        $('body').removeClass('stop-scrolling');
        alert("Sorry, there has been a problem with your reservation. Please try again!");
      }
  })
})


function fnDisplayReservationModal(){
  $('#mdl-reservation').css("display", "flex");
  $('body').addClass('stop-scrolling');
}
function fnHideReservationModal(){
  $('#mdl-reservation').css("display", "none");
  $('#frm-reservation').trigger('reset');
  $('body').removeClass('stop-scrolling');
}