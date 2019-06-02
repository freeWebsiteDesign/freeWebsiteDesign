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
    TweenMax.set($('.centerContent'), {y:1000})
    TweenMax.set($('.socialIcons'), {autoAlpha:0, y:50})
    TweenMax.set($("#birdHolder"), {zIndex:300})
    TweenMax.set($('.name'), {y:-100})
    TweenMax.set($('.pageLink'), {x:-100})

    // preloader out
    var preloaderOutTl = new TimelineMax();
    var startUp = new TimelineMax();



    preloaderOutTl
        .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
        .to($('.txt-perc'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
        .set($('body'), {className: '-=is-loading'})
        .to($('.preLeft'), 0.7, {rotationY:135,transformOrigin:"left center"}, 1)
        .to($('.preRight'), 0.7, {rotationY:-135,transformOrigin:"right center"}, 1)
        .set($('#preloader'), {className: '+=is-hidden'})
        .to($('.centerContent'),1.2, {y:0})
        .to($('.centerShell'), 1.2, {rotationX:0}, 2)
        .to($('.name'), 0.4, {y:0, opacity:1, ease: Circ.easeOut}, 3.1)
        .to($('.pageLink'), 0.4,{x:0, opacity:1, ease: Circ.easeOut}, 3.1)
        .to($('.square'), 0.2, { css:{boxShadow: "0px 5px 45px -12px #000"}})
        .to($('.centerBackground'), 0.2, { opacity:1})

    return preloaderOutTl;

  }//end loadComplete

  //
  //  Preloader END
  //

  $(".fullSize").css({height:$(window).innerHeight()})
  $(window).resize(function(){
    $(".fullSize").css({height:$(window).innerHeight()})
  });

  //for threejs birds


  var Bird = function () {

	var scope = this;

	THREE.Geometry.call( this );

	v(   5,   0,   0 );
	v( - 5, - 2,   1 );
	v( - 5,   0,   0 );
	v( - 5, - 2, - 1 );

	v(   0,   2, - 6 );
	v(   0,   2,   6 );
	v(   2,   0,   0 );
	v( - 3,   0,   0 );

	f3( 0, 2, 1 );
	f3( 4, 7, 6 );
	f3( 5, 6, 7 );

	this.computeFaceNormals();

	function v( x, y, z ) {
		scope.vertices.push( new THREE.Vector3( x, y, z ) );
	}

	function f3( a, b, c ) {
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}
}

Bird.prototype = Object.create( THREE.Geometry.prototype );
Bird.prototype.constructor = Bird;

  var Boid = function() {
				var vector = new THREE.Vector3(),
				_acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 100,
				_maxSpeed = 4, _maxSteerForce = 0.1, _avoidWalls = false;

				this.position = new THREE.Vector3();
				this.velocity = new THREE.Vector3();
				_acceleration = new THREE.Vector3();

				this.setGoal = function ( target ) {
					_goal = target;
				}

				this.setAvoidWalls = function ( value ) {
					_avoidWalls = value;
				}

				this.setWorldSize = function ( width, height, depth ) {
					_width = width;
					_height = height;
					_depth = depth;
				}

				this.run = function ( boids ) {
					if ( _avoidWalls ) {

						vector.set( - _width, this.position.y, this.position.z );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

						vector.set( _width, this.position.y, this.position.z );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

						vector.set( this.position.x, - _height, this.position.z );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

						vector.set( this.position.x, _height, this.position.z );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

						vector.set( this.position.x, this.position.y, - _depth );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

						vector.set( this.position.x, this.position.y, _depth );
						vector = this.avoid( vector );
						vector.multiplyScalar( 5 );
						_acceleration.add( vector );

					}

					if ( Math.random() > 0.5 ) {
						this.flock( boids );
					}

					this.move();
				}

				this.flock = function ( boids ) {

					if ( _goal ) {
						_acceleration.add( this.reach( _goal, 0.005 ) );
					}

					_acceleration.add( this.alignment( boids ) );
					_acceleration.add( this.cohesion( boids ) );
					_acceleration.add( this.separation( boids ) );
				}

				this.move = function () {

					this.velocity.add( _acceleration );
					var l = this.velocity.length();

					if ( l > _maxSpeed ) {
						this.velocity.divideScalar( l / _maxSpeed );
					}

					this.position.add( this.velocity );
					_acceleration.set( 0, 0, 0 );
				}

				this.checkBounds = function () {
					if ( this.position.x >   _width ) this.position.x = - _width;
					if ( this.position.x < - _width ) this.position.x =   _width;
					if ( this.position.y >   _height ) this.position.y = - _height;
					if ( this.position.y < - _height ) this.position.y =  _height;
					if ( this.position.z >  _depth ) this.position.z = - _depth;
					if ( this.position.z < - _depth ) this.position.z =  _depth;
				}

				this.avoid = function ( target ) {

					var steer = new THREE.Vector3();

					steer.copy( this.position );
					steer.sub( target );
					steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

					return steer;
				}

				this.repulse = function ( target ) {

					var distance = this.position.distanceTo( target );
					if ( distance < 150 ) {

						var steer = new THREE.Vector3();

						steer.subVectors( this.position, target );
						steer.multiplyScalar( 0.5 / distance );

						_acceleration.add( steer );
					}
				}

				this.reach = function ( target, amount ) {

					var steer = new THREE.Vector3();

					steer.subVectors( target, this.position );
					steer.multiplyScalar( amount );

					return steer;
				}

				this.alignment = function ( boids ) {
					var boid, velSum = new THREE.Vector3(),
					count = 0;

					for ( var i = 0, il = boids.length; i < il; i++ ) {
						if ( Math.random() > 0.6 ) continue;
						boid = boids[ i ];
						distance = boid.position.distanceTo( this.position );

						if ( distance > 0 && distance <= _neighborhoodRadius ) {

							velSum.add( boid.velocity );
							count++;
						}
					}

					if ( count > 0 ) {

						velSum.divideScalar( count );
						var l = velSum.length();

						if ( l > _maxSteerForce ) {
							velSum.divideScalar( l / _maxSteerForce );
						}
					}
					return velSum;
				}

				this.cohesion = function ( boids ) {

					var boid, distance,
					posSum = new THREE.Vector3(),
					steer = new THREE.Vector3(),
					count = 0;

					for ( var i = 0, il = boids.length; i < il; i ++ ) {

						if ( Math.random() > 0.6 ) continue;

						boid = boids[ i ];
						distance = boid.position.distanceTo( this.position );

						if ( distance > 0 && distance <= _neighborhoodRadius ) {

							posSum.add( boid.position );
							count++;
						}
					}

					if ( count > 0 ) {

						posSum.divideScalar( count );
					}

					steer.subVectors( posSum, this.position );
					var l = steer.length();

					if ( l > _maxSteerForce ) {
						steer.divideScalar( l / _maxSteerForce );
					}

					return steer;
				}

				this.separation = function ( boids ) {

					var boid, distance,
					posSum = new THREE.Vector3(),
					repulse = new THREE.Vector3();

					for ( var i = 0, il = boids.length; i < il; i ++ ) {

						if ( Math.random() > 0.6 ) continue;

						boid = boids[ i ];
						distance = boid.position.distanceTo( this.position );

						if ( distance > 0 && distance <= _neighborhoodRadius ) {

							repulse.subVectors( this.position, boid.position );
							repulse.normalize();
							repulse.divideScalar( distance );
							posSum.add( repulse );
						}
					}

					return posSum;
				}
			}

			var SCREEN_WIDTH = window.innerWidth,
			SCREEN_HEIGHT = window.innerHeight,
			SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
			SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

			var camera, scene, renderer, birds, bird, boid, boids;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 450;

				scene = new THREE.Scene();

				birds = [];
				boids = [];

				for ( var i = 0; i < 45; i ++ ) {

					boid = boids[ i ] = new Boid();
					boid.position.x = Math.random() * 400 - 200;
					boid.position.y = Math.random() * 400 - 200;
					boid.position.z = Math.random() * 400 - 200;
					boid.velocity.x = Math.random() * 2 - 1;
					boid.velocity.y = Math.random() * 2 - 1;
					boid.velocity.z = Math.random() * 2 - 1;
					boid.setAvoidWalls( true );
					boid.setWorldSize( 500, 500, 400 );
          bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } ) );
					bird.phase = Math.floor( Math.random() * 62.83 );
					scene.add( bird );
				}

				renderer = new THREE.CanvasRenderer({alpha:true});
        //below is original code
				//renderer.setClearColor( 0x5D7CBA);
        //renderer.setClearColor(0x000000,0);
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.domElement.id = 'birdHolder'

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.getElementById('shell').appendChild(renderer.domElement);

				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				var vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );

				for ( var i = 0, il = boids.length; i < il; i++ ) {

					boid = boids[ i ];
					vector.z = boid.position.z;
					boid.repulse( vector );
				}
			}

			function animate() {

				requestAnimationFrame( animate );
				render();
			}

			function render() {

				for ( var i = 0, il = birds.length; i < il; i++ ) {

					boid = boids[ i ];
					boid.run( boids );

					bird = birds[ i ];
					bird.position.copy( boids[ i ].position );

					//color = bird.material.color;
          color = 0xAB4E68;

          //Change numbers here for changing color, original commented out below
					//color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;
          color.r = color.g = color.b = ( 200 - bird.position.z ) / 1000;

					bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
					bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

					bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
					bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;
				}

				renderer.render( scene, camera );
			}


  var centerContent = $('.centerContent'),
      centerShell = $('.centerShell'),
      backgroundSquare = $('.backgroundSquare'),
      name = $('.name'),
      socialIcons = $('.socialIcons'),
      birdHolder = $("#birdHolder"),
      container = $('#container'),
      hugeSocial = $('.hugeSocial'),
      testItem = $('.testItem'),
      about = $('.about'),
      contact = $('.contact'),
      follow = $('.follow'),
      centerImg = $('.centerImg'),
      centerBackground = $('.centerBackground'),
      aboutContent = $('.aboutContent'),
      followContent = $('.followContent'),
      contactContent = $('.contactContent'),
      socialIcons = $('.socialIcons'),
      square = $('.square'),
      pageLink = $('.pageLink');

      var aboutCounter = 1,
          followCounter = 1,
          contactCounter = 1;

          about.on("click", function(){
            aboutCounter++;

              if(aboutCounter%2=== 0){
                rotateStart()
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:0})
                aboutStart();

               }else if(aboutCounter%2===1){
                rotateEnd()
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:1})
                aboutEnd();
              }
          })

          follow.on("click", function(){
            followCounter++;

              if(followCounter%2=== 0){
                rotateStart()
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:0})
                followStart();
               }else if(followCounter%2===1){
                rotateEnd()
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:1})
                followEnd();
              }
          })

          contact.on("click", function(){
            contactCounter++;

              if(contactCounter%2=== 0){
                rotateStart();
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:0})
                contactStart();
               }else if(contactCounter%2===1){
                rotateEnd();
                TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:1})
                contactEnd();
              }
          })
      TweenMax.set(followContent, {autoAlpha:0})

      var aboutStart = function(){
        TweenMax.to(aboutContent, 0.3,  {delay: 1, opacity:1, pointerEvents:'all'})
      }

      var aboutEnd = function(){
        TweenMax.to(aboutContent, 0.1, { opacity:0, pointerEvents:'none'})
      }

      var followStart = function(){
        TweenMax.set(followContent,{ autoAlpha:1})
        TweenMax.staggerFromTo(socialIcons, 1, {autoAlpha:0, y:50 },{ delay:1, y:0, autoAlpha:1, ease: Elastic.easeOut.config(1, 0.5)}, 0.1)
      }

      var followEnd = function(){
        TweenMax.to(followContent, 0.1, {autoAlpha:0})
      }

      var contactStart = function(){
        TweenMax.to(contactContent, 0.3,  {delay: 1, opacity:1, pointerEvents:'all'})
      }

      var contactEnd = function(){
        TweenMax.to(contactContent, 0.1, { opacity:0, pointerEvents:'none'})
      }

      var rotateStart = function(){
        TweenMax.to(centerImg, 1, {rotationY:180})
        TweenMax.to(centerBackground, 1, {rotationY:180, backgroundColor:'#312d2d'})
        TweenMax.to(centerImg, 0.3, { delay:0.1, autoAlpha:0})
        TweenMax.to(backgroundSquare, 1, {rotationY:180})
        TweenMax.to(square, 0.01, {css:{boxShadow: "none"}})
        TweenMax.to(square, 0.2, {delay: 1, css:{boxShadow: "0px 5px 45px -12px #000"}})
      }

      var rotateEnd = function(){
        TweenMax.to(centerImg, 1, {rotationY:0})
        TweenMax.to(centerBackground, 1, {rotationY:0, backgroundColor:'transparent'})
        TweenMax.to(centerImg, 0.3, {delay:0.3, autoAlpha:1})
        TweenMax.to(backgroundSquare, 1, {rotationY:0})
        TweenMax.to(square, 0.01, {css:{boxShadow: "none"}})
        TweenMax.to(square, 0.2, {delay: 1, css:{boxShadow: "0px 5px 45px -12px #000"}})
      }

      var siblingStart = function(){
        TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:0})
      }

      var siblingEnd = function(){
        TweenMax.to($(this).siblings('.pageLink'), 1, {autoAlpha:1})
      }
})//end js
