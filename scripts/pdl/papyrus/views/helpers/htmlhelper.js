/**
* Use this ScriptDoc file to manage the documentation for the corresponding namespace in your JavaScript library.
*
*	@id htmlHelper
* 	@author tHallbr
*	@alias	PDL.widget.Papyrus.htmlHelper
*	@classDescription The container helper extends the helper.js class
*	@see	PDL.widget.Papyrus.helper
*
 */
PDL.widget.Papyrus.htmlHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());


/**
*
*	(Required) Setup the helper by making initial service calls and variables
*
*	@id setupHelper
*	@author	bhalle britton.halle@pearson.com
*	@method
*	@methodOf PDL.widget.Papyrus.htmlHelper
*	@alias	PDL.widget.Papyrus.htmlHelper.setupHelper
*	@see	PDL.util.dataprovider
*	@see	#displayForm
*	
 */
PDL.widget.Papyrus.htmlHelper.setupHelper = function () {
	this.showLoadingOverlay();
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	// init bean values
	this.vo.beanSetter("privacylevelrowid",pageVO.beanGetter("privacylevelrowid"));
	this.vo.beanSetter("containerrowid",pageVO.beanGetter("containerrowid"));
	this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
	if(this.action == "Create") {
		this.vo.beanSetter("ownerrowid",pageVO.beanGetter("sectionrowid"));
		this.vo.beanSetter("ownertype","Section");
		this.vo.beanSetter("userrowid",pageVO.beanGetter("userrowid"));
		this.vo.beanSetter("isactive",1);
	} else {	
		this.vo.beanSetter("containerrowidinit",pageVO.beanGetter("containerrowid"));
	}
	
	this.vo.beanSetter("sortorder",-1);
	
	var service = new PDL.widget.Papyrus.connectionManager();
	
	if(this.action == "Load") {
		var arg = '"'+this.vo.beanGetter("rowid")+'"';
		service.makeCall("POST","wsCMSHtml","getHTMLContentInfo",arg,this.LoadForm,this.wsFailure,"");
		
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
*	@methodOf PDL.widget.Papyrus.htmlHelper
*	@alias	PDL.widget.Papyrus.htmlHelper.initQueueFlags
*	
 */
PDL.widget.Papyrus.htmlHelper.initQueueFlags = function () {
	switch(this.action) {
		case "Load":
			this.dspQueue = [0]; // flag 0 = getHTMLInfo
		break;
		default:
			this.dspQueue = [1]; // flag 0 = getHTMLInfo
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
*	@methodOf PDL.widget.Papyrus.htmlHelper
*	@alias	PDL.widget.Papyrus.htmlHelper.populateVO
*	@see	PDL.widget.Papyrus.Editor
*	@param	o, the object returned from the service call
*	@see	PDL.widget.Papyrus.helper.buildFormDivString
*	
 */
PDL.widget.Papyrus.htmlHelper.populateVO = function (o) {
	//YAHOO.log('verify stuct : onpopulate '+o)
	var bean = eval('(' + o + ')');
	var newHTMLTxt = "";
	var reGT = /&gt;/igm;
	var reLT = /&lt;/igm;
	newHTMLtxt = bean.htmltext.replace( reGT, ">" );
	newHTMLtxt = newHTMLtxt.replace( reLT, "<" );
	//newHTMLtxt = newHTMLtxt.replace( "&quot;", "''" );
	//alert( newHTMLtxt );
	//this.vo.beanSetter("htmltext",bean.htmltext);
	this.vo.beanSetter("htmltext",newHTMLtxt);
	this.vo.beanSetter("isactive",bean.isactive);
	this.vo.beanSetter("createdby",bean.createdby);
	this.vo.beanSetter("contenttype",bean.contenttype);
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
*	@methodOf PDL.widget.Papyrus.htmlHelper
*	@alias	PDL.widget.Papyrus.htmlHelper.save
*	@see	PDL.widget.Papyrus.Editor
*	
 */
PDL.widget.Papyrus.htmlHelper.save = function () {
	var content = escape( tinyMCE.getContent() );
	this.vo.beanSetter("htmltext", content);

	var service = new PDL.widget.Papyrus.connectionManager();
	var arg = this.vo;
	if(this.action == "Create") {
		var m = "createNewHTMLContent";
	} else {
		var m = "updateHTMLContent";
	}
	//alert('verify stuct : onsubmit '+PDL.util.JSON.jsonEncode(arg) );
	
	if(this.validate()) {
		service.makeCall("POST","wsCMSHtml",m,arg,this.FormSaved,this.wsFailure,"");
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
PDL.widget.Papyrus.htmlHelper.FormSaved = function(o) { 
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


PDL.widget.Papyrus.htmlHelper.setMode = function(mode) {
	var view = this.uieditor.getDialogForm();
	var b = document.getElementById('dlgCMSFormButtons');
	var eb = document.getElementById('formEditButton');
	if(b != null && eb != null) {
		if (mode == 'edit' && this.getAction() != "Create"){
			
			this.hideOverlay( "formDialogOverlay" );
			this.showOverlay( "treeDialogOverlay" , "dlgCMSTreeOverlayShell" , "overlayMask" );
			
			eb.innerHTML = 'CANCEL EDIT MODE';	
			
			var cn = document.getElementById("htmlcontent");
			
			tinyMCE.execCommand( 'mceAddControl', false, cn.id );
			b.style.display = "block";
			
		} else if( mode == 'edit' && this.getAction() == "Create" ) {
			
			//this.hideOverlay( "formDialogOverlay" );
			//this.showOverlay( "treeDialogOverlay" , "dlgCMSTreeOverlayShell" , "overlayMask" );
			
			var cn = document.getElementById("htmlcontent");
			
			tinyMCE.execCommand( 'mceAddControl', false, cn.id );
			
		} else if (mode == 'tree' && this.getAction() != "Create") {
			
			this.hideOverlay( "treeDialogOverlay" );
			this.showOverlay( "formDialogOverlay" , "dlgCMSFormOverlayShell" , "overlayMask" );
			
			eb.innerHTML = 'ENABLE EDIT MODE';
			
			var cn = document.getElementById("htmlcontent");
			
			tinyMCE.setContent( this.vo.beanGetter( "htmltext" ) );
			tinyMCE.execCommand( 'mceRemoveControl', false, cn.id );
			
			b.style.display = "block";			


		}	else {
			
			this.killOverlay( "formDialogOverlay" );
			
		}
	}
}


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
PDL.widget.Papyrus.htmlHelper.validate = function () {
	var msg = '';
	
	if(this.vo.beanGetter("htmltext").length == 0) {
		msg = msg+'\n - Text Block';
	}
	
	if(msg.length > 0) {
		alert('The following field values are not valid:\n' + msg);
		return false;
	}
	return true;
}