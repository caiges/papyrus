/*
*   author:  Caige Nash
*   created:  05/24/2006
*   purpose:  wrap YAHOO.widget.Overlay component into an easier to use object
*	dependencies: yahoo-min.js, dom-min.js, container-min.js (yahoo interface library)
*
*/

// default constructor for Overlay Component object
PDL.widget.OverlayComponent = function() {
	
}

// prototype for OverlayComponent object
PDL.widget.OverlayComponent.prototype = {
	
	// initialization
	init : function(element, visible, zIndex) {
	
		if(document.getElementById(element)) {
			this.args = {};
			this.component = new YAHOO.widget.Overlay(element);
			
			// set element name
			this.elementName = element;	
			// set visibility
			this.args.visible = visible;
			// set z-index 
			this.args.zIndex = zIndex;
			// set x position
			this.args.x = YAHOO.util.Dom.getX(element);
			// set y position 
			this.args.y = YAHOO.util.Dom.getY(element);
			
			//this.args.contraintoviewport = true;
	
			this.component.cfg.applyConfig(this.args);
			this.component.render();
			return this;
		}
	
	}
	
}