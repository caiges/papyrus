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
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveImagesEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			isem.getImagesEvent.subscribe( isev.renderEdit, isev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveImagesEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveImagesEvent = true;
		}
		
		isem.findImagesByImagesId( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			images = isem.getImages();
			
		// Update downloads with form data.
		images.setPropertiesFromForm();

		// Reset the editor to normal state.
		p.Editor.normalStateEvent.fire();
		
		// Make web service call
		console.log( 'making web service call' );
		
		// Show saved or error message.
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusimageseditorcontroller", YAHOO.widget.papyrus.ImagesEditorController, { version: "0.1", build: "1" } );