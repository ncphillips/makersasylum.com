/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        WebFontConfig = {
          google: { families: [ 'Poppins:200,300,600,700:latin', 'Raleway:400,400italic,700:latin' ] }
        };
        (function() {
          var wf = document.createElement('script');
          wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
          wf.type = 'text/javascript';
          wf.async = 'true';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(wf, s);
        })();

        $("#fluid-width-video-wrapper").fitVids();

        $(".rvs-container").rvslider();
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        $('ul.nav li.dropdown').hover(function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
        }, function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
        });
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'events': {
      init: function() {
        // JavaScript to be fired on the events page
        jQuery(document).ready(function($) {
          $('select').change(function() {
            var eventType = $('#event-type option:selected').text();
            var city = $('#city-select option:selected').text();
            if (eventType === "All") {
              $('.col-sm-4').show();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            } else if (eventType === "Courses") {
              $('.panel-title:contains("Course")').parent().parent().parent().show();
              $('.panel-title:not(:contains("Course"))').parent().parent().parent().hide();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            } else if (eventType === "Workshops") {
              $('.panel-title:contains("Workshop")').parent().parent().parent().show();
              $('.panel-title:not(:contains("Workshop"))').parent().parent().parent().hide();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            } else if (eventType === "Tool Trainings") {
              $('.panel-title:contains("Tool Training")').parent().parent().parent().show();
              $('.panel-title:not(:contains("Tool Training"))').parent().parent().parent().hide();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            } else if (eventType === "Talks") {
              $('.panel-title:contains("Talk")').parent().parent().parent().show();
              $('.panel-title:not(:contains("Talk"))').parent().parent().parent().hide();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            } else if (eventType === "Events") {
              $('.panel-title:contains("Event")').parent().parent().parent().show();
              $('.panel-title:not(:contains("Event"))').parent().parent().parent().hide();
              if (city === "Mumbai") {
                $('p.city:not(:contains("Mumbai"))').parent().parent().parent().parent().hide();
              } else if (city === "Delhi") {
                $('p.city:not(:contains("Delhi"))').parent().parent().parent().parent().hide();
              }
            }
          });
        });
      }
    },
    'projects': {
      init: function() {
    	}
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
