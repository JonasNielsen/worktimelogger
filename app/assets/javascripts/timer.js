var seconds = 0;
var minutes = 0;
var hours = 0;

var workHour;

var secTimer;

function updateSecMinHours() {
	$('.seconds').text(seconds);
	$('.minutes').text(minutes);
	$('.hour').text(hours);
}

function secTimerUpdate() {
	seconds++;
	if(seconds == 60) {
		minutes++;
		minTimerUpdate()
		seconds = 0;
	}

	if((seconds%10) == 0) {
		updateTimeCookie();
	}

	$('.seconds').text(seconds);
}

function minTimerUpdate() {
	updateWorkHour();
	if(minutes == 60) {
			$('.hour').text(hours);
		minutes = 0;
	}

	$('.minutes').text(minutes);
}

function updateWorkHour() {
	if(minutes == 1 || minutes == 16 || minutes == 31 || minutes == 46) {
		workHour = workHour  + 0.25;
		$('.hourDecimal').text(workHour); 
	}
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

function updateTimeCookie() {
	data = '{\"worktime\":\"'+workHour+'\",\"hours\":\"' + hours + '\",\"minutes\":\"' + minutes +'\",\"description\":\"' + $('#description').val() + '\",\"seconds\":\"' + seconds + '\"}';

	$.cookie('timeJson', data);
}

// Load values
function siteRefreshed() {
	if($.cookie('timeJson')) {
		var cookieData = $.cookie('timeJson');
		var cookieJson = jQuery.parseJSON(cookieData);

		seconds = cookieJson.seconds;
		minutes = cookieJson.minutes;
		hours = cookieJson.hours;
		workHour = cookieJson.worktime;
		updateSecMinHours();

		if(parseFloat(cookieJson.worktime) != parseFloat($('.hourDecimal').text())) {
			updateDB();
			$('.hourDecimal').text(cookieJson.worktime)
		}
	}
}


// Start btn
$(document).on('click', '.startBtn', function() {
	$('.descriptionContainer').slideUp('fast', function() {
		// Something here
	});

	workHour = parseFloat($('.hourDecimal').text());

	secTimer = setInterval(secTimerUpdate, 10);

	$('.startBtn').attr('disabled', true);
	$('.startBtn').text('Fortsæt arbejdsdag');
	$('.stopBtn').attr('disabled', false);
});

// Stop btn
$(document).on('click', '.stopBtn', function() {
	// Stop the timer
	clearInterval(secTimer);

	// Sent data
	$('.descriptionContainer').slideDown('fast', function() {
		// Something here
	});

	$('.startBtn').attr('disabled', false);
	$('.stopBtn').attr('disabled', true);
});

// Save btn
$(document).on('click', '.saveBtn',function() {
	updateDB();

	$('.descriptionContainer').slideUp('fast', function() {
		// Something here
	});
});