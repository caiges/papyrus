/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

( function() { 
	
	var Sections = function( attributes ) {
		this.init( attributes );
	};

	Sections.prototype = {
		
		init : function( attributes ) {	

			var page_id = ( attributes.hasOwnProperty( "page_id" ) ? attributes.page_id : null ),
				sections = ( attributes.hasOwnProperty( "sections" ) ? attributes.sections : null );

			this.getPageId = function() { return page_id; };

			this.setPageId = function( _page_id ) { page_id = _page_id; };
			
			this.getSections = function() { return sections; };
			
			this.setSections = function( _sections ) { sections = _sections; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "page_id => " + this.getPageId(); },
		
		toLiteral : function() { return { page_id : this.getPageId(), sections : this.getSections() }; }
	};
	
	
	YAHOO.widget.papyrus.Sections = Sections;
	
}() );

YAHOO.register( "papyrussections", YAHOO.widget.papyrus.Sections, { version: "0.1", build: "1" } );