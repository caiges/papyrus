/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.PageEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		pem = p.PageEditorModel,
		pev = p.PageEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSavePageEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			pem.getPageEvent.subscribe( pev.renderEdit, pev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSavePageEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSavePageEvent = true;
		}
		
		pem.findPageById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			page = pem.getPage();
			
		// Update download with form data.
		page.setPropertiesFromForm();

		if( page.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( page );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruspageeditorcontroller", YAHOO.widget.papyrus.PageEditorController, { version: "0.1", build: "1" } );