/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImageEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initImageEditorEvent", this );
	
	this.init = function() {
		
		var name = "Image";
		
		var contentType = "image";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.ImageEditorModel.getImage().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( contentType, YAHOO.widget.papyrus.ImageEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImageEditorModel.init, YAHOO.widget.papyrus.ImageEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImageEditorController.init, YAHOO.widget.papyrus.ImageEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImageEditorView.init, YAHOO.widget.papyrus.ImageEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.ImageEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.ImageEditor.init, YAHOO.widget.papyrus.ImageEditor, true );

YAHOO.register( "papyrusimageeditor", YAHOO.widget.papyrus.ImageEditor, { version: "0.1", build: "1" } );