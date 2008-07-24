/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.PageEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getPageEvent = new Util.CustomEvent( "getPageEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setPage = function( _page ) { 
			
			page = new p.Page( _page );
			model[ "page" ] = new p.Page( _page ); 
			p.Editor.saveToModel( "page", page );
		
		};
		
		this.getPage = function() { return model[ "page" ]; };
			
	};
	
	this.findPageById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			//var page = new p.Page( eval( "(" + response.responseText + ")" ) );
			model.setPage( eval( "(" + response.responseText + ")" ) );
			model.getPageEvent.fire();
			
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/page/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyruspageeditormodel", YAHOO.widget.papyrus.PageEditorModel, { version: "0.1", build: "1" } );