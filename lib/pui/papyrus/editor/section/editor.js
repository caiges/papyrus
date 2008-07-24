/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
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
		
		var name = "Section";
		
		var contentType = "section";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.SectionEditorModel.getSection().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( 'section', YAHOO.widget.papyrus.SectionEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorModel.init, YAHOO.widget.papyrus.SectionEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorController.init, YAHOO.widget.papyrus.SectionEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorView.init, YAHOO.widget.papyrus.SectionEditorView, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditorViewHelper.init, YAHOO.widget.papyrus.SectionEditorViewHelper, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.SectionEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditor.init, YAHOO.widget.papyrus.SectionEditor, true );

YAHOO.register( "papyrussectioneditor", YAHOO.widget.papyrus.SectionEditor, { version: "0.1", build: "1" } );