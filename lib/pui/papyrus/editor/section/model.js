/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getSectionEvent = new Util.CustomEvent( "getSectionEvent" );
	
	this.init = function() {	
		
		var data = { section : null };
		
		this.setSection = function( _section ) { data.section = _section; };
		
		this.getSection = function() { return data.section; };
			
	};
	
	this.findSectionById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			//var page = new p.Page( eval( "(" + response.responseText + ")" ) );
			model.setSection( eval( "(" + response.responseText + ")" ) );
			model.getSectionEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/section/0.json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrussectioneditormodel", YAHOO.widget.papyrus.SectionEditorModel, { version: "0.1", build: "1" } );