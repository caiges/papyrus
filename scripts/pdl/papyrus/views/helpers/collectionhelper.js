/**
* Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
*
* 	@id collectionHelper
* 	@author tHallbr
*	@alias	PDL.widget.Papyrus.collectionHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.collectionHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.collectionHelper.setupHelper = function () {
	this.showLoadingOverlay();
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	// init bean values
	this.vo.beanSetter("containerrowid",pageVO.beanGetter("containerrowid"));
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
	this.vo.beanSetter("ownertype","Section");
	this.vo.beanSetter("containerrowidinit",pageVO.beanGetter("containerrowid"));
	this.vo.beanSetter("isactive",1);
	
	this.vo.beanSetter("sortorder",-1);
	
	var service = new PDL.widget.Papyrus.connectionManager();
		
	if(this.action == "Load") {
		var arg = '"'+this.vo.beanGetter("rowid")+'"';
		service.makeCall("POST","wsCMSCollections","getCollectionContentInfo",arg,this.LoadForm,this.wsFailure,"");
		
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
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.collectionHelper.initQueueFlags = function () {
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
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.collectionHelper.populateVO = function (o) {
	//YAHOO.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');	
	
	this.vo.beanSetter("collectionname",bean.collectionname);
	this.vo.beanSetter("displayname",bean.displayname);
	this.vo.beanSetter("collectiontype",bean.collectiontype);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("contentrowid",bean.contentrowid);
	this.vo.beanSetter("createddatetime",PDL.util.Date.formatSQLDate_MMMDDYYYY(bean.createddatetime));
	
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
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.collectionHelper.save = function () {
	
	var s = document.form_dlgcollection.collectionname.value;
	s = PDL.util.Text.xmlEncode( s );
	
	//this.vo.beanSetter("collectionname",document.form_dlgcollection.collectionname.value);
	this.vo.beanSetter("collectionname",s);
	if(document.form_dlgcollection.displayname.checked)
		this.vo.beanSetter("displayname",1);
	else
		this.vo.beanSetter("displayname",0);
	
		
	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	var act = PDL.widget.Papyrus.Editor.getEditorBean().beanGetter("action");
	if(this.action == "Create") {
		var m = "createNewCollectionContent";
	} else {
		var m = "updateCollectionContent";
	}
	
	
	//console.log( 'verify stuct : onsubmit '+PDL.util.JSON.jsonEncode( arg ) )
	
	if(this.validate())
		service.makeCall("POST","wsCMSCollections",m,arg,this.FormSaved,this.wsFailure,"");
}


/**
*
*	Callback Handler for service call to save the collection information, remove the wddxPacket wrapper
*
*	@id FormSaved
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.FormSaved
*	@param	o response object from service call
*	@see	PDL.util.wddxPackets
*	
 */
PDL.widget.Papyrus.collectionHelper.FormSaved = function(o) { 
	var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
	var srtxt = PDL.util.stringFunc.removeFirstAndLastChr(rtxt);
	var atxt = srtxt.split(",");
	
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
		if (formVO.beanGetter("isactive") == 0) { // if deleted
			
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
*	validate bean before sending to ws
*
*	@id validate
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.collectionHelper
*	@alias	PDL.widget.Papyrus.collectionHelper.validate
*	
 */
PDL.widget.Papyrus.collectionHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("collectionname").length == 0) {
		msg = msg+'\n - Collection Name';
	}
	
	if(msg.length > 0) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}