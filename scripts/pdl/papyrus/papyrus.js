/**
 *   @author:  Caige Nash
 *   created:  07/20/2006
 *   @classDescription  provide editing environment for content owners
 *	  dependencies: yahoo-min.js, event-min.js, container-min.js, dom-min.js (yahoo yui library)
 *
 */

// Papyrus Namespace
PDL.widget.Papyrus = {}

// Papyrus Editing Manager
PDL.widget.Papyrus.PapyrusManager = {
	
	/**
	 * @contructor
	 */
	init : function() {
		this.attachEditSwitch();
		this.loadSelector();	
		this.loadEditor();	
		this.loadLayoutManager();	
	},
	
	/**
	 * Loads Selector components.
	 * @method
	 */
	loadSelector : function() {
		PDL.widget.Papyrus.Selector.init();
	},
	
	enableSelector : function() {
		PDL.widget.Papyrus.Selector.setup();
	},
	
	/**
	 * Unloads Selector components.
	 */
	disableSelector : function() {
		PDL.widget.Papyrus.Selector.teardown();
	},
	
	loadEditor : function () {
		PDL.widget.Papyrus.Editor.init();
	},
	
	loadLayoutManager : function () {
		PDL.widget.Papyrus.LayoutManager.init();
	},
	
	setPapyrusToolboxMsg : function (s) {
		document.getElementById("sidebarLeftPapyrusContentMessage").innerHTML = s;
	},
		
	/**
	 * Attaches a click event to the edit page link
	 */
	attachEditSwitch : function() {
		YAHOO.util.Event.addListener("papyrus_editpage", "click", PDL.widget.Papyrus.DomController.toggleEditModeEvent);
	},
	
	toggleEditMode : function( event, element ) {
		// prevent default action
		YAHOO.util.Event.preventDefault( event );
		if( element.innerHTML === 'Edit This Page' ) {
			PDL.widget.Papyrus.PapyrusManager.enableSelector();
			element.innerHTML = "Leave Edit Mode";
		} else {
			PDL.widget.Papyrus.PapyrusManager.disableSelector();
			element.innerHTML = "Edit This Page";
		}	
	}
}


// Papyrus Event Controller
PDL.widget.Papyrus.DomController = {

	/**
	 * Toggles Papyrus edit mode On/Off.
	 * @param {Object} e Toggles Papyrus Edit Mode On/Off.
	 */
	toggleEditModeEvent : function( e ) {
		PDL.widget.Papyrus.PapyrusManager.toggleEditMode( e, this );
	},
	
	overContainer : function( e ) {
	 
	 /**
	  * Reference to Papyrus Selector object. 
    * This saves processing time since an object lookup doesn't have to be performed every time the Selector is needed. 
	  */ 
		
	  var PAPYRUS_SELECTOR = PDL.widget.Papyrus.Selector; 
	  PAPYRUS_SELECTOR.setSelectedContentContainer( this.id );
		PAPYRUS_SELECTOR.hideOverlay();
		PAPYRUS_SELECTOR.showOverlay( this );
		PAPYRUS_SELECTOR.getNewTooltipPos( e );	
		PAPYRUS_SELECTOR.showTooltip();			
	},	

	offContainer : function( e ) {
		
	 /**
	  * Reference to Papyrus Selector object. 
    * This saves processing time since an object lookup doesn't have to be performed every time the Selector is needed. 
	  */ 
		
	  var PAPYRUS_SELECTOR = PDL.widget.Papyrus.Selector;
		
		PAPYRUS_SELECTOR.hideOverlay();
		PAPYRUS_SELECTOR.deselectContentContainer();
		PAPYRUS_SELECTOR.hideTooltip();
	},
	
	moveTooltip : function( e ) {
		
	 /**
	  * Reference to Papyrus Selector object. 
    * This saves processing time since an object lookup doesn't have to be performed every time the Selector is needed. 
	  */ 
		
	  var PAPYRUS_SELECTOR = PDL.widget.Papyrus.Selector;
		
		PAPYRUS_SELECTOR.getNewTooltipPos( e );
	},
	
	hideTooltip : function( e ) {
		
	 /**
	  * Reference to Papyrus Selector object. 
    * This saves processing time since an object lookup doesn't have to be performed every time the Selector is needed. 
	  */ 
		
	  var PAPYRUS_SELECTOR = PDL.widget.Papyrus.Selector;
		
		PAPYRUS_SELECTOR.hideTooltip();
	}
	
}


// Papyrus Selector Custom Event Controller
PDL.widget.Papyrus.SelectorController = {
	
	setContextMenuDisplay : function( e ) {
		PDL.widget.Papyrus.Selector.setContextMenuDisplay();
	},
	
	showContextMenu : function ( e ) {
		PDL.widget.Papyrus.Selector.showContextMenu();
	},
	
	hideContextMenu : function ( e ) {
		PDL.widget.Papyrus.Selector.hideContextMenu();
	},
	
	contextMenuActive : function ( e ) {
		PDL.widget.Papyrus.Selector.contextMenuActive();
	},
	
	contextMenuInActive : function ( e ) {
		PDL.widget.Papyrus.Selector.contextMenuInActive();
	},
	
	showMoveDialog : function( e ) {
		PDL.widget.Papyrus.Editor.displayEditor("Load","pagecontainers",pageSettings.pagerowid,"pagecontainers");
	},
	
	showEditDialog : function ( e ) {
		// ATTENTION
		var item = PDL.widget.Papyrus.Selector.getSelectedContentContainer().elementId;
		if(item.indexOf("yui-gen")==0){
			PDL.widget.Papyrus.Editor.displayEditor("Create","container","","container");
		} else if(item.indexOf("container_")==0){
			var a = item.split("_");
			PDL.widget.Papyrus.Editor.displayEditor("Load","container",a[1],"editor");
			//PDL.widget.Papyrus.Editor.displayEditor("Load","pagecontainers","8610B32B-BDB0-5FBB-98318CC084A41105","pagecontainers");
		}
	}

}


// Papyrus Selector
PDL.widget.Papyrus.Selector = {
	
	/**
	 * Sets up Selector object.
	 * 
	 * @classDescription This function sets up the Selector object.
	 */
	init : function () {
	
	 /**
	  * Private, stores id references to the containers that the Selector object will be active in.
	  * The references are stored in the following hash format:
	  * activeContainers[(id of container)] = (class name that defines elements that selector will iterate over)
	  * 
	  * @type {Object} Stores id references to the container that the Selector object will be active in.
	  */
		
		var activeContainers = {};	// create hash object to store container names that selector will be active in
		activeContainers["contentContentContainer"] = "papyrus_editable_container";
		

	 /**
	  * @type {Object} Stores information related to the currently selected content object.
	  */
      
    var selectedContentContainer = {};
		 
		 
	 /**
		* @type {String} Stores the id of the currently selected content object.
		*/
			
    selectedContentContainer.elementId = null;
		
		
	 /**
		* Reference to Papyrus Selector Controller object. 
		* This saves processing time since an object lookup doesn't have to be performed every time the Selector Controller is needed. 
		*/ 
		
		PAPYRUS_SELECTOR_CONTROLLER = PDL.widget.Papyrus.SelectorController;      
		
		var selectorOverlayDiv = document.createElement("DIV");	// create div to be contained within YUI overlay
		selectorOverlayDiv.id = "selectorOverlay";	// set id of div
		selectorOverlayDiv.style.display = "none";
		selectorOverlayDiv.innerHTML = "";	// so that div will render
		
		var selectorOverlayDivWindow = document.createElement("DIV");	// create div to be contained within YUI overlay
		selectorOverlayDivWindow.id = "selectorOverlayDivWindow";	// set id of div
		selectorOverlayDivWindow.innerHTML = "";	// so that div will render
		selectorOverlayDiv.appendChild(selectorOverlayDivWindow);
		document.body.appendChild(selectorOverlayDiv);
		var showing = false;	// is overlay showing?
		
		var tooltipOverlayDiv = document.createElement("DIV");
		tooltipOverlayDiv.id = "tooltipOverlay";
		var tooltipOverlayMsg = '<span>Right Click To Add / Edit This Section</span>';
		tooltipOverlayDiv.innerHTML = tooltipOverlayMsg;
		tooltipOverlayDiv.className = "papyrus_tooltip";
		tooltipOverlayDiv.style.zIndex = 30;
		tooltipOverlayDiv.style.display = "none";
		document.body.appendChild(tooltipOverlayDiv);
		
		
		var contextMenu = new PDL.widget.ContextMenu("papyrus_selector_contextMenu", selectorOverlayDivWindow.id);
		CONTEXT_MENU_REF = contextMenu.getMenuRef();
		if( CONTEXT_MENU_REF != undefined ) {
			var edit = contextMenu.addMenuItem( "Add / Edit Section" );
			var move = contextMenu.addMenuItem( "Move Sections" );
			var cancel = contextMenu.addMenuItem( "Cancel" );
			edit.clickEvent.subscribe(PAPYRUS_SELECTOR_CONTROLLER.showEditDialog);
			move.clickEvent.subscribe(PAPYRUS_SELECTOR_CONTROLLER.showMoveDialog);
			cancel.clickEvent.subscribe(PAPYRUS_SELECTOR_CONTROLLER.hideContextMenu);
			CONTEXT_MENU_REF.render(document.body);
			CONTEXT_MENU_REF.element.style.visible = "hidden";
			//CONTEXT_MENU_REF.beforeRenderEvent.subscribe(PDL.widget.Papyrus.SelectorController.setContextMenuDisplay);
			CONTEXT_MENU_REF.renderEvent.subscribe(PDL.widget.Papyrus.SelectorController.showContextMenu);
			CONTEXT_MENU_REF.beforeShowEvent.subscribe(PDL.widget.Papyrus.SelectorController.contextMenuActive);
			CONTEXT_MENU_REF.hideEvent.subscribe(PDL.widget.Papyrus.SelectorController.contextMenuInActive);
		}
				
		
		/**
		 * stores id's of placebo containers, used to prevent duplicate id's being created
		 */
		
		var placeboContainers = [];  
		
		
		/**
		 * Sets the showing property of the Selector object.
		 * @param {Object} isShowing
		 */
		
		this.setShowing = function(isShowing) {
			try {
				if(typeof isShowing === 'boolean') {
					showing = isShowing;
				} else {
					throw new PDL.util.Exception( "UnexpectedTypeException", "Passed isShowing was expected to be a boolean." );
					}
			} catch ( e ) {
				YAHOO.log( e.name + " : " + e.message );
			}
		}
		
		
		/**
		 * Returns true if Selector object is showing, false if not.
		 * @return {boolean}
		 */
		
		this.getShowing = function() {
			return showing;
		}
	
		
		/**
		 * Returns the selector div, which contains the selector window.
		 * @return {Object} selectorOverlayDiv
		 */
		
		this.getSelectorOverlayDiv = function() {
			return selectorOverlayDiv;
		}
		
		
		/**
		 * Returns the selector div window, contained within selectorOverlayDiv. This is the transparent div.
		 * @return {Object} selectorOverlayDivWindow
		 */
		
		this.getSelectorOverlayDivWindow = function() {
			return selectorOverlayDivWindow;
		}
		
		
		/**
		 * Returns the tooltip div.
		 * @return {Object} tooltipOverlayDiv
		 */
		
		this.getTooltipOverlayDiv = function() {
			return tooltipOverlayDiv;
		}
		
		
		/**
		 * Returns the contextMenu object, contains the YAHOO ContextMenu object.
		 * @return {Object} contextMenu
		 */
		this.getContextMenu = function() {
			return contextMenu;
		}
		
		this.destroyContextMenu = function() {
			contextMenu = null;
		}

		
		/**
		 * Returns containers array
		 * @return {Array} containers;
		 */
		
		this.getContainers = function() {
			return containers;
		}
		
		
		/**
		 * Returns placebo containers array.
		 * @return {Array} placeboContainers
		 */
		
		this.getPlaceboContainers = function() {
			return placeboContainers;
		}
		
		
		/**
		 * Resets placeboContainers to an empty array.
		 */
		
		this.resetPlaceboContainers = function() {
			
			placeboContainers = [];
			
		}
		
		
		this.setSelectedContentContainer = function(id) {
		  try {
			  if( typeof id == 'string' ) {
			  	selectedContentContainer.elementId = id;
			  } else {
			    throw new PDL.util.Exception( "UnexpectedTypeException", "Passed id was not of type string." );
			  }
		  } catch (e) {
		    YAHOO.log( e.name + " : " + e.message );
		  }
		}
		
		
		this.deselectContentContainer = function() {
		  selectedContentContainer = {};
		}
		
		this.getSelectedContentContainer = function() {
		  return selectedContentContainer;
		}
		
		this.getActiveContainers = function() {
			return activeContainers;	
		}
		
	},
		setup : function() {
			this.attachPlacebos();
			this.attachOverEvents();
		},
		
	  teardown : function() {
			this.removePlacebos();
			this.removeOverEvents();
			this.hideSelector();
			this.hideTooltip();
	  },	
		
		
		/**
		 * Returns the currently selected content container HTML element.
		 * @return {Element} currentlySelectedContentContainer HTML Element Node 
		 */
		getSelectedContentContainerNode : function() {
	  	var currentlySelectedContentContainer = document.getElementById(this.getSelectedContentContainer().elementId);
	  	return currentlySelectedContentContainer;
		},
	
	
	/**
	 * Unhides the tooltip while over the selector window
	 * @param {Object} x X coordinate to draw the tooltip at.
	 * @param {Object} y Y coordinate to draw the tooltip at.
	 */
	
		moveTooltip : function(x, y) {
			var tooltipOverlayDiv = this.getTooltipOverlayDiv();
			var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
			var TOOLTIP_OVERLAY_DIV_STYLE = tooltipOverlayDiv.style; // performance, object lookup
			TOOLTIP_OVERLAY_DIV_STYLE.position = "absolute";
			TOOLTIP_OVERLAY_DIV_STYLE.top =  y + 20 + "px";
			TOOLTIP_OVERLAY_DIV_STYLE.left =  x + 20 + "px";

			var currentlySelectedContainer = this.getSelectedContentContainerNode();
			if( YAHOO.util.Dom.hasClass(currentlySelectedContainer, "papyrus_placebo" ) ) {
			  tooltipOverlayDiv.innerHTML = '<span>Right Click To Insert A New Section Here</span>';
			} else {
			  tooltipOverlayDiv.innerHTML = '<span>Right Click To Edit This Section</span>';
			}
		},
		
		showTooltip : function() {
			var tooltipOverlayDiv = this.getTooltipOverlayDiv();
			tooltipOverlayDiv.style.display = "";
		},
		
		
		/**
		 * Hides the selector's tooltip and removes mousemove event listener.
		 * @method
		 */
		
		hideTooltip : function() {
			var tooltipOverlayDiv = this.getTooltipOverlayDiv();
			//var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
			//tooltipOverlayDiv.style.display = "none";
			//YAHOO.util.Event.removeListener(selectorOverlayDivWindow, "mousemove", PDL.widget.Papyrus.DomController.overContainerToolTip);
			tooltipOverlayDiv.style.display = "none";
		},
		
		getNewTooltipPos : function( event ) {
			var location = PDL.util.Dom.getMouseLoc( event );
			PDL.widget.Papyrus.Selector.moveTooltip( location.x, location.y );
	},
		
		
		/**
		 * Shows the selector
		 * 
		 * @method
		 * @param {String} width Specifies width for selector div
		 * @param {String} height Specifies height for selector div
		 * @param {String} x Specifies x position for selector div
		 * @param {String} y Specifies y position for selector div
		 */
		
		showSelector : function(width, height, x, y) {
			var selectorOverlayDiv = this.getSelectorOverlayDiv();
			var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
			var currentlySelectedContainer = this.getSelectedContentContainer();
			var YUI_EVENT = YAHOO.util.Event; // performance, object lookup
			var DOM_CONTROLLER = PDL.widget.Papyrus.DomController; // performance, object lookup
		  if( YAHOO.util.Dom.hasClass(currentlySelectedContainer, "papyrus_placebo") ) {
				
			}	  
		  var SELECTOR_OVERLAY_DIV_STYLE = selectorOverlayDiv.style; // performance, object lookup
		  SELECTOR_OVERLAY_DIV_STYLE.position = "absolute";
		  SELECTOR_OVERLAY_DIV_STYLE.top = y + "px";
		  SELECTOR_OVERLAY_DIV_STYLE.left = x + "px";
		  SELECTOR_OVERLAY_DIV_STYLE.width = width;
		  SELECTOR_OVERLAY_DIV_STYLE.height = height;
		  SELECTOR_OVERLAY_DIV_STYLE.display = "";
			SELECTOR_OVERLAY_DIV_STYLE.width = width + 10 + "px";
			SELECTOR_OVERLAY_DIV_STYLE.height = height + 10 + "px";
			
			var SELECTOR_OVERLAY_DIV_WINDOW_STYLE = selectorOverlayDivWindow.style; // performance, object lookup
			SELECTOR_OVERLAY_DIV_WINDOW_STYLE.width = width + 10 + "px";
			SELECTOR_OVERLAY_DIV_WINDOW_STYLE.height = height + 10 + "px";
			
			this.setShowing(true);
			YUI_EVENT.addListener(selectorOverlayDivWindow, "mouseout", DOM_CONTROLLER.offContainer);
			YUI_EVENT.addListener(selectorOverlayDivWindow, "mousemove", DOM_CONTROLLER.moveTooltip);
			YUI_EVENT.addListener(selectorOverlayDivWindow, "mouseout", DOM_CONTROLLER.hideTooltip);
		
		
		},
		
		
		/**
		 * Hides the Selector Object and removes mouseout event.
		 * 
		 * @method
		 */
		
		hideSelector : function() {
			var currentlySelectedContainer = this.getSelectedContentContainer();
			var selectorOverlayDiv = this.getSelectorOverlayDiv();
			var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
			var YUI_EVENT = YAHOO.util.Event; // performance, object lookup
			var DOM_CONTROLLER = PDL.widget.Papyrus.DomController;
			if( YAHOO.util.Dom.hasClass(currentlySelectedContainer, "papyrus_placebo") ) {
			
			}
			this.setShowing(false);
			selectorOverlayDiv.style.display = "none";
			YUI_EVENT.removeListener(selectorOverlayDivWindow, "mouseout", DOM_CONTROLLER.offContainer);
			YUI_EVENT.removeListener(selectorOverlayDivWindow, "mousemove", DOM_CONTROLLER.moveTooltip);
			YUI_EVENT.removeListener(selectorOverlayDivWindow, "mouseout", DOM_CONTROLLER.hideTooltip);
		},
		
		
		/**
		 * Returns a boolean whether selector object is showing
		 * @method
		 * @return {Boolean} 
		 */
		
		isSelectorShowing : function() {
			
			if(this.getShowing() == true) {
				return true;
			} else {
				return false;
			}
		},
		
		
		/**
		 * Returns an array of the active containers defined within the activeContainers Object
		 * 
		 * @return Returns an array of the active containers defined within the activeContainers Object
		 * @method
		 * @see PDL.widget.Papyrus.Selector#activeContainers
		 */
		
		getActiveContainerNodes : function() {
		  var activeContainerIds = this.getActiveContainers();
			var YUI_DOM = YAHOO.util.Dom; // performance, object lookups
		 	for( var i in activeContainerIds ) {	// loop through active containers
			
				if(typeof i == 'string') {
					var activeContainer = document.getElementById(i);	// make sure container is present in dom
					if(activeContainer != undefined) {
						return editable_containers = YUI_DOM.getElementsByClassName("papyrus_editable_container", "div", activeContainer);	// get all containers within active container that match the container's key 
					}
				}
			}
		},
		
		
		/**
		 * Retrieves the active container of the currently selected content container. Returns null if no content container is selected.
		 * @method
		 * @return {Object} Returns the active container of the currently selected content container. Returns null if no content container is selected.
		 */
		
		getActiveContainer : function() {
			var currentlySelectedContentContainer = this.getSelectedContentContainer();
			if( currentlySelectedContentContainer !== undefined ) {
				return currentlySelectedContentContainer.parentNode;
			} else {
				return null;
			}
		},
		
		
		/**
		 * Returns the Selector Object's window div
		 */
		
		getSelectorWindow : function() {
			return this.selectorOverlayDivWindow;
		},
	
	
	  getPlaceboIndex : function(id) {	// get index of placebo, return -1 if not found
	  
	  	var placeboContainers = this.getPlaceboContainers();
			
			for( var i = 0; i < placeboContainers.length; i++ ) {
				
				if( id == placeboContainers[i] ) {
					return i;
				}
				
			}
			
			return -1;
		
		},
		
		getPlacebo : function(index) {
			var placeboContainers = this.getPlaceboContainers();
			try {
				if( index >= 0 && index < placeboContainers.length ) {
					return placeboContainers[index];
				} else {
					throw new PDL.util.Exception("IndexOutOfBoundsException", "Index out of bounds for placeboContainers array.");
				}
			} catch (e) {
				YAHOO.log(e.name + " : " + e.message);
			}
		},
		
		pushPlacebo : function (id) {	
			var placeboC = this.getPlaceboContainers();
			placeboC[ placeboC.length ] = id;
		},
		
		popPlacebo : function (id) {	// returns and removes the specified placebo
	  	var placeboId = placeboContainer[this.getPlaceboIndex(id)];
		},
			
		generatePlaceboId : function() {
			var placeboContainers = this.getPlaceboContainers();	
			var num = YAHOO.util.Dom.generateId();
			
			if( placeboContainers.length > 0 ) {
				var YUI_DOM = YAHOO.util.Dom; // performance
				while ( this.getPlaceboIndex(num) != -1 ) {
					num = YUI_DOM.generateId();
				}
				this.pushPlacebo(num);
				return num;
			} else {
				this.pushPlacebo(num);
				return num;
			}
		},
	
	
	
	attachOverEvents : function() {
		
		var containers = this.getActiveContainerNodes();	// get all active containers
		
		for( var j = 0; j < containers.length; j++) {
			this.attachMouseOverEvent(containers[j]);
		}
	},
	
	removeOverEvents : function() {

		var containers = this.getActiveContainerNodes();	// get all active containers
		
		for( var j = 0; j < containers.length; j++) {
			this.removeMouseOverEvent(containers[j]);
		}  
	},
	
	attachMouseOverEvent : function(element) {
		YAHOO.util.Event.addListener(element, "mouseover", PDL.widget.Papyrus.DomController.overContainer);	
	},
	
	removeMouseOverEvent : function(element) {
		YAHOO.util.Event.removeListener(element, "mouseover", PDL.widget.Papyrus.DomController.overContainer);
	},
	
	/**
	 * Attaches placebos to the page
	 */
	
	attachPlacebos : function() {
		var containers = this.getActiveContainerNodes();
		
		if( containers.length != 0 ) {
		
			for( var i = 0; i < containers.length; i++ ) {
				if( i === 0 ) {
					this.insertPlacebo(containers[i].parentNode.id, containers[i].id, "before");
					this.insertPlacebo(containers[i].parentNode.id, containers[i].id, "after"); 
				} else {
				  this.insertPlacebo(containers[i].parentNode.id, containers[i].id, "after");
				}
			}  
		
		} else { // if no containers exist on the page ( new page )
				
				for( var i in this.getActiveContainers() ) {
					
					var container = document.getElementById( i );
					this.insertPlacebo( container.id, null, "new" );
					
				}
			
		}
		
	},
	
	/**
	 * Removes placebos from page.
	 */
	
	removePlacebos : function() {
		var placeboContainers = this.getPlaceboContainers();
		for( var i = 0; i < placeboContainers.length; i++ ) {
			try {
				var element = document.getElementById(placeboContainers[i]);
				if( element != undefined && element.parentNode != undefined ) {
					var parent = element.parentNode;
					parent.removeChild( element );
				} else {
					throw new PDL.util.Exception( "UndefinedElementException", "PDL.wiget.Papyrus.Selector.removePlacebos > placebo to remove doesn't exist in document." );
				}
			} catch ( e ) {
					YAHOO.log( e.name + " : " + e.message );
			}
		}
		this.resetPlaceboContainers();
	},
	
	
	/**
	 * Inserts a new placebo before or after (pos) the given location.
	 * @param {Object} activeContainer
	 * @param {Object} element
	 * @param {Object} pos
	 */
	
	insertPlacebo : function(activeContainer, element, pos) {
		try {
			var targetContainer = document.getElementById(activeContainer);
			var YUI_DOM = YAHOO.util.Dom; // performance, object lookup
			if(targetContainer != undefined) {
				
				if( element != null ) {
					
					var target = document.getElementById(element);
				
				} else {
					
					var target = targetContainer;
					
				}
				
				if( target != undefined ) {
					if( typeof pos == 'string') {
					
					  var placebo = this.generatePlacebo();
						
						// insert placebo element
						if( pos === 'before' ) {
							
							targetContainer.insertBefore(placebo, target); // insert new placebo before target element
							//this.attachMouseOverEvent(placebo);
							
						} else if( pos === 'after' ) {
						  
						  PDL.util.Dom.insertAfter( targetContainer, placebo, target );
						  
						} else if( pos === 'new' ) {
								
								target.appendChild( placebo );
								
						} else {
							
							throw new PDL.util.Exception( "UnknownStringPatternException", "Insertion point [" + pos + "] is invalid, must be 'after' or 'before.'", "papyrus.js" )
						}
					} else {
							throw new PDL.util.Exception( "UnknownStringPatternException", "Insertion point [" + pos + "] is invalid, must be 'after' or 'before.'", "papyrus.js" )
					}
				} else {
					throw new PDL.util.Exception( "UndefinedElementException", "Element: [" + element + "] is undefined in document.", "papyrus.js" );
				}
			} else {
				throw new PDL.util.Exception( "UndefinedElementException", "Element: [" + activeContainer + "] is undefined in document.", "papyrus.js" );
			}
		
		} catch ( e ) {
			YAHOO.log( e.name + " : " + e.message, "error" );
		}
	},
	
	generatePlacebo : function() {
		
		// create placebo element			      
		var placebo = document.createElement( "DIV" );
		placebo.innerHTML = "Insert New Section Here";
		placebo.id = PDL.widget.Papyrus.Selector.generatePlaceboId();
		placebo.className = "papyrus_placebo contentDiv papyrus_editable_container sortorder_" + ( this.getPlaceboIndex( placebo.id ) + 1 );		
		return placebo;
		
	},

	
	/**
	 * Responsible for setting up the overlay selector
	 * @method
	 * @param {Object} element
	 */
	 
	showOverlay : function(element) {
		if(this.isSelectorShowing() == false) {
			var YUI_DOM = YAHOO.util.Dom; // performance, object lookup  
			var elementX = YUI_DOM.getX(element) - 8;
			var elementY = YUI_DOM.getY(element) - 8;
			var elementWidth = element.offsetWidth;
			var elementHeight = element.offsetHeight;
			//YAHOO.log("(" + elementX + ", " + elementY + ")");
			PDL.widget.Papyrus.Selector.showSelector(elementWidth, elementHeight, elementX, elementY);
	
		}
	},

	hideOverlay : function() {
		PDL.widget.Papyrus.Selector.hideSelector();
	},
	
	setContextMenuDisplay : function() {
		this.getContextMenu().element.style.display = "";
	},
	
	/**
	 * Shows a PDL.widget.ContentMenu instance
	 */
	showContextMenu : function () {
		
		//this.getContextMenu().element.focus();
		/*alert( arguments.length );
		alert( typeof this.hideContextMenu );*/
		//this.getContextMenu().getMenuRef().cfg.setProperty("visible", true);
		//YAHOO.util.Event.removeListener("selectorOverlayDivWindow", "mouseout", PDL.widget.Papyrus.DomController.offContainer);
	},
	
	
	/**
	 * Hides a PDL.widget.ContentMenu instance
	 */
	hideContextMenu : function () {
		
		this.getContextMenu().getMenuRef().cfg.setProperty("visible", false);
		
	},

	
	/**
	 * Disables Selector Events while context menu is active
	 */
	contextMenuActive : function() {
		var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
		// remove mouseout event on selectorOverlayWindow
		YAHOO.util.Event.removeListener(selectorOverlayDivWindow, "mouseout", PDL.widget.Papyrus.DomController.offContainer);
		// enable tooltip event
		//YAHOO.util.Event.removeListener(selectorOverlayDivWindow, "mousemove", PDL.widget.Papyrus.DomController.moveTooltip);
		// remove other over events
		PDL.widget.Papyrus.Selector.removeOverEvents();
		// hide tooltip
		this.hideTooltip();
	},
	
	/**
	 * Enables Selector Events when context menu is hidden
	 */
	contextMenuInActive : function() {
		var selectorOverlayDivWindow = this.getSelectorOverlayDivWindow();
		// add mouseout event on selectorOverlayWindow
		YAHOO.util.Event.addListener(selectorOverlayDivWindow, "mouseout", PDL.widget.Papyrus.DomController.offContainer);
		
		// disable tooltip event
		YAHOO.util.Event.addListener(selectorOverlayDivWindow, "mousemove", PDL.widget.Papyrus.DomController.moveTooltip);
		
		// add other over events
		this.attachOverEvents();
		
		// show tooltip
		this.showTooltip();
	},
	
	removeContextMenu : function() {
		this.getContextMenu().destroy();
		this.destroyContextMenu();
	}
}








































PDL.widget.Papyrus.Editor = {
	
	init : function () {
		// initialize the help
		this.initHelpShell();
		// initialize the editor DIV with a default form tag to be used by the dialog popup
		this.initEditorShell();
		// initialize the popup dialog box
		this.initDialogShell();
		
		// hasChanged property is a global identifier used to identify if content has been changed since the editor was opened.
		this.hasChanged = false;
		
		// create onHasChanged custom event
		this.onHasChanged = new YAHOO.util.CustomEvent( "onHasChanged", this );
		
		// subscribe to onHasChanged custom event
		this.onHasChanged.subscribe( this.setOnChangeStatus, this );
		this.onHasChanged.subscribe( this.updateEditorOnHasChanged, this );
		this.onHasChanged.subscribe( this.updatePageTimeStamp, this );
		
		if( pageSettings.pageCached == "no" ) {
				
				this.showPageRefreshMsg();
		
		}
		
	},
	
	showPageRefreshMsg : function () {
		var rs = '<img src="'+PDL.util.PageURL.getURL()+'/img/arrow_refresh.gif" class="papyrus_toolboxItem" />&nbsp;<a href="javascript:PDL.widget.Papyrus.Editor.updatePage( null, PDL.widget.Papyrus.Editor );" class="papyrus_toolboxItem">Publish Page</a><br />This page is not yet published. Changes will not be visible to users until you publish this page.';
		PDL.widget.Papyrus.PapyrusManager.setPapyrusToolboxMsg( rs );
	},
	
	
	
	// *****
	//
	//	DIALOG POPUP SHELL FUNCTIONS BELOW
	//
	// *****
	
	initDialogShell : function () {

		// note that height and width of dialog are overridden in 'displayEditor'
		this.cms = new YAHOO.widget.Dialog("cmsDialog", { modal:true, visible:false, width:"950px", height:"544px",fixedcenter:true, constraintoviewport:true, draggable:false });
		
		YAHOO.util.Event.addListener(document,"scroll",PDL.widget.Papyrus.Editor.moveDialogShell);
		YAHOO.util.Event.addListener(document,"resize",PDL.widget.Papyrus.Editor.moveDialogShell);
		this.cms.cancelEvent.subscribe(PDL.widget.Papyrus.Editor.hideDialogShell,this.cms,true);
		
		this.cms.render();
		
		this.setWindowScrollLock(false);
		
		// hack to remove the close button
		this.cms.close.style.display = "none";
		
		// create custom event for teardown of dialog
		this.closeDialogEvent = new YAHOO.util.CustomEvent( "closeDialog", this );
		
	},
	
	hideDialogShell : function () {		
		// editor tear down calls
		if(PDL.widget.Papyrus.Editor.getDialogTreeHelper() != null)
			PDL.widget.Papyrus.Editor.getDialogTreeHelper().setMode("none");
		
		if(PDL.widget.Papyrus.Editor.getDialogFormHelper() != null)
			PDL.widget.Papyrus.Editor.getDialogFormHelper().setMode("none");
		
		this.setWindowScrollLock(false);
		this.showWindowScroll();
		
		// fire teardown custom event
		this.closeDialogEvent.fire();
		
		PDL.widget.Papyrus.Editor.cms.hide();
		this.cms.element.style.display = "none";
		
	},
	
	showDialogShell : function () {
		this.hideWindowScroll();
		this.cms.show();
		this.cms.element.style.display = "";
		
		//window.scrollBy(0, 1);
		//this.cms.center();
		this.cms.doCenterOnDOMEvent();
		
		this.setWindowScrollLock(true);
		
	},
	
	updatePage : function( e, scope ) {
		
		if( scope ) {
			
			scope.showRefreshOverlay();
			//location = document.location.href;
						
		}

	},
	
	showRefreshOverlay : function() {
		
		var maskDiv = document.createElement( "div" );
		maskDiv.id = "papyrus_maskDiv";
		maskDiv.className = "mask";
		maskDiv.innerHTML = "&nbsp;";
		
		var docHeight = YAHOO.util.Dom.getDocumentHeight();
		var docWidth = YAHOO.util.Dom.getDocumentWidth();
		
		var viewHeight = YAHOO.util.Dom.getViewportHeight();
		var viewWidth = YAHOO.util.Dom.getViewportWidth();
		
		maskDiv.style.height = docHeight + "px";
		maskDiv.style.width = docWidth + "px";
		maskDiv.style.display = "block";
		
		if( document.body.firstChild ) {
			document.body.insertBefore( maskDiv, document.body.firstChild );
		} else {
			document.body.appendChild( maskDiv );
		}
		
		var refreshingDiv = document.createElement( "div" );
		refreshingDiv.id = "papyrus_refreshingDiv";
		refreshingDiv.style.background = "#ffffff";
		refreshingDiv.style.color = "#000000";
		refreshingDiv.style.fontSize = "16px";
		refreshingDiv.innerHTML = '<div><img id="papyrus_refreshIndicator" src="' + PDL.util.PageURL.getURL() + 'img/indicator_medium.gif" style="vertical-align: middle;" />&nbsp;Rebuilding Page...Please wait...</div>';
		refreshingDiv.style.zIndex = 70;
		refreshingDiv.style.position = "absolute";
		refreshingDiv.style.top = document.documentElement.scrollTop + (viewHeight * .45) + "px";
		refreshingDiv.style.left = viewWidth * .33 + "px";
		refreshingDiv.style.width = "400px";
		refreshingDiv.style.textAlign = "center";
		document.body.appendChild( refreshingDiv );
		Rounded("div#papyrus_refreshingDiv","all","#DFDFDF","#ffffff","border #000000");
		
		/*
		var refreshingDivOverlay = new YAHOO.widget.Overlay( refreshingDiv );
		refreshingDivOverlay.cfg.queueProperty( "fixedcenter", true );
		refreshingDivOverlay.cfg.queueProperty( "contraintoviewport", true );
		refreshingDivOverlay.cfg.queueProperty( "visible", true );
		refreshingDivOverlay.cfg.queueProperty( "zIndex", 70 );
		refreshingDivOverlay.cfg.queueProperty( "y", (docHeight * .40) + "px" );
		refreshingDivOverlay.cfg.queueProperty( "x", (docWidth * .40) + "px" );
		refreshingDivOverlay.render( document.body );
		refreshingDivOverlay.center();*/
		
		var service = new PDL.widget.Papyrus.connectionManager();
		var arg = '"' + pageSettings.pagerowid + '"';
		
		var success = function( response ) {
			window.location = window.location;
			//alert( response.responseText );
		}
		
		var failure = function( response ) {
			
			alert('An error has occured while processing your request.\nPlease contact the Web Team.');
			//alert( response.responseText );
		}
		
		var onStatus = function() {
			
			alert( 'status' );
			
		}
		//YAHOO.util.Connect.handleReadyState( service.getConnection(), onStatus );
		service.makeCall( "POST", "wsCMSPages", "cachePage", arg, success, failure, "" );
		
	},
	
	setDialogWidthHeight : function (w,h) {
		this.getDialogShell().cfg.setProperty("width", (w + "px"));
		this.getDialogShell().cfg.setProperty("height", (h + "px"));
		this.getDialogShell().center();
	},

	getDialogShell : function () {
		return this.cms;
	},

	moveDialogShell : function ( e ) {
		if(PDL.widget.Papyrus.Editor.getWindowLock()){
			e.preventDefault();
			e.stopPropagation();
		}
	},

	setWindowScrollLock : function (lock) {
		this.cmsScollLocked = lock;
	},
	
	getWindowLock : function () {
		return this.cmsScollLocked;
	},
	
	hideWindowScroll : function() {
		
		if( window.attachEvent != undefined ) {
			
			var offsetY = document.documentElement.scrollTop;
			var offsetX = document.documentElement.scrollLeft;		
			
			var html = document.documentElement;
			html.style.overflow = "hidden";
			
		}
		
	},
	
	showWindowScroll : function() {
		
		if( window.attachEvent != undefined ) {
		
			var html = document.documentElement;
			html.style.overflow = "auto";
		
		}
		
	},
	
	setOnChangeStatus : function() {
		
		// set hasChanged
		this.hasChanged = true;
		
	},
	
	// function to update modifiedDateTime field in pages table
	updatePageTimeStamp : function() {
		
		var service = new PDL.widget.Papyrus.connectionManager();
		var arg = pageSettings.pagerowid;
		
		var success = function( response ) {
			
			//alert( response.responseText );
			
		}
		
		var failure = function( response ) {
			
			alert('An error has occured while processing your request.\nPlease contact the Web Team.');
			
		}
		
		service.makeCall( "POST", "wsCMSPages", "updatePageModifiedDateTime", arg, success, failure, "" );
	
	},
	
	updateEditorOnHasChanged : function() {
		
		// get close button
		var closeButton = document.getElementById( "dlgCloseButton" );
		//closeButtonOnclick = "PDL.widget.Papyrus.Editor.hideDialogShell();PDL.widget.Papyrus.Editor.updatePage();";
		
		// if we get the button cleanly
		if( closeButton != null ) {
			
			if( this.hasChanged == true ) {
				
				if( closeButton.value != "Publish Changes" ) {
					closeButton.value = "Publish Changes";
						
					// add updatePage to onclick
					YAHOO.util.Event.addListener( closeButton.id, "click", PDL.widget.Papyrus.Editor.updatePage, this );
					//closeButton.onclick = PDL.widget.Papyrus.Editor.hideDialogShell;
				}
			
			}
			
		}
		
	},
	
	
	
	
	
	// *****
	//
	//	EDITOR FUNCTIONS BELOW
	//
	// *****
	
	initEditorShell : function () {
		// initialize the cms bean
		this.initEditorBean();
		
		// populate the editor with default display
		this.dlgShell = new PDL.widget.Papyrus.dlgeditor();
		this.switchEditorLayout("");
	},
	
	switchEditorLayout : function (newShell) {
		this.dlgShell.setLayout(newShell);
		if(!newShell.length) {			
			var cmsDialog = document.getElementById("cmsDialog");
			if( cmsDialog != undefined ) {
				cmsDialog.innerHTML = this.dlgShell.buildEditorLayout();
			}	
		} else {
			var dlgCMSEditor = document.getElementById("dlgCMSEditor");
			if( dlgCMSEditor != undefined ) {
				dlgCMSEditor.innerHTML = this.dlgShell.getLayout();
			}
		}
		this.switchDialogHelp();
	},
	
	initEditorBean : function () {
		var vo = new PDL.widget.Papyrus.beanfactory();
		var pageid = PDL.util.PageURL.getParamVal("pid");
		
		this.editorBean = vo.getbean("cmsVO");
		this.editorBean.beanSetter("pagerowid",pageid);
		this.editorBean.beanSetter("privacylevelrowid",pageSettings.privacylevelrowid);
		this.editorBean.beanSetter("sectionrowid",pageSettings.sectionrowid);
		this.editorBean.beanSetter("userrowid",pageSettings.userrowid);
	},
	
	getEditorBean : function () {
		return this.editorBean;
	},
	
	// primary interface with selector, will launch & manage the editor
	displayEditor : function (action,componenttype,componentid,layout) {
		// launch & show the dialog popup
		this.showDialogShell();
		
		this.switchEditorLayout(layout);
		
		this.getEditorBean().beanSetter("action",action);
		this.getEditorBean().beanSetter("formtype",componenttype);	
		if(componenttype == "container" && componentid.length>0) {
			this.getEditorBean().beanSetter("pagecontainerrowid",componentid);
		}
		
		if(layout == "editor") {
			this.setDialogWidthHeight(950,539);
			this.getEditorBean().beanSetter("treetype",componenttype);
			this.switchDialogTree(componentid);
			// form is not being displayed & once tree struct is loaded use the container rowid to populate and show the form
		} else if (layout == "container" ) {
			this.setDialogWidthHeight(460,369);
			this.getEditorBean().beanSetter("treetype","");
			this.switchDialogForm(action,componenttype);	
		} else if (layout == "pagecontainers") {
			this.setDialogWidthHeight(460,369);
			this.getEditorBean().beanSetter("treetype",componenttype);
			this.switchDialogTree(componentid);	
		}
	},

	refreshEditor : function () {
		this.refreshDialogForm();
		this.refreshDialogTree();
	},
	
	hideSelectBoxes : function( e, args, scopeObject ) {
		
		// get all select elements within editor interface
		var selectElements = scopeObject.cms.element.getElementsByTagName( "select" );
		
		// loop through all found elements and hide them
		for( var i = 0; i < selectElements.length; i++ ) {
			
			selectElements[i].style.visibility = "hidden";
			
		}
		
	},
	
	showSelectBoxes : function( e, args, scopeObject ) {
		
		// get all select elements within editor interface
		var selectElements = scopeObject.cms.element.getElementsByTagName( "select" );
		
		// loop through all found elements and hide them
		for( var i = 0; i < selectElements.length; i++ ) {
			
			selectElements[i].style.visibility = "visible";
			
		}
		
	},
		
		
		
		
	
	// *****
	//
	//	HELP FUNCTIONS BELOW
	//
	// *****
	
	initHelpShell : function () {
		this.initHelpBean();
		
		// populate the help with default display
		this.dlgHelp = new PDL.widget.Papyrus.dlghelp();
		PDL.widget.VideoDialog.init();
		
		// register custom events for hiding select boxes from video dialog overlay
		PDL.widget.VideoDialog.onRender.subscribe( this.hideSelectBoxes, this );
		PDL.widget.VideoDialog.onDestroy.subscribe( this.showSelectBoxes, this );
	},
	
	initHelpBean : function () {
		var vo = new PDL.widget.Papyrus.beanfactory();
		this.helpBean = vo.getbean("helpVO");
	},
	
	switchDialogHelp : function (ht) {
		this.dlgHelp.setLayout(ht);
		var dlgCMSHelpDiv = document.getElementById("dlgCMSHelpDiv");
		if( dlgCMSHelpDiv != undefined )
			dlgCMSHelpDiv.innerHTML = this.dlgHelp.buildHelpLayout();
	},
	
	getHelpBean : function () {
		return this.helpBean;
	},
	
	loadHelpTutorial : function ( vSrc,vType, index ) { // takes in an array of movies and the movie player type
		// initialize the dialog help videos
		
		var dlgHelpTutorial = PDL.widget.VideoDialog;
		var params = {videoplayer:vType,width:625,height:480,zindex:360};
		
		if( typeof vSrc == 'object' ) { // get all 
			
			params.videosources = vSrc;
			params.index = index;
			
		}
		
		dlgHelpTutorial.loadVideo( params );
		
	},
	
	
	
	
	// *****
	//
	//	FORM DIALOG FUNCTIONS BELOW
	//
	// *****
	
	switchDialogForm : function (action,newDlg,contentid) {			
		//if this not the 1st popup display of the editor ... tear down possible overlays
		if(PDL.widget.Papyrus.Editor.getDialogFormHelper() != null) {
			PDL.widget.Papyrus.Editor.getDialogFormHelper().setMode("none");
		}
			
		// hack to address interface issue : 2 seperate collection drag-n-drop collection items different in collectiontype variable
		var dlgtype = newDlg.split('_');
		var formtype = dlgtype[0];
		
		this.getEditorBean().beanSetter("action",action);
		this.getEditorBean().beanSetter("formtype",formtype);
		if(contentid!=null)
			if(contentid.length)	
				this.getEditorBean().beanSetter(formtype+"rowid",contentid);
			
		//this.showLoadingOverlay();
		this.setDialogForm(action,newDlg,contentid);
		
		//populate help off of form being edited
		this.switchDialogHelp(newDlg);
	},
	
	setDialogForm : function (dlgAction,dlgSource,dlgContentId) {

		var idvar = 'rowid';
		switch(dlgSource) {
			case "container": 
			idvar = "containerrowid";
			this.setFormBean("containerVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgContainer();
			this.dlgFormHelper = PDL.widget.Papyrus.containerHelper;
			break;
			
			case "collection_document": 
			this.setFormBean("collectionVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgCollection();
			this.dlgFormHelper = PDL.widget.Papyrus.collectionHelper;
			this.getFormBean().beanSetter("collectiontype","document");
			break;
			
			case "collection_link": 
			this.setFormBean("collectionVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgCollection();
			this.dlgFormHelper = PDL.widget.Papyrus.collectionHelper;
			this.getFormBean().beanSetter("collectiontype","link");
			break;
			
			case "document": 
			this.setFormBean("fileVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgDocument();
			this.dlgFormHelper = PDL.widget.Papyrus.documentHelper;
			break;
			
			case "html": 
			this.setFormBean("htmlVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgHtml();
			this.dlgFormHelper = PDL.widget.Papyrus.htmlHelper;
			break;
			
			case "image": 
			this.setFormBean("fileVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgImage();
			this.dlgFormHelper = PDL.widget.Papyrus.imageHelper;
			break;
			
			case "link": 
			this.setFormBean("linkVO");
			this.dlgForm = new PDL.widget.Papyrus.dlgLink();
			this.dlgFormHelper = PDL.widget.Papyrus.linkHelper;
			
			break;
		}
		
		this.dlgFormHelper.setAction(dlgAction);
	
		this.dlgFormHelper.initQueueFlags();
	
		this.dlgFormHelper.setVO(this.getFormBean());
	
		if(dlgContentId!=null)
			if(dlgContentId.length)
				this.dlgFormHelper.setBeanId(dlgContentId,idvar);
	
			
		
		this.dlgFormHelper.setupHelper();
		
		if(dlgAction == "Load") {
			
			this.setDialogMode('tree');
		} else {	
			this.setDialogMode('edit');
		}
		
	},
	
	killDialogForm : function () {
		this.dlgForm = null;
	},
	
	refreshDialogForm : function (){
		this.getDialogFormHelper().setMode("none");
		this.killDialogForm();
		var c = this.getEditorBean().beanGetter("containerrowid");
		this.switchDialogForm("Load","container",c);
	},
	
	loadDialogForm : function (formString) {
		var dlgCMSFormDiv = document.getElementById("dlgCMSFormDiv");
		if( dlgCMSFormDiv != undefined ) {
			dlgCMSFormDiv.innerHTML = formString;
		}
	},
	
	setFormBean : function (beanname) {
		var vo = new PDL.widget.Papyrus.beanfactory();
		this.dlgFormBean = vo.getbean(beanname);	
	},
	
	getFormBean : function () {
		return this.dlgFormBean;		
	},
	
	getDialogForm : function () {
		return this.dlgForm;		
	},
	
	getDialogFormHelper : function () {
		return this.dlgFormHelper;		
	},
	
	
	
	
	
	
	
	// *****
	//
	//	TREE DIALOG FUNCTIONS BELOW
	//
	// *****
	
	switchDialogTree : function (componentid) { // using association rowid ... same as pageBuilder
		this.setDialogTree(componentid);
		this.loadDialogTree();
		this.setupTreeScroll();
	},
	
	// this builds set the view and view helper for the tree, the it call setupHelper todo init tasks
	setDialogTree : function (componentid) {
		this.dlgTree = new PDL.widget.Papyrus.treeContainer();
		
		switch(this.getEditorBean().beanGetter("treetype")) {
			case "pagecontainers":
				this.dlgTreeHelper = PDL.widget.Papyrus.pageContainersTreeHelper;
			break;
			
			default :
				this.dlgTreeHelper = PDL.widget.Papyrus.treeHelper;
			break;
		}
		
		
		this.dlgTreeHelper.setupHelper(componentid);
		
	},
	
	killDialogTree : function () {
		this.dlgTree = null;
	},
	
	refreshDialogTree : function () {
		this.getDialogTreeHelper().setMode("none");
		this.killDialogTree();
		
		switch(this.getEditorBean().beanGetter("treetype")) {
			case "pagecontainers":
				var pc = this.getEditorBean().beanGetter("pagerowid");
			break;
			
			default :
				var pc = this.getEditorBean().beanGetter("pagecontainerrowid");
			break;
		}
		
		this.switchDialogTree(pc);
	},
	
	// this loads the tree htmlstring into it's DIV, uses containerrowid to load form
	loadDialogTree : function () {
		var dlgCMSTreeDiv = document.getElementById("dlgCMSTreeDiv");
		if( dlgCMSTreeDiv != undefined ) {
			var tt = this.getEditorBean().beanGetter("treetype");
			dlgCMSTreeDiv.innerHTML = this.dlgTree.builddialogform(tt);
		}
	},
	
	getDialogTreeHelper : function () {
		return this.dlgTreeHelper;		
	},
	
	setupTreeScroll : function() {
		
		var timeout = null;
		var loop = true;
		var scrollUpControl = document.getElementById("PapyrusTreeDivScrollUpControl");
		var scrollDownControl = document.getElementById("PapyrusTreeDivScrollDownControl");
		var treeView = document.getElementById("PapyrusTreeDiv");
		
		function scrollUp() {
			loop = true;
			if( loop == true ) {
				if( treeView.scrollTop != 0 ) {
					treeView.scrollTop -= 2;
				}
			
				timeout = setTimeout( scrollUp, 1 );
			}
			
		}
		
		function scrollDown() {
			loop = true;
			if( loop == true ) {
				if( treeView.offsetHeight + treeView.scrollTop != treeView.scrollHeight ) {
					treeView.scrollTop += 2;
				}
				
				timeout = setTimeout( scrollDown, 1 );
			}
			
		}
		
		function stopScroll() {
			loop = false;
			clearTimeout( timeout );
		}
	
		YAHOO.util.Event.addListener( scrollUpControl, "mouseover", scrollUp );
		YAHOO.util.Event.addListener( scrollUpControl, "mouseout", stopScroll );
		YAHOO.util.Event.addListener( scrollDownControl, "mouseover", scrollDown );
		YAHOO.util.Event.addListener( scrollDownControl, "mouseout", stopScroll );
		
		// setup drag drop targets
		var scrollUpControlDDTarget = new YAHOO.util.DDTarget( scrollUpControl.id, "placeboGroup" );
		var scrollDownControlDDTarget = new YAHOO.util.DDTarget( scrollDownControl.id, "placeboGroup" );

	},
	
	loadTreeOwnerForm : function () {
		var c = this.getEditorBean().beanGetter("treetype");
		var cid = this.getEditorBean().beanGetter(c+"rowid");
		this.switchDialogForm('Load',c,cid);
	},
	
	setTreeOwnerInformation : function( tname ) {
		
		this.getEditorBean().beanSetter("treetypename", tname );
		
	},
	
	populateTreeOwnerInformation : function () {
		var treeowner = this.getEditorBean().beanGetter("treetypename").substr( 0, 40 ) + '...';
		var ihtml = '<a href="javascript:PDL.widget.Papyrus.Editor.loadTreeOwnerForm();" title="Edit Section Information" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/brick.gif" style="vertical-align:text-top;" />  ' +treeowner+ '</a>';
		var d = document.getElementById('PapyrusTreeDivContainerInfo');
		if(d != null)
			d.innerHTML = ihtml;
	},
	
	
	
	// *****
	//
	//	DIALOG MODE FUNCTIONS BELOW
	//
	// *****
	
	setDialogMode : function (mode) {
		this.dlgMode = mode;		
		this.getDialogFormHelper().setMode(mode);
		if (this.getDialogTreeHelper() != null)
			this.getDialogTreeHelper().setMode(mode);
	},
	getDialogMode : function () {
		return this.dlgMode;		
	},
	switchEditorMode : function () {
		if(this.getDialogMode() == 'tree') {
			this.setDialogMode('edit');
		} else {
			this.setDialogMode('tree');
			
		}
	}
}
	

PDL.widget.Papyrus.LayoutManager = {
	init : function () {
		this._service = new PDL.widget.Papyrus.connectionManager();
		this._yid = null;
		this._cid = null;
		//this.updateHeadingContainer('EEE41A5D-BDB0-5FBB-965B3C3E4439C0A5');
	},	
	
	insertHtmlIntoElement : function ( eid, html ) {

		/*
		var pe = document.getElementById(eid);
		if(pe != null){
			pe.innerHTML = html;
		}
		*/
	},
	
	updateHeadingContainer : function ( cid, yid ) {
		this._cid = cid;
		this._yid = yid;
		var arg = '"'+cid+'"';
		this._service.makeCall("POST","wsCMSContainers","getContainerHTML",arg,this.populateHeadingContainer,this.wsFailure,"");
	},
	
	populateHeadingContainer : function ( o ) {

		var rtxt = PDL.util.wddxPackets.stripit(o.responseText);	
		var srtxt = PDL.util.stringFunc.removeFirstAndLastChr(rtxt);
		
		PDL.widget.Papyrus.LayoutManager.insertHtmlIntoElement('container_'+this._cid,srtxt);
	},
	
	/** @id wsFailure */
	wsFailure : function(o) { 
		alert('An Error has occured while processing your request.\nPlease contact the Web Team.');
	}
	
}