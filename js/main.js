
    function makeid(id_length)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < id_length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    var   userId = makeid(5),
            ircHtml = '<iframe src="https://kiwiirc.com/client/irc.kiwiirc.com/?nick=user' + userId + '|?#zennet" style="border:0; width:100%; height:450px;"></iframe>';

    var id,
         coverHeight;




    $('document').ready(function() {
        var   duration = 300,
                hover = false;
                                   
        var backgroundColor = '#fffffa',
              headerWidth = '85%',
              isScrolled = false;//$('body').scrollTop() > coverHeight - 50;          

        // do this BEFORE the pages load
        $('#col-irc').append(ircHtml);

        var bulletClick = function() {
                //var $el = $(this).parent().parent();
                var    $el = $(this).hasClass('bullet') ? $(this) : $(this).parent(),
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
                    //setTimeout(function() {$el.attr('hover', false);}, 500);
                }
        };            

        var scrolled = function() {
                    
            var scrollTop = $(document).scrollTop();

            

            $('.header-container').css({'width': '100%'});

            if ( !isScrolled && scrollTop > coverHeight - 20) {
                $('.header .header-link').addClass('header-link-scrolled');
                $('.logo').addClass('header-link-scrolled');
                $('.header').addClass('background-color');
                $('.header').addClass('header-scrolled');
                $('.menu-label').addClass('header-link-scrolled');
                isScrolled = true;

                //$('.header-container').animate({'width': '100%'});
            }
            else if (isScrolled && scrollTop <= coverHeight - 20) {                 
                $('.header .header-link').removeClass('header-link-scrolled');
                $('.logo').removeClass('header-link-scrolled');
                $('.header').removeClass('background-color');
                $('.header').removeClass('header-scrolled');
                $('.menu-label').removeClass('header-link-scrolled');
                isScrolled = false;

                //$('.header-container').animate({'width': headerWidth});
            }
        }

        coverHeight = $('.header-wrap').height();

        $('.header-container').css({'width': headerWidth});

        $('.bullet').click(bulletClick);
        //$('.bullet-content').click(bulletClick);

        $('.bullet-content').animate({'opacity': 1}, duration);        

        $('.email-btn').click(function() {
                var    email = $('.email-input').val(),
                        isValid = $('#email-help-block').children().length < 1;

                if (email && isValid) {
                        $.ajax( {
                            url: "https://script.google.com/macros/s/AKfycbwOu2WvSzOcEtkxvBkjL1yb2W__lcRSJHO4nOXXwD27ASBHgus/exec?email=" + email,
                            success: function( data ) {
                        }});

                        $('.email-input').val('');

                        $('#email-alert').css({'opacity': 1});
                        
                        setTimeout(function() {
                                $('#email-alert').animate({'opacity': 0});
                        }, 3000);
                }
        })

        $('#email-alert').css({'opacity': 0});


        // $('.countdown').final_countdown({});

        $( window ).scroll(scrolled);
        
        scrolled();
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
