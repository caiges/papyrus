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

			var title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null );

			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };

			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "title => " + this.getTitle() + ", is_active => " + this.getIsActive(); }
		
	};
	
	
	YAHOO.widget.papyrus.Sections = Sections;
	
}() );

YAHOO.register( "papyrussections", YAHOO.widget.papyrus.Sections, { version: "0.1", build: "1" } );