/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		sem = p.SectionEditorModel,
		sev = p.SectionEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveSectionEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			sem.getSectionEvent.subscribe( sev.renderEdit, sev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveSectionEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveSectionEvent = true;
		}
		
		sem.findSectionById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			section = sem.getSection();
			
		// Update download with form data.
		section.setPropertiesFromForm();

		if( section.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();

			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( section );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrussectioneditorcontroller", YAHOO.widget.papyrus.SectionEditorController, { version: "0.1", build: "1" } );