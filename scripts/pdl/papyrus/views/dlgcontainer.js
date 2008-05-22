/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgContainer = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgContainer.prototype  = {	
	init : function () {
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");
	},
	
	builddialogform : function (bean) {		
		var sDelete = '';
		var sFormTitle = 'Create';
		var sInfo = '';
		var sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
		var sBTitle = 'Save Changes';
		var sContainer = '<div><label for="containername" style="width:100px;">Section Name:</label><input type="textbox" name="containername" id="containername" value="'+bean.beanGetter("containername")+'" class="formfield" size="40" maxlength="100" /></div>';
		var sNav = '<div class="dlgCMSFormNavigation"><div align="right" class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">'+sEditDisplay+'&nbsp;<span id="formEditButton"></span></a></div></div>';
		var formShellStyle = "";
		
		if(this.action == "Load"){
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete Section" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete Section</a></span>';     
			sFormTitle = 'Manage';
			sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+bean.beanGetter("createddatetime");
			sContainer = '<div class="dlgCMSFormField"><label for="containername" style="width:100px;">Section Name:</label><input type="textbox" name="containername" id="containername" value="'+bean.beanGetter("containername")+'" size="40" maxlength="100" /></div>';
			sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
		} else {
			sBTitle = 'Next >>';
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.hideDialogShell();" title="Cancel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
			sNav = "";
			formShellStyle = 'style="height: 100%;"';
		}
		
		var dlgFormHTML = sNav + 		
			'<div id="dlgCMSFormOverlayShell" ' + formShellStyle + '>'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlgcontainer" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						sContainer+
					'</div>' +
					'<div align="center" style="padding-bottom:4px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+
				'</form>'+
				'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">'+
					sDelete+
					'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().save();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> '+sBTitle+'</a></span>'+
				'</div>'+
			'</div>';
			
		return dlgFormHTML;
	}
	
}