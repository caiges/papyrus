/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadsEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		dsem = p.DownloadsEditorModel,
		dsev = p.DownloadsEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveDownloadsEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			dsem.getDownloadsEvent.subscribe( dsev.renderEdit, dsev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveDownloadsEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveDownloadsEvent = true;
		}
		
		dsem.findDownloadsByDownloadsId( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			downloads = dsem.getDownloads();
			
		// Update downloads with form data.
		downloads.setPropertiesFromForm();
			
		// Reset the editor to normal state.
		p.Editor.normalStateEvent.fire();
		
		// Make web service call
		console.log( 'making web service call' );
		
		// Show saved or error message.
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadseditorcontroller", YAHOO.widget.papyrus.DownloadsEditorController, { version: "0.1", build: "1" } );