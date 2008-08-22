/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.ViewHelper = new function() {
	
	var	Event = YAHOO.util.Event,
		Dom = YAHOO.util.Dom;
	
		
	var errors = [];
	
	// Highlight the fields on the current interface and add error messages.
	this.showFieldErrors = function( obj ) {

		// Failed validation. 
		errors = obj.getErrors();
		
		var error_messages = [];
				
		for( var i = 0; i < errors.length; i++ ) {
			error_messages.push( errors[ i ].message );
			Dom.addClass( errors[ i ].el, "papyrus_editor_field_error" );
			Dom.get( errors[ i ].el + "_error" ).innerHTML = '( ' + errors[ i ].message + ' )'; 
		}
		
	};
	
	this.removeFieldErrors = function() {
		
		// Passed validation.
		for( var i = 0; i < errors.length; i++ ) {
			Dom.removeClass( errors[ i ].el, "papyrus_editor_field_error" );
			Dom.get( errors[ i ].el + "_error" ).innerHTML = '&nbsp;'; 
		}
		
		errors = [];
		
	};
	
};



YAHOO.register( "papyruseditorviewhelper", YAHOO.widget.papyrus.ViewHelper, { version: "0.1", build: "1" } );