/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Downloads = function( attributes ) {
		this.init( attributes );
	};

	Downloads.prototype = {
		
		init : function( attributes ) {	

			var section_id = ( attributes.hasOwnProperty( "section_id" ) ? attributes.section_id : null ),
				downloads = ( attributes.hasOwnProperty( "downloads" ) ? attributes.downloads : null ); // This property should be a collection of instantiated download objects instead of just the json.

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getDownloads = function() { return downloads; };
			
			this.setDownloads = function( _downloads ) { downloads = _downloads; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), downloads : this.getDownloads() }; }
	};
	
	
	YAHOO.widget.papyrus.Downloads = Downloads;
	
}() );

YAHOO.register( "papyrusdownloads", YAHOO.widget.papyrus.Downloads, { version: "0.1", build: "1" } );