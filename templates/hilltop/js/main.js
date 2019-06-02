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

  //progress timeline
  var progressTl = new TimelineMax({
      paused: true,
      onUpdate: progressUpdate,
      onComplete: loadComplete
  });

  progressTl
    //tween the progress bar width
    .to($('.progress span'), 1, {width:'100%', ease:Linear.easeNone});

  //as the progress bar width updates and grows we put the percentage loaded in the screen
  function progressUpdate(){

    //the percentage loaded based on the tween's progress
    loadingProgress = Math.round(progressTl.progress() * 100);

    //we put the percentage in the screen
    $(".txt-perc").text(loadingProgress + '%');
  }

  function loadComplete() {

    // preloader out
    var preloaderOutTl = new TimelineMax();

    preloaderOutTl
      .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
      .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
      .set($('body'), {className: '-=is-loading'})
      .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
      .set($('#preloader'), {className: '+=is-hidden'})

  var startup = new TimelineMax();

  startup
    .to($('.name'), 1, {delay:0.8, x:0, opacity:1},0)
    .to($('.topLeft'), 0.5, {y:0, opacity:1},1.8)
    .to($('.bottomRight'), 0.5, {y:0, opacity:1},1.8)
    .fromTo($('.about'), 0.5, {x:100, y:-100},{ x:0,y:0,autoAlpha:1},2.1)
    .fromTo($('.follow'), 0.5, {x:-100, y:100},{ x:0,y:0,autoAlpha:1},2.1)

    return preloaderOutTl;
    return startup;

  }//end loadComplete

  //
  //  Preloader END
  //

  var name = $('.name'),
      topLeft = $('.topLeft'),
      bottomRight = $('.bottomRight'),
      contact = $('.contact'),
      followX = $('.followX'),
      follow = $('.follow'),
      leftImg = $('.leftImg'),
      about = $('.about'),
      right = $('.right'),
      rightHolder = $('.rightHolder'),
      aboutX = $('.aboutX'),
      aboutMe = $('.aboutMe'),
      social = $('.social'),
      socialIconHolder = $('.socialIconHolder'),
      socialIcons = $('.socialIcons'),
      rightImg = $('.rightImg'),
      left = $('.left');

      TweenMax.set(name,{ x:-100});
      TweenMax.set(topLeft,{ y:-100});
      TweenMax.set(bottomRight,{ y:100});
      TweenMax.set(followX,{ autoAlpha:0});
      TweenMax.set(aboutX,{ autoAlpha:0});

  $("#shell").css({height:$(window).innerHeight()});

  $(window).resize(function(){
    $("#shell").css({height:$(window).innerHeight()})

      if($(window).innerWidth() <= 975){
        TweenMax.set(social, {width: '100%'})
      } else if($(window).innerWidth() > 975){
        TweenMax.set(social, {width:'50.2%'})
      }
    });//end window resize

    if($(window).innerWidth() <= 975){
      TweenMax.set(social, {width: '100%'})
    } else if($(window).innerWidth() > 975){
      TweenMax.set(social, {width:'50.2%'})
    }


  follow.on("click", function(){
    TweenMax.to(social, 0, {autoAlpha:1})
    TweenMax.staggerFrom(socialIcons, 1, {delay:2,opacity:0, y:50, delay:0.5, ease:Elastic.easeOut}, 0.09)
    TweenMax.to(followX,1,{delay:1.1, autoAlpha:1})

    if($(window).innerWidth() <= 975){
      TweenMax.to(right, 0.7, {x:'100%'})
    } else {
      TweenMax.to(left,0.7,{x:'100%',  ease:Power2.easeOut})
      TweenMax.to(follow,1,{autoAlpha:0})
    }
  })

  followX.on("click", function(){
    TweenMax.to(followX, 0.4,{ autoAlpha:0})

    if($(window).innerWidth() <= 975){
      TweenMax.to(right, 0.7, {x:'0%'})
    } else {
      TweenMax.to(left, 0.7,{x:'0%', ease:Power2.easeOut})
      TweenMax.to(follow, 1,{autoAlpha:1})
    }
  })

  about.on("click", function(){
    TweenMax.to(rightHolder, 0.8, {rotationX:70, y:-30, scale:0.95, boxShadow: "4px 65px 63px -10px outline rgba(0,0,0,0.43)"});
    TweenMax.to(aboutX,0.8,{autoAlpha:1})
    TweenMax.fromTo(aboutMe, 0.8, {y:100 , delay:1},{y:0,autoAlpha:1})
  })

  aboutX.on("click", function(){
      TweenMax.to(rightHolder, 0.8, {rotationX:0, y:0, scale:1, boxShadow: "0"});
      TweenMax.to(aboutX,0.8,{autoAlpha:0})
      TweenMax.to(aboutMe, 0.8, {y:100,autoAlpha:0})
  })




})//end js
