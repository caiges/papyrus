/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImagesEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		isem = p.ImagesEditorModel,
		isev = p.ImagesEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			isem.getImagesEvent.subscribe( isev.renderEdit, isev, true );
			this.subscribedRenderEdit = true;
		}

		isem.findImagesByImagesId( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusimageseditorcontroller", YAHOO.widget.papyrus.ImagesEditorController, { version: "0.1", build: "1" } );