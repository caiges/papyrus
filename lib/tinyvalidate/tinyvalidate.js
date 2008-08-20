var tinyvalidate = {};

( function() {

var Validator = function() {
	this.init();
};

Validator.prototype = {
	
	init : function() {
		// Init stub
	},
	
	validateType : function( value, type ) {
		
		switch( type ) {
			
			case 'string':
				return ( typeof value === "string" ? true : false );
			break;
			
			case 'number':
				return ( typeof value === "number" ? true : false );
			break;
			
			case 'boolean':
				var boolean_value = value;
				if( boolean_value === 1 ) {
					boolean_value = true;
				} else {
					boolean_value = false;
				}
				return ( typeof boolean_value === "boolean" ? true : false );
			break;
			
			default:
				return false;
			break;
		}
		
	},
	
	validateFormat : function( value, format ) {
		
		switch( format ) {
			
			case 'email':
				// This won't validate against ip based addresses. i.e. ...@[someip].[suffix]
				var _email_regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
				return _email_regex.test( value );
			break;
			
			case 'safe_text':
				// stub
			break;
			
			case 'percentage':
				// stub
			break;
			
			case 'float':
				// stub
			break;
			
		}
		
	},
	
	validateLength : function( value, length ) {
		
		var vt = this.validateType;

		if( vt( value, 'string' ) && vt( length, 'number' ) ) {
			
			return ( value.length <= length ? true : false );
			
		}
		
	}
	
};

tinyvalidate.Validator = Validator;

})();

YAHOO.register( "tinyvalidate", tinyvalidate.Validator, { version: "0.1", build: "1" } );