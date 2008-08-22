/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImageEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		iem = p.ImageEditorModel,
		iev = p.ImageEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveImageEvent = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			iem.getImageEvent.subscribe( iev.renderEdit, iev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveImageEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveImageEvent = true;
		}
		
		iem.findImageById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			image = iem.getImage();
			
		// Update download with form data.
		image.setPropertiesFromForm();

		if( image.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( image );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusimageeditorcontroller", YAHOO.widget.papyrus.ImageEditorController, { version: "0.1", build: "1" } );