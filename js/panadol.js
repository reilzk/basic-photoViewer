$(document).ready(function() {
  gallery.initialize();
});

console.log("Nahh you embarrased me buddy!")
console.log("What seems to be the problem here for you to check this js script?")
var gallery = {
  initialize: function() {
    webkit = false;
    isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    if( isChrome || isSafari ){
        webkit = true;
    }
    
    
    currentSlide = null;
    captionsState = 'open';

    if( $( '#gallery-wrapper' ).length === 0 ){
      $( 'body' ).append( '<div id="gallery-wrapper"></div>' );
      galleryWrapper = $( '#gallery-wrapper' );
      galleryWrapper.hide();
     
      galleryWrapper.click(function(){
        $( this ).find( 'img' ).remove();
        $( this ).find( '.img-wrapper-outer-wrapper' ).remove();
        $( this ).hide();
        console.log('close image viewer');
        currentSlide = null;
      });
      galleryWrapper.append( '<div id="prev-slide" data-title="Previous Image" data-placement="right"><div class="triangle-left"></div></div><div id="next-slide" data-title="Next Image" data-placement="left"><div class="triangle-right"></div></div>' );
      var prevSlide = $( '#prev-slide' ),
        nextSlide = $( '#next-slide' );
      prevSlide.click( function(e) {
        e.stopPropagation();
        gallery.doSlide( 'prev' );
      });
     
      nextSlide.click( function(e) {
        e.stopPropagation();
        gallery.doSlide( 'next' );
      });
    
      galleryWrapper.append( '<div id="gallery-close" data-title="Close the viewer." data-placement="left">x</div>' );
      var closeSlide = $( '#gallery-close' );
      closeSlide.tooltip();
      closeSlide.click( function() {
        galleryWrapper.click();
      });
    }

   
    $( document ).keyup(function (e) {
      if( currentSlide != null ){
        if (e.keyCode == 37 || e.keyCode == 40) {
       
          gallery.doSlide( 'prev' );
        }
        if (e.keyCode == 39 || e.keyCode == 38) {
         
          gallery.doSlide( 'next' );
        }
        if(e.keyCode == 27){

          closeSlide.click();
        }
      }
    });

  
    galleryWrapper.append( '<div id="gallery-counter"><span id="this-slide"></span> of <span id="total-slides"></span></div>' );
    thisCounter = $( '#this-slide' );
    thisTotal = $( '#total-slides' );

    
    images = $( '.photo-thumbs' ).find( 'img' );
    $.each( images, function(){
      var me = $( this );
 
      me.on( 'click', function() {

       
        if( me.closest( '.photo-thumbs' ).find( 'img').first().attr( 'src' ).indexOf( '-thumb' ) >= 0 ) {
          console.log( 'using thumbs' );
       
          slideThumbs = me.closest( '.photo-thumbs' ).find( 'img');
          slides = slideThumbs.clone()
          $.each( slides, function( index ){
            $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '-thumb', '' ) );
          });
        }else{
          console.log( 'NOT using thumbs' );
         
          slides = me.closest( '.photo-thumbs' ).find( 'img' ).clone();
        }

 
        thisTotal.html( slides.length );

        $.each( slides, function( index ){
          var thisSlide = $( this );
        
          thisSlide.hide();
         
          if( thisSlide.attr( 'src' ) === me.attr( 'src' ).replace( '-thumb', '' ) ){
          
            currentSlide = index-1;
         
            thisCounter.html( currentSlide + 1 );
          }
        
          thisSlide.click(function(e){
            e.stopPropagation();
            gallery.doSlide( 'next' );
          });

        });

        galleryWrapper.prepend( slides );

      
        if( webkit ){
     
          galleryWrapper.css('display', '-webkit-box');
        }else{
          galleryWrapper.addClass( 'no-webkit' );
          galleryWrapper.css('display', 'block');
        }
      
        gallery.doSlide( 'next' );
      });

    });

  
  },
  doSlide: function( dir ) {
    console.log('do slide');

    if ( dir === 'prev' ){
      if( currentSlide === 0 ){
        nextSlide = slides.length-1;
      }else{
        nextSlide = currentSlide - 1;
      }
    }
   
    if ( dir === 'next' ){
      if( currentSlide === slides.length-1 ){
        nextSlide = 0;
      }else{
        nextSlide = currentSlide + 1;
      }
    }

  
    $( '.caption' ).remove();

    if( $( slides[nextSlide] ).data( 'caption' ) != undefined ){
      $( slides[nextSlide] ).wrap( '<div class="img-wrapper-outer-wrapper"><div class="img-wrapper-outer"><div class="img-wrapper"></div></div></div>' );
      $( slides[nextSlide] ).parent( '.img-wrapper' ).append( '<div class="caption opened">' + $( slides[nextSlide] ).data( 'caption' ) + '<div class="close-captions" data-title="Minimize captions." data-placement="left">▾</div></div>' );
      if( captionsState === 'closed' ){
        console.log( 'captionsState = ' + captionsState );
        $( '.caption' ).removeClass( 'opened' ).addClass( 'mini closed can-open' );
      }

    
      var thisCaption = $( slides[nextSlide] ).parent().find( '.caption' );
      var mini = null;
      var closed = null;
      var opened = null;
      thisCaption.mouseenter(function(e){
        var caption = $( this );
        if( caption.hasClass( 'can-open' ) ){
          if( mini != null ){clearTimeout( mini );}
          if( closed != null ){clearTimeout( closed );}
          if( caption.hasClass( 'mini' ) ) {caption.removeClass( 'mini' );}
          if( caption.hasClass( 'closed' ) ) {caption.removeClass( 'closed' );}
          if( !caption.hasClass( 'opened' ) ){opened = setTimeout( function(){caption.addClass( 'opened' );}, 1000 );}
          caption.removeClass( 'can-open' );
          captionsState = 'open';
        }
      })
      var thisCaptionClosed = thisCaption.find( '.close-captions' )
      thisCaptionClosed.click(function(e){
        e.stopPropagation();
        var caption = $( this ).parent( '.caption');
        clearTimeout( opened );
        if(caption.hasClass( 'opened' )){caption.removeClass( 'opened' );}
        caption.addClass( 'mini' );
        closedClass = function(){closed = setTimeout( function() {caption.addClass( 'closed' ).addClass( 'can-open' );}, 800);}
        closedClass();
        captionsState = 'closed';
      }).tooltip();
    }

    if( $( slides[currentSlide] ).parent().is( '.img-wrapper' ) ){
      $( slides[currentSlide] ).parent().parent().unwrap();
      $( slides[currentSlide] ).parent().unwrap();
      $( slides[currentSlide] ).unwrap();
    }
    $( slides[currentSlide] ).hide();
    $( slides[nextSlide] ).show();
    currentSlide = nextSlide;
    thisCounter.html( currentSlide+1 );
  }

}