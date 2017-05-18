<!DOCTYPE html>
<html>
<head>
	<title>Very Unique And Catchy Company Name</title>
	<link rel="stylesheet" type="text/css" href="style/app.css">
	<script src="https://use.fontawesome.com/fa11f26e3b.js"></script>
</head>
<body>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="menu">
		<div class="menu-link" data-go-to="wdw-index">Home</div>
		<div class="menu-link" data-go-to="wdw-about">About us</div>
		<div class="menu-link" data-go-to="wdw-contact">Contact</div>
	</div>

	<div id="content-overlay"></div>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="wdw-index" class="wdw">
		<div class="header">
			<span class="menu-icon fa fa-bars"></span>
			<span class="logo fa fa-tag"></span>
		</div>
	</div>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="wdw-event" class="wdw">
		<div class="header">
			<span class="menu-icon fa fa-bars"></span>
			<span class="logo fa fa-tag"></span>
		</div>
	</div>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="wdw-about" class="wdw">
		<div class="header">
			<span class="menu-icon fa fa-bars"></span>
			<span class="logo fa fa-tag"></span>
		</div>
		<div id="header-image-about">
			<div id="txt-about">
				<h2>About us and our speakers</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae accumsan tortor, et pretium tortor. Sed et porttitor nulla. Curabitur vulputate nibh est.
				</p>
				<p>
					Phasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh.
				</p>
				<p>
					Phasellus sollicitudin risus dictum odio varius pharetra. Curabitur ut mollis tortor, eu auctor metus. Cras vehicula elementum metus, in posuere nibh.
				</p>
				<button id="btn-contact" class="button" type="button">Contact us</button>
			</div>
		</div>
		<div id="speaker-container"></div>
	</div>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="mdl-contact" class="modal">
		<div class="modal-content">
			<p id="success-message-contact">Your message has been successfully submitted!</p>
			<form id="frm-contact">
				<div id="container-message-subject">
					<span id="message-subject">Subject</span>
					<div class="radio-button">
						<input id="message-subject-application" type="radio" name="application">
						<span id="lbl-message-subject-application">Partner Application</span>
					</div>
					<div class="radio-button">
						<input id="message-subject-feedback" type="radio" name="feedback">
						<span id="lbl-message-subject-feedback">Feedback</span>
					</div>
					<div class="radio-button">
						<input id="message-subject-question" type="radio" name="question">
						<span id="lbl-message-subject-question">Question</span>
					</div>
				</div>
				<input id="message-fullname" class="validate" type="text" name="fullname" placeholder="First- and lastname">
				<input id="message-email" class="validate" type="text" name="email" placeholder="Email">
				<input id="message-phone" type="text" name="phone" placeholder="Phone">
				<input id="message-text" type="text" name="message" placeholder="Message">
				<button id="btn-cancel-message" class="cancel-button" type="button">Cancel</button>
				<button id="btn-send-message" class="button" type="button">Send</button>
			</form>
		</div>
	</div>

<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/js-index.js"></script>
<script src="js/js-event.js"></script>
<script src="js/js-about.js"></script>
<script src="js/js-contact.js"></script>
</body>
</html>