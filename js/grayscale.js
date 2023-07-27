(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
var repeater
var letterIndex = [0,0,0,0,0,0,0]
function permute (place)
{
    line = document.getElementById(place).textContent
    for ( i=0 ; i< letterIndex.length;i++)
    {
        line = line.replaceAt(letterIndex[i], String.fromCharCode(Math.floor((Math.random()*25)+97)))
    }
    document.getElementById(place).textContent = line;
}
function unpermute(term,eyedee)
{
    document.getElementById(eyedee).innerHTML = term;
}
function start(place)
{
    line = document.getElementById(place).textContent
    for (i=0;i<letterIndex.length;i++)
    {
        id = Math.floor((Math.random() * line.length) + 1);
        letterIndex[i] = id;
    }
    repeater=setInterval(function(){permute(place)}, 50);
    document.getElementById('Unif').textContent = "With only a few little switches, all the meaning can change.";
    document.getElementById('Unif').style.fontStyle = "italic";


}
function end(place)
{
    clearInterval(repeater)
    document.getElementById(place).textContent = "Computer Sciences and Engineering Student";
    document.getElementById('Unif').textContent = "University of Liege";
    document.getElementById('Unif').style.fontStyle = "normal";

}
String.prototype.replaceAt=function(index, replacement)
{
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
