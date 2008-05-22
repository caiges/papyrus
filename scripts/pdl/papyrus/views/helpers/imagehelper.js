/**
 * Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
 *
 * @author tHallbr
*	@alias	PDL.widget.Papyrus.imageHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.imageHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.imageHelper.setupHelper = function () {
	this.showLoadingOverlay();
	var service = new PDL.widget.Papyrus.connectionManager();
	
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	
	// init bean values
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
	this.vo.beanSetter("ownertype","Section");
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	this.vo.beanSetter("containerrowid",pageVO.beanGetter("containerrowid"));
	this.vo.beanSetter("containerrowidinit",pageVO.beanGetter("containerrowid"));
	this.vo.beanSetter("belongsto","container");
	this.vo.beanSetter("belongstoinit","container");
	this.vo.beanSetter("isactive",1);
	this.vo.beanSetter("isinternal",1);
	this.vo.beanSetter("contenttype","Image");
	
	this.vo.beanSetter("sortorder",-1);
	
	if(this.action == "Load") {
		var arg = '"'+this.vo.beanGetter("rowid")+'"';
		service.makeCall("POST","wsCMSFile","getFileContentInfo",arg,this.LoadForm,this.wsFailure,"");
		
		// init tree dlg overlay
		this.initOverlay( "formDialogOverlay" , 386, 296 );
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
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.imageHelper.initQueueFlags = function () {
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
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.imageHelper.populateVO = function (o) {
	//YAHOO.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');
	
	this.vo.beanSetter("name",bean.filename);
	this.vo.beanSetter("filename",bean.filename);
	this.vo.beanSetter("description",bean.filename);
	this.vo.beanSetter("filesize",bean.filesize);
	this.vo.beanSetter("filepath",bean.filepath);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createddatetime",bean.createddatetime);
	
	this.vo.beanSetter("contentrowid",bean.contentrowid);
	
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
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.imageHelper.save = function () {	
	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	if(this.action == "Create") {
		var m = "createNewFileContent";
		if(this.validate())
			service.makeCall("POST","wsCMSFile",m,arg,this.FormSaved,this.wsFailure,"");	
	} else {
		
		if( arg.beanGetter( "isactive" ) == 0 ) {
		
			arg.beanSetter( "filename", "" );	
		
		}
		
		var m = "updateFileContent";
		service.makeCall("POST","wsCMSFile",m,arg,this.FormSaved,this.wsFailure,"");	
	}
}


/**
*
*	Callback Handler for service call to save the img information, remove the wddxPacket wrapper
*
*	@id FormSaved
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.FormSaved
*	@param	o response object from service call
*	@see	PDL.util.wddxPackets
*	
 */
PDL.widget.Papyrus.imageHelper.FormSaved = function(o) { 
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

PDL.widget.Papyrus.imageHelper.uploadContent = function() {
	if(document.getElementById("form_dlgimage").Filename.value.length == 0){ //since there is nothing in the upload box, just save info
		this.save();
	} else {
		var service = new PDL.widget.Papyrus.connectionManager();
		var arg = document.getElementById("form_dlgimage");
		service.makeCall("UPLOAD","cmsFlex2CFUploadHack","",arg,this.saveUploadedContent,this.wsFailure,"");
	}
}

PDL.widget.Papyrus.imageHelper.saveUploadedContent = function(o) {
	var a = eval('(' + o.responseText + ')');
	var service = new PDL.widget.Papyrus.connectionManager();
	var vo = PDL.widget.Papyrus.Editor.getFormBean();
	
	vo.beanSetter("name",a['filename']);
	vo.beanSetter("filename",a['filename']);
	vo.beanSetter("description",a['filename']);
	vo.beanSetter("filesize",a['filesize']);
	vo.beanSetter("isactive",1);
	
	//console.log('verify stuct : onpopulate '+PDL.util.JSON.jsonEncode(vo))
	
	PDL.widget.Papyrus.Editor.getDialogFormHelper().save();
}


/**
*
*	validates bean values before sending to ws
*
*	@id validate
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.imageHelper
*	@alias	PDL.widget.Papyrus.imageHelper.validate
*	
 */
PDL.widget.Papyrus.imageHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("name").length == 0) {
		msg = msg+'\n - Upload Location';
	}
	
	if(msg.length > 0) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}