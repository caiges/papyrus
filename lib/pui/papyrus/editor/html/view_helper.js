/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.HTMLEditorViewHelper = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		util = YAHOO.util,
		Dom = util.Dom,
		HM = p.HTMLEditorModel;
	
	this.init = function() {	
		
	};
	
	this.initHTMLEditor = function() {
		
		var fckeditor = new FCKeditor( 'html[markup]' );
		fckeditor.BasePath = "/papyrus/lib/fckeditor/";
		fckeditor.Config[ "CustomConfigurationsPath" ] = "/papyrus/lib/pui/papyrus/editor/html/fckeditor_config.js?" + ( new Date() * 1 ) ;
		fckeditor.ReplaceTextarea();
		
		
	};
	
};

YAHOO.register( "papyrushtmleditorviewhelper", YAHOO.widget.papyrus.HTMLEditorViewHelper, { version: "0.1", build: "1" } );