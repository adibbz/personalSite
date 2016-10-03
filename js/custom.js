$(document).foundation();

// Extend jQuery to add a function for Animate.css
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

// Wait to add untile PJAX/BARBA has finished
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  //$('#open-nav').animateCss('fadeIn');
  $('.home .content h1').animateCss('fadeIn');
  $('.home .content hr').animateCss('fadeIn');
  $('.home .content h4').animateCss('fadeIn');
  $('.home .content #social-list').animateCss('fadeIn');
  $('#site-navigation').animateCss('fadeInRight');

  //console.log(currentStatus, oldStatus, container);
    // trying to add body class once
    var bodyClass = location.pathname.replace(/\.html$/, '') + '-page';
    $('body').addClass(bodyClass).one;

  // Add active class to nav if not home page
  $(function() {
      if(location.pathname != "/" || location.pathname != "/index.html") {
          $('#site-navigation a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
      }
  });
});



var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0,
      animation: 'scaleDown .7s ease-in-out both' 
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};


