/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		hem = p.HTMLEditorModel,
		hev = p.HTMLEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			hem.getHTMLEvent.subscribe( hev.renderEdit, hev, true );
			this.subscribedRenderEdit = true;
		}
		
		hem.findHTMLById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrushtmleditorcontroller", YAHOO.widget.papyrus.HTMLEditorController, { version: "0.1", build: "1" } );