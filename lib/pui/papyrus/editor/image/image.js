/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var V = new YAHOO.widget.papyrus.Validator();
	
	var Image = function( attributes ) {
		this.init( attributes );
	};

	Image.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				uri = ( attributes.hasOwnProperty( "uri" ) ? attributes.uri : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null ),
				is_internal = ( attributes.hasOwnProperty( "is_internal" ) ? attributes.is_internal : null ),
				_errors = [];
				
			this.getId = function() { return id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };
			
			this.getUri = function() { return uri; };

			this.setUri = function( _uri ) { uri = _uri; };
			
			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
			this.getIsInternal = function() { return is_internal; };

			this.setIsInternal = function( _is_internal ) { is_internal = _is_internal; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			
			
			var properties = [ { el : "image[title]", getter : this.getTitle, setter : this.setTitle },
			 				   { el : "image[uri]", getter : this.getUri, setter : this.setUri },
							   { el : "image[is_active]", getter : this.getIsActive, setter : this.setIsActive },
							   { el : "image[is_internal]", getter : this.getIsInternal, setter : this.setIsInternal },
							];
			
			this.setPropertiesFromForm = function() {
			
				for( var i = 0; i < properties.length; i++ ) {
					properties[ i ].setter( Dom.get( properties[ i ].el ).value );
				}
				
			};
			
			this.getErrors = function() { return _errors; };
			
			/*
			 *
			 * Here's where we'll setup the validation.
			 *
			 */
			
			// Validation properties.
			var validations = [ { value : this.getTitle, el : "image[title]", property : "Title", type : "string", length : 2 },
								{ value : this.getUri, el : "image[uri]", property : "URI", type : "string", length : 255 },
								{ value : this.getIsActive, el : "image[is_active]", property : "Is Active", type : "boolean" },
								{ value : this.getIsInternal, el : "image[is_internal]", property : "Is Internal", type : "boolean" }
							  ];
			
			this.getValidations = function() { return validations; };
			
			// Setup some events.
			
			// Validates this object.
			this.valid = function() { 
				
				// Validate and set error(s) if any.
				var validation_result = V.validate( validations ); 
				
				_errors = validation_result.errors;
				return validation_result.valid;

			};
			
		},
				
		toString : function() { return "title => " + this.getTitle() + ", is_active => " + this.getIsActive(); },
		
		toLiteral : function() { return { id : this.getId(), title : this.getTitle(), uri : this.getUri(), is_active : this.getIsActive(), is_internal : this.getIsInternal }; }
		
	};
	
	
	YAHOO.widget.papyrus.Image = Image;
	
}() );

YAHOO.register( "papyrusimage", YAHOO.widget.papyrus.Image, { version: "0.1", build: "1" } );