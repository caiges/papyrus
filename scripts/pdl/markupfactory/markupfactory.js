   /**
	  * authors:  Caige Nash, Britton Halle
	  * created:  08/03/2006
	  * purpose:  create inline-js html elements
	  *dependencies: 
	  *
	  */

	 /**
		* Create MarkupFactory Namespace
		*
		*/
	 
	 PDL.util.MarkupFactory = {}
 	 
	 PDL.util.MarkupFactory.HTMLNode = function( attributes ) {
	 	
		
		
		/**
	 	 * Initializes the List Object
	 	 * @param {Object} params Contains all necessary configuration information for creating list.
	 	 */	
		
	 	this.params = {}
			
		
	 	this.init = function( attributes ) {
			
	 		for( var i in attributes ) {
				this.params[i] = attributes[i];
			}
			
		}
		
	  /**
		 * Returns the sepecified property. Returns null if property doesn't exist.
		 * 
		 * @param {Object} property
		 * @return {Object}
		 */
			
		this.getProperty = function( property ) {
			//alert(params["id"]);
			//alert(typeof params[property]);
			if( this.params[property] !== undefined ) {
				return this.params[property];
			} else {
				return null;
			}
				
		}
			
			
		/**
		 * Sets the specified property. Returns true if operation succeeded, false if failed.
		 * @param {Object} property
		 * @param {Object} value
		 */
			
		this.setProperty = function( property, value ) {
			
			if( this.params[property] !== undefined ) {
				this.params[property] = value;
				return true;
			} else {
				return false;
			}
		}
		
		
		/**
		 * Checks if property exists, returns true if exists, otherwise false
		 * @param {Object} property
		 */
		this.hasProperty = function( property ) {
			
			if( this.params[property] === undefined ) {
					return false;
			} else {
					return true;	
			}
				
		}
		
		this.init( attributes );
		
	 }


	 /**
	  * List Element Generator
	  * 
	  * author: Caige Nash
	  * created: 08/02/2006
	  * purpose: create inline-js html list elements
	  * 
	  */
	 
	 PDL.util.MarkupFactory.Lists = {}
	
	 
	 //PDL.util.MarkupFactory.Lists.List.prototype = new PDL.util.MarkupFactory.HTMLNode();
	 //PDL.util.MarkupFactory.Lists.List.prototype.constructor = PDL.util.MarkupFactory.Lists.List;
	 
	 PDL.util.MarkupFactory.Lists.List = function( attributes ) {		
		 //TODO: use instanceOf to check when adding list items to list
		
		/**
		 * Stores list item elements in an Array.
		 * @type {Array} 
		 *  
		 */
		this.listItems = [];
		
		/**
		 * Adds a new ListItem object to the children array.
		 * @param {Object} html
		 * @param {Object} attributes
		 */
		this.addListItem = function( attributes ) {
			if( attributes instanceof PDL.util.MarkupFactory.Lists.ListItem ) {
				this.listItems[this.listItems.length] = attributes;
				return true;
			} else {
				this.listItems[this.listItems.length] = new PDL.util.MarkupFactory.Lists.ListItem( attributes );
				return true;
			}
					
		}
		
		
		this.getListItemAt = function( index ) {
			try {
				if( index >= 0 && index < this.listItems.length ) {
					return this.listItems[index];
				} else {
					throw new PDL.util.Exception( "IndexOutOfBoundsException", "Passed index is out of bounds of [this.listItems]." );	
				}	
			} catch( e ) {
				return null;
			}
		}
		
		/**
		 * Returns number of children (list items) currently attached. (Length of children array)
		 * @return {Integer}
		 */
		
		this.getNumberOfListItems = function() {
			return this.listItems.length;
		}
		
		
		
		
		/**
		 * Returns this list object as an html string.
		 */
		this.toHTMLString = function() {
			var returnHTML = '<ul' + (this.hasProperty( "id" ) ? ' id="' + this.getProperty( "id" ) + '"' : '') + (this.hasProperty( "class" ) ? ' class="' + this.getProperty( "class" ) + '"' : '') + '>';
			var listItemObject = null;
			var listItemString = '';
			for( var i = 0; i < this.listItems.length; i++ ) {
				listItemObject = this.listItems[i];
				listItemString += listItemObject.toHTMLString();
			}
			returnHTML += listItemString + "</ul>";
			return  returnHTML;
		}
		
		
		/**
		 * Calls the parent class (HTMLNode) constructor.
		 */
		PDL.util.MarkupFactory.HTMLNode.call( this, attributes );

	 }
	
	
	 /**
	  * List Item Element Generator
	  * 
	  * author: Caige Nash
	  * created: 08/04/2006
	  * purpose: create inline-js html list item elements
	  * 
	  */
		
	PDL.util.MarkupFactory.Lists.ListItem = function( attributes ) {
		
		
		/**
		 * Returns this list item object as an html string.
		 */
		this.toHTMLString = function() {
			return '<li' + (this.hasProperty( "id" ) ? ' id="' + this.getProperty( "id" ) + '"' : '') + (this.hasProperty( "class" ) ? ' class="' + this.getProperty( "class" ) + '"' : '') + '>' + (this.hasProperty( "innerHTML" ) ? this.getProperty( "innerHTML" ) : '') + '</li>';
		}
		
		
		/**
		 * Returns this list item as a string. Overrides [Object.toString()].
		 */
		this.toString = function() {
			return this.getProperty( "id" );	
		}
		
		
		/**
		 * Calls the parent class (HTMLNode) constructor.
		 */
		PDL.util.MarkupFactory.HTMLNode.call( this, attributes );
		
	}
	
	PDL.util.MarkupFactory.Lists.ListItem.prototype = new PDL.util.MarkupFactory.HTMLNode();
	PDL.util.MarkupFactory.Lists.ListItem.prototype.constructor = PDL.util.MarkupFactory.Lists.ListItem;
	
	
	
	 /**
	  * Form Element Generator
	  * 
	  * author:   Britton Halle
	  * created:  07/24/2006
	  * purpose:  create inline-js html form elements
	  * dependencies: 
	  *
	  */
		
	 PDL.util.MarkupFactory.FormElements = {}

	 PDL.util.MarkupFactory.FormElements.SelectBox = function() {	
	 	return this.init();
	 }
    
	 
	 /**
	  * Form factory prototype
	  */
		
	 PDL.util.MarkupFactory.FormElements.SelectBox.prototype = {
	 	init : function () {},
			
	  buildComboBox : function (dp,sid,oval,oname,selectedval,ocevent,style) {
		 if(ocevent!=null)
		 	if(ocevent.length){
		 		var oce = 'onchange="'+ocevent+'(this.value)"'; 
		 	} else {
		 		var oce = ''; 
		 	} 
	 	 var htmlstring = '<select name="'+sid+'" id="'+sid+'" '+oce+'>';
		 for(var i = 0; i < dp.length; i++) {
	   //YAHOO.log(dp[i])
		//dp[i].eval(oval)
		
		if( dp[i][oval] != selectedval )
		htmlstring += '<option value="'+dp[i][oval]+'">'+dp[i][oname]+'</option>' ;
		else
		htmlstring += '<option value="'+dp[i][oval]+'" selected>'+dp[i][oname]+'</option>' ;
		}
		htmlstring += '</select>';
		return htmlstring;
		}
	}
