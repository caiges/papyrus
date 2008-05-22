/**
* 	Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
*
*	@id containerHelper
* 	@author tHallbr
*	@alias	PDL.widget.Papyrus.containerHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.containerHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.containerHelper.setupHelper = function () {
	this.showLoadingOverlay();
	
	var service = new PDL.widget.Papyrus.connectionManager();
	
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	// init bean values
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("pagerowid",pageVO.beanGetter("pagerowid"));
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	this.vo.beanSetter("containertype","heading");
	this.vo.beanSetter("isactive",1);
	
	if(this.action == "Create") {
		this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
		this.vo.beanSetter("ownertype","Section");
		this.vo.beanSetter("containertyperowid",pageSettings.containertyperowid);
		
	} else {	
		this.vo.beanSetter("pagecontainerrowid",pageVO.beanGetter("pagecontainerrowid"));
		
		// init tree dlg overlay
		this.initOverlay( "formDialogOverlay" , 386, 296 );
		
		var arg = '"'+this.vo.beanGetter("containerrowid")+'"';
		service.makeCall("POST","wsCMSContainers","getContainerInfo",arg,this.LoadForm,this.wsFailure,"");
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
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.containerHelper.initQueueFlags = function () {
	switch(this.action) {
		case "Load":
			this.dspQueue = [0]; // flag 0 = getContainerInfo
		break;
		default:
			this.dspQueue = [1]; // flag 0 = getContainerInfo
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
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.containerHelper.populateVO = function (o) {
	//YAHOO.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');
	
	this.vo.beanSetter("rowid",bean.rowid);
	this.vo.beanSetter("containername",bean.containername);
	this.vo.beanSetter("containertyperowid",bean.containertyperowid);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("createddatetime",PDL.util.Date.formatSQLDate_MMMDDYYYY(bean.createddatetime));
	
	
	this.uieditor.setTreeOwnerInformation( bean.containername );
	
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
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.containerHelper.save = function () {
	var s = document.form_dlgcontainer.containername.value;
	var selectedContainer = document.getElementById( PDL.widget.Papyrus.Selector.getSelectedContentContainer().elementId ); 
	var so = null;
	
	var re = new RegExp( /sortorder_[0-9]+/gi );
	var soMatch = selectedContainer.className.match( re );
	
	if( soMatch != null ) {
	
		soMatch = soMatch[0];
		so = soMatch.substr( 10, soMatch.length );
		
	} else {
		
		so = -1;
		
	}
	
	var pageRowId = this.vo.beanGetter( "pagerowid" );
	
	s = PDL.util.Text.xmlEncode( s );
	
	this.vo.beanSetter("containername",s);

	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	if(this.action == "Create") {
		var m = "createNewContainer";
		this.vo.beanSetter( "sortorder", so );
	} else {
		var m = "updateContainer";
	}
	//console.log('verify stuct : onsubmit '+arg)
	
	if( this.validate() ) {
		
		service.makeCall("POST","wsCMSContainers",m,arg,this.FormSaved,this.wsFailure,"");
		
	}
	
}


/**
*
*	Callback Handler for service call to save the container information, remove the wddxPacket wrapper
*
*	@id FormSaved
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.FormSaved
*	@param	o response object from service call
*	@see	PDL.util.wddxPackets
*	
 */
PDL.widget.Papyrus.containerHelper.FormSaved = function(o) { 
	var a = PDL.widget.Papyrus.Editor.getDialogFormHelper().getAction();
	var treehelper = PDL.widget.Papyrus.Editor.getDialogTreeHelper();
	
	PDL.widget.Papyrus.Editor.showPageRefreshMsg();
	
	if(a == "Create") {  // TODO : if action is create ... loop page tree and update tree sort
		var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
		var srtxt = PDL.util.stringFunc.removeFirstAndLastChr(rtxt);
		var atxt = srtxt.split(",");
		
		document.getElementById('savedNotification').setAttribute('style','color:green;font-weight:bold;');
		document.getElementById('savedNotification').innerHTML = atxt[0];
		
		PDL.widget.Papyrus.Editor.hideDialogShell();
		PDL.widget.Papyrus.Editor.displayEditor("Load","container",atxt[1],"editor");
		
	} else { // if action is update ... refresh tree incase something was deleted
		var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
		document.getElementById('savedNotification').setAttribute('style','color:green;font-weight:bold;');
		document.getElementById('savedNotification').innerHTML = rtxt;
	
		
		var formVO = PDL.widget.Papyrus.Editor.getFormBean();
		if (formVO.beanGetter("isactive") == 1) {
			treehelper.refreshTree();
			var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
			var tt = pageVO.beanGetter("treetype");
			if (tt == "container")
				var ct = pageVO.beanGetter("pagecontainerrowid");
			PDL.widget.Papyrus.Editor.switchDialogForm("Load",tt,ct);
		} else {
			
			PDL.widget.Papyrus.Editor.hideDialogShell();
			PDL.widget.Papyrus.Editor.updatePage( null, PDL.widget.Papyrus.Editor );
			
		}
	}
	
	// fire Editor's onHasChanged event
	PDL.widget.Papyrus.Editor.onHasChanged.fire();
}


/**
*
*	validates bean values before sending to ws
*
*	@id validate
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.containerHelper
*	@alias	PDL.widget.Papyrus.containerHelper.validate
*	
 */
PDL.widget.Papyrus.containerHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("containername").length == 0) {
		msg = msg+'\n - Section Name';
	}
	
	if(msg.length > 0) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}