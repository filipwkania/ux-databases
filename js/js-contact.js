$('#btn-send-message').click(function(){
	// get data from form
	var formData = $('#frm-contact').serialize();
	// post data to api
    $.ajax(
      {
          "type"            : "post",
          "url"             : "apis/api-submit-message.php",
          "data"            : formData,
          "dataType"        : "json"      
      }
    ).done(function(jData){
    	console.log(jData);
    	if(jData.status == "ok"){
	      alert("Your message has been successfully submitted!");
	      $('#frm-contact').trigger('reset');
	  }
	})
})