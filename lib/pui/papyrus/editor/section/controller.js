/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		sem = p.SectionEditorModel,
		sev = p.SectionEditorView;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			sem.getSectionEvent.subscribe( sev.renderEdit, sev, true );
			this.subscribedRenderEdit = true;
		}
		sem.findSectionById( params[ "id" ] );
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectioneditorcontroller", YAHOO.widget.papyrus.SectionEditorController, { version: "0.1", build: "1" } );