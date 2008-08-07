/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImagesEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initImagesEditorEvent", this );
	
	this.init = function() {
		
		var name = "Images";
		
		var contentType = "images";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return ""; };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( 'images', YAHOO.widget.papyrus.ImagesEditor );

		this.initEvent.subscribe( YAHOO.widget.papyrus.ImagesEditorModel.init, YAHOO.widget.papyrus.ImagesEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImagesEditorController.init, YAHOO.widget.papyrus.ImagesEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImagesEditorView.init, YAHOO.widget.papyrus.ImagesEditorView, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.ImagesEditorViewHelper.init, YAHOO.widget.papyrus.ImagesEditorViewHelper, true );
		this.initEvent.fire();
		this.controller = p.ImagesEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.ImagesEditor.init, YAHOO.widget.papyrus.ImagesEditor, true );

YAHOO.register( "papyrusimageseditor", YAHOO.widget.papyrus.ImagesEditor, { version: "0.1", build: "1" } );