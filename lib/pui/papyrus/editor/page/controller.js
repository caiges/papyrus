/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		pem = p.PageEditorModel,
		pev = p.PageEditorView;
	
	this.init = function() {	
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		pem.getPageEvent.subscribe( pev.renderEdit, pev, true );
		pem.findPageById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruspageeditorcontroller", YAHOO.widget.papyrus.PageEditorController, { version: "0.1", build: "1" } );