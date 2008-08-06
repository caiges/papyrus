/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getDownloadEvent = new Util.CustomEvent( "getDownloadEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setDownload = function( _download ) { 
			
			download = new p.Download( _download );
			model[ "download" ] = new p.Download( _download );
		
		};
		
		this.getDownload = function() { return model[ "download" ]; };
			
	};
	
	this.findDownloadById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setDownload( eval( "(" + response.responseText + ")" ) );
			model.getDownloadEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/download/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrusdownloadeditormodel", YAHOO.widget.papyrus.DownloadEditorModel, { version: "0.1", build: "1" } );