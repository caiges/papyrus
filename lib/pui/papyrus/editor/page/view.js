/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.PageEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderPageEditEvent = new Util.CustomEvent( "renderPageEditEvent" );
	
	this.init = function() {	
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.PageEditorModel;
		
		panel = E.getPanel();
		E.appendEditorToBreadCrumb( M.getPage().getId(), p.PageEditor.getContentType() );
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-page-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-page-view-sidebar-container"><div id="papyrus-editor-page-view-sidebar-options-container"></div><div id="papyrus-editor-page-view-sidebar-tags-container"></div></div>' );
		Dom.get( "papyrus-editor-page-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/page/views/edit.ejs'} ).render( M.getPage().toLiteral() );
		Dom.get( "papyrus-editor-page-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/page/views/options.ejs'} ).render( M.getPage().toLiteral() );
		Dom.get( "papyrus-editor-page-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderPageEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyruspageeditorview", YAHOO.widget.papyrus.PageEditorView, { version: "0.1", build: "1" } );