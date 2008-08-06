/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinkEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initLinkEditorEvent", this );
	
	this.init = function() {
		
		var name = "Link";
		
		var contentType = "link";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.LinkEditorModel.getLink().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( contentType, YAHOO.widget.papyrus.LinkEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinkEditorModel.init, YAHOO.widget.papyrus.LinkEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinkEditorController.init, YAHOO.widget.papyrus.LinkEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.LinkEditorView.init, YAHOO.widget.papyrus.LinkEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.LinkEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.LinkEditor.init, YAHOO.widget.papyrus.LinkEditor, true );

YAHOO.register( "papyruslinkeditor", YAHOO.widget.papyrus.LinkEditor, { version: "0.1", build: "1" } );