/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderLinksEditEvent = new Util.CustomEvent( "renderLinksEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initSectionListDragDrop action.
		this.subscribedInitLinksListDragDrop = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.LinksEditorModel,
			VH = p.LinksEditorViewHelper,
			panel = E.getPanel();
		
		if( this.subscribedInitLinksListDragDrop === false ) {
			this.renderLinksEditEvent.subscribe( VH.initLinksListDragDrop, VH, true );
			this.subscribedInitLinksListDragDrop = true;
		};
		
		// We get the section id from the links model.
		E.appendEditorToBreadCrumb( M.getLinks().getSectionId(), p.LinksEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-links-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-links-view-sidebar-container"><div id="papyrus-editor-links-view-sidebar-options-container"></div><div id="papyrus-editor-links-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-links-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/links/views/edit.ejs'} ).render( p.LinksEditorModel.getLinks().toLiteral() );
		Dom.get( "papyrus-editor-links-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/links/views/options.ejs'} ).render( {} );
		
		this.renderLinksEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyruslinkseditorview", YAHOO.widget.papyrus.LinksEditorView, { version: "0.1", build: "1" } );