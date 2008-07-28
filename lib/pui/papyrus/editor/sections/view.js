/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderSectionsEditEvent = new Util.CustomEvent( "renderSectionsEditEvent" );
	
	this.init = function() {	
		
		// Boolean that determines if we've subscribed the initSectionListDragDrop action.
		this.subscribedInitSectionListDragDrop = false;
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.SectionsEditorModel,
			VH = p.SectionsEditorViewHelper,
			panel = E.getPanel();
		
		if( this.subscribedInitSectionListDragDrop === false ) {
			this.renderSectionsEditEvent.subscribe( VH.initSectionListDragDrop, VH, true );
			this.subscribedInitSectionListDragDrop = true;
		};
		
		// We get the page id from the editor model.
		E.appendEditorToBreadCrumb( E.getFromModel( "page_id" ), p.SectionsEditor.getContentType() );
		
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-sections-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-sections-view-sidebar-container"><div id="papyrus-editor-sections-view-sidebar-options-container"></div><div id="papyrus-editor-sections-view-sidebar-tags-container"></div></div></div>' );
		Dom.get( "papyrus-editor-sections-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/sections/views/edit.ejs'} ).render( p.SectionsEditorModel.getSections().toLiteral() );
		Dom.get( "papyrus-editor-sections-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/sections/views/options.ejs'} ).render( {} );
		
		this.renderSectionsEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrussectionseditorview", YAHOO.widget.papyrus.SectionsEditorView, { version: "0.1", build: "1" } );