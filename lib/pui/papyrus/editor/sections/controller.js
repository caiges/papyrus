/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		ssem = p.SectionsEditorModel,
		ssev = p.SectionsEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			ssem.getSectionsEvent.subscribe( ssev.renderEdit, ssev, true );
			this.subscribedRenderEdit = true;
		}

		ssem.findSectionsByPageId( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectionseditorcontroller", YAHOO.widget.papyrus.SectionsEditorController, { version: "0.1", build: "1" } );