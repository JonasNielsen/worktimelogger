/*
* Cached variables START
*/
var seconds = 0;
var minutes = 0;
var hours = 0;

var workHour = 0;

// Timers
var secTimer;
/*
* Cached variables END
*/

function secTimerUpdate() {
	seconds++;

	// Increment the workHour when new workday is started
	if(seconds == 1 && workHour == 0) {
		updateWorkHour();
	}

	// Increment minutes if seconds = 60 and run minTimerUpdate
	if(seconds == 60) {
		minutes++;
		minTimerUpdate()
		seconds = 0;
	}

	// Update cookie every 10 seconds
	if((seconds%10) == 0 || seconds == 1) {
		updateTimeCookie();
	}

	$('.seconds').text(seconds);
}

function minTimerUpdate() {
	// increment workhour at every start of a quater of hour
	if((minutes == 1 && hours > 0) || minutes == 15 || minutes == 30 || minutes == 45) {
		updateWorkHour();
	}

	// If 60 minutes is reached, increment hours and reset minutes
	if(minutes == 60) {
		hours++;
		$('.hour').text(hours);
		minutes = 0;
	}

	$('.minutes').text(minutes);
}

function updateWorkHour() {
	workHour = workHour  + 0.25;
	$('.hourDecimal').text(workHour); 
	
	updateDB();
}

function updateDB() {
	date = $('.date').text().trim();

	data = '{\"workday\":{\"worktime\":\"'+workHour+'\",\"description\":\"' + $('#description').val() + '\",\"date\":\"' + date +'\"}}';

	$.ajax({
		url: '/workdays',
		dataType: 'json',
		type: 'POST',
		processData: false,
		contentType: 'application/json',
		data: data
	});
}

// Updates/sets the timeJson cookie
function updateTimeCookie() {
	data = '{\"worktime\":\"'+workHour+'\",\"hours\":\"' + hours + '\",\"minutes\":\"' + minutes +'\",\"description\":\"' + $('#description').val() + '\",\"seconds\":\"' + seconds + '\"}';

	$.cookie('timeJson', data);
}

// Updates text on the page
function updateSecMinHours() {
	$('.seconds').text(seconds);
	$('.minutes').text(minutes);
	$('.hour').text(hours);
}

// Refresh data using the cookie
function siteRefreshed() {
	if($.cookie('timeJson')) {
		var cookieData = $.cookie('timeJson');
		var cookieJson = jQuery.parseJSON(cookieData);

		// Check is timer is running
		if(secTimer) {
			disableStartBtnEnableStopBtn();
			updateSecMinHours();
		} else {
			seconds = cookieJson.seconds;
			minutes = cookieJson.minutes;
			hours = cookieJson.hours;
			workHour = cookieJson.worktime;
			updateSecMinHours();
		}

		// if workHour and worktime in cookie is inconsistent then update the db and workhour text
		if(parseFloat(cookieJson.worktime) != parseFloat($('.hourDecimal').text())) {
			updateDB();
			$('.hourDecimal').text(cookieJson.worktime)
		}
	}
}

function disableStartBtnEnableStopBtn() {
	$('.startBtn').attr('disabled', true);
	$('.startBtn').text('Fortsæt arbejdsdag');
	$('.stopBtn').attr('disabled', false);
}

function disableStopBtnEnableStartBtn() {
	$('.startBtn').attr('disabled', false);
	$('.stopBtn').attr('disabled', true);
}

/*
* Start btn clicked
*/
$(document).on('click', '.startBtn', function() {
	$('.descriptionContainer').slideUp('fast');

	workHour = parseFloat($('.hourDecimal').text());
	secTimer = setInterval(secTimerUpdate, 10);
	disableStartBtnEnableStopBtn();
});

/*
* Stop btn clicked
*/
$(document).on('click', '.stopBtn', function() {
	// Stop the timer
	clearInterval(secTimer);

	// Show description field
	$('.descriptionContainer').slideDown('fast');
	disableStopBtnEnableStartBtn();
});

/*
* Save btn clicked
*/
$(document).on('click', '.saveBtn',function() {
	// Update the Database
	updateDB();
	$('.descriptionContainer').slideUp('fast');
});