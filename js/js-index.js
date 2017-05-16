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