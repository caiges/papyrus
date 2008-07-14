/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

var	Event = YAHOO.util.Event,
	Util = YAHOO.util,
	Dom = YAHOO.util.Dom,
	Anim = YAHOO.util.Anim,
	Easing = YAHOO.util.Easing,
	SimpleDialog = YAHOO.widget.SimpleDialog;	

YAHOO.widget.papyrus.Editor = new function() { 
	
	this.initEvent = new Util.CustomEvent( "initEditorEvent" );
	
	this.alteredStateEvent = new Util.CustomEvent( "alteredstate", this );
	
	this.normalStateEvent = new Util.CustomEvent( "normalstate", this );
	
	this.init = function() {
	 
		var editors = [];
	
		var panelElId = "papyrus-editor-panel";
			
	   	/**
		 * The object representing the page editor panel
		 * @property panel
		 * @type Object
		 */
		var panel = null;
		
		/**
		  * The close button for the panel
		  * @property closeButton
		  * @type Object
		  */
		var closeButton = null;

		/**
		  * The save button for the panel
		  * @property saveButton
		  * @type Object
		  */
		var saveButton = null; 
				
		var states = { NORMAL : 'normal', ALTERED : 'altered' };
		
		var state = states.NORMAL;
		
		this.getPanelElId = function() { return panelElId; };
		
		this.getPanel = function() { return panel; };
		
		this.setPanel = function( _panel ) { panel = _panel; };
			
		this.getCloseButton = function() { return closeButton; };
		
		this.setCloseButton = function( _closeButton ) { closeButton = _closeButton; };
		
		this.getSaveButton = function() { return saveButton; };
		
		this.setSaveButton = function( _saveButton ) { saveButton = _saveButton; };
		
		this.getState = function() { return state; };
		
		this.setState = function( _state ) { state = _state; };
		
		this.getStates = function() { return states; };
		
		this.getEditors = function() { return editors; };
		
		this.registerEditor = function( contentType, editorObj ) {
			
			// Ensure that content type or editor isn't already registered.
			for( var i = 0; i < editors.length; i++ ) {
				if( editors[ i ].type === contentType || typeof editors[ i ].editor === editorObj ) {
					return false;
				}
			}
			
			// If editor or content type wasn't found register it.
			editors[ editors.length ] = { type : contentType, editor : editorObj };

		};
		
		this.getEditor = function( contentType ) {
			
			for( var i = 0; i < editors.length; i++ ) {
				if( editors[ i ].type === contentType ) {
					return editors[ i ].editor;
				}
			}
			
			return null;
			
		};
		
		
		// Setup the panel.		
		this.initPanel();
		
		// Fire init event.
		this.initEvent.fire();
	};
	
	this.initPanel = function() {
		
		panelEl = document.createElement( "div" );
		panelEl.id = this.getPanelElId();
		Dom.insertAfter( panelEl, "ft" );
	
		panel = new YAHOO.widget.Panel( panelEl, {
			width : "800px",
			height : "",
			fixedcenter : true, 
			constraintoviewport : true, 
			underlay : "shadow",
			modal : true, 
			close : false, 
			visible : false, 
			draggable : true } 
		);
		this.setPanel( panel );
		//If we haven't built our panel using existing markup,
		//we can set its content via script:
		panel.setHeader( "Papyrus" );
		panel.setBody( "Loading..." );
		panel.setFooter( "" );
		//panel.setFooter(  );
		//Although we configured many properties in the
		//constructor, we can configure more properties or 
		//change existing ones after our Panel has been
		//instantiated:
		//this.initButtons();
		panel.render();
		this.initButtons();
		this.initEvents();
	};
	
	this.initButtons = function() {
		
		panel = this.getPanel();
		closeButton = new YAHOO.widget.Button( { label : "Close", container : Dom.getElementsByClassName( "ft", "div", panel.element.firstChild )[0], onclick : { fn : this.close, obj : null, scope : this } } );
		this.setCloseButton( closeButton );
		saveButton = new YAHOO.widget.Button( { label : "Save", container : Dom.getElementsByClassName( "ft", "div", panel.element.firstChild )[0], onclick : { fn : this.save, obj : null, scope : this } } );
		this.setSaveButton( saveButton );
		
	};
	
	this.initEvents = function() {
		this.alteredStateEvent.subscribe( this.onAlteredState, null, this );
		this.normalStateEvent.subscribe( this.onNormalState, null, this );
	};
	
	this.open = function( id, contentType ) {
		
		// Add logic here to validate editor state before opening another editor.
		
		editor = this.getEditor( contentType );
		if( editor ) {
			params = [];
			params[ "id" ] = id;
			editor.controller.defaultAction( params );
		}
		this.getPanel().show();
		
	};
	
	this.switchPerspectives = function( id, contentType ) {
		
		// check if editor is in an altered state
		if( this.getState() === this.getStates().ALTERED ) {
			
			// handler if user clicks yes to continue without saving
			var yesHandler = function() {
				
				// reset altered state
				this.normalStateEvent.fire();
				// open requested editor 
				this.open( id, contentType );
				
			};
			
			this.showConfirmContinueWithoutSave( null, { 
				message : "Are you sure you want to continue without saving?", 
				yes : { scope : this, fn : yesHandler } 
				} );
		} else {
			this.open( id, contentType );
		}
		
	};
	
	this.close = function() {
		// we would validate here for pending operations
		editor = this;
		this.getPanel().hide();
		window.setTimeout( function() { editor.resetPanel(); }, 200 );
	};
	
	this.save = function() {
		// we would validate here for pending operations
		this.normalStateEvent.fire();
	};
	
	this.resetPanel = function() {
		panel = this.getPanel();
		panel.setHeader( "Papyrus" );
		panel.setBody( "Loading..." );
		this.normalStateEvent.fire();
	};
	
	this.onAlteredState = function() {
		
		if( this.getState() === this.getStates().NORMAL ) {
			panel = this.getPanel();
			alteredStateEl = document.createElement( "span" );
			Dom.addClass( alteredStateEl, "papyrus-editor-altered-state-notification" );
			alteredStateEl.appendChild( document.createTextNode( " * ( Changed )" ) );
			panel.appendToHeader( alteredStateEl );
			this.getCloseButton().removeListener( "click", this.close );
			this.getCloseButton().addListener( "click", this.showConfirmContinueWithoutSave, { message : "Are you sure you want to exit without saving?", yes : { scope : this, fn : this.close } }, this );
			this.setState( this.getStates().ALTERED );
		}
		return true;
	};
	
	this.onNormalState = function() {
		
		if( this.getState() === this.getStates().ALTERED ) {
			
			alteredStateElArray = Dom.getElementsByClassName( "papyrus-editor-altered-state-notification", "span", this.getPanelElId() );
			alteredStateElArray[ 0 ].parentNode.removeChild( alteredStateEl );
			this.getCloseButton().removeListener( "click", this.showConfirmContinueWithoutSave );
			this.getCloseButton().addListener( "click", this.close, null, this );
			this.setState( this.getStates().NORMAL );
						
		}
		return true;
	};
	
	this.showConfirmContinueWithoutSave = function( e, obj ) {
		
		confirm = new YAHOO.widget.SimpleDialog( "papyrus-editor-confirm-continue-without-save", { 
			width : "20em", 
			effect : { effect : YAHOO.widget.ContainerEffect.FADE, duration : 0.25 }, 
			fixedcenter : true,
			modal : true,
		    visible : false,
			draggable : false } );
		confirm.setHeader( "Warning!" );
		confirm.setBody( obj.message );
		confirm.cfg.setProperty( "icon", YAHOO.widget.SimpleDialog.ICON_WARN );
		var buttons = [ { text:"Yes", 
							handler : function() { 
								if( obj.hasOwnProperty( "yes" ) && obj.yes.hasOwnProperty( "fn" ) && typeof obj.yes.fn === "function" ) {
									confirm.hide();
									obj.yes.fn.call( obj.yes.scope );
								} else {
									confirm.hide();
								}
							} 
						},
				    	{ text : "No", 
				  			handler : function() {
								if( obj.hasOwnProperty( "no.fn" ) && obj.no.hasOwnProperty( "fn" ) && typeof obj.no.fn === "function" ) {
									confirm.hide();
									obj.no.fn.call( obj.no.scope );
								} else {
									confirm.hide();
								}
							},
							isDefault : true 
						} ];
		confirm.cfg.queueProperty( "buttons", buttons );
		confirm.render( document.body );
		confirm.show();
		
	};
	
	this.showMessage = function( _type, message ) {
		
		type = new Array;
		type[ 'info' ] = SimpleDialog.ICON_INFO;
		type[ 'warn' ] = SimpleDialog.ICON_WARN;
		type[ 'block' ] = SimpleDialog.ICON_BLOCK;
		type[ 'help' ] = SimpleDialog.ICON_HELP;
		type[ 'alarm' ] = SimpleDialog.ICON_ALARM;
		type[ 'tip' ] = SimpleDialog.ICON_TIP;
		
		editor = this;
		dialog = new YAHOO.widget.SimpleDialog( "papyrus-editor-message", { 
			width : "20em", 
			effect : { effect : YAHOO.widget.ContainerEffect.FADE, duration : 0.25 }, 
			fixedcenter : true,
			modal : true,
		    visible : false,
			draggable : false } );
		dialog.setHeader( "Papyrus" );
		dialog.setBody( message );
		dialog.cfg.setProperty( "icon", type[ _type ] );
		var buttons = [ { text:"Ok", 
							handler : function() { dialog.hide(); } } ];
		dialog.cfg.queueProperty( "buttons", buttons );
		dialog.render( document.body );
		dialog.show();
		
	};
	
};

YAHOO.register( "papyruseditor", YAHOO.widget.papyrus.Editor, { version: "0.1", build: "1" } );