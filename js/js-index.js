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
  var sEventBluePrint = '<div id="{{id}}" class="card-event" data-level="{{class-level}}" data-category="{{class-category}}">\
                          <div class="card-event-image">\
                            <div class="card-event-image-overlay">\
                              <h2 class="card-event-title">{{title}}</h2>\
                              <span class="card-event-catch-phrase">{{catch-phrase}}</span>\
                            </div>\
                          </div>\
                          <div class="event-card-details-container">\
                            <div class="event-card-details">\
                              <span class="event-card-start-time">{{start-time}}</span>\
                              <span class="event-card-location">{{location}}</span>\
                              <div class="event-card-brief-description">{{brief-description}}</div>\
                              <div class="event-card-details-filter-container">\
                                <span class="event-card-level">{{level}}</span>\
                                <span class="event-card-category">{{category}}</span>\
                              </div>\
                              <button class="btn-display-event-details button" type="button">Details</button>\
                            </div>\
                          </div>\
                        </div>'
  // AJAX with the server
  var sUrl = 'apis/api-get-events-formatted.php';
  $.getJSON(sUrl, function(jData){
    var ajEvents = jData.data;
    for(i = 0; i < ajEvents.length; i++){
      var sEventId = ajEvents[i].id_event;
      var sEventTitle = ajEvents[i].name;
      var sEventCatchPhrase = ajEvents[i].catch_phrase;
      var sEventImagePath = ajEvents[i].picture;
      var sEventStart = ajEvents[i].start;
      //var sEventEnd = ajEvents[i].end;
      var sEventLocation = ajEvents[i].location_name;
      var sEventBriefDescription = ajEvents[i].brief_description;
      var sEventLevel = ajEvents[i].level;
      var sEventCategory = ajEvents[i].category;
      var iEventLevelId = ajEvents[i].level_id;
      var iEventCategoryId = ajEvents[i].category_id;
      // save event to session storage
      var oEvent = (ajEvents[i]);
      sessionStorage.setItem(sEventId, JSON.stringify(oEvent));
      // copy the blueprint
      var sTempEvent = sEventBluePrint;
      // replace placeholders
      sTempEvent = sTempEvent.replace('{{id}}', sEventId);
      sTempEvent = sTempEvent.replace('{{class-level}}', iEventLevelId);
      sTempEvent = sTempEvent.replace('{{class-category}}', iEventCategoryId);
      sTempEvent = sTempEvent.replace('{{title}}', sEventTitle);
      sTempEvent = sTempEvent.replace("{{catch-phrase}}", sEventCatchPhrase);
      sTempEvent = sTempEvent.replace("{{start-time}}", sEventStart);
      //sTempEvent = sTempEvent.replace("{{end-time}}", sEventEnd);
      sTempEvent = sTempEvent.replace("{{location}}", sEventLocation);
      sTempEvent = sTempEvent.replace("{{brief-description}}", sEventBriefDescription);
      sTempEvent = sTempEvent.replace("{{level}}", sEventLevel);
      sTempEvent = sTempEvent.replace("{{category}}", sEventCategory);
    // append blueprint to event list
    $('#event-container').append(sTempEvent);
    $('.card-event-image').css("background-image", 'url("./images/'+sEventImagePath+'")');
    }
    fnLoadSpeakers();
  })
}

// load speakers
function fnLoadSpeakers(){
  // AJAX with the server
  var sUrl = 'apis/api-get-speakers.php';
  $.getJSON(sUrl, function(jData){
    if(jData.status == 'ok'){
      var ajSpeakers = jData.data;
      for(i = 0; i < ajSpeakers.length; i++){
        var jSpeaker = ajSpeakers[i];
        sessionStorage.setItem('speaker-'+jSpeaker.id_speaker, JSON.stringify(jSpeaker));
      }
    }else{
      console.log('Error - Speakers not found');
    }
  })
}

// FILTERS

$('.filter-level').click(function(){
  $('.card-event').removeClass('filter-level-hide');
  var sLevel = $(this).attr('data-level-selector');
  $('.card-event[data-level!='+sLevel+']').addClass('filter-level-hide');
})

$('#filter-level-reset').click(function(){
  $('.card-event').removeClass('filter-level-hide');
})

$('.filter-category').click(function(){
  $('.card-event').removeClass('filter-category-hide');
  var sCategory = $(this).attr('data-category-selector');
  $('.card-event[data-category!='+sCategory+']').addClass('filter-category-hide');
})

$('#filter-category-reset').click(function(){
  $('.card-event').removeClass('filter-category-hide');
})