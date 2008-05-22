/**
* Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
*
*	@id linkHelper
*   @author tHallbr
*	@alias	PDL.widget.Papyrus.linkHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.linkHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.linkHelper.setupHelper = function () {
	this.showLoadingOverlay();
	this.dpLinkTargets = new PDL.util.dataprovider();
	var service = new PDL.widget.Papyrus.connectionManager();
	
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	// init bean values
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
	this.vo.beanSetter("ownertype","Section");
	this.vo.beanSetter("isactive",1);
	this.vo.beanSetter("contenttype","link");
	
	this.vo.beanSetter("sortorder",-1);
	
	if(this.action == "Load") {
		var arg = '"'+this.vo.beanGetter("rowid")+'"';
		service.makeCall("POST","wsCMSLink","getLinkContentInfo",arg,this.LoadForm,this.wsFailure,"");
		
		// init tree dlg overlay
		this.initOverlay( "formDialogOverlay" , 386, 296 );
	} else {
		this.setLinkTargetDP();
	}
	
	this.displayForm();
}


/**
*
*	(Required) Initialize the display queue flags which helps manage the view
*
*	@id initQueueFlags
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.linkHelper.initQueueFlags = function () {
	switch(this.action) {
		case "Load":
			this.dspQueue = [0,0]; // flag 0 = getContainerInfo, flag 1 = setLinkTargetDP
		break;
		default:
			this.dspQueue = [1,0]; // flag 0 = getContainerInfo, flag 1 = setLinkTargetDP
		break;
	}
}


/**
*
*	(Required) populate the bean with the results object
*
*	@id populateVO
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.linkHelper.populateVO = function (o) {
	//console.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');

	this.vo.beanSetter("linktext",bean.linktext);
	this.vo.beanSetter("linkurl",bean.linkurl);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("linktarget",bean.linktarget);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createddatetime",PDL.util.Date.formatSQLDate_MMMDDYYYY(bean.createddatetime));
	
	this.vo.beanSetter("contentrowid",bean.rowid);
	this.vo.beanSetter("containerrowidinit",bean.containerrowid);
	this.vo.beanSetter("belongstoinit",bean.belongsto);
	this.vo.beanSetter("containerrowid",bean.containerrowid);
	this.vo.beanSetter("belongsto",bean.belongsto);
	
	this.setLinkTargetDP();
	
	var helper = this.uieditor.getDialogFormHelper();
	helper.setQueueFlag(0);
	
	this.displayForm();
}


/**
*
*	(Required) populate the bean with the form values and save
*
*	@id save
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.linkHelper.save = function () {
	var s = document.form_dlglink.linktext.value;
	s = PDL.util.Text.xmlEncode( s );
	this.vo.beanSetter("linktext",s);
	var s2 = document.form_dlglink.linkurl.value;
	s2 = PDL.util.Text.xmlEncode( s2 );
	this.vo.beanSetter("linkurl",s2);
	this.vo.beanSetter("linktarget",document.form_dlglink.cbLinkTarget.value);
	
	var tree = PDL.widget.Papyrus.Editor.getDialogTreeHelper().getTree();
	
	if(this.action == "Load") {
		//console.log(this.vo.beanGetter("rowid"))
		var tmpPos = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByTypeRowID(tree.getRootNode(),tree,"link",this.vo.beanGetter("contentrowid"));
		PDL.widget.Papyrus.Editor.getEditorBean().beanSetter("treeposid",tmpPos.treeid)
	}
	
	var tmpYID = PDL.widget.Papyrus.Editor.getEditorBean().beanGetter("treeposid");
	//console.log(tmpYID)
	var tmpVal = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByYID(tree.getRootNode(),tree,tmpYID);
	
	this.vo.beanSetter("containerrowid",tmpVal.prowid);
	this.vo.beanSetter("belongsto",tmpVal.ptype);
	this.vo.beanSetter("containerrowidinit",tmpVal.prowid);
	this.vo.beanSetter("belongstoinit",tmpVal.ptype);
		
	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	
	if(this.action == "Create") {
		var m = "createNewLinkContent";
	} else {
		var m = "updateLinkContent";
	}
	//console.log('verify stuct : onsubmit '+PDL.util.JSON.jsonEncode(arg))

	
	if(this.validate())
		service.makeCall("POST","wsCMSLink",m,arg,this.FormSaved,this.wsFailure,"");
}


/**
*
*	Callback Handler for service call to save the doc information, remove the wddxPacket wrapper
*
*	@id FormSaved
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.FormSaved
*	@param	o response object from service call
*	@see	PDL.util.wddxPackets
*	
 */
PDL.widget.Papyrus.linkHelper.FormSaved = function(o) { 
	var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
	var stxt = PDL.util.stringFunc.removeFirstAndLastChr(rtxt);
	var atxt = stxt.split(",");
	
	document.getElementById('savedNotification').setAttribute('style','color:green;font-weight:bold;');
	document.getElementById('savedNotification').innerHTML = atxt[0];
	
	PDL.widget.Papyrus.Editor.showPageRefreshMsg();
	
	var a = PDL.widget.Papyrus.Editor.getDialogFormHelper().getAction();
	var treehelper = PDL.widget.Papyrus.Editor.getDialogTreeHelper();
	
	if(a == "Create") {  // if action is create ... loop page tree and update tree sort
		var tree = PDL.widget.Papyrus.Editor.getDialogTreeHelper().getTree();
		var tmpYID = PDL.widget.Papyrus.Editor.getEditorBean().beanGetter("treeposid");
		var nda = new Object;
		nda.contentid = atxt[1];
		nda.contentassociationid = atxt[2];
		var inserted = treehelper.setNodeContentData(tree.getRootNode(),tmpYID,nda);
		
		if(inserted) 
			treehelper.updateTreeSort();
		//YAHOO.log('collection create returned: rid = '+nda.contentid+' arid= '+nda.contentassociationid);
		//treehelper.refreshTree();
		
	} else { // if action is update ... refresh tree incase something was deleted
		
		var formVO = PDL.widget.Papyrus.Editor.getFormBean();
		if (formVO.beanGetter("isactive") == 0) {
		
			var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
			var tt = pageVO.beanGetter("treetype");
			if (tt == "container")
				var ct = pageVO.beanGetter("pagecontainerrowid");
			PDL.widget.Papyrus.Editor.switchDialogForm("Load",tt,ct);
		}
		
		treehelper.refreshTree();
	}
	
	// fire Editor's onHasChanged event
	PDL.widget.Papyrus.Editor.onHasChanged.fire();
	
}


/**
*
*	Build the DataProvider for the Section Pages dropdown
*
*	@id setSectionPagesDP
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.setSectionPagesDP
*	@param	rtxt response text from service call that has been stripped of the wddxPacket wrapper
*	@see	PDL.widget.Papyrus.Editor#getDialogForm
*	@see	PDL.widget.Papyrus.Editor#getDialogFormHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.linkHelper.setLinkTargetDP = function (rtxt) {
	var lnktrgtDS = '[{"data":"Internal","label":"Internal ( Within Intranet )"},{"data":"Popup","label":"External ( Outside Intranet )"}]';
	this.dpLinkTargets.setDataSet(lnktrgtDS);
	var view = this.uieditor.getDialogForm();
	view.setTargets(this.dpLinkTargets,this.vo.beanGetter("linktarget"));
	var helper = this.uieditor.getDialogFormHelper();
	helper.setQueueFlag(1);
	this.displayForm();
}


/**
*
*	validates bean values before sending to ws
*
*	@id validate
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.linkHelper
*	@alias	PDL.widget.Papyrus.linkHelper.validate
*	
 */
PDL.widget.Papyrus.linkHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("linktext").length == 0) {
		msg = msg+'\n - Link Text';
	}
	if(this.vo.beanGetter("linkurl").length == 0) {
		msg = msg+'\n - Link URL';	
	} else {
		
		//if( PDL.util.Window.validateLink( document.getElementById( "linkurl" ).value ) == false ) {
			
			//msg += '\n - Invalid URL. Must follow this format:\n\n\n\   \'http://www.yahoo.com\' or \'http://yahoo.com\'          \n\n\n - Click the test link icon to verify URL.';
			
		//}
		
	}
	
	if(msg.length > 0) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}

/** @id testLink */
PDL.widget.Papyrus.linkHelper.testLink = function() {
	
	var linkURLElement = document.getElementById( "linkurl" );
	
	if( linkURLElement ) {
		
		PDL.util.Window.openWindow( linkURLElement.value );
		return false;
		
	} else {
		
		return false;
	
	}
	
}

/** @id setMode */
PDL.widget.Papyrus.linkHelper.setMode = function( mode ) {
	if(document.getElementById( "formEditButton" ) != null){
		if ( mode == 'edit' && this.getAction() != "Create" ){
			document.getElementById('formEditButton').innerHTML = 'CANCEL EDIT MODE';	
			this.hideOverlay( "formDialogOverlay" );
			
			// enable 'link target' select
			var ltSelect = document.getElementById("cbLinkTarget");
			ltSelect.disabled = false; // IE bleed through hack
			ltSelect.style.background = "#ffffff"; // IE bleed through hack
			
			var linkTextEl = document.getElementById( "linktext" );
			linkTextEl.focus();
			
		} else if (mode == 'tree' && this.getAction() != "Create" ) {
			this.showOverlay( "formDialogOverlay" , "dlgCMSFormOverlayShell" , "overlayMask" );
			document.getElementById('formEditButton').innerHTML = 'ENABLE EDIT MODE';
			
			// disable 'link target select
			var ltSelect = document.getElementById("cbLinkTarget");
			ltSelect.disabled = true; // IE bleed through hack
			ltSelect.style.background = "#e9e9e9"; // IE bleed through hack
		} else {
			document.getElementById('formEditButton').innerHTML = '';
			this.killOverlay( "formDialogOverlay" );
			
			var linkTextEl = document.getElementById( "linktext" );
			linkTextEl.focus();
			
		}	
	}
}