$(document).ready(function(){

  //
  //  Preloader START
  //

  var loadedCount = 0; //current number of images loaded
  var imagesToLoad = $('.preImg').length; //number of slides with .preImg container
  var loadingProgress = 0; //timeline progress - starts at 0

  $('.preImg').imagesLoaded({
      background: true
  }).progress( function( instance, image ) {
      loadProgress();
  });

  function loadProgress(imgLoad, image){
      //one more image has been loaded
      loadedCount++;
      loadingProgress = (loadedCount/imagesToLoad);

      // GSAP tween of our progress bar timeline
      TweenMax.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});
  }

  var progressTl = new TimelineMax({
      paused: true,
      onUpdate: progressUpdate,
      onComplete: loadComplete
  });

  progressTl
      //tween the progress bar width
      .to($('.progress span'), 1, {width:'100%', ease:Linear.easeNone});

  function progressUpdate(){

      //the percentage loaded based on the tween's progress
      loadingProgress = Math.round(progressTl.progress() * 100);

      //we put the percentage in the screen
      $(".txt-perc").text(loadingProgress + '%');
  }

  function loadComplete() {
    // preloader out
    var preloaderOutTl = new TimelineMax();

    if($(window).innerWidth() >= 1000){
      preloaderOutTl
        .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
        .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
        .set($('body'), {className: '-=is-loading'})
        .staggerFromTo($('.loadPanel'), 0.6, {y:'0%'},{y:'-100%',ease: Power2.easeInOut}, 0.05)
        .set($('#preloader'), {className: '+=is-hidden'})
        //end preloadout

        //start projectCode
        .staggerFromTo($('.brandItem'), 0.8,{y:30, autoAlpha:0},{y:0, autoAlpha:1, ease: Circ.easeOut}, 0.05 )
        .fromTo($('.logo'), 1, {opacity:0, x:-50}, {opacity:1, x:0, delay:0.5}, '-=1.0')
        .fromTo($('.pageNav, .social, .freeWebsiteDesign'), 0.5, {autoAlpha:0, y:-50},{autoAlpha:1, y:0}, '-=0.5')

      return preloaderOutTl;
    } //end greater than or equal to 1000px

    else if( $(window).innerWidth() < 1000){
      preloaderOutTl
        .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
        .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
        .set($('body'), {className: '-=is-loading'})
        .staggerFromTo($('.loadPanel'), 0.6, {y:'0%'},{y:'-100%',ease: Power2.easeInOut}, 0.05)
        .set($('#preloader'), {className: '+=is-hidden'})
        //end preloadout

        //start projectCode
        .staggerFromTo($('.brandItem'), 1.2,{y:30, autoAlpha:0},{y:0, autoAlpha:1, ease: Circ.easeOut}, 0.05 )
        .fromTo($('.logo'), 1, {opacity:0, y:100}, {opacity:1, y:0, delay:0.5}, '-=1.0')
        .fromTo($('.pageNav, .social, .freeWebsiteDesign'), 2, {autoAlpha:0},{autoAlpha:1})

      return preloaderOutTl;
    }//end less than 1000px
  } //end loadComplete



  //
  //  Preloader END
  //


  var siblings = $(this).siblings(),
      brandItem = $(".brandItem"),
      logo = $('.logo'),
      menu = $('.menu'),
      line = $('.line'),
      line1 = $(".line1"),
      line2 = $(".line2"),
      line3 = $(".line3"),
      menuContent = $('.menuContent'),
      social = $('.social'),
      shell = $('#shell'),
      pageNav = $('.pageNav'),
      image = $('.image'),
      freeWebsiteDesign = $('.freeWebsiteDesign');

  TweenMax.set(image, {opacity:0, display:'none'})

  $(".brandItem").mouseenter(function(){
    TweenMax.set([logo, pageNav, social, freeWebsiteDesign], {autoAlpha:0})
    TweenMax.to($(this), 0.2, {css:{backgroundColor: "rgba(0,0,0,1)"}})
    TweenMax.to($(this).children("a"), 0.2, {css:{color: "rgba(255,255,255,1)"}})

    var siblings = $(this).siblings();
    TweenMax.to(siblings, 0.2, {opacity:0})

    //for background image
    var connectImg = $(this).data('number');
    TweenMax.to($('.item' + connectImg  ), 0.1, {opacity:1, display:'block'})
  })

  $(".brandItem").mouseleave(function(){
    TweenMax.set([logo, pageNav, social, freeWebsiteDesign], {autoAlpha:1})
    TweenMax.to($(this), 0.7, {css:{backgroundColor: "rgba(0,0,0,0)"}})
    TweenMax.to($(this).children("a"), 0.2, {css:{color: "rgba(0,0,0,1)"}})

    var siblings = $(this).siblings();
    TweenMax.to(siblings, 0.7, {opacity:1})

    //for background image
    var connectImg = $(this).data('number');
    TweenMax.to($('.item' + connectImg  ), 0.1, {opacity:0, display:'none'})
  })
})//end js
