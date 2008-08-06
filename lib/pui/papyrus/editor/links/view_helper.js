/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom;
	
	this.init = function() {	
		
	};
	
	this.initLinksListDragDrop = function() {
		
		sortableLinksList = new YAHOO.widget.SortableList( "papyrus-editor-links-list" );
		sortableLinksList.init();
		
	};
	
};

YAHOO.register( "papyruslinkseditorviewhelper", YAHOO.widget.papyrus.LinksEditorViewHelper, { version: "0.1", build: "1" } );