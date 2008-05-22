/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic helper
*	dependencies: *helper.js (setBeanId,setupHelper,setQueueFlags,displayForm)
*
*/

PDL.widget.Papyrus.helper = function() {	
	return this.init();
}

PDL.widget.Papyrus.helper.prototype  = {
	
	init : function () {
		this.dspQueue = new Array();
		this.vo;
		this.action = '';
		this.uieditor = PDL.widget.Papyrus.Editor;
	},
	
	
	setAction : function (act) {
		this.action = act;
	},
	
	
	getAction : function () {
		return this.action;
	},
	
	
	setVO : function (bean) {
		this.vo = bean;
	},
	
	
	getVO : function () {
		return this.vo;
	},
	
	
	setQueueFlag : function (f) {
		this.dspQueue[f] = 1;
	},
	
	
	checkQueueFlags : function (aque) {
		var bloaded = true;
		for (var x = 0; x < aque.length; x++) {
			if(aque[x] != 1) {
				bloaded = false;
				break;
			}
		}
		return bloaded;
	},
	
	
	buildFormDivString : function () {
		var view = this.uieditor.getDialogForm();
		var tempVO = this.uieditor.getFormBean();
		var dlgString = view.builddialogform(tempVO);
		this.uieditor.loadDialogForm(dlgString);
	},
	
	
	showLoadingOverlay : function () {
		this.uieditor.loadDialogForm('<div id="formLoadingOverlay" class="formLoadingOverlay" align="center" style><br/><br/><br/><img src="'+PDL.util.PageURL.getURL()+'/img/indicator_flower.gif" /> LOADING INFORMATION... </div>');
	},
	
	
	setBeanId : function (beanid,idvar) {
		this.vo.beanSetter(idvar,beanid);
	},
	
	
	/** @id showOverlay */
	showOverlay : function ( ol , atarget, olclass ) {
		var overlay = document.getElementById( ol );
		var overlayTarget = document.getElementById( atarget );
		if(overlay != null) {
			this.positionOverlay( overlay, overlayTarget );
			overlay.className = olclass;
			overlay.style.width = overlayTarget.offsetWidth + 'px';
			//YAHOO.util.Event.addListener( window, "resize", this.positionOverlay, this );
		}
	},
	
	
	/** @id hideOverlay */
	hideOverlay : function ( ol ) {
		var overlay = document.getElementById( ol );
		if(overlay != null)
			overlay.className = '';
	},
	
	
	/** @id initOverlay */
	initOverlay : function ( did , w , h ) {
		var YUI_EVENT = YAHOO.util.Event;
		var div = document.createElement('DIV');
		div.id = did;
		div.style.width = w+"px";
		div.style.height = h+"px";
		div.style.position = "absolute";
		document.body.appendChild(div);	
	},
	
	
	/** @id killOverlay */
	killOverlay : function ( ol ) {
		var d = document.getElementById(ol); 
		if(d != null)
			var kd = document.body.removeChild(d);
	},
	
	
	/** @id positionOverlay */
	positionOverlay : function ( ov, ovt ) {
		var YUI_DOM = YAHOO.util.Dom;
		
		if(ov != null) {
			YUI_DOM.setXY( ov, YUI_DOM.getXY( ovt ) );
		}
		
	},
	
	
	/** @id setMode */
	setMode : function( mode ) {
		if(document.getElementById( "formEditButton" ) != null){
			if ( mode == 'edit' && this.getAction() != "Create" ){
				document.getElementById('formEditButton').innerHTML = 'CANCEL EDIT MODE';	
				this.hideOverlay( "formDialogOverlay" );
				
				// focus first field
				
				var collectionEl = document.getElementById( "collectionname" );
				
				if( collectionEl ) {
					collectionEl.focus();
				}
				
			} else if (mode == 'tree' && this.getAction() != "Create" ) {
				this.showOverlay( "formDialogOverlay" , "dlgCMSFormOverlayShell" , "overlayMask" );
				document.getElementById('formEditButton').innerHTML = 'ENABLE EDIT MODE';
			} else {
				document.getElementById('formEditButton').innerHTML = '';
				this.killOverlay( "formDialogOverlay" );
				
				// focus first field
				
				var collectionEl = document.getElementById( "collectionname" );
				
				if( collectionEl ) {
					collectionEl.focus();
				}
				
			}	
		}
	},
	
	
	/** @id LoadForm */
	LoadForm : function(o) { 
		var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
		PDL.widget.Papyrus.Editor.getDialogFormHelper().populateVO(rtxt);
	},
	
	
	/** @id wsFailure */
	wsFailure : function(o) { 
		console.log( o.responseText );
		alert('An error has occured while processing your request.\nPlease contact the Web Team.\n\nClick OK to Refresh the Editor.');
		//PDL.widget.Papyrus.Editor.refreshEditor();
		// TODO : document.getElementById('savedNotification').setAttribute('style','color:red;padding-right:5px;font-weight:bold;');
		// TODO : document.getElementById('savedNotification').innerHTML = 'An Error Ocurred!';
	},

	
	/** @id inactive */
	inactive : function () {
		var answer = confirm("Are you sure you want to delete the item?\nWARNING: This action can not be undone!")
		if (answer){
			this.vo.beanSetter("isactive",0);
			this.save();
		}
	},
	
		
	/** @id displayForm */
	displayForm : function () {
		
		var view = this.uieditor.getDialogForm();
		
		if(this.checkQueueFlags(this.dspQueue)) {
			
			this.buildFormDivString();
			
			this.setMode(this.uieditor.getDialogMode());
			
			this.uieditor.populateTreeOwnerInformation();
			
		}	
	}

}
