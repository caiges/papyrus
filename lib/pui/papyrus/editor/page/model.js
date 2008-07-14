/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getPageEvent = new Util.CustomEvent( "getPageEvent" );
	
	this.init = function() {	
		
		var data = { page : null };
		
		this.setPage = function( _page ) { data.page = _page; };
		
		this.getPage = function() { return data.page; };
			
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