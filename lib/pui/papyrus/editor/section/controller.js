/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		sem = p.SectionEditorModel,
		sev = p.SectionEditorView;
	
	this.init = function() {	
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		sem.getSectionEvent.subscribe( sev.renderEdit, sev, true );
		sem.findSectionById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectioneditorcontroller", YAHOO.widget.papyrus.SectionEditorController, { version: "0.1", build: "1" } );