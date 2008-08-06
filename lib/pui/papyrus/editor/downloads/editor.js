/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadsEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initDownloadsEditorEvent", this );
	
	this.init = function() {
		
		var name = "Downloads";
		
		var contentType = "downloads";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return ""; };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( 'downloads', YAHOO.widget.papyrus.DownloadsEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadsEditorModel.init, YAHOO.widget.papyrus.DownloadsEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadsEditorController.init, YAHOO.widget.papyrus.DownloadsEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadsEditorView.init, YAHOO.widget.papyrus.DownloadsEditorView, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadsEditorViewHelper.init, YAHOO.widget.papyrus.DownloadsEditorViewHelper, true );
		this.initEvent.fire();
		this.controller = p.DownloadsEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.DownloadsEditor.init, YAHOO.widget.papyrus.DownloadsEditor, true );

YAHOO.register( "papyrusdownloadseditor", YAHOO.widget.papyrus.DownloadsEditor, { version: "0.1", build: "1" } );