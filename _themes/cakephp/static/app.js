if (/cakephp\.org/.test(document.domain)) {
  document.domain = 'cakephp.org';
}

App = {};

App.Bakery = (function() {
  function init() {
    // Tooltips in footer
    $("[data-toggle='tooltip']").tooltip();
  }

  return {
    init : init
  };
})();

// Responsive modal window menus.
App.ResponsiveMenus = (function () {
  function init() {
    debugger;
    $('#modal').on('show.bs.modal', function (event) {
      var modal = $(this);
      var button = $(event.relatedTarget);
      var id = button.attr('id');
      var contents, title;
      if (id == 'btn-nav') {
        title = 'Navigation';
        contents = $('.sidebar').html();
      }
      if (id == 'btn-menu') {
        title = 'Menu';
        contents = $('.navbar-right').html();
      }
      modal.find('.modal-body').html(contents);
      modal.find('.modal-title-cookbook').text(title);

      // Bind click events for sub menus.
      modal.find('li').on('click', function() {
        var el = $(this),
          menu = el.find('.submenu, .megamenu');
        // No menu, bail
        if (menu.length == 0) {
          return;
        }
        menu.toggle();
        return false;
      });
    });
  }
  return {
    init: init
  };
}());


// http://stackoverflow.com/questions/967096/using-jquery-to-test-if-an-input-has-focus
jQuery.extend(jQuery.expr[':'], {
  focus: function(element) {
    return element == document.activeElement;
  }
});


$(document).ready(function(){
  "use strict";
/* ********************* Helper functions ********************* */

  /* Validate function */
  function validate(data, def) {
    return (data !== undefined) ? data : def;
  }

  var $win = $(window),
    $body = $('body'),

    // Window width without scrollbar
    $windowWidth = $win.width(),

    // Media Query fix (outerWidth -- scrollbar)
    // Media queries width include the scrollbar
    mqWidth = $win.outerWidth(true, true),

    // Detect Mobile Devices 
    isMobileDevice = (( navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini|Mobi/i) || (mqWidth < 767) ) ? true : false );

    // detect IE browsers
    var ie = (function(){
      var rv = 0,
        ua = window.navigator.userAgent,
        msie = ua.indexOf('MSIE '),
        trident = ua.indexOf('Trident/');

      if (msie > 0) {
          // IE 10 or older => return version number
          rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      } else if (trident > 0) {
          // IE 11 (or newer) => return version number
          var rvNum = ua.indexOf('rv:');
          rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
      }

      return ((rv > 0) ? rv : 0);
    }());

/* ********************* Megamenu ********************* */
  var menu = $(".menu"),
    Megamenu = {
      desktopMenu: function() {

        menu.children("li").show(0);

        // Mobile touch for tablets > 768px
        if (isMobileDevice) {
          menu.on("click touchstart","a", function(e){
            if ($(this).attr('href') === '#') {
              e.preventDefault();
              e.stopPropagation();
            }

            var $this = $(this),
              $sub = $this.siblings(".submenu, .megamenu");

            $this.parent("li").siblings("li").find(".submenu, .megamenu").stop(true, true).fadeOut(300);

            if ($sub.css("display") === "none") {
              $sub.stop(true, true).fadeIn(300);
            } else {
              $sub.stop(true, true).fadeOut(300);
              $this.siblings(".submenu").find(".submenu").stop(true, true).fadeOut(300);
            }
          });

          $(document).on("click.menu touchstart.menu", function(e){
            if ($(e.target).closest(menu).length === 0) {
              menu.find(".submenu, .megamenu").fadeOut(300);
            }
          });

        // Desktop hover effect
        } else {
          menu.find('li').on({
            "mouseenter": function() {
              $(this).children(".submenu, .megamenu").stop(true, true).fadeIn(300);
            },
            "mouseleave": function() {
              $(this).children(".submenu, .megamenu").stop(true, true).fadeOut(300);
            }
          });
        }
      },

      mobileMenu: function() {
        var children = menu.children("li"),
          toggle = menu.children("li.toggle-menu");

        toggle.show(0).on("click", function(){

          if ($children.is(":hidden")){
            children.slideDown(300);
          } else {
            toggle.show(0);
          }
        });

        // Click (touch) effect
        menu.find("li").not(".toggle-menu").each(function(){
          var el = $(this);
          if (el.children(".submenu, .megamenu").length) {
            el.children("a").on("click", function(e){
              if ($(this).attr('href') === '#') {
                e.preventDefault();
                e.stopPropagation();
              }

              var $sub = $(this).siblings(".submenu, .megamenu");

              if ($sub.hasClass("open")) {
                $sub.slideUp(300).removeClass("open");
              } else {
                $sub.slideDown(300).addClass("open");
              }
            });
          }
        });
      },
      unbindEvents: function() {
        menu.find("li, a").off();
        $(document).off("click.menu touchstart.menu");
        menu.find(".submenu, .megamenu").hide(0);
      }
    }; // END Megamenu object

  if ($windowWidth < 768) {
    Megamenu.mobileMenu();
  } else {
    Megamenu.desktopMenu();
  }

/* **************** Hide header on scroll down *************** */
(function() {
  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  // Debounce the header toggling to ever 250ms
  var toggleHeader = function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
      setTimeout(toggleHeader, 250);
  };
  setTimeout(toggleHeader, 250);

  function hasScrolled() {
      var st = $(window).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) {
          return;
      }

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('header').removeClass('nav-down').addClass('nav-up');
        // Scroll Up
      } else if (st + $(window).height() < $(document).height()) {
          $('header').removeClass('nav-up').addClass('nav-down');
      }
      lastScrollTop = st;
  }

  // If we're directly linking to a section, hide the nav.
  if (window.location.hash.length) {
      $('header').addClass('nav-up');
  }
}());

});

$(document).ready(App.Bakery.init);
$(document).ready(App.ResponsiveMenus.init);
