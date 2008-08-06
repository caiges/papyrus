/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Links = function( attributes ) {
		this.init( attributes );
	};

	Links.prototype = {
		
		init : function( attributes ) {	

			var section_id = ( attributes.hasOwnProperty( "section_id" ) ? attributes.section_id : null ),
				links = ( attributes.hasOwnProperty( "links" ) ? attributes.links : null ); // This property should be a collection of instantiated link objects instead of just the json.

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getLinks = function() { return links; };
			
			this.setLinks = function( _links ) { links = _links; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), links : this.getLinks() }; }
	};
	
	
	YAHOO.widget.papyrus.Links = Links;
	
}() );

YAHOO.register( "papyruslinks", YAHOO.widget.papyrus.Links, { version: "0.1", build: "1" } );