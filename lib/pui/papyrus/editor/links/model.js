/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

YAHOO.widget.papyrus.LinksEditorModel = new function() { 
	
	var	p = YAHOO.widget.papyrus,
		Util = YAHOO.util;
		
	this.getLinksEvent = new Util.CustomEvent( "getLinksEvent" );
	
	this.init = function() {	
		
		var data = { links : null };
		
		this.setLinks = function( _links ) { data.links = new p.Links( _links ); };
		
		this.getLinks = function() { return data.links; };
			
	};
	
	this.findLinksByLinksId = function( links_id ) {
		
		model = this;
		
		var onSuccess = function( response ) {
			
			//var page = new p.Page( eval( "(" + response.responseText + ")" ) );
			model.setLinks( eval( "(" + response.responseText + ")" ) );
			model.getLinksEvent.fire();
				
		};
		
		var onFailure = function( response ) {
			console.log( response );
		};
		
		Util.Connect.asyncRequest( 'GET', "mocks/links/" + links_id + "_links.json", { success : onSuccess, failure : onFailure } );
		
	};
	
};

YAHOO.register( "papyruslinkseditormodel", YAHOO.widget.papyrus.LinksEditorModel, { version: "0.1", build: "1" } );