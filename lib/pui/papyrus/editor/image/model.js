/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImageEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getImageEvent = new Util.CustomEvent( "getImageEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setImage = function( _image ) { 
			
			image = new p.Image( _image );
			model[ "image" ] = new p.Image( _image );
		
		};
		
		this.getImage = function() { return model[ "image" ]; };
			
	};
	
	this.findImageById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setImage( eval( "(" + response.responseText + ")" ) );
			model.getImageEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/image/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrusimageeditormodel", YAHOO.widget.papyrus.ImageEditorModel, { version: "0.1", build: "1" } );