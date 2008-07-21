/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		ssem = p.SectionsEditorModel,
		ssev = p.SectionsEditorView; 
	
	this.init = function() {	
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		ssem.getSectionsEvent.subscribe( ssev.renderEdit, ssev, true );
		ssem.findSectionsByPageId( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectionseditorcontroller", YAHOO.widget.papyrus.SectionsEditorController, { version: "0.1", build: "1" } );