/*-----------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* FitText Settings
    ------------------------------------------------------ */

    setTimeout(function() {
        $('h1.responsive-headline').fitText(1, {
            minFontSize: '40px',
            maxFontSize: '90px'
        });
    }, 100);


    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------ */

    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 48 // height of menu
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });


    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({

        handler: function(direction) {

            var active_section;

            active_section = $(this.element);
            if (direction === "up") active_section =
                active_section.prev();

            var active_link = $('#nav-wrap a[href="#' +
                active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

    });


    /*----------------------------------------------------*/
    /* Make sure that #header-background-image height is
    /* equal to the browser height.
    ------------------------------------------------------ */

    $('header').css({
        'height': $(window).height()
    });
    $(window).on('resize', function() {

        $('header').css({
            'height': $(window).height()
        });
        $('body').css({
            'width': $(window).width()
        });
    });


    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
    ------------------------------------------------------*/

    $(window).on('scroll', function() {

        var h = $('header').height();
        var y = $(window).scrollTop(); //number of hidden pixels above
        var nav = $('#nav-wrap');

        // if ((y > h * 0.20) && (y < h) && ($(window).outerWidth() > 768)) {
        // if ((y > h * 0.20) && (y < h * 0.94) && ($(window).outerWidth() > 768)) {
        if ((y > h * 0.10) && (y < h * 0.8) && ($(window).outerWidth() >
                768)) {
            nav.fadeOut('fast');
        } else {
            // if (y < h * 0.20) {
            if (y < h * 0.8) { //show nav at top of about
                nav.removeClass('opaque').fadeIn('fast');
            } else {
                nav.addClass('opaque').fadeIn('fast');
            }
        }

    });


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*----------------------------------------------------*/
    /*	Flexslider
    /*----------------------------------------------------*/
    $('.flexslider').flexslider({
        namespace: "flex-",
        controlsContainer: ".flex-container",
        animation: 'slide',
        controlNav: true,
        directionNav: false,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        randomize: false,
        // smoothHeight: true,
        smoothHeight: false
    });

    /*----------------------------------------------------*/
    /*	contact form
    ------------------------------------------------------*/

    $('form#contactForm button.submit').click(function() {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactSubject = $('#contactForm #contactSubject').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName +
            '&contactEmail=' + contactEmail +
            '&contactSubject=' + contactSubject +
            '&contactMessage=' + contactMessage;

        $.ajax({
            type: "POST",
            url: "inc/sendEmail.php",
            data: data,
            success: function(msg) {
                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }
            },
            error: function(jqXHR, textStatus,
                errorThrown) {
                $('#image-loader').fadeOut();
                $('#message-warning').html(
                    errorThrown);
                $('#message-warning').fadeIn();
            }
        });
        return false;
    });

    /*----------------------------------------------------*/
    /*	Charts
    ------------------------------------------------------*/

    var charts = document.querySelectorAll(".chart");

    for (var i = 0; i < charts.length; i++) {
        createInview(charts[i]);
    }

    function createInview(element) {
        new Waypoint.Inview({
            element: element,
            entered: function(direction) {
                onWayPointEntered(direction, this.element);
            }
        });
    }

    function onWayPointEntered(direction, element) {
        if (direction === 'down') {
            $(element).easyPieChart({
                barColor: '#11ABB0',
                scaleColor: false,
                size: '150',
                easing: 'easeOutBounce',
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(
                        percent));
                }
            });
        }
    }

    /*----------------------------------------------------*/
    /*	map
    ------------------------------------------------------*/

    initializeMap();

    function initializeMap() {
        var lat = "35.9602537",
            lng = "-83.921051";
        var latLng = new google.maps.LatLng(lat, lng);

        var myOptions = {
            zoom: 12,
            center: latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            mapTypeControl: false,
            scaleControl: false,
            styles: // Styling google maps
                [{
                        "featureType": "water",
                        "stylers": [{
                            "color": "#cccccc"
                        }]
                    }, {
                        "featureType": "transit",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#d5d5d5"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill"
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "hue": "#ffffff"
                        }, {
                            "saturation": -100
                        }, {
                            "lightness": 1
                        }]
                    }, {
                        "featureType": "road.highway.controlled_access",
                        "elementType": "labels.text",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "hue": "#ffffff"
                        }, {
                            "lightness": -1
                        }, {
                            "gamma": 1.02
                        }, {
                            "weight": 0.1
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "color": "#eeeeee"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.text",
                        "stylers": [{
                            "weight": 0.1
                        }, {
                            "visibility": "on"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "labels.text",
                        "stylers": [{
                            "weight": 0.1
                        }, {
                            "visibility": "on"
                        }, {
                            "color": "#333333"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "visibility": "off"
                        }, {
                            "weight": 0.1
                        }]
                    },

                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#dbdadb"
                        }, {
                            "visibility": "on"
                        }]
                    }, {}
                ]
        };

        var map = new google.maps.Map(document.getElementById(
            "map_canvas"), myOptions);

        new google.maps.Marker({
            position: latLng,
            map: map,
            icon: "assets/images/Google-Map-marker-revised-bubble-small.png",
        });
    }

    collapseProjects();

    // hidden projects
    function collapseProjects() {
        var headers = $('.hidden-project-header');

        headers.each(function() {
            var target = $(this).siblings('.hidden-project');
            var header = $(this);
            $(this).click(function() {
                target.slideToggle('slow', 'swing',
                    function() {
                        header.children('i').toggleClass(
                            "fa-angle-down fa-angle-up"
                        );
                    });
            });
        });
    }

    expandSkillsHelp();

    function expandSkillsHelp() {
        var btn = $("#skills-help-button i");
        var aboutSkills = $("#about-skills");

        btn.click(function() {
            aboutSkills.slideToggle("slow", 'swing', function() {
                btn.toggleClass(
                    "fa-question-circle fa-times-circle"
                );
            });
        });
    }

});
