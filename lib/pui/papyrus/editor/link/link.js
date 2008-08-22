/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var V = new YAHOO.widget.papyrus.Validator();
	
	var Link = function( attributes ) {
		this.init( attributes );
	};

	Link.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				url = ( attributes.hasOwnProperty( "url" ) ? attributes.url : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null ),
				is_internal = ( attributes.hasOwnProperty( "is_internal" ) ? attributes.is_internal : null ),
				_errors = [];
				
			this.getId = function() { return id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };
			
			this.getUrl = function() { return url; };

			this.setUrl = function( _url ) { url = _url; };
			
			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
			this.getIsInternal = function() { return is_internal; };

			this.setIsInternal = function( _is_internal ) { is_internal = _is_internal; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			
			
			var properties = [ { el : "link[title]", getter : this.getTitle, setter : this.setTitle },
			 				   { el : "link[url]", getter : this.getUrl, setter : this.setUrl },
							   { el : "link[is_active]", getter : this.getIsActive, setter : this.setIsActive },
							   { el : "link[is_internal]", getter : this.getIsInternal, setter : this.setIsInternal },
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
			var validations = [ { value : this.getTitle, el : "link[title]", property : "Title", type : "string", length : 2 },
								{ value : this.getUrl, el : "link[uri]", property : "URL", type : "string", length : 255 },
								{ value : this.getIsActive, el : "link[is_active]", property : "Is Active", type : "boolean" },
								{ value : this.getIsInternal, el : "link[is_internal]", property : "Is Internal", type : "boolean" }
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
		
		valid : function() { return true; },
		
		toString : function() { return "title => " + this.getTitle() + ", is_active => " + this.getIsActive(); },
		
		toLiteral : function() { return { id : this.getId(), title : this.getTitle(), url : this.getUrl(), is_active : this.getIsActive(), is_internal : this.getIsInternal }; }
		
	};
	
	
	YAHOO.widget.papyrus.Link = Link;
	
}() );

YAHOO.register( "papyruslink", YAHOO.widget.papyrus.Link, { version: "0.1", build: "1" } );