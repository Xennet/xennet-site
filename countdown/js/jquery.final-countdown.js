/*!
 * jQuery Final Countdown
 *
 * @author Pragmatic Mates, http://pragmaticmates.com
 * @license GPL 2
 * @link https://github.com/PragmaticMates/jquery-final-countdown
 */

(function ($) {
    var settings;
    var timer;

    var circleSeconds;
    var circleMinutes;
    var circleHours;
    var circleDays;

    var layerSeconds;
    var layerMinutes;
    var layerHours;
    var layerDays;

    var element;
    var callbackFunction;

    $.fn.final_countdown = function(options, callback) {
        element = $(this);

        var  timeStart = new Date('2014-11-01T11:00:00-08:00'),
              timeNow = new Date(),
              timeEnd = new Date('2014-11-11T11:00:00-08:00');

        //console.log('start', timeStart.getTime(), timeStart, 'end', timeEnd.getTime(), timeEnd);

        var defaults = $.extend({
            start: Math.floor(timeStart.getTime() / 1000),
            end: Math.floor(timeEnd.getTime() / 1000),
            now: Math.floor(timeNow.getTime() / 1000),

            selectors: {
                value_seconds: '.clock-seconds .val',
                canvas_seconds: 'canvas_seconds',
                value_minutes: '.clock-minutes .val',
                canvas_minutes: 'canvas_minutes',
                value_hours: '.clock-hours .val',
                canvas_hours: 'canvas_hours',
                value_days: '.clock-days .val',
                canvas_days: 'canvas_days'
            },
            seconds: {
                borderColor: '#7995D5',
                borderWidth: '6'
            },
            minutes: {
                borderColor: '#ACC742',
                borderWidth: '6'
            },
            hours: {
                borderColor: '#ECEFCB',
                borderWidth: '6'
            },
            days: {
                borderColor: '#FF9900',
                borderWidth: '6'
            }
        }, options);

        settings = $.extend({}, defaults, options);

        if (typeof callback == 'function') { // make sure the callback is a function
            callbackFunction = callback;        
        }

        responsive();
        dispatchTimer();
        prepareCounters();
        startCounters();                        
    };

    function responsive() {
        $(window).load(updateCircles);
        $(window).on('redraw', function() { 
            switched = false; 
            updateCircles(); 
        }); 
        $(window).on('resize', updateCircles);
    }

    function updateCircles() {     
        layerSeconds.draw();
        layerMinutes.draw();
        layerHours.draw();
        layerDays.draw();
    }

    function convertToDeg(degree) {
        return (Math.PI/180) * (degree - 90);
    }

    function dispatchTimer() {
        timer = {
            total: Math.floor((settings.end - settings.start) / 86400),
            days: Math.floor((settings.end - settings.now ) / 86400),
            hours: 24 - Math.floor(((settings.end - settings.now) % 86400) / 3600),
            minutes: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) / 60),
            seconds: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) % 60 )
        }
    }

    function prepareCounters() {
        // Seconds
        var seconds_width = $('#' + settings.selectors.canvas_seconds).width()
        var secondsStage = new Kinetic.Stage({
            container: settings.selectors.canvas_seconds,
            width: seconds_width,
            height: seconds_width
        });        

        circleSeconds = new Kinetic.Shape({
            drawFunc: function(context) {     
                var seconds_width = $('#' + settings.selectors.canvas_seconds).width()                
                var radius = seconds_width / 2 - settings.seconds.borderWidth / 2;
                var x = seconds_width / 2;
                var y = seconds_width / 2;  
                var seconds =  (timer.seconds < 60) ? timer.seconds : 0;  

                context.beginPath();                
                context.arc(x, y, radius, convertToDeg(seconds * 6), convertToDeg(0));         
                context.fillStrokeShape(this);                

                // set label
                $(settings.selectors.value_seconds).html(60 - timer.seconds);
            },
            stroke: settings.seconds.borderColor,
            strokeWidth: settings.seconds.borderWidth            
        });

        layerSeconds = new Kinetic.Layer();
        layerSeconds.add(circleSeconds);
        secondsStage.add(layerSeconds);

        // Minutes
        var minutes_width = $('#' + settings.selectors.canvas_minutes).width();        
        var minutesStage = new Kinetic.Stage({
            container: settings.selectors.canvas_minutes,
            width: minutes_width,
            height: minutes_width
        });

        circleMinutes = new Kinetic.Shape({
            drawFunc: function(context) {     
              var minutes_width = $('#' + settings.selectors.canvas_minutes).width();        
                var radius = minutes_width / 2 - settings.minutes.borderWidth / 2;
                var x = minutes_width / 2;
                var y = minutes_width / 2;
                var minutes = (timer.minutes < 60) ? timer.minutes : 0;

                context.beginPath();
                context.arc(x, y, radius, convertToDeg(minutes * 6), convertToDeg(0));
                context.fillStrokeShape(this);

                $(settings.selectors.value_minutes).html(60 - timer.minutes);

            },
            stroke: settings.minutes.borderColor,
            strokeWidth: settings.minutes.borderWidth
        });

        layerMinutes = new Kinetic.Layer();
        layerMinutes.add(circleMinutes);
        minutesStage.add(layerMinutes);

        // Hours
        var hours_width = $('#' + settings.selectors.canvas_hours).width();
        var hoursStage = new Kinetic.Stage({
            container: settings.selectors.canvas_hours,
            width: hours_width,
            height: hours_width
        });

        circleHours = new Kinetic.Shape({
            drawFunc: function(context) {
              var hours_width = $('#' + settings.selectors.canvas_hours).width();
                var radius = hours_width / 2 - settings.hours.borderWidth/2;
                var x = hours_width / 2;
                var y = hours_width / 2;
                var hours = (timer.hours < 24) ? timer.hours : 0;

                context.beginPath();                
                context.arc(x, y, radius, convertToDeg(hours * 360 / 24), convertToDeg(0));

                context.fillStrokeShape(this);

                $(settings.selectors.value_hours).html(24 - timer.hours);

                

            },
            stroke: settings.hours.borderColor,
            strokeWidth: settings.hours.borderWidth
        });

        layerHours = new Kinetic.Layer();
        layerHours.add(circleHours);
        hoursStage.add(layerHours);

    // Days
    var days_width = $('#' + settings.selectors.canvas_days).width();
        var daysStage = new Kinetic.Stage({
            container: settings.selectors.canvas_days,
            width: hours_width,
            height: hours_width
        });

        circleDays = new Kinetic.Shape({
            drawFunc: function(context) {
              var days_width = $('#' + settings.selectors.canvas_days).width();
                var radius = days_width / 2 - settings.days.borderWidth/2;
                var x = days_width / 2;
                var y = days_width / 2;
                var days = timer.days;
                var total = timer.total > 0 ? timer.total : timer.days;
                var degree = (days > 0) ?  360 * (1 - days / total) : 0;


                context.beginPath();                
                context.arc(x, y, radius, convertToDeg(degree), convertToDeg(0));
                context.fillStrokeShape(this);

                $(settings.selectors.value_days).html(timer.days);                

            },
            stroke: settings.days.borderColor,
            strokeWidth: settings.days.borderWidth
        });

        layerDays = new Kinetic.Layer();
        layerDays.add(circleDays);
        daysStage.add(layerDays);        
    }

    function startCounters() {        
        var interval = setInterval( function() {                        
            if (timer.seconds > 59 ) {
                if (60 - timer.minutes == 0 && 24 - timer.hours == 0 && timer.days == 0) {
                    clearInterval(interval);
                    callbackFunction.call(this); // brings the scope to the callback
                    return;
                }

                timer.seconds = 1;

                if (timer.minutes > 59) {
                    timer.minutes = 1;
                    layerMinutes.draw();
                    if (timer.hours > 23) {
                        timer.hours = 1;
                        if (timer.days > 0) {
                            timer.days--;
                            layerDays.draw();
                        }
                    } else {                        
                        timer.hours++;
                    }                    
                    layerHours.draw()
                } else {
                    timer.minutes++;
                }

                layerMinutes.draw();
            } else {            
                timer.seconds++;
            }

            layerSeconds.draw();
        }, 1000);
    }
})(jQuery);