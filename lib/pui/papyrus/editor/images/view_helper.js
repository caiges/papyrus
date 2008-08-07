/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ImagesEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom;
	
	this.init = function() {	
		
	};
	
	this.initImagesListDragDrop = function() {
		
		sortableImagesList = new YAHOO.widget.SortableList( "papyrus-editor-images-list" );
		sortableImagesList.init();
		
	};
	
};

YAHOO.register( "papyrusimageseditorviewhelper", YAHOO.widget.papyrus.ImagesEditorViewHelper, { version: "0.1", build: "1" } );