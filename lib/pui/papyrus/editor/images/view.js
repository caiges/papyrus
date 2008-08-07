/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImagesEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderImagesEditEvent = new Util.CustomEvent( "renderImagesEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initSectionListDragDrop action.
		this.subscribedInitImagesListDragDrop = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.ImagesEditorModel,
			VH = p.ImagesEditorViewHelper,
			panel = E.getPanel();
		
		if( this.subscribedInitImagesListDragDrop === false ) {
			this.renderImagesEditEvent.subscribe( VH.initImagesListDragDrop, VH, true );
			this.subscribedInitImagesListDragDrop = true;
		};
		
		// We get the section id from the links model.
		E.appendEditorToBreadCrumb( M.getImages().getSectionId(), p.ImagesEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-images-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-images-view-sidebar-container"><div id="papyrus-editor-images-view-sidebar-options-container"></div><div id="papyrus-editor-images-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-images-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/images/views/edit.ejs'} ).render( p.ImagesEditorModel.getImages().toLiteral() );
		Dom.get( "papyrus-editor-images-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/images/views/options.ejs'} ).render( {} );
		
		this.renderImagesEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrusimageseditorview", YAHOO.widget.papyrus.ImagesEditorView, { version: "0.1", build: "1" } );