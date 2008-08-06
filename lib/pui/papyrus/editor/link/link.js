/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Link = function( attributes ) {
		this.init( attributes );
	};

	Link.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				url = ( attributes.hasOwnProperty( "url" ) ? attributes.url : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null ),
				is_internal = ( attributes.hasOwnProperty( "is_internal" ) ? attributes.is_internal : null );
				
			this.getId = function() { return id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };
			
			this.getUrl = function() { return url; };

			this.setUrl = function( _url ) { url = _url; };
			
			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
			this.getIsInternal = function() { return is_internal; };

			this.setIsInternal = function( _is_internal ) { is_internal = _is_internal; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "title => " + this.getTitle() + ", is_active => " + this.getIsActive(); },
		
		toLiteral : function() { return { id : this.getId(), title : this.getTitle(), url : this.getUrl(), is_active : this.getIsActive(), is_internal : this.getIsInternal }; }
		
	};
	
	
	YAHOO.widget.papyrus.Link = Link;
	
}() );

YAHOO.register( "papyruslink", YAHOO.widget.papyrus.Link, { version: "0.1", build: "1" } );