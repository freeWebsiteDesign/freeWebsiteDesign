$(document).ready(function(){
  $("#shell").css({height:$(window).innerHeight()})
  $(window).resize(function(){
    $("#shell").css({height:$(window).innerHeight()})
  });

   var loading = new TimelineMax();

   var hello = $('.hello'),
       bigLine = $('.bigLine'),
       words = $('.words'),
       bullets = $('.bullets'),
       socialItem = $('.social .li'),
       freeWebsiteDesign = $('.freeWebsiteDesign');

   loading
      .fromTo(hello, 0.8, {opacity:0, y:-100},{opacity:1, y:0},0.8)
      .fromTo(bigLine, 0.8, {width:0}, {width:'100%' },0.8)
      .fromTo(words,0.6, {opacity:0, y:-50},{opacity:1, y:0, delay:0.2}, '-=0.4')
      .fromTo(bullets,0.6, {opacity:0, y:-50},{opacity:1, y:0}, '-=0.4')
      .staggerFromTo(socialItem,2, {opacity:0, y:-50},{opacity:1, y:0,  ease: Elastic.easeOut}, 0.05, '-=0.4')
      .fromTo(freeWebsiteDesign, 0.5, {opacity:0, y:-50}, {opacity:1, y:0}, '-=2')

})//end js
