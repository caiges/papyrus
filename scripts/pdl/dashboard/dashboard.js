/*
*   author:  Caige Nash
*   created:  06/06/2006
*   purpose:  provide transparent dashboard above window contents
*	dependencies: yahoo-min.js, container-min.js, dom-min.js, animation-min.js (yahoo yui library)
*
*/

// Dashboard widget
PDL.widget.Dashboard = {

	// setup Dashboard
	init : function() {		
		// create dashboard element
		this.dashBoardElement = document.createElement("DIV");
		this.dashBoardElement.id = "dashBoardElement";
		// create overlay component to house dashboard
		this.dashBoardOverlay = new YAHOO.widget.Overlay(this.dashBoardElement);
		// setup args for overlay
		this.args = {};
		this.args.zIndex = 40;
		this.args.visible = false;
		this.args.constraintoviewport = true;
		//this.args.effect = [{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.25}];
		
		// apply config to overlay
		this.dashBoardOverlay.cfg.applyConfig(this.args);
		// set default styles for Dashboard html element
		this.resetStyles();
		// insert into document
		this.dashBoardOverlay.render(document.body);
		//alert(this.inDocument(this.id));
		return this;
	}, 
	
	// query document to see if Dashboard is accessible
	inDocument : function(element) {
		return YAHOO.util.Dom.inDocument(element);
	},
	
	// reset default Dashboard html element styles
	resetStyles : function() {
		var element = this.dashBoardElement;
		YAHOO.util.Dom.setStyle(element, "position", "absolute");
		YAHOO.util.Dom.setStyle(element, "left", "0");
		YAHOO.util.Dom.setStyle(element, "top", "0");
		//YAHOO.util.Dom.setStyle(element, "zIndex", "40");
		YAHOO.util.Dom.setStyle(element, "backgroundColor", "#666666");
		YAHOO.util.Dom.setStyle(element, "width", YAHOO.util.Dom.getViewportWidth());
		YAHOO.util.Dom.setStyle(element, "height", YAHOO.util.Dom.getViewportHeight());
	},
	
	// show Dashboard
	show : function() {
		this.dashBoardOverlay.show();
		//YAHOO.util.Dom.addClass("dashBoardElement", "opacity25");
		new YAHOO.util.Anim(this.dashBoardElement, { opacity: { to: 0.25 } }, 0.1, YAHOO.util.Easing.easeNone).animate();	
		
	},
	
	// hide Dashboard
	hide : function() {
		this.dashBoardOverlay.hide();
	},
	
	// reset Dashboard
	reset : function() {
	
	}

}