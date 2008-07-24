/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getHTMLEvent = new Util.CustomEvent( "getHTMLEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setHTML = function( _html ) { 
			
			html = new p.HTML( _html );
			model[ "html" ] = new p.HTML( _html );
		
		};
		
		this.getHTML = function() { return model[ "html" ]; };
			
	};
	
	this.findHTMLById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setHTML( eval( "(" + response.responseText + ")" ) );
			model.getHTMLEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/html/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrushtmleditormodel", YAHOO.widget.papyrus.HTMLEditorModel, { version: "0.1", build: "1" } );