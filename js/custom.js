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
  $('.home-wrapper .content h1').animateCss('fadeIn');
  $('.home-wrapper .content hr').animateCss('fadeIn');
  $('.home-wrapper .content h4').animateCss('fadeIn');
  $('.home-wrapper .content #social-list').animateCss('fadeIn');
  $('.workpage-wrapper #main').animateCss('fadeInUp');
  $('.about-wrapper #main').animateCss('fadeInUp');

  // setTimeout(
  // function() 
  // {
  //   //do something special
  //    $('.show-for-mobile #site-navigation-mobile').css('visibility', 'visible').animateCss('fadeInUp');
  // }, 700);

  //console.log(currentStatus, oldStatus, container);

});

Barba.Dispatcher.on('initStateChange', function(currentStatus, oldStatus, container) {

  $('.show-for-mobile #site-navigation-mobile').css('visibility', 'hidden');

});
 
// Wait till transition is complete to add navigation transtion
Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
  
  $('#site-navigation').css('visibility', 'visible').animateCss('fadeInRight');
  $('.show-for-mobile #site-navigation-mobile').css('visibility', 'visible').animateCss('fadeInUp');

});

// Standard Barba Fade Transition
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

    // Start Page at top before fading in new page
    document.body.scrollTop = 0;
    
    $el.css({
      visibility : 'visible',
      opacity : 0
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
