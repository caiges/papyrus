/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getSectionEvent = new Util.CustomEvent( "getSectionEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setSection = function( _section ) { model[ "section" ] = new p.Section( _section ); };
		
		this.getSection = function() { return model[ "section" ]; };
			
	};
	
	this.findSectionById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setSection( eval( "(" + response.responseText + ")" ) );
			model.getSectionEvent.fire();
			
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/section/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrussectioneditormodel", YAHOO.widget.papyrus.SectionEditorModel, { version: "0.1", build: "1" } );