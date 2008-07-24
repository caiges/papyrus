/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderHTMLEditEvent = new Util.CustomEvent( "renderHTMLEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initContentListDragDrop action.
		this.subscribedInitHTMLEditor = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.HTMLEditorModel;
			VH = p.HTMLEditorViewHelper;
			panel = E.getPanel();
		
		if( this.subscribedInitHTMLEditor === false ) {
			this.renderHTMLEditEvent.subscribe( VH.initHTMLEditor, VH, true );
			this.subscribedInitHTMLEditor = true;
		}
		
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.PageEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionEditor.getContentType() );
		E.appendEditorToBreadCrumb( M.getHTML().getId(), p.HTMLEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-html-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-html-view-sidebar-container"><div id="papyrus-editor-html-view-sidebar-options-container"></div><div id="papyrus-editor-html-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-html-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/html/views/edit.ejs'} ).render( M.getHTML().toLiteral() );
		Dom.get( "papyrus-editor-html-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/html/views/options.ejs'} ).render( M.getHTML().toLiteral() );
		Dom.get( "papyrus-editor-html-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderHTMLEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrushtmleditorview", YAHOO.widget.papyrus.HTMLEditorView, { version: "0.1", build: "1" } );