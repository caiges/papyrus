/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		lsem = p.LinksEditorModel,
		lsev = p.LinksEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			lsem.getLinksEvent.subscribe( lsev.renderEdit, lsev, true );
			this.subscribedRenderEdit = true;
		}

		lsem.findLinksByLinksId( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruslinkseditorcontroller", YAHOO.widget.papyrus.LinksEditorController, { version: "0.1", build: "1" } );