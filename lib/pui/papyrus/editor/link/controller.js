/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinkEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		lem = p.LinkEditorModel,
		lev = p.LinkEditorView,
		VH = p.ViewHelper;
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveLinkEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit == false ) {
			lem.getLinkEvent.subscribe( lev.renderEdit, lev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveLinkEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveLinkEvent = true;
		}
		
		lem.findLinkById( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			link = lem.getLink();
			
		// Update download with form data.
		link.setPropertiesFromForm();

		if( link.valid() === true ) {
			
			// Remove error messages
			VH.removeFieldErrors();
			
			// Reset the editor to normal state.
			p.Editor.normalStateEvent.fire();
			
			// Make web service call
			console.log( 'making web service call' );
			
			// Switch perspectives back to parent.
			
		} else {

			// Show Error Messages.
			VH.showFieldErrors( link );
			
		}
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruslinkeditorcontroller", YAHOO.widget.papyrus.LinkEditorController, { version: "0.1", build: "1" } );