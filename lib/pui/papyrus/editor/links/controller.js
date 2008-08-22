/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditorController = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		lsem = p.LinksEditorModel,
		lsev = p.LinksEditorView; 
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the renderEvent action.
		this.subscribedRenderEdit = false;
		// Boolean that determines if we've subscribed the save action.
		this.subscribedSaveLinksEvent = false;
	};
		
   	// params - data for the controller
	this.edit = function( params ) {
		
		if( this.subscribedRenderEdit === false ) {
			lsem.getLinksEvent.subscribe( lsev.renderEdit, lsev, true );
			this.subscribedRenderEdit = true;
		}
		
		if( this.subscribedSaveLinksEvent == false ) {
			p.Editor.getSaveButton().addListener( "click", this.save, this );
			this.subscribedSaveLinksEvent = true;
		}
		
		lsem.findLinksByLinksId( params[ "id" ] );
		
	};
	
	this.save = function( ev, obj ) {
		
		var that = obj,
			links = lsem.getLinks();

		// Update downloads with form data.
		links.setPropertiesFromForm();

		// Reset the editor to normal state.
		p.Editor.normalStateEvent.fire();
		
		// Make web service call
		console.log( 'making web service call' );
		
		// Show saved or error message.
		
	};
	
	// setup default action
	this.defaultAction = this.edit;
	
};

YAHOO.register( "papyruslinkseditorcontroller", YAHOO.widget.papyrus.LinksEditorController, { version: "0.1", build: "1" } );