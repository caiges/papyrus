/*
Copyright (c) 2008, Caige Nichols All rights reserved.
version: 0.1
*/

(function () {	
	
var Y = YAHOO.widget;
	
	/**
    * FollowMe is a JavaScript representation of a container that follows the
    * user as they scroll down the page vertically. 
    * @namespace YAHOO.widget
    * @class FollowMe
    * @constructor
    * @param {String} el The element ID representing the FollowMe container 
    * @param {String} contextEl The element representing the starting point of
    * the FollowMe container. This is the topmost element restricting movement 
    * above this elements topmost y coordinate on the page.
    * @param {Object} userConfig The configuration Object literal containing 
    * the configuration that should be set for this object. See configuration 
    * documentation for more details.
    */
	
var FollowMe = function( el, contextEl, userConfig ) {
	if( el && contextEl ) {
		this.init( el, contextEl, userConfig );
	} else {
	}
};

var	Event = YAHOO.util.Event,
	Dom = YAHOO.util.Dom,
	Anim = YAHOO.util.Anim,
	Easing = YAHOO.util.Easing;

FollowMe.prototype = { 

	init : function( el, contextEl, userConfig ) {
		
		//console.log( "followme.js - FollowMe.init: initializing" );
		
	   /**
	    * The main follow me element that references the follower.
	    * @property el
	    * @type HTMLElement
	    */
	    var el = Dom.get( el );

	   /**
	    * The context element that will be the starting point and restricting element when the follow me element moves
	    * @property contextEl
	    * @type HTMLElement
	    */
	    var contextEl = Dom.get( contextEl );
		
		// Initialize animation
		var anim = new YAHOO.util.Anim( el, { top: { to: 0, unit: 'px' } }, 0.35, Easing.easeOut );
		
		/**
         * Changes the animated element
         * @method setEl
         */
		this.setEl = function( element ) { el = Dom.get( element ); };

		this.getEl = function() { return el; };

		this.setContextEl = function( contextEl ) { contextEl = Dom.get( contextEl ); };

		this.getContextEl = function() { return contextEl; };

		this.getAnim = function() { return anim; };
		
		// Initialize events
		Event.addListener( window, "scroll", this.track, this );
		Event.addListener( window, "resize", this.track, this );
	
	},
	
	track : function( e, obj ) {
		
		//console.log( "followme.js - FollowMe.trac: tracking" );
		
		var currentOffset = obj.getTopOffset();

		if( obj.getContextEl() != undefined ) {	
			if( currentOffset >= Dom.getY( obj.getContextEl() ) ) {
				var newTop = currentOffset - Dom.getY( obj.getContextEl() );

				// if obj is currently animated, stop and re-animate
				if( obj.getAnim().isAnimated() == true ) {
					obj.getAnim().stop();
				}

				obj.getAnim().attributes = { top: { to: newTop, unit: 'px' } };
		 		obj.getAnim().animate();
				//console.log( obj.getAnim().getEl() );
				//console.log( "followme.js - FollowMe.trac: moving containers to new top: " + newTop );
			} else {

				// if element is currently animated, stop and re-animate				
				if( obj.getAnim().isAnimated() == true ) {
					obj.getAnim().stop();
				}

				obj.getAnim().attributes = { top: { to: 0, unit: 'px' } };		
				obj.getAnim().animate();
				//console.log( "followme.js - FollowMe.trac: moving containers back to starting position" );
			}
		} // end check for contentContainer element
		
	},
	
	getTopOffset : function() {
		var y;
		if ( self.pageYOffset ) { // all except IE
			y = self.pageYOffset;
		} else if ( document.documentElement && document.documentElement.scrollTop ) { // IE Version 6 Strict
			y = document.documentElement.scrollTop;
		} else if ( document.body ) { // all other IE Versions
			y = document.body.scrollTop;
		}
		//console.log( "followme.js - FollowMe.getTopOffset: y: " + y );
		return y;
	}

	
};

Y.FollowMe = FollowMe;

}() );

YAHOO.register( "followme", YAHOO.widget.FollowMe, { version: "0.1", build: "1" } );