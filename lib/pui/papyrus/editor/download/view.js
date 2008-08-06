/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderDownloadEditEvent = new Util.CustomEvent( "renderDownloadEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initContentListDragDrop action.
		//this.subscribedInitDownloadEditor = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.DownloadEditorModel;
			VH = p.DownloadEditorViewHelper;
			panel = E.getPanel();
		/*
		if( this.subscribedInitDownloadEditor === false ) {
			this.renderDownloadEditEvent.subscribe( VH.initDownloadEditor, VH, true );
			this.subscribedInitDownloadEditor = true;
		}
		*/
		
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.PageEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionEditor.getContentType() );
		E.appendEditorToBreadCrumb( M.getDownload().getId(), p.DownloadEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-download-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-download-view-sidebar-container"><div id="papyrus-editor-download-view-sidebar-options-container"></div><div id="papyrus-editor-download-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-download-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/download/views/edit.ejs'} ).render( M.getDownload().toLiteral() );
		Dom.get( "papyrus-editor-download-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/download/views/options.ejs'} ).render( M.getDownload().toLiteral() );
		Dom.get( "papyrus-editor-download-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderDownloadEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrusdownloadeditorview", YAHOO.widget.papyrus.DownloadEditorView, { version: "0.1", build: "1" } );