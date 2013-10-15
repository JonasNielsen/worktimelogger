$(function() {
	var seconds = 0;
	var minutes = 0;
	var hours = 0;

	var secTimer;

	$('.startBtn').on('click', function() {
		$('.descriptionContainer').slideUp('fast', function() {
			//alert('All done');
		});

		$('.hourDecimalMinutes').text('.25'); // Start by 15 minutes

		secTimer = setInterval(secTimerUpdate, 1000);

		minTimer = 0;
		hourTimer = 0;
	});

	$('.stopBtn').on('click', function() {
		clearInterval(secTimer);
		$('.descriptionContainer').slideDown('fast', function() {
			//alert('All done');
		});
	});

	function secTimerUpdate() {
		seconds++;
		
		if(seconds == 60) {
			minTimerUpdate()
			seconds = 0;
		}

		$('.seconds').text(seconds);
	}

	function minTimerUpdate() {
		
		console.log("Minutes: " + minutes);
		minutes++;

		if(minutes > 0 && minutes <= 15) {
			$('.hourDecimalMinutes').text('.25'); 
		}
		else if(minutes > 15 && minutes <= 30) {
			$('.hourDecimalMinutes').text('.5'); 
		}
		else if(minutes > 30 && minutes <= 45) {
			$('.hourDecimalMinutes').text('.75'); 
		}
		else if(minutes == 46) {
			$('.hourDecimalMinutes').text('');
			hourTimerUpdate();
 		}

 		if(minutes == 60) {
 			$('.hour').text(hours);
			minutes = 0;
		}

		$('.minutes').text(minutes);
	}

	function hourTimerUpdate() {
		console.log("Hours: " + hours);

		hours++;
		$('.hourDecimalHour').text(hours);
	}


})