$(document).ready(function(){

var freeTemplateDesign = $('.freeTemplateDesign'),
    item = $('.item'),
    freeLine = $('.freeLine'),
    shell = $('#shell'),
    name = $('.name'),
    aboutContact = $('.aboutContact'),
    linksItem  = $('.linksItem'),
    socialItem = $('.socialItem'),
    rightTarget = $('.rightTarget'),
    row = $('.row');

if( $(window).innerWidth() >= 1000){
  TweenMax.set(item, {autoAlpha:0})

  var startUp = new TimelineMax();
  startUp
    .set($('body'), {className: '+=noPoint'})
    .fromTo(name, 1, {x:'-100%', autoAlpha:1},{x:'0%', ease: Expo.easeOut})
    .staggerFromTo(item, 0.8, {x:-30}, {x:0, autoAlpha:1, ease: Expo.easeOut}, 0.05 )
    .fromTo(rightTarget, 0.6, {x:300, autoAlpha:1}, {x:0, ease: Expo.easeOut}, 1.5)
    .set($('body'), {className: '-=noPoint'})
}//end if greater than equal to 1000

else if($(window).innerWidth() < 1000){
  TweenMax.set(item, {autoAlpha:0, zIndex:200})

  var startUp = new TimelineMax();
  startUp
    .set($('body'), {className: '+=noPoint'})
    .fromTo(name, 0.7, {y:-200, autoAlpha:1},{y:0, ease: Expo.easeOut})
    .fromTo(rightTarget, 0.6, {y:-400, autoAlpha:0}, {autoAlpha:1, y:0, ease: Expo.easeOut})
    .staggerFromTo(item, 0.8, {y:100}, {y:0, autoAlpha:1, ease: Expo.easeOut}, 0.05 )
    .set($('body'), {className: '-=noPoint'})

}//end else if less than 1000

  item.on('mouseenter', function(){

    if( $(window).innerWidth() > 1000 ){
      $(this).addClass('activeItem')
      TweenMax.to(item, 0.1, {opacity:0})
      TweenMax.to($('.item.activeItem'), 0.3, {opacity:1})
      TweenMax.to(shell, 0.3, {backgroundColor:'#312009'})
      TweenMax.to($('.name a'), 0.1, {opacity:0.5, color:'#A88B63'})
      TweenMax.to('.menu, .social, .links, .aboutContact', 0.1, {autoAlpha:0})
      TweenMax.to($(this).find('.itemLink'), 0.3, {opacity:1, pointerEvents:'all'})
      TweenMax.to($(this).find('.itemText'), 0.3, {opacity:1, pointerEvents:'all'})

      $('.activeItem').on('mouseleave', function(){
        TweenMax.to($('.item'), 0.7, { ease: Power4.easeIn,  opacity:1})
        $(this).removeClass('activeItem')
        TweenMax.to($('#shell'), 0.7, {ease: Power4.easeIn, backgroundColor:'#FAD38E'})
        TweenMax.to($('.name a'), 0.7, {ease: Power4.easeIn, color: '#BE6569', opacity:0.7})
        TweenMax.to($(this).find('.itemLink'), 0.3, {opacity:0, pointerEvents:'none'})
        TweenMax.to($(this).find('.itemText'), 0.3, {opacity:0, pointerEvents:'none'})

        TweenMax.to('.menu, .social, .links, .aboutContact', 0.7, { ease: Power4.easeIn,autoAlpha:1})
      })//end mouseleave
    }
  })//end mouseenter
})//end js
