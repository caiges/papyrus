/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.PageEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		pem = p.PageEditorModel,
		pev = p.PageEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			pem.getPageEvent.subscribe( pev.renderEdit, pev, true );
			this.subscribedRenderEdit = true;
		}
		
		pem.findPageById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruspageeditorcontroller", YAHOO.widget.papyrus.PageEditorController, { version: "0.1", build: "1" } );