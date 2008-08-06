/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinkEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getLinkEvent = new Util.CustomEvent( "getLinkEvent" );
	
	this.init = function() {	
		
		var model = [];
		
		this.setLink = function( _link ) { 
			
			link = new p.Link( _link );
			model[ "link" ] = new p.Link( _link );
		
		};
		
		this.getLink = function() { return model[ "link" ]; };
			
	};
	
	this.findLinkById = function( id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			model.setLink( eval( "(" + response.responseText + ")" ) );
			model.getLinkEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/link/" + id + ".json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyruslinkeditormodel", YAHOO.widget.papyrus.LinkEditorModel, { version: "0.1", build: "1" } );