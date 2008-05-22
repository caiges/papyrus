/*
*   author:  Caige Nash
*   created:  07/27/2006
*   purpose:  provide general context menu functionality, customizable 
*	dependencies: yahoo-min.js, event-min.js, container-min.js, dom-min.js, menu-min.js (yahoo yui library)
*
*/

PDL.widget.ContextMenu = function( name, trigger ) {
		try {
			if( document.getElementById(trigger) != undefined ) {
				return this.init( name, trigger );
			} else {
				throw new PDL.util.Exception( "UndefinedElementException", "PDL.widget.contextMenu: Trigger passed is undefined in document." );
			}
		} catch ( e ) {
			YAHOO.log( e.name + " : " + e.message );
		}
}

PDL.widget.ContextMenu.prototype = {
	
	init : function( name, trigger ) {
		var menuName = name;
		var menuReference = null;
		
		this.getMenuName = function() {
			return this.menuName();
		}
		
		this.setMenuName = function( name ) {
			this.menuName = name;
		}
		
		this.setMenuReference = function( ref ) {
			this.menuReference = ref;	
		}
		
		
		this.setMenuRef = function( reference ) {
			this.menuReference = reference;	
		}
		
		this.getMenuRef = function() {
			return this.menuReference;
		}
		
		// build context menu and set reference
		this.setMenuRef(this.createContextMenu( name, trigger ));
		
		return this;
			
	},
	
	createContextMenu : function( name, trigger ) {
		var contextMenu = new YAHOO.widget.ContextMenu( name, { trigger: trigger } );
		return contextMenu;
	},
	
	addMenuItem : function( item ) {
		var contextMenu = this.getMenuRef();
		return contextMenu.addItem( item );
	},
	
	destroy : function() {
		this.getMenuRef().destroy();
	}
	
}