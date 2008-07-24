/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionsEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom;
	
	this.init = function() {	
		
	};
	
	this.initSectionListDragDrop = function() {
		
		var sectionListEl = Dom.get( "papyrus-editor-section-list" );
		sortableSectionList = new YAHOO.widget.SortableList( "papyrus-editor-section-list" );
		sortableSectionList.init();
		
	};
	
};

YAHOO.register( "papyrussectionseditorviewhelper", YAHOO.widget.papyrus.SectionsEditorViewHelper, { version: "0.1", build: "1" } );