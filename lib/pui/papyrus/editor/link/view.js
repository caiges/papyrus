/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinkEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderLinkEditEvent = new Util.CustomEvent( "renderLinkEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initContentListDragDrop action.
		//this.subscribedInitLinkEditor = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.LinkEditorModel;
			VH = p.LinkEditorViewHelper;
			panel = E.getPanel();
		/*
		if( this.subscribedInitLinkEditor === false ) {
			this.renderLinkEditEvent.subscribe( VH.initLinkEditor, VH, true );
			this.subscribedInitLinkEditor = true;
		}
		*/
		
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.PageEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionEditor.getContentType() );
		E.appendEditorToBreadCrumb( M.getLink().getId(), p.LinkEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-link-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-link-view-sidebar-container"><div id="papyrus-editor-link-view-sidebar-options-container"></div><div id="papyrus-editor-link-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-link-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/link/views/edit.ejs'} ).render( M.getLink().toLiteral() );
		Dom.get( "papyrus-editor-link-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/link/views/options.ejs'} ).render( M.getLink().toLiteral() );
		Dom.get( "papyrus-editor-link-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderLinkEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyruslinkeditorview", YAHOO.widget.papyrus.LinkEditorView, { version: "0.1", build: "1" } );