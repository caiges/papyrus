/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initLinksEditorEvent", this );
	
	this.init = function() {
		
		var name = "Links";
		
		var contentType = "links";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return ""; };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( 'links', YAHOO.widget.papyrus.LinksEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinksEditorModel.init, YAHOO.widget.papyrus.LinksEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinksEditorController.init, YAHOO.widget.papyrus.LinksEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinksEditorView.init, YAHOO.widget.papyrus.LinksEditorView, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinksEditorViewHelper.init, YAHOO.widget.papyrus.LinksEditorViewHelper, true );
		this.initEvent.fire();
		this.controller = p.LinksEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.LinksEditor.init, YAHOO.widget.papyrus.LinksEditor, true );

YAHOO.register( "papyruslinkseditor", YAHOO.widget.papyrus.LinksEditor, { version: "0.1", build: "1" } );