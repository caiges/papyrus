/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Bubbling = YAHOO.Bubbling,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initSectionEditorEvent", this );
	
	this.init = function() {

		E.registerEditor( 'section', YAHOO.widget.papyrus.SectionEditor );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorModel.init, YAHOO.widget.papyrus.SectionEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorController.init, YAHOO.widget.papyrus.SectionEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorView.init, YAHOO.widget.papyrus.SectionEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.SectionEditorController;
		
		this.initEvents();
		
	};
	
	this.initEvents = function() {
	
		// edit events
		pev = YAHOO.widget.papyrus.SectionEditorView;
		pem = YAHOO.widget.papyrus.SectionEditorModel;
		pem.getSectionEvent.subscribe( pev.renderEdit, pev, true );
		
		// This handles the case where data for the current page model has changed.
		var onInputChange = function( e, obj ) {
			
			target = Event.getTarget( e );
			if( Dom.hasClass( target, "papyrus-editor-can-alter-state-field" ) ) {
				obj.alteredStateEvent.fire();
			}
			
		};
		
		// Event delgation
		YAHOO.util.Event.addListener( document.body, "change", onInputChange, E );
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditor.init, YAHOO.widget.papyrus.SectionEditor, true );

YAHOO.register( "papyrussectioneditor", YAHOO.widget.papyrus.SectionEditor, { version: "0.1", build: "1" } );