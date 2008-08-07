/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImagesEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getImagesEvent = new Util.CustomEvent( "getImagesEvent" );
	
	this.init = function() {	
		
		var data = { images : null };
		
		this.setImages = function( _images ) { data.images = new p.Images( _images ); };
		
		this.getImages = function() { return data.images; };
			
	};
	
	this.findImagesByImagesId = function( images_id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setImages( eval( "(" + response.responseText + ")" ) );
			model.getImagesEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/images/" + images_id + "_images.json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrusimageseditormodel", YAHOO.widget.papyrus.ImagesEditorModel, { version: "0.1", build: "1" } );