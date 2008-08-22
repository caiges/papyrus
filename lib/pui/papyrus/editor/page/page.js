/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var V = new YAHOO.widget.papyrus.Validator();
	
	var Page = function( attributes ) {
		this.init( attributes );
	};

	Page.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null ),
				_errors = [];
				
			this.getId = function() { return id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };

			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
			/*
			 *
			 * Here's where we'll setup properties for easy access to our properties.
			 *
			 */			
			
			var properties = [ { el : "page[title]", getter : this.getTitle, setter : this.setTitle },
							   { el : "page[is_active]", getter : this.getIsActive, setter : this.setIsActive }
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
			var validations = [ { value : this.getTitle, el : "page[title]", property : "Title", type : "string", length : 2 },
								{ value : this.getIsActive, el : "page[is_active]", property : "Is Active", type : "boolean" }
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
		
		toLiteral : function() { return { id : this.getId(), title : this.getTitle(), is_active : this.getIsActive() }; }
		
	};
	
	
	YAHOO.widget.papyrus.Page = Page;
	
}() );

YAHOO.register( "papyruspage", YAHOO.widget.papyrus.Page, { version: "0.1", build: "1" } );