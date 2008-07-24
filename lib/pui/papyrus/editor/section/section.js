/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
*/

( function() { 
	
	var Section = function( attributes ) {
		this.init( attributes );
	};

	Section.prototype = {
		
		init : function( attributes ) {	

			var id = ( attributes.hasOwnProperty( "id" ) ? attributes.id : null ),
			 	content = ( attributes.hasOwnProperty( "content" ) ? attributes.content : null ),
				section_id = ( attributes.hasOwnProperty( "section_id" ) ? attributes.section_id : null ), 
				title = ( attributes.hasOwnProperty( "title" ) ? attributes.title : null ), 
				is_active = ( attributes.hasOwnProperty( "is_active" ) ? attributes.is_active : null );
			
			this.getId = function() { return id; };
			
			this.setId = function( _id ) { id = _id; };
			
			this.getContent = function() { return content; };
			
			this.setContent = function( _content ) { content = _content; };
			
			this.getSectionId = function() { return section_id; };
			
			this.setSectionId = function( _section_id ) { section_id = _section_id; };
			
			this.getTitle = function() { return title; };

			this.setTitle = function( _title ) { title = _title; };

			this.getIsActive = function() { return is_active; };

			this.setIsActive = function( _is_active ) { is_active = _is_active; };
			
		},
		
		valid : function() { return true; },
		
		toString : function() { return "id => " + this.getId() + " title => " + this.getTitle() + ", is_active => " + this.getIsActive(); },
		
		toLiteral : function() { return { id : this.getId(), content : this.getContent(), section_id : this.getSectionId(), title : this.getTitle(), is_active : this.getIsActive() }; }
		
	};
	
	
	YAHOO.widget.papyrus.Section = Section;
	
}() );

YAHOO.register( "papyrussection", YAHOO.widget.papyrus.Section, { version: "0.1", build: "1" } );