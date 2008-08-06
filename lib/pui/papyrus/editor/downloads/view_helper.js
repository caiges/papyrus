/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.DownloadsEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom;
	
	this.init = function() {	
		
	};
	
	this.initDownloadsListDragDrop = function() {
		
		sortableDownloadsList = new YAHOO.widget.SortableList( "papyrus-editor-downloads-list" );
		sortableDownloadsList.init();
		
	};
	
};

YAHOO.register( "papyrusdownloadseditorviewhelper", YAHOO.widget.papyrus.DownloadsEditorViewHelper, { version: "0.1", build: "1" } );