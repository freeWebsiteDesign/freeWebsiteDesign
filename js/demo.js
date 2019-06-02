$(document).ready(function(){
  
    var desktop = $('.desktop'),
        tablet = $('.tablet'),
        mobile = $('.mobile'),
        container = $('.container')
        active = $('.active'),
        rotateTablet = $('.rotateTablet'),
        rotateMobile = $('.rotateMobile'),
        rotate = $('.rotate');

    TweenMax.set(rotateTablet, {autoAlpha:0})
    TweenMax.set(rotateMobile, {autoAlpha:0})

    var tabletCounter = 1;
    var mobileCounter = 1;

    desktop.on("click", function(){
      TweenMax.to(container, 1, {height:'100%', width: '100%', border:'20px solid #4390AE', borderRadius:'0'})
      TweenMax.to(rotate, 0.5, {autoAlpha:0})
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })

    tablet.on("click", function(){
      TweenMax.to(container, 1, {height:900, width: 700, border: '40px solid #1d4554', borderRadius:'20px'})
      TweenMax.to(rotateTablet, 1, {autoAlpha:1})
      TweenMax.to(rotateMobile, 1, {autoAlpha:0})
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })//end tablet

    rotateTablet.on("click", function(){
      tabletCounter++;
      if(tabletCounter%2=== 0){
        TweenMax.to(container, 1, {height:700, width: 900})
       }else if(tabletCounter%2===1){
        TweenMax.to(container, 1, {height:900, width: 700})
      }
    })//end rotateTablet

    mobile.on("click", function(){
      TweenMax.to(container, 1, {height:650, width: 350, border: '20px solid #1d4554', borderRadius:'20px'})
      TweenMax.to(rotateMobile, 1, {autoAlpha:1})
      TweenMax.to(rotateTablet, 1, {autoAlpha:0})
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
    })//end mobile

    rotateMobile.on("click", function(){
      mobileCounter++;
      if(mobileCounter%2=== 0){
        TweenMax.to(container, 1, {height:350, width: 650})
       }else if(mobileCounter%2===1){
        TweenMax.to(container, 1, {height:650, width: 350})
      }
    })//end rotateMobile
})//end js
