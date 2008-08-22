/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		ssem = p.SectionsEditorModel,
		ssev = p.SectionsEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveSectionsEvent = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			ssem.getSectionsEvent.subscribe( ssev.renderEdit, ssev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveSectionsEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveSectionsEvent = true;
		}
		
		ssem.findSectionsByPageId( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			sections = ssem.getSections();

		// Update downloads with form data.
		sections.setPropertiesFromForm();

		// Reset the editor to normal state.
		p.Editor.normalStateEvent.fire();
		
		// Make web service call
		console.log( 'making web service call' );
		
		// Show saved or error message.
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectionseditorcontroller", YAHOO.widget.papyrus.SectionsEditorController, { version: "0.1", build: "1" } );