/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus;
	
	this.init = function() {	
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		//this.e.edit.getPageEvent.subscribe( this.v.edit );
		//this.e.edit.editViewLoadEvent.subscribe( this.u.edit.attachEvents );
		p.SectionEditorModel.findSectionById( params[ "id" ] );
		//this.e.edit.editViewLoadEvent.unsubscribeAll();
		//this.u.initEditEvents();
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectioneditorcontroller", YAHOO.widget.papyrus.SectionEditorController, { version: "0.1", build: "1" } );