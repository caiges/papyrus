/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImageEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderImageEditEvent = new Util.CustomEvent( "renderImageEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initContentListDragDrop action.
		//this.subscribedInitImageEditor = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.ImageEditorModel;
			VH = p.ImageEditorViewHelper;
			panel = E.getPanel();
		/*
		if( this.subscribedInitImageEditor === false ) {
			this.renderImageEditEvent.subscribe( VH.initImageEditor, VH, true );
			this.subscribedInitImageEditor = true;
		}
		*/
		
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.PageEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionEditor.getContentType() );
		E.appendEditorToBreadCrumb( M.getImage().getId(), p.ImageEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-image-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-image-view-sidebar-container"><div id="papyrus-editor-image-view-sidebar-options-container"></div><div id="papyrus-editor-image-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-image-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/image/views/edit.ejs'} ).render( M.getImage().toLiteral() );
		Dom.get( "papyrus-editor-image-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/image/views/options.ejs'} ).render( M.getImage().toLiteral() );
		Dom.get( "papyrus-editor-image-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderImageEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrusimageeditorview", YAHOO.widget.papyrus.ImageEditorView, { version: "0.1", build: "1" } );