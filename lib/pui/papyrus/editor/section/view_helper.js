/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.SectionEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom,
		SM = p.SectionEditorModel;
	
	this.init = function() {	
		
	};
	
	this.initContentListDragDrop = function() {
		
		var contentListEl = Dom.get( "papyrus-editor-content-list" );
		sortableContentList = new YAHOO.widget.SortableList( contentListEl );
		sortableContentList.init();
		
	};
	
};

YAHOO.register( "papyrussectioneditorviewhelper", YAHOO.widget.papyrus.SectionEditorViewHelper, { version: "0.1", build: "1" } );