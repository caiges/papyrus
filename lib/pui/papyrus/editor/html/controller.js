/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		hem = p.HTMLEditorModel,
		hev = p.HTMLEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveHTMLEvent = false;
		
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			hem.getHTMLEvent.subscribe( hev.renderEdit, hev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveHTMLEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveHTMLEvent = true;
		}
		
		hem.findHTMLById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			html = hem.getHTML();
			
		// Update download with form data.
		html.setPropertiesFromForm();
		
		if( html.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( html );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyrushtmleditorcontroller", YAHOO.widget.papyrus.HTMLEditorController, { version: "0.1", build: "1" } );