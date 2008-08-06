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
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			dsem.getDownloadsEvent.subscribe( dsev.renderEdit, dsev, true );
			this.subscribedRenderEdit = true;
		}

		dsem.findDownloadsBySectionId( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadseditorcontroller", YAHOO.widget.papyrus.DownloadsEditorController, { version: "0.1", build: "1" } );