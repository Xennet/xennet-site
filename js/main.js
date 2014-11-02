var id,
    coverHeight;

    $('document').ready(function() {
        var   duration = 300,
                hover = false;
                                   
        var backgroundColor = '#fffffa',
              headerWidth = '85%',
              isScrolled = false;//$('body').scrollTop() > coverHeight - 50;          

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

            if ( !isScrolled && scrollTop > coverHeight - 20) {
                $('.header .header-link').addClass('header-link-scrolled');
                $('.logo').addClass('header-link-scrolled');
                //$('.header').addClass('background-color');
                $('.header').addClass('header-scrolled');
                $('.menu-label').addClass('header-link-scrolled');
                isScrolled = true;

                $('.header-container').animate({'width': '100%'});
            }
            else if (isScrolled && scrollTop <= coverHeight - 20) {                 
                $('.header .header-link').removeClass('header-link-scrolled');
                $('.logo').removeClass('header-link-scrolled');
                //$('.header').removeClass('background-color')
                $('.header').removeClass('header-scrolled');
                $('.menu-label').removeClass('header-link-scrolled');
                isScrolled = false;

                $('.header-container').animate({'width': headerWidth});
            }
        }

        coverHeight = $('.header-wrap').height();

        $('.header-container').css({'width': headerWidth});

        $('.bullet').click(bulletClick);
        //$('.bullet-content').click(bulletClick);

        $('.bullet-content').animate({'opacity': 1}, duration);
        
        $( window ).scroll(scrolled);
        
        scrolled();

        $('.countdown').final_countdown({});
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
