/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getSectionsEvent = new Util.CustomEvent( "getSectionsEvent" );
	
	this.init = function() {	
		
		var data = { sections : null };
		
		this.setSections = function( _sections ) { data.sections = new p.Sections( _sections ); };
		
		this.getSections = function() { return data.sections; };
			
	};
	
	this.findSectionsByPageId = function( page_id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			//var page = new p.Page( eval( "(" + response.responseText + ")" ) );
			model.setSections( eval( "(" + response.responseText + ")" ) );
			model.getSectionsEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/sections/" + page_id + "_sections.json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyrussectionseditormodel", YAHOO.widget.papyrus.SectionsEditorModel, { version: "0.1", build: "1" } );