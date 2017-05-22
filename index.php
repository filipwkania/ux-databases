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
		<div id="header-image-index">
			<div id="header-image-index-text">
				<h1 id="header-title">Events</h1>
				<h3 id="header-tagline">Find interesting Tech Events and safe your seat</h3>
			</div>
		</div>
		<div id="event-container">
			<div id="event-filters-container">
				<span id="lbl-filters">Filters:</span>
				<div id="dropdown-filter-level">
					<span id="filter-category-toggle" class="filter-button" data-filter="category">Category</span>
					<div id="filter-category-dropdown" class="filter-dropdown-content">
						<span class="filter-category" data-category-selector="1">Business/Administration</span>
						<span class="filter-category" data-category-selector="2">General</span>
						<span class="filter-category" data-category-selector="3">Tech Talk</span>
						<span id="filter-category-reset" class="filter-category">All Categories</span>
					</div>
				</div>
				<div id="dropdown-filter-level">
					<span id="filter-level-toggle" class="filter-button" data-filter="level">Level</span>
					<div id="filter-level-dropdown" class="filter-dropdown-content">
						<span class="filter-level" data-level-selector="For All">For All</span>
						<span class="filter-level" data-level-selector="Intermediate">Intermediate</span>
						<span class="filter-level" data-level-selector="Advanced">Advanced</span>
						<span id="filter-level-reset" class="filter-level">Reset</span>
					</div>
				</div>
			</div>
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
		<div id="header-image-event">
			<div id="txt-event">
				<h2 id="wdw-event-title"></h2>
	            <span id="wdw-event-catch-phrase"></span>
	            <div id="container-event-header-info">
	            	<div id="wdw-event-time">
	            		<span id="wdw-event-time-start"></span>
	            		<span id="wdw-event-time-end"></span>
	            	</div>
	            	<span id="wdw-event-location"></span>
	            	<span id="wdw-event-category"></span>
	            	<span id="wdw-event-level"></span>
	            </div>
            </div>
		</div>
		<div id="wdw-event-content-container">
			<div id="separator-details" class="separator">Details</div>
			<div id="event-details-container">
				<div id="event-description">
					<div id="event-description-text"></div>
					<button id="btn-reserve-seat" class="button">Reserve</button>
				</div>
				<div id="event-location">
					<div id="map"></div>
					<span id="map-caption"></span>
				</div>
			</div>
			<div id="separator-contributors" class="separator">Contributors</div>

			<div id="event-contributors-container">
			</div>
		</div>
	</div>

	<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->
<!-- ******************************************************************************************************* -->

	<div id="mdl-reservation" class="modal">
		<div class="modal-content">
			<form id="frm-reservation">
				<h2>Reserve a seat</h2>
				<input id="reservation-fullname" type="text" name="fullname"></input>
				<input id="reservation-email" type="text" name="email"></input>
				<button id="btn-cancel-reservation" class="cancel-button" type="button">Cancel</button>
				<button id="btn-confirm-reservation" class="button" type="button">Send</button>
			</form>
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