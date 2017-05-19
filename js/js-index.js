// MENU 
// SHOW MENU
  $('.menu-icon').click(function(){
    fnDisplayMenu();
  })
// MENU LINKS
  $(document).on('click', '.menu-link', function(){
    var wdwToShow = $(this).attr('data-go-to');
    $('.wdw').css({'display':'none'});
    $('#'+wdwToShow).css({'display':'flex'});
    fnHideMenu();
  })
// HIDE MENU
  $('#content-overlay').click(function(){
    fnHideMenu();
  })
  // MENU LINKS
  $(document).on('click', '.menu-link', function(){
    var wdwToShow = $(this).attr('data-go-to');
    $('.wdw').css({'display':'none'});
    $('#'+wdwToShow).css({'display':'flex'});
  })

  // FUNCTIONS
  // MENU
  function fnDisplayMenu(){
    // display menu
    $('#menu').animate({'left':'0px'}, 800);
    // display the content overlay
    $('#content-overlay').css({'display':'flex'});
    $('body').addClass('stop-scrolling');
    }
  function fnHideMenu(){
    // hide menu
    $('#menu').animate({'left':'-250px'}, 800);
    // hide overlay
    $('#content-overlay').css({'display':'none'});
    $('body').removeClass('stop-scrolling');   
  }

// EVENTS
fnDisplayEvents();


function fnDisplayEvents(){
  var sEventBluePrint = '<div id="{{id}}" class="card-event">\
                          <div class="card-event-image">\
                            <div class="card-event-image-overlay">\
                              <h2 class="card-event-title">{{title}}</h2>\
                              <span class="card-event-catch-phrase">{{catch-phrase}}</span>\
                            </div>\
                          </div>\
                          <div class="event-card-details">\
                            <div class="event-card-time">\
                              <span class="event-card-start-time">{{start-time}}</span>\
                              <span class="event-card-end-time">{{end-time}}</span>\
                              <span class="event-card-location">{{location}}</span>\
                              <div class="event-card-brief-description">{{brief-description}}</div>\
                            </div>\
                          </div>\
                        </div>'
  // AJAX with the server
  var sUrl = './apis/api-get-events.php';
  $.getJSON(sUrl, function(jData){
    var ajEvents = jData.data;
    for(i = 0; i < ajEvents.length; i++){
      var sEventId = ajEvents[i].id_event;
      var sEventTitle = ajEvents[i].name;
      var sEventCatchPhrase = ajEvents[i].catch_phrase;
      var sEventImagePath = ajEvents[i].picture;
      var sEventStart = ajEvents[i].start;
      var sEventEnd = ajEvents[i].end;
      var sEventLocation = ajEvents[i].location;
      var sEventBriefDescription = ajEvents[i].brief_description;
      // copy the blueprint
      var sTempEvent = sEventBluePrint;
      // replace placeholders
      sTempEvent = sTempEvent.replace('{{id}}', sEventId);
      sTempEvent = sTempEvent.replace('{{title}}', sEventTitle);
      sTempEvent = sTempEvent.replace("{{catch-phrase}}", sEventCatchPhrase);
      sTempEvent = sTempEvent.replace("{{start-time}}", sEventStart);
      sTempEvent = sTempEvent.replace("{{end-time}}", sEventEnd);
      sTempEvent = sTempEvent.replace("{{location}}", sEventLocation);
      sTempEvent = sTempEvent.replace("{{brief-description}}", sEventBriefDescription);
    // append blueprint to event list
    $('#event-container').append(sTempEvent);
    $('.card-event-image').css("background-image", 'url("./images/'+sEventImagePath+'")');
    }
  })
}