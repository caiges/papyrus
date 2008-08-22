/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Sections = function( attributes ) {
		this.init( attributes );
	};

	Sections.prototype = {
		
		init : function( attributes ) {	

			var page_id = ( attributes.hasOwnProperty( "page_id" ) ? attributes.page_id : null ),
				sections = ( attributes.hasOwnProperty( "sections" ) ? attributes.sections : null ),
				sort = [];
				
			this.getPageId = function() { return page_id; };

			this.setPageId = function( _page_id ) { page_id = _page_id; };
			
			this.getSections = function() { return sections; };
			
			this.setSections = function( _sections ) { sections = _sections; };
			
			this.getSort = function() { return sort; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			

			this.setPropertiesFromForm = function() {

				var listEl = Dom.get( "papyrus-editor-section-list" ),
					listItems = Dom.getChildren( listEl );					
					
				for( var i = 0; i < listItems.length; i++ ) {
					var partial_match = /\bsection.*/.exec( listItems[ i ].className )[ 0 ];
					var section_id = /[0-9]+/.exec( partial_match )[0];
					sort[ i ] = { id : section_id, sort_order : i + 1 };
				}
			};
			
			this.valid = function() { return true; };
			
		},
				
		toString : function() { return "page_id => " + this.getPageId(); },
		
		toLiteral : function() { return { page_id : this.getPageId(), sections : this.getSections() }; }
	};
	
	
	YAHOO.widget.papyrus.Sections = Sections;
	
}() );

YAHOO.register( "papyrussections", YAHOO.widget.papyrus.Sections, { version: "0.1", build: "1" } );