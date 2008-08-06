/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		dem = p.DownloadEditorModel,
		dev = p.DownloadEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			dem.getDownloadEvent.subscribe( dev.renderEdit, dev, true );
			this.subscribedRenderEdit = true;
		}
		
		dem.findDownloadById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrusdownloadeditorcontroller", YAHOO.widget.papyrus.DownloadEditorController, { version: "0.1", build: "1" } );