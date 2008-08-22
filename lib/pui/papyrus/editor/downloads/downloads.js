/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Dom = YAHOO.util.Dom;
	
	var Downloads = function( attributes ) {
		this.init( attributes );
	};

	Downloads.prototype = {
		
		init : function( attributes ) {	

			var section_id = ( attributes.hasOwnProperty( "section_id" ) ? attributes.section_id : null ),
				downloads = ( attributes.hasOwnProperty( "downloads" ) ? attributes.downloads : null ), // This property should be a collection of instantiated download objects instead of just the json.
				sort = [];

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getDownloads = function() { return downloads; };
			
			this.setDownloads = function( _downloads ) { downloads = _downloads; };
			
			this.getSort = function() { return sort; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			

			this.setPropertiesFromForm = function() {

				var listEl = Dom.get( "papyrus-editor-downloads-list" ),
					listItems = Dom.getChildren( listEl );					
					
				for( var i = 0; i < listItems.length; i++ ) {
					var partial_match = /\bdownload.*/.exec( listItems[ i ].className )[ 0 ];
					var download_id = /[0-9]+/.exec( partial_match )[0];
					sort[ i ] = { id : download_id, sort_order : i + 1 };
				}
			};
			
			this.valid = function() { return true; };
			
		},
		
		
		
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), downloads : this.getDownloads() }; }
	};
	
	
	YAHOO.widget.papyrus.Downloads = Downloads;
	
}() );

YAHOO.register( "papyrusdownloads", YAHOO.widget.papyrus.Downloads, { version: "0.1", build: "1" } );