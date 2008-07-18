/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Bubbling = YAHOO.Bubbling,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initSectionsEditorEvent", this );
	
	this.init = function() {
		
		var name = "Sections Editor";
		
		var contentType = "sections";
		
		this.getName = function() { return name; };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( 'sections', YAHOO.widget.papyrus.SectionsEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionsEditorModel.init, YAHOO.widget.papyrus.SectionsEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionsEditorController.init, YAHOO.widget.papyrus.SectionsEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionsEditorView.init, YAHOO.widget.papyrus.SectionsEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.SectionsEditorController;
		
		this.initEvents();
		
	};
	
	this.initEvents = function() {
	
		// edit events
		pev = YAHOO.widget.papyrus.SectionsEditorView;
		pem = YAHOO.widget.papyrus.SectionsEditorModel;
		pem.getSectionsEvent.subscribe( pev.renderEdit, pev, true );
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.SectionsEditor.init, YAHOO.widget.papyrus.SectionsEditor, true );

YAHOO.register( "papyrussectionseditor", YAHOO.widget.papyrus.SectionsEditor, { version: "0.1", build: "1" } );