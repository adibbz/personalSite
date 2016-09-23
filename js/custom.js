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

$('#open-nav').animateCss('fadeIn');
$('.home .content h1').animateCss('fadeIn');
$('.home .content hr').animateCss('fadeIn');
$('.home .content h4').animateCss('fadeIn');
$('.home .content #social-list').animateCss('fadeIn');


// Overlay Nav click
$(document).ready(function(){

	$( "#barba-wrapper" ).on("click", "#open-nav", function() {
	    $("#myNav").css('width', '100%');
	    $(this).addClass('active');
	});

	$( "#barba-wrapper" ).on("click", "#open-nav.active", function() {
	    $("#myNav").css('width', '0%');
	    $(this).removeClass('active');
	});

});

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

