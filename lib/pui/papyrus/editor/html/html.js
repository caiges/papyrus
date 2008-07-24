/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var HTML = function( attributes ) {
		this.init( attributes );
	};

	HTML.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				markup = ( attributes.hasOwnProperty( "markup" ) ? attributes.markup : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null );
				
			this.getId = function() { return id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };
			
			this.getMarkup = function() { return markup; };

			this.setMarkup = function( _markup ) { markup = _markup; };
			
			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "title => " + this.getTitle() + ", is_active => " + this.getIsActive(); },
		
		toLiteral : function() { return { id : this.getId(), title : this.getTitle(), markup : this.getMarkup(), is_active : this.getIsActive() }; }
		
	};
	
	
	YAHOO.widget.papyrus.HTML = HTML;
	
}() );

YAHOO.register( "papyrushtml", YAHOO.widget.papyrus.HTML, { version: "0.1", build: "1" } );