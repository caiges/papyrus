/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImageEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		iem = p.ImageEditorModel,
		iev = p.ImageEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			iem.getImageEvent.subscribe( iev.renderEdit, iev, true );
			this.subscribedRenderEdit = true;
		}
		
		iem.findImageById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusimageeditorcontroller", YAHOO.widget.papyrus.ImageEditorController, { version: "0.1", build: "1" } );