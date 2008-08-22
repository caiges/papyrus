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
				images = ( attributes.hasOwnProperty( "images" ) ? attributes.images : null ), // This property should be a collection of instantiated image objects instead of just the json.
				sort = [];

			this.getSectionId = function() { return section_id; };

			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getImages = function() { return images; };
			
			this.setImages = function( _images ) { images = _images; };
			
			this.getSort = function() { return sort; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			

			this.setPropertiesFromForm = function() {

				var listEl = Dom.get( "papyrus-editor-images-list" ),
					listItems = Dom.getChildren( listEl );					
					
				for( var i = 0; i < listItems.length; i++ ) {
					var partial_match = /\bimage.*/.exec( listItems[ i ].className )[ 0 ];
					var image_id = /[0-9]+/.exec( partial_match )[0];
					sort[ i ] = { id : image_id, sort_order : i + 1 };
				}
			};
			
			this.valid = function() { return true; };
			
		},
				
		toString : function() { return "section_id => " + this.getSectionId(); },
		
		toLiteral : function() { return { section_id : this.getSectionId(), images : this.getImages() }; }
	};
	
	
	YAHOO.widget.papyrus.Images = Images;
	
}() );

YAHOO.register( "papyrusimages", YAHOO.widget.papyrus.Images, { version: "0.1", build: "1" } );