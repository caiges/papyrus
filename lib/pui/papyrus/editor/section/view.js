/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderSectionEditEvent = new Util.CustomEvent( "renderSectionEditEvent" );
	
	this.init = function() {
			
		// Boolean that determines if we've subscribed the initContentListDragDrop action.
		this.subscribedInitContentListDragDrop = false;
		
	};
			
	this.renderEdit = function() {
		
		p = YAHOO.widget.papyrus;
		E = p.Editor;
		SM = p.SectionEditorModel;
		VH = p.SectionEditorViewHelper;
		panel = E.getPanel();
		
		if( this.subscribedInitContentListDragDrop === false ) {
			this.renderSectionEditEvent.subscribe( VH.initContentListDragDrop, VH, true );
			this.subscribedInitContentListDragDrop = true;
		}
		
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.PageEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		E.appendEditorToBreadCrumb( SM.getSection().getId(), p.SectionEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-section-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-section-view-sidebar-container"><div id="papyrus-editor-section-view-sidebar-options-container"></div><div id="papyrus-editor-section-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-section-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/section/views/edit.ejs'} ).render( p.SectionEditorModel.getSection().toLiteral() );
		Dom.get( "papyrus-editor-section-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/section/views/options.ejs'} ).render( {} );
		
		this.renderSectionEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrussectioneditorview", YAHOO.widget.papyrus.SectionEditorView, { version: "0.1", build: "1" } );