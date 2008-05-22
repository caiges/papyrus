/**
 * Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
 *
 *	@id documentHelper
 * @author tHallbr
*	@author bhalle (07/24/2006)
*	@alias	PDL.widget.Papyrus.documentHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.documentHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.documentHelper.setupHelper = function () {
	this.showLoadingOverlay();
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	// init bean values
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
	this.vo.beanSetter("ownertype","Section");
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	this.vo.beanSetter("isactive",1);
	this.vo.beanSetter("contenttype","document");
	
	this.vo.beanSetter("sortorder",-1);
	
	var service = new PDL.widget.Papyrus.connectionManager();
		
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
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.documentHelper.initQueueFlags = function () {
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
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.documentHelper.populateVO = function (o) {
	//YAHOO.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');
	
	this.vo.beanSetter("name",bean.name);
	this.vo.beanSetter("description",bean.description);
	this.vo.beanSetter("filename",bean.filename);
	this.vo.beanSetter("filesize",bean.filesize);
	this.vo.beanSetter("isinternal",bean.isinternal);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("createddatetime",bean.createddatetime);
	
	this.vo.beanSetter("contentrowid",bean.contentrowid);
	
	this.vo.beanSetter("containerrowidinit",bean.containerrowid);
	this.vo.beanSetter("belongstoinit",bean.belongsto);
	this.vo.beanSetter("containerrowid",bean.containerrowid);
	this.vo.beanSetter("belongsto",bean.belongsto);
	
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
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.documentHelper.save = function () {
	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	if(this.action == "Create") {
		var m = "createNewFileContent";
		if(this.validate()) {
			service.makeCall("POST","wsCMSFile",m,arg,this.FormSaved,this.wsFailure,"");
		}
	} else {
		var m = "updateFileContent";
		service.makeCall("POST","wsCMSFile",m,arg,this.FormSaved,this.wsFailure,"");
	}
	//console.log('verify stuct : onsubmit '+PDL.util.JSON.jsonEncode(arg) );
}


/**
*
*	Callback Handler for service call to save the doc information, remove the wddxPacket wrapper
*
*	@id FormSaved
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.FormSaved
*	@param	o response object from service call
*	@see	PDL.util.wddxPackets
*	
 */
PDL.widget.Papyrus.documentHelper.FormSaved = function(o) { 	
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
		
		if(inserted) {
			treehelper.updateTreeSort();
		//YAHOO.log('('+inserted+') , collection create returned: rid = '+nda.contentid+' arid= '+nda.contentassociationid);
		//treehelper.refreshTree();
		}
	} else { // if action is update ... refresh tree incase something was deleted
	
		var formVO = PDL.widget.Papyrus.Editor.getFormBean();
		if (formVO.beanGetter("isactive") == 0) {
			
			var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
			var tt = pageVO.beanGetter("treetype");
			if (tt == "container") {
				var ct = pageVO.beanGetter("pagecontainerrowid");
			}
			PDL.widget.Papyrus.Editor.switchDialogForm("Load",tt,ct);
		}
		
		treehelper.refreshTree();
	}
	
	// fire Editor's onHasChanged event
	PDL.widget.Papyrus.Editor.onHasChanged.fire();
	
}

PDL.widget.Papyrus.documentHelper.uploadContent = function() {
	var tmpPDate = document.form_dlgdocument.posteddate.value;
	var aTmpPDate = tmpPDate.split('/');
	var sPDate = aTmpPDate[2]+'-'+aTmpPDate[0]+'-'+aTmpPDate[1]+' 00:00:00';
	this.vo.beanSetter("createddatetime",sPDate);
	var s = document.form_dlgdocument.displayname.value;
	s = PDL.util.Text.xmlEncode( s );
	this.vo.beanSetter("name",s);
	var s2 = document.form_dlgdocument.description.value;
	s2 = PDL.util.Text.xmlEncode( s2 );
	this.vo.beanSetter("description",s2);
	if(document.form_dlgdocument.isinternal.checked)
		this.vo.beanSetter("isinternal",1);
	else
		this.vo.beanSetter("isinternal",0);
	
	var tree = PDL.widget.Papyrus.Editor.getDialogTreeHelper().getTree();
	
	if(this.action == "Load") { //	NOTE : document is unique ... uses rowid instead of contentrowid since contentrowid is the actual file record rowid
		var tmpPos = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByTypeRowID(tree.getRootNode(),tree,"document",this.vo.beanGetter("rowid"));
		PDL.widget.Papyrus.Editor.getEditorBean().beanSetter("treeposid",tmpPos.treeid)
	}
	
	var tmpYID = PDL.widget.Papyrus.Editor.getEditorBean().beanGetter("treeposid");
	var tmpVal = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByYID(tree.getRootNode(),tree,tmpYID);
	
	this.vo.beanSetter("containerrowid",tmpVal.prowid);
	this.vo.beanSetter("belongsto",tmpVal.ptype);
	this.vo.beanSetter("containerrowidinit",tmpVal.prowid);
	this.vo.beanSetter("belongstoinit",tmpVal.ptype);

	if(document.getElementById("form_dlgdocument").Filename.value.length == 0){ //since there is nothing in the upload box, just save info
		this.vo.beanSetter( "filename", "" );	
		this.save();
	} else {
		var service = new PDL.widget.Papyrus.connectionManager();
		var arg = document.getElementById("form_dlgdocument");
		service.makeCall("UPLOAD","cmsFlex2CFUploadHack","",arg,this.saveUploadedContent,this.wsFailure,"");
	} 
}

PDL.widget.Papyrus.documentHelper.saveUploadedContent = function(o) {
	var a = eval('(' + o.responseText + ')');
	var service = new PDL.widget.Papyrus.connectionManager();
	var vo = PDL.widget.Papyrus.Editor.getFormBean();
	
	vo.beanSetter("filename",a['filename']);
	vo.beanSetter("filesize",a['filesize']);
	vo.beanSetter("isactive",1);
	
	//console.log('verify stuct : onpopulate '+PDL.util.JSON.jsonEncode(vo))
	
	PDL.widget.Papyrus.Editor.getDialogFormHelper().save();
}


/**
*
*	(Required) set the isactive flag on bean to false and save
*
*	@id inactive
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.inactive
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.documentHelper.inactive = function () {
	var answer = confirm("Are you sure you want to delete this item?\nWARNING: This action can not be undone!")
	if (answer){
		
		this.vo.beanSetter("name",PDL.util.Text.xmlEncode( document.form_dlgdocument.displayname.value ) );
		this.vo.beanSetter("description",PDL.util.Text.xmlEncode( document.form_dlgdocument.description.value ) );
		if(document.form_dlgdocument.isinternal.checked)
			this.vo.beanSetter("isinternal",1);
			
		else
			this.vo.beanSetter("isinternal",0);
		
		var tree = PDL.widget.Papyrus.Editor.getDialogTreeHelper().getTree();

		if(this.action == "Load") { //	NOTE : document is unique ... uses rowid instead of contentrowid since contentrowid is the actual file record rowid
			var tmpPos = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByTypeRowID(tree.getRootNode(),tree,"document",this.vo.beanGetter("rowid"));
//console.log(tmpPos.treeid)
			PDL.widget.Papyrus.Editor.getEditorBean().beanSetter("treeposid",tmpPos.treeid);
		}
		
		var tmpYID = PDL.widget.Papyrus.Editor.getEditorBean().beanGetter("treeposid");
//console.log('looking for '+tmpYID);
		var tmpVal = PDL.widget.Papyrus.Editor.getDialogTreeHelper().searchTreeByYID(tree.getRootNode(),tree,tmpYID);
//console.log('found ' + tmpVal.prowid +' '+ tmpVal.ptype +' '+ tmpVal.type +' '+ tmpVal.rowid );
		
		if(tmpVal.type == 'collection') {
//console.log('collection');
			this.vo.beanSetter("containerrowid",tmpVal.rowid);
			this.vo.beanSetter("belongsto",tmpVal.type);
			this.vo.beanSetter("containerrowidinit",tmpVal.rowid);
			this.vo.beanSetter("belongstoinit",tmpVal.type);
		} else {
//console.log('container');
			this.vo.beanSetter("containerrowid",tmpVal.prowid);
			this.vo.beanSetter("belongsto",tmpVal.ptype);
			this.vo.beanSetter("containerrowidinit",tmpVal.prowid);
			this.vo.beanSetter("belongstoinit",tmpVal.ptype);
		}
		
		this.vo.beanSetter( "filename", "" );	
		
		this.vo.beanSetter("isactive",0);
		
		this.save();
	}
}


/**
*
*	validates bean values before sending to ws
*
*	@id validate
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.documentHelper
*	@alias	PDL.widget.Papyrus.documentHelper.validate
*	
 */
PDL.widget.Papyrus.documentHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("name").length == 0) {
		msg = msg+'\n - Display Name';
	}
	
	if( msg.length > 0 ) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}