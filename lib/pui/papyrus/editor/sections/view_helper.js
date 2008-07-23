/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom;
	
	this.init = function() {	
		
	};
	
	this.initSectionListDragDrop = function() {
		
		var sectionListEl = Dom.get( "papyrus-editor-section-list" );
		/*
		var sectionListItemEls = Dom.getChildren( sectionListEl );
		console.log( sectionListItemEls );
		
		var dragDropElements = [];
		
		for( var i = 0; i < sectionListItemEls.length; i++ ) {
			dragDropElements[ i ] = new YAHOO.util.DD( sectionListItemEls[ i ].id, "papyrus-editor-section-list-dd-group" );
			dd = dragDropElements[ i ];
			dd.setXConstraint( 0, 0 );
			yUp = Dom.getY( sectionListItemEls[ i ] ) - Dom.getY( sectionListEl );
			yDown = ( ( Dom.getY( sectionListEl ) + parseInt( Dom.getStyle( sectionListEl, "height" ) ) ) - ( Dom.getY( sectionListItemEls[ i ] ) + parseInt( Dom.getStyle( sectionListItemEls[ i ], "height" ) ) ) );
			dd.setYConstraint( yUp, yDown );
		}
		*/
		sortableSectionList = new YAHOO.widget.SortableList( "papyrus-editor-section-list" );
		sortableSectionList.init();
		
	};
	
};

YAHOO.register( "papyrussectionseditorviewhelper", YAHOO.widget.papyrus.SectionsEditorViewHelper, { version: "0.1", build: "1" } );