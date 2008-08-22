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
				links = ( attributes.hasOwnProperty( "links" ) ? attributes.links : null ), // This property should be a collection of instantiated link objects instead of just the json.
				sort = [];

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getLinks = function() { return links; };
			
			this.setLinks = function( _links ) { links = _links; };
			
			this.getSort = function() { return sort; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			

			this.setPropertiesFromForm = function() {

				var listEl = Dom.get( "papyrus-editor-links-list" ),
					listItems = Dom.getChildren( listEl );					
					
				for( var i = 0; i < listItems.length; i++ ) {
					var partial_match = /\blink.*/.exec( listItems[ i ].className )[ 0 ];
					var link_id = /[0-9]+/.exec( partial_match )[0];
					sort[ i ] = { id : link_id, sort_order : i + 1 };
				}
			};
			
			this.valid = function() { return true; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), links : this.getLinks() }; }
	};
	
	
	YAHOO.widget.papyrus.Links = Links;
	
}() );

YAHOO.register( "papyruslinks", YAHOO.widget.papyrus.Links, { version: "0.1", build: "1" } );