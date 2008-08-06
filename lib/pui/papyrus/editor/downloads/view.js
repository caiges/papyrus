/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadsEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderDownloadsEditEvent = new Util.CustomEvent( "renderDownloadsEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initSectionListDragDrop action.
		this.subscribedInitDownloadsListDragDrop = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.DownloadsEditorModel,
			VH = p.DownloadsEditorViewHelper,
			panel = E.getPanel();
		
		if( this.subscribedInitDownloadsListDragDrop === false ) {
			this.renderDownloadsEditEvent.subscribe( VH.initDownloadsListDragDrop, VH, true );
			this.subscribedInitDownloadsListDragDrop = true;
		};
		
		// We get the section id from the links model.
		E.appendEditorToBreadCrumb( M.getDownloads().getSectionId(), p.DownloadsEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-downloads-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-downloads-view-sidebar-container"><div id="papyrus-editor-downloads-view-sidebar-options-container"></div><div id="papyrus-editor-downloads-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-downloads-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/downloads/views/edit.ejs'} ).render( p.DownloadsEditorModel.getDownloads().toLiteral() );
		Dom.get( "papyrus-editor-downloads-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/downloads/views/options.ejs'} ).render( {} );
		
		this.renderDownloadsEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrusdownloadseditorview", YAHOO.widget.papyrus.DownloadsEditorView, { version: "0.1", build: "1" } );