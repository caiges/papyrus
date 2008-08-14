/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorController = new function() { 
	
	var	E = YAHOO.util.Event,
		p = YAHOO.widget.papyrus,
		dem = p.DownloadEditorModel,
		dev = p.DownloadEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the saveEvent action.
		this.savedDownloadEvent = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			dem.getDownloadEvent.subscribe( dev.renderEdit, dev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.savedDownloadEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.savedDownloadEvent = true;
		}
		
		dem.findDownloadById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			download = dem.getDownload();
			
		if( download.valid() ) {
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
		} else {
			// Failed validation. 
			
			// Add error indicators to interface.
			
			// Show message.
			p.Editor.showMessage( "warn", "Please correct the errors before saving" );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadeditorcontroller", YAHOO.widget.papyrus.DownloadEditorController, { version: "0.1", build: "1" } );