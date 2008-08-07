/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadsEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getDownloadsEvent = new Util.CustomEvent( "getDownloadsEvent" );
	
	this.init = function() {	
		
		var data = { links : null };
		
		this.setDownloads = function( _downloads ) { data.downloads = new p.Downloads( _downloads ); };
		
		this.getDownloads = function() { return data.downloads; };
			
	};
	
	this.findDownloadsByDownloadsId = function( downloads_id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setDownloads( eval( "(" + response.responseText + ")" ) );
			model.getDownloadsEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/downloads/" + downloads_id + "_downloads.json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrusdownloadseditormodel", YAHOO.widget.papyrus.DownloadsEditorModel, { version: "0.1", build: "1" } );