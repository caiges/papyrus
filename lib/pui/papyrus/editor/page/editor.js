/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Bubbling = YAHOO.Bubbling,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initPageEditorEvent", this );
	
	this.init = function() {

		E.registerEditor( 'page', YAHOO.widget.papyrus.PageEditor );
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorModel.init, YAHOO.widget.papyrus.PageEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorController.init, YAHOO.widget.papyrus.PageEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorView.init, YAHOO.widget.papyrus.PageEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.PageEditorController;
		
		this.initEvents();
		
	};
	
	this.initEvents = function() {
	
		// edit events
		pev = YAHOO.widget.papyrus.PageEditorView;
		pem = YAHOO.widget.papyrus.PageEditorModel;
		pem.getPageEvent.subscribe( pev.renderEdit, pev, true );
		
		// This handles the case where data for the current page model has changed.
		var onInputChange = function( e, obj ) {
			
			target = Event.getTarget( e );
			// The filtering occurs here instead of being 
			if( Dom.hasClass( target, "papyrus-editor-can-alter-state-field" ) ) {
				obj.alteredStateEvent.fire();
			}
			
		};
		
		// Event delgation
		YAHOO.util.Event.addListener( document.body, "change", onInputChange, E );
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.PageEditor.init, YAHOO.widget.papyrus.PageEditor, true );

YAHOO.register( "papyruspageeditor", YAHOO.widget.papyrus.PageEditor, { version: "0.1", build: "1" } );