/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorView = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.renderSectionsEditEvent = new Util.CustomEvent( "renderSectionsEditEvent" );
	
	this.init = function() {	
		
	};
			
	this.renderEdit = function() {
		
		var p = YAHOO.widget.papyrus,
			E = p.Editor,
			M = p.SectionsEditorModel;
		
		panel = E.getPanel();
		
		E.appendEditorToBreadCrumb( p.PageEditorModel.getPage().getId(), p.SectionsEditor.getContentType() );
		//E.setEditorName( 'Sections Editor' );
		panel.setBody( '<div class="yui-gc"><div class="yui-u first"><div id="papyrus-editor-sections-view-edit-container"></div></div><div class="yui-u" id="papyrus-editor-sections-view-sidebar-container"><div id="papyrus-editor-sections-view-sidebar-options-container"></div><div id="papyrus-editor-sections-view-sidebar-tags-container"></div></div>' );
		Dom.get( "papyrus-editor-sections-view-edit-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/sections/views/edit.ejs'} ).render( p.SectionsEditorModel.getSections().toLiteral() );
		Dom.get( "papyrus-editor-sections-view-sidebar-options-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/sections/views/options.ejs'} ).render( {} );
		Dom.get( "papyrus-editor-sections-view-sidebar-tags-container" ).innerHTML = new EJS( { url : 'lib/pui/papyrus/editor/tags/views/tags.ejs'} ).render( {} );
		this.renderSectionsEditEvent.fire();
	
	};
	
};

YAHOO.register( "papyrussectionseditorview", YAHOO.widget.papyrus.SectionsEditorView, { version: "0.1", build: "1" } );