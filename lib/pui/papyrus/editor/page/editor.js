/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initPageEditorEvent", this );
	
	this.init = function() {
		
		var name = "Page Editor";
		
		var contentType = "page";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.PageEditorModel.getPage().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( contentType, YAHOO.widget.papyrus.PageEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorModel.init, YAHOO.widget.papyrus.PageEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorController.init, YAHOO.widget.papyrus.PageEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.PageEditorView.init, YAHOO.widget.papyrus.PageEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.PageEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.PageEditor.init, YAHOO.widget.papyrus.PageEditor, true );

YAHOO.register( "papyruspageeditor", YAHOO.widget.papyrus.PageEditor, { version: "0.1", build: "1" } );