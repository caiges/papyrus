/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinkEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		lem = p.LinkEditorModel,
		lev = p.LinkEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			lem.getLinkEvent.subscribe( lev.renderEdit, lev, true );
			this.subscribedRenderEdit = true;
		}
		
		lem.findLinkById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruslinkeditorcontroller", YAHOO.widget.papyrus.LinkEditorController, { version: "0.1", build: "1" } );