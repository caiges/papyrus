/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditor = new function() { 
	
	var	E = YAHOO.widget.papyrus.Editor,
		Event = YAHOO.util.Event,
		Dom = YAHOO.util.Dom,
		Module = YAHOO.widget.Module;
	
	this.init = function() {
		
		E.registerEditor( 'page', YAHOO.widget.papyrus.PageEditor );
		
		//var tmp = [];
			
		//this.doSomething();
	};
	
	this.load = function() {
		
		panel = E.getPanel();
		panel.setHeader( 'Papyrus - Editing Page' );
		content = '<div id="papyrus-editor-page-view-overview-container"></div>';
		panel.setBody( content );
		this.views.overview();
	};
	
	this.controller = {
		
		
		
	};
	
	this.models = {
		
	};
	
	this.views = {
		
		overview : function() {
			new EJS( { url : '/lib/pui/papyrus/editor/page/views/overview.ejs' } ).update( 'papyrus-editor-page-view-overview-container', '/mocks/page/0.json' );
		}
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.PageEditor.init );

YAHOO.register( "papyruspageeditor", YAHOO.widget.papyrus.PageEditor, { version: "0.1", build: "1" } );