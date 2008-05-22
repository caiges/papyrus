/*
Copyright (c) 2008, Pearson Inc. All rights reserved.
version: 0.1
*/

var	Event = YAHOO.util.Event,
	Dom = YAHOO.util.Dom,
	Anim = YAHOO.util.Anim,
	Easing = YAHOO.util.Easing,
	SimpleDialog = YAHOO.widget.SimpleDialog;	

YAHOO.widget.papyrus.Editor = new function() { 
	
	this.initEvent = new YAHOO.util.CustomEvent( "init", this );
	
	this.alteredStateEvent = new YAHOO.util.CustomEvent( "alteredstate", this );
	
	this.normalStateEvent = new YAHOO.util.CustomEvent( "normalstate", this );
	
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
		
		this.getPanelElId = function() { return panelElId; };
		
		this.getPanel = function() { return panel; };
		
		this.setPanel = function( _panel ) { panel = _panel; };
			
		this.getCloseButton = function() { return closeButton; };
		
		this.setCloseButton = function( _closeButton ) { closeButton = _closeButton; };
		
		this.getSaveButton = function() { return saveButton; };
		
		this.setSaveButton = function( _saveButton ) { saveButton = _saveButton; };
		
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
			height : "600px",
			fixedcenter : true, 
			constraintoviewport : true, 
			underlay : "shadow",
			modal : true, 
			close : false, 
			visible : false, 
			draggable : false } 
		);
		this.setPanel( panel );
		//If we haven't built our panel using existing markup,
		//we can set its content via script:
		panel.setHeader( "Papyrus" );
		panel.setBody( "Here's where we would load the specified editor." );
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
	
	this.edit = function( id, contentType ) {
		
		editor = this.getEditor( contentType );
		//console.log( editor );
		if( editor ) {
			editor.load( id );
		}
		this.getPanel().show();
		
	};
	
	this.close = function() {
		// we would validate here for pending operations
		this.getPanel().hide();
		this.normalStateEvent.fire();
	};
	
	this.save = function() {
		// we would validate here for pending operations
		this.normalStateEvent.fire();
		this.getPanel().hide();
	};
	
	this.onAlteredState = function() {
		
		panel = this.getPanel();
		alteredStateEl = document.createElement( "span" );
		alteredStateEl.id = 'papyrus-editor-altered-state';
		alteredStateEl.appendChild( document.createTextNode( " * ( Changed )" ) );
		panel.appendToHeader( alteredStateEl );
		this.getCloseButton().removeListener( "click", this.close );
		this.getCloseButton().addListener( "click", this.showConfirmExitWithoutSave, null, this );
		
	};
	
	this.onNormalState = function() {
		
		alteredStateEl = Dom.get( 'papyrus-editor-altered-state' );
		alteredStateEl.parentNode.removeChild( alteredStateEl );
		this.getCloseButton().removeListener( "click", this.showConfirmExitWithoutSave );
		this.getCloseButton().addListener( "click", this.close, null, this );
		
	};
	
	this.showConfirmExitWithoutSave = function( e ) {

		editor = this;
		confirm = new YAHOO.widget.SimpleDialog( "papyrus-editor-confirm-exit-without-save", { 
			width : "20em", 
			effect : { effect : YAHOO.widget.ContainerEffect.FADE, duration : 0.25 }, 
			fixedcenter : true,
			modal : true,
		    visible : false,
			draggable : false } );
		confirm.setHeader( "Warning!" );
		confirm.setBody( "Are you sure you want to exit without saving?" );
		confirm.cfg.setProperty( "icon", YAHOO.widget.SimpleDialog.ICON_WARN );
		var buttons = [ { text:"Yes", 
							handler : function() { confirm.hide(); editor.close(); } },
				    { text : "No", 
				  			handler : confirm.hide,
							isDefault : true } ];
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