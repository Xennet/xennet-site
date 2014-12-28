 $('document').ready(function() {
 	var	timeEnd = new Date('2015-02-31T11:00:00-08:00');

           var  	headerWidth = '85%',
              	isScrolled = false;

           var   	duration = 300,
                	hover = false;
           
           var id;

 	function dispatchTimer() {
 		var timeNow = new Date();

		var settings = {
			end: Math.floor(timeEnd.getTime() / 1000),
			now: Math.floor(timeNow.getTime() / 1000)
		}
         
		timer = {
		    days: Math.floor((settings.end - settings.now ) / 86400),
		    hours:  Math.floor(((settings.end - settings.now) % 86400) / 3600),
		    minutes: Math.floor((((settings.end - settings.now) % 86400) % 3600) / 60),
		    seconds: Math.floor((((settings.end - settings.now) % 86400) % 3600) % 60 )
		}

		$('#clock-days').text(timer.days.pad());
		$('#clock-hours').text(timer.hours.pad());
		$('#clock-minutes').text(timer.minutes.pad());
		$('#clock-seconds').text(timer.seconds.pad());
	}

	var bulletClick = function() {
                	var    	$el = $(this).hasClass('bullet') ? $(this) : $(this).parent(),
                        	clicked = $el.attr('clicked') === 'true' ? true : false;

		if (!clicked) {
		    $el.attr('clicked', true);
		    $el.find('.bullet-icon-container').animate({'top': -50, 'opacity': 0}, duration);
		    $el.find('.bullet-title').animate({'top': -30, 'opacity': 1}, duration);
		    $el.find('.bullet-text').animate({'top': 50, 'opacity': 0}, duration);
		    //$(this).find('.bullet-content').animate({'opacity': 0}, duration);

		    $el.find('.bullet-overlay').delay(duration - 50).animate({'opacity': 1}, duration);
		}

		else {
		    $el.find('.bullet-icon-container').animate({'top': 0, 'opacity': 1}, duration);
		    $el.find('.bullet-title').animate({'top': '0', 'opacity': 1}, duration);
		    $el.find('.bullet-text').animate({'top': '0', 'opacity': 1}, duration);
		    $el.find('.bullet-overlay').animate({'opacity': 0}, duration);

		    $el.attr('clicked', false);
		}
        	};            

	var scrolled = function() {
	          
		var scrollTop = $(document).scrollTop();

		//$('.header-container').css({'width': '100%'});

		if ( !isScrolled && scrollTop > coverHeight - 20) {
			$('.header .header-link').addClass('header-link-scrolled');
			$('.logo').addClass('header-link-scrolled');
			$('.header').addClass('background-color');
			$('.header').addClass('header-scrolled');
			$('.menu-label').addClass('header-link-scrolled');
			isScrolled = true;
		}
		else if (isScrolled && scrollTop <= coverHeight - 20) {                 
			$('.header .header-link').removeClass('header-link-scrolled');
			$('.logo').removeClass('header-link-scrolled');
			$('.header').removeClass('background-color');
			$('.header').removeClass('header-scrolled');
			$('.menu-label').removeClass('header-link-scrolled');
			isScrolled = false;
		}
	}

	coverHeight = $('.header-wrap').height();

	//$('.header-container').css({'width': headerWidth});

	$('.bullet').click(bulletClick);

	$('.bullet-content').animate({'opacity': 1}, duration);        

	$('.email-btn').click(function() {
		var    	name = $(this).attr('name').split('-')[0],
			$input = $('#' + name + '-email-input'),
			email = $input.val(),
		        	isValid = $('#' + name + '-help-block').children().length < 1;

		if (email && isValid) {
		        $.ajax( {
		            url: "https://script.google.com/macros/s/AKfycbwOu2WvSzOcEtkxvBkjL1yb2W__lcRSJHO4nOXXwD27ASBHgus/exec?email=" + email,
		            success: function( data ) {
		        }});

		        $input.val('');

		        $('#email-alert').css({'opacity': 1});
		        
		        setTimeout(function() {
		                $('#email-alert').animate({'opacity': 0});
		        }, 3000);
		}
	})

	$( window ).scroll(scrolled);

	scrolled();

	// start the countdown timer
	dispatchTimer();
	setInterval(dispatchTimer, 1000);
 });

 /////////////////////////////////////////////////////////////
// Global Event Handlers
/////////////////////////////////////////////////////////////
$(window).resize(function() {
	clearTimeout(id);
	id = setTimeout(doneResizing, 500);
    
}); 

/////////////////////////////////////////////////////////////
// Private Methods
/////////////////////////////////////////////////////////////   
function doneResizing(){
	coverHeight = $('.header-wrap').height();             
}

/////////////////////////////////////////////////////////////
// Prototype Methods
/////////////////////////////////////////////////////////////   
Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}