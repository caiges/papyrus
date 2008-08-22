/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

var Validator = function() {
	
	// Chain constructors
	YAHOO.widget.papyrus.Validator.superclass.constructor.call( this );
	
};

// Extend tinyvalidate.Validator. This must happen after the constructor.
YAHOO.lang.extend( Validator, tinyvalidate.Validator );

Validator.prototype.validate = function( validations ) {
	
	var validation_result = {},
		set_valid_flag = false;
	validation_result.errors = [];
	validation_result.valid = true;
	
	
	function setInvalid() {
		if( set_valid_flag === false && validation_result.valid === true ) {
			validation_result.valid = false;
			set_valid_flag = true;
		}
	}

	for( var i = 0; i < validations.length; i++ ) {
		
		var validation = validations[ i ];
		
		// Validate type.
		if( validation.hasOwnProperty( "type" ) === true ) {			
			if( !( this.validateType( validation.value(), validation.type ) === true ) ) {					
				validation_result.errors.push( { el : validation.el, property : validation.property, message : validation.property + " must be a " + validation.type } + "." );
				setInvalid();
			}	
		}
		
		// Validate length.
		if( validation.hasOwnProperty( "length" ) === true ) {
			if( !( this.validateLength( validation.value(), validation.length ) === true ) ) {
				validation_result.errors.push( { el : validation.el, property : validation.property, message : validation.property + " must be " + validation.length + " or less in length." } );
				setInvalid();
			}	
		}
		
	}
	
	return validation_result;
	
};

YAHOO.widget.papyrus.Validator = Validator;

YAHOO.register( "papyrusvalidator", YAHOO.widget.papyrus.Validator, { version: "0.1", build: "1" } );