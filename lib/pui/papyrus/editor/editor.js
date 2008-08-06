/*
* Author: Caige Nichols <caige@sevenblend.com>
* Version: 0.1
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
		
		var editorBreadcrumbElId = "papyrus-editor-breadcrumb";
		
		var editorNotificationElId = "papyrus-editor-notification";
		
		var panelHeaderHTML = '<div>Papyrus <div id="' + editorBreadcrumbElId + '">&nbsp;</div> <div id="' + editorNotificationElId + '">&nbsp;</div></div>';
			
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
		
		var breadcrumbs = [];
		
		var states = { NORMAL : 'normal', ALTERED : 'altered' };
		
		var state = states.NORMAL;
		
		// Private model for saving useful information.
		var model = [];
		
		this.saveToModel = function( key, data ) { model[ key ] = data; };
		
		this.getFromModel = function( key ) { return model[ key ] || null; };
		
		this.valueExistsInModel = function( key ) { return model.hasOwnProperty( key ); };
		
		this.getPanelElId = function() { return panelElId; };
		
		this.getPanelEl = function() { return Dom.get( this.getPanelId() ); };
		
		this.resetBreadcrumbs = function( crumbs ) { breadcrumbs = []; };
		
		this.getBreadcrumbs = function() { return breadcrumbs; };
		
		this.setEditorBreadcrumb = function( crumb ) { Dom.get( editorBreadcrumbElId ).innerHTML = crumb; };
		
		this.setEditorNotification = function( message ) { Dom.get( editorNotificationElId ).innerHTML = message; };
		
		this.getPanelHeaderHTML = function() { return panelHeaderHTML; };
		
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
		
		// Add the editor to the bread crumb so that users can switch back if needed.
		this.appendEditorToBreadCrumb = function( _id, _contentType ) {

			var editor = this.getEditor( _contentType );
	
			// Ensure editor exists
			if( editor != null ) {
				
				// Check if link clicked on is already the editor loaded and prevent it from loading.
				for( var i = 0; i < breadcrumbs.length; i++ ) {
					
					if( breadcrumbs[ i ].contentType === _contentType ) {
						return;
					}
					
				}
			
				// add editor to breadcrumb
				breadcrumbs[ breadcrumbs.length ] = { id : _id, contentType : _contentType, name : editor.getName(), descriptiveName : editor.getDescriptiveName() };
				
				breadcrumbHTMLEl = Dom.get( editorBreadcrumbElId );
				//breadcrumbHTML = breadcrumbHTMLEl.innerHTML + '>&nbsp;&nbsp;<a href="#" onclick="YAHOO.widget.papyrus.Editor.switchToEditorInBreadCrumb( ' + ( breadcrumbs.length - 1 ) + ' );">' + editor.getName() + '</a> ' + ( editor.getDescriptiveName().length > 0 ? '( ' + editor.getDescriptiveName() + ')' : '' ) + '&nbsp;&nbsp;';
				this.setEditorBreadcrumb( this.buildEditorBreadcrumb() );
				
			}
			
		};
		
		// Build the editor breacrumb html.
		this.buildEditorBreadcrumb = function() {
			
			var breadcrumbHTML = "";
			for( var i = 0; i < breadcrumbs.length; i++ ) {

				editor = this.getEditor( breadcrumbs[ i ].contentType );
				breadcrumbHTML += '>&nbsp;&nbsp;<a href="#" onclick="YAHOO.widget.papyrus.Editor.switchToEditorInBreadCrumb( ' + i + ' );">' + breadcrumbs[ i ].name + '</a> ' + ( editor.getDescriptiveName().length > 0 ? '( ' + editor.getDescriptiveName() + ')' : '' ) + '&nbsp;&nbsp;';

			}
			
			return breadcrumbHTML;
			
		};
		
		// Switch to the editor selected from the bread crumb and remove all following breadcrumbs including the selected editor.
		this.switchToEditorInBreadCrumb = function( index ) {
			
			var editorDescriptor = breadcrumbs[ index ];
			
			// check if editor is in an altered state
			if( this.getState() === this.getStates().ALTERED ) {

				// handler if user clicks yes to continue without saving
				var yesHandler = function() {

					// reset altered state
					this.normalStateEvent.fire();
					
					// Remove all editors in breadcrumb after the editor that is selected.
					breadcrumbs.splice( index + 1, breadcrumbs.length - index );
					
					// Build and set new breadcrumb.
					this.setEditorBreadcrumb( this.buildEditorBreadcrumb() );
					this.switchPerspectives( editorDescriptor.id, editorDescriptor.contentType );
					
					return true;

				};

				// Handler if user clicks no to continue to go back.
				var noHandler = function() {
					return false;
				};

				return this.showConfirmContinue( null, { 
					message : "Are you sure you want to continue without saving?", 
					yes : { scope : this, fn : yesHandler }, no : { scope : this, fn : noHandler } 
					} );
			} else {
				
				// Remove all editors in breadcrumb after the editor that is selected.
				breadcrumbs.splice( index + 1, breadcrumbs.length - index );

				breadcrumbHTML = "";
				for( var i = 0; i < breadcrumbs.length; i++ ) {

					editor = this.getEditor( breadcrumbs[ i ].contentType );
					breadcrumbHTML += '>&nbsp;&nbsp;<a href="#" onclick="YAHOO.widget.papyrus.Editor.switchToEditorInBreadCrumb( ' + i + ' );">' + breadcrumbs[ i ].name + '</a> ' + ( editor.getDescriptiveName().length > 0 ? '( ' + editor.getDescriptiveName() + ')' : '' ) + '&nbsp;&nbsp;';

				}
				this.setEditorBreadcrumb( breadcrumbHTML );
				this.switchPerspectives( editorDescriptor.id, editorDescriptor.contentType );
				
				return true;
			}
		
		};
		
		// Setup the panel.		
		this.initPanel();
		
		// Fire init event.
		this.initEvent.fire();
		
		// Insert configuration data into the model
		this.saveToModel( "page_id", 1 ); // We'll get this from pageSettings, which will be made read only in the template.
		YAHOO.widget.papyrus.PageEditorModel.findPageById( this.getFromModel( "page_id" ) );
		this.saveToModel( "page", YAHOO.widget.papyrus.PageEditorModel.getPage() );
		
	};
	
	this.initPanel = function() {
		
		panelEl = document.createElement( "div" );
		panelEl.id = this.getPanelElId();
		Dom.insertAfter( panelEl, "ft" );
	
		panel = new YAHOO.widget.Panel( panelEl, {
			width : "800px",
			height : "",
			fixedcenter : true, 
			constraintoviewport : false,
			modal : true, 
			close : false, 
			visible : false, 
			draggable : true,
			iframe : true } 
		);
		this.setPanel( panel );
		//If we haven't built our panel using existing markup,
		//we can set its content via script:
		panel.setHeader( this.getPanelHeaderHTML() );
		panel.setBody( "Loading..." );
		panel.setFooter( "" );
		//panel.setFooter(  );
		//Although we configured many properties in the
		//constructor, we can configure more properties or 
		//change existing ones after our Panel has been
		//instantiated:
		//this.initButtons();
		panel.render();
		Dom.setStyle( panel.body, "position", "relative" );
		Dom.setStyle( panel.body, "height", "100%" );
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
		
		// This handles the case where data for the current model has changed.
		var onInputChange = function( e, obj ) {
			
			target = Event.getTarget( e );
			// The filtering occurs here instead of being attached to specific elements.
			if( Dom.hasClass( target, "papyrus-editor-can-alter-state-field" ) ) {
				obj.alteredStateEvent.fire();
			}
			
		};
		
		// This handles the case where data for the current model has changed.
		var onSortableListChange = function( e, obj ) {
			
			target = Event.getTarget( e );
			// The filtering occurs here instead of being attached to specific elements.
			if( Dom.hasClass( target, "papyrus-editor-can-alter-state-field" ) && Dom.hasClass( target, "sortable-list-item" ) ) {
				obj.alteredStateEvent.fire();
			}
			
		};
		
		// Watch for altered state.
		Event.addListener( document.body, "change", onInputChange, this );
		
		// Watch for sortable list sort change.
		Event.addListener( document.body, "DOMNodeInserted", onSortableListChange, this );
		
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
	
	// Switch perspectives using the passed id and content type. If no id is given it is assumed that new content is being created.
	this.switchPerspectives = function( id, contentType ) {

		// check if editor is in an altered state
		if( this.getState() === this.getStates().ALTERED ) {
			
			// handler if user clicks yes to continue without saving
			var yesHandler = function() {
				
				// reset altered state
				this.normalStateEvent.fire();
				// open requested editor 
				this.open( id, contentType );
				return true;
				
			};
			
			// Handler if user clicks no to continue to go back.
			var noHandler = function() {
				return false;
			};
			
			return this.showConfirmContinue( null, { 
				message : "Are you sure you want to continue without saving?", 
				yes : { scope : this, fn : yesHandler }, no : { scope : this, fn : noHandler } 
				} );
		} else {
			this.open( id, contentType );
			return true;
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
		panel.setHeader( this.getPanelHeaderHTML() );
		panel.setBody( "Loading..." );
		this.resetBreadcrumbs();
		this.normalStateEvent.fire();
	};
	
	this.onAlteredState = function() {
		
		if( this.getState() === this.getStates().NORMAL ) {

			panel = this.getPanel();
			
			// Set notification.
			this.setEditorNotification( " * ( Changed )" );
			
			// Reset event listeners.
			this.getCloseButton().removeListener( "click", this.close );
			this.getCloseButton().addListener( "click", this.showConfirmContinue, { message : "Are you sure you want to exit without saving?", yes : { scope : this, fn : this.close } }, this );
			this.setState( this.getStates().ALTERED );
		}
		return true;
	};
	
	this.onNormalState = function() {
		
		if( this.getState() === this.getStates().ALTERED ) {
			
			// Remove notification.
			this.setEditorNotification( "" );
			
			// Reset event listeners.
			this.getCloseButton().removeListener( "click", this.showConfirmContinue );
			this.getCloseButton().addListener( "click", this.close, null, this );
			this.setState( this.getStates().NORMAL );
						
		}
		return true;
	};
	
	this.showConfirmContinue = function( e, obj ) {
		
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
									//obj.yes.fn.call( obj.yes.scope );
								} else {
									confirm.hide();
								}
							} 
						},
				    	{ text : "No", 
				  			handler : function() {
								if( obj.hasOwnProperty( "no" ) && obj.no.hasOwnProperty( "fn" ) && typeof obj.no.fn === "function" ) {
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