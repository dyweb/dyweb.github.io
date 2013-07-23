function verticalMenu_jump($navId){
    $('.verticalMenu li').removeClass('current');
    $('.verticalMenu li').each(function(){
        if ($(this).attr('data-navId') == $navId){
            $(this).addClass('current');
        }
    });
};

var Page = (function() {
    
    var config = {
            $bookBlock : $( '#bb-bookblock' ),
            $navNext : $( '#bb-nav-next' ),
            $navPrev : $( '#bb-nav-prev' ),
            $navFirst : $( '#bb-nav-first' ),
            $navLast : $( '#bb-nav-last' ),
            $navJump : $( '.verticalMenu li')
        },
        init = function() {
            config.$bookBlock.bookblock( {
                speed : 1000,
                shadowSides : 0.8,
                shadowFlip : 0.4
            } );
            initEvents();
        },
        initEvents = function() {
            
            var $slides = config.$bookBlock.children();

            // add navigation events
            config.$navNext.on( 'click touchstart', function() {
                config.$bookBlock.bookblock( 'next' );
                return false;
            } );

            config.$navPrev.on( 'click touchstart', function() {
                config.$bookBlock.bookblock( 'prev' );
                return false;
            } );

            config.$navFirst.on( 'click touchstart', function() {
                config.$bookBlock.bookblock( 'first' );
                return false;
            } );

            config.$navLast.on( 'click touchstart', function() {
                config.$bookBlock.bookblock( 'last' );
                return false;
            } );

            config.$navJump.on( 'click touchstart', function() {
                $id = $(this).attr('data-navId');
                if ($id > 0){
                    config.$bookBlock.bookblock( 'jump', $id );
                    verticalMenu_jump($id);
                }
                return false;
            } );
            
            // add swipe events
            $slides.on( {
                'swipeleft' : function( event ) {
                    config.$bookBlock.bookblock( 'next' );
                    return false;
                },
                'swiperight' : function( event ) {
                    config.$bookBlock.bookblock( 'prev' );
                    return false;
                }
            } );

            // add keyboard events
            $( document ).keydown( function(e) {
                var keyCode = e.keyCode || e.which,
                    arrow = {
                        left : 37,
                        up : 38,
                        right : 39,
                        down : 40
                    };

                switch (keyCode) {
                    case arrow.left:
                        config.$bookBlock.bookblock( 'prev' );
                        break;
                    case arrow.right:
                        config.$bookBlock.bookblock( 'next' );
                        break;
                }
            } );
        };

        return { init : init };

})();

$(document).ready(function(){
    Page.init();
})
