/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initHTMLEditorEvent", this );
	
	this.init = function() {
		
		var name = "HTML";
		
		var contentType = "html";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.HTMLEditorModel.getHTML().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( contentType, YAHOO.widget.papyrus.HTMLEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.HTMLEditorModel.init, YAHOO.widget.papyrus.HTMLEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.HTMLEditorController.init, YAHOO.widget.papyrus.HTMLEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.HTMLEditorView.init, YAHOO.widget.papyrus.HTMLEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.HTMLEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.HTMLEditor.init, YAHOO.widget.papyrus.HTMLEditor, true );

YAHOO.register( "papyrushtmleditor", YAHOO.widget.papyrus.HTMLEditor, { version: "0.1", build: "1" } );