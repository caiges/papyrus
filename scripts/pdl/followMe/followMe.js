/*
*   author:  Caige Nash
*   created:  05/17/2006
*   purpose:  allow div element to follow based upon window scroll
*
*/

// create PDL.widget.FollowMeMgr namespace if it doesn't already exist
if ( PDL.widget.FollowMeMgr == null || typeof( PDL.widget.FollowMeMgr ) != "object" ) { PDL.widget.FollowMeMgr = new Object(); }

PDL.widget.FollowMeMgr.followMeContainers = new Array();

PDL.widget.FollowMeMgr.addContainer = function( followMeObject ) {
	this.followMeContainer.push( followMeObject );
};

PDL.widget.FollowMeMgr.timeout = null;

PDL.widget.FollowMeMgr.resetContainerEvent = function( e ) {
	PDL.widget.FollowMeMgr.resetContainer();
};

PDL.widget.FollowMeMgr.resetContainer = function() {
	
	var currentOffset = getTopOffset();
	
	if( PDL.widget.FollowMeMgr.followMeContainers || PDL.widget.FollowMeMgr.followMeContainers.length > 0 ) {
		
		for( var i = 0; i < PDL.widget.FollowMeMgr.followMeContainers.length; i++ ) {
			if( document.getElementById( "contentContainer" ) != undefined ) {
				console.log( "ah" );	
				if( currentOffset >= YAHOO.util.Dom.getY( "contentContainer" ) ) {
					var newTop = currentOffset - YAHOO.util.Dom.getY( "contentContainer" );
				
					// if element is currently animated, stop and re-animate
					if( this.followMeContainers[ i ].anim.isAnimated() == true ) {
						this.followMeContainers[ i ].anim.stop();
					}
				
					this.followMeContainers[ i ].anim.attributes = { top: { to: newTop, unit: 'px' } };
			 		this.followMeContainers[ i ].anim.animate();
					console.log( "moving containers to new top" );
				} else {
				
					// if element is currently animated, stop and re-animate				
					if( this.followMeContainers[ i ].anim.isAnimated() == true ) {
						this.followMeContainers[ i ].anim.stop();
					}
				
					this.followMeContainers[ i ].anim.attributes = { top: { to: 0, unit: 'px' } };		
					this.followMeContainers[ i ].anim.animate();
					console.log( "moving containers back to starting position" );
				}
			} // end check for contentContainer element
		} // end followMeContainers loop
	}
};

// contructor for FollowMe functionality, requires a elementNode
PDL.widget.FollowMe = function() {
}; 

// prototype for FollowMe object
PDL.widget.FollowMe.prototype = {
	
	// initialization
	init : function(element) {
		if(document.getElementById(element) != null) {
			this.elementName = element;
			this.positionX = YAHOO.util.Dom.getX(element);
			this.positionY = YAHOO.util.Dom.getY(element);
			this.positionXY = YAHOO.util.Dom.getXY(element);
			this.anim = new YAHOO.util.Anim( this.elementName, { top: { to: 0, unit: 'px' }	}, 0.35, YAHOO.util.Easing.easeOut );
			// push FollowMe object into the followMeContainers array
			PDL.widget.FollowMeMgr.followMeContainers.push(this);
			return this;
		}
	}
};

/* Utility functions */

// returns the amount of screen from current view to the top of the document view
function getTopOffset() {
	var y;
	if ( self.pageYOffset ) { // all except IE
		y = self.pageYOffset;
	} else if ( document.documentElement && document.documentElement.scrollTop ) { // IE Version 6 Strict
		y = document.documentElement.scrollTop;
	} else if ( document.body ) { // all other IE Versions
		y = document.body.scrollTop;
	}
	console.log( "y: " + y );
	return y;
}

// returns the amount of screen from current view to the left of the document view
function getLeftOffset() {
	var x;
	if ( self.pageYOffset ) { // all except IE
		x = self.pageXOffset;
	} else if ( document.documentElement && document.documentElement.scrollTop ) { // IE Version 6 Strict
		x = document.documentElement.scrollLeft;
	} else if ( document.body ) { // all other IE Versions
		x = document.body.scrollLeft;
	}
	console.log( "x: " + x );
	return x;
}

YAHOO.register( "followme", PDL.widget.FollowMe, { version: "1", build: "1" } );