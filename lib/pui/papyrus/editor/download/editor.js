/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditor = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		E = p.Editor,
		Event = YAHOO.util.Event,
		Util = YAHOO.util,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
		
	this.initEvent = new Util.CustomEvent( "initDownloadEditorEvent", this );
	
	this.init = function() {
		
		var name = "Download";
		
		var contentType = "download";
		
		this.getName = function() { return name; };
		
		this.getDescriptiveName = function() { return p.DownloadEditorModel.getDownload().getTitle(); };
		
		this.getContentType = function() { return contentType; };
		
		E.registerEditor( contentType, YAHOO.widget.papyrus.DownloadEditor );
		
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadEditorModel.init, YAHOO.widget.papyrus.DownloadEditorModel, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadEditorController.init, YAHOO.widget.papyrus.DownloadEditorController, true );
		this.initEvent.subscribe( YAHOO.widget.papyrus.DownloadEditorView.init, YAHOO.widget.papyrus.DownloadEditorView, true );
		this.initEvent.fire();
		this.controller = YAHOO.widget.papyrus.DownloadEditorController;
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.DownloadEditor.init, YAHOO.widget.papyrus.DownloadEditor, true );

YAHOO.register( "papyrusdownloadeditor", YAHOO.widget.papyrus.DownloadEditor, { version: "0.1", build: "1" } );