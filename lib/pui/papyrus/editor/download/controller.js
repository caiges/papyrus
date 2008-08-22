/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorController = new function() { 
	
	var	E = YAHOO.util.Event,
		D = YAHOO.util.Dom,
		p = YAHOO.widget.papyrus,
		dem = p.DownloadEditorModel,
		dev = p.DownloadEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the edit action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveDownloadEvent = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			dem.getDownloadEvent.subscribe( dev.renderEdit, dev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveDownloadEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveDownloadEvent = true;
		}
		
		if( this.subscribedShowFieldErrorsEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedShowFieldErrorsEvent = true;
		}
		
		dem.findDownloadById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			download = dem.getDownload();
			
		// Update download with form data.
		download.setPropertiesFromForm();
			
		if( download.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( download );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadeditorcontroller", YAHOO.widget.papyrus.DownloadEditorController, { version: "0.1", build: "1" } );