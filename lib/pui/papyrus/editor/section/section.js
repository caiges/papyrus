/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

YAHOO.widget.papyrus.SectionEditor = new function() { 
	
	var	E = YAHOO.widget.papyrus.Editor,
		Event = YAHOO.util.Event,
		Dom = YAHOO.util.Dom,
		Anim = YAHOO.util.Anim,
		Easing = YAHOO.util.Easing;
	
	this.init = function() {
		
		E.registerEditor( 'section', YAHOO.widget.papyrus.SectionEditor );
		
		//var tmp = [];
			
		//this.doSomething();
	};
	
	this.load = function() {
		
		panel = E.getPanel();
		panel.setHeader( 'Papyrus - Editing Section' );
		content = '<strong>This is the section editor!</strong>';
		panel.setBody( content );
		
	};
	
};

YAHOO.widget.papyrus.Editor.initEvent.subscribe( YAHOO.widget.papyrus.SectionEditor.init );

YAHOO.register( "papyrussectioneditor", YAHOO.widget.papyrus.SectionEditor, { version: "0.1", build: "1" } );