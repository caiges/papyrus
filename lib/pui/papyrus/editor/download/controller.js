/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorController = new function() { 
	
	var	E = YAHOO.util.Event,
		D = YAHOO.util.Dom,
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
			var errors = download.getErrors(),
				error_messages = [];
				
			for( var i = 0; i < errors.length; i++ ) {
				error_messages.push( errors[ i ].message );
				Dom.addClass( errors[ i ].el, "editor_field_error" );
			}
					
			// Add error indicators to interface.
			
			// Show message.
			p.Editor.showMessage( "warn", "<strong>Please correct the errors before saving:</strong><br /><br />" + error_messages.join( "<br />" ) );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadeditorcontroller", YAHOO.widget.papyrus.DownloadEditorController, { version: "0.1", build: "1" } );