/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Images = function( attributes ) {
		this.init( attributes );
	};

	Images.prototype = {
		
		init : function( attributes ) {	

			var section_id = ( attributes.hasOwnProperty( "section_id" ) ? attributes.section_id : null ),
				images = ( attributes.hasOwnProperty( "images" ) ? attributes.images : null ); // This property should be a collection of instantiated image objects instead of just the json.

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getImages = function() { return images; };
			
			this.setImages = function( _images ) { images = _images; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), images : this.getImages() }; }
	};
	
	
	YAHOO.widget.papyrus.Images = Images;
	
}() );

YAHOO.register( "papyrusimages", YAHOO.widget.papyrus.Images, { version: "0.1", build: "1" } );