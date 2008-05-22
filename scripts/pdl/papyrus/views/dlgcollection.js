/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgCollection = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgCollection.prototype  = {	
	init : function () {
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");		
	},
	
	builddialogform : function (bean) {
		if(bean.beanGetter("displayname")) {
			var sChecked = 'checked';
		}else {
			var sChecked = '';
		}
		
		var sFormTitle = 'Create';
		var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.refreshEditor();" title="Cancel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
		var sInfo = '';
		var sEditDisplay = '';
		var sCollectionType = PDL.util.wordCasing.upperFirstLetter(bean.beanGetter("collectiontype"));
		
		if(this.action == "Load"){
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete Collection</a></span>';  
			sFormTitle = 'Manage';
			sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+bean.beanGetter("createddatetime");
			sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
		}
		
		var dlgCollectionHTML = '<div class="dlgCMSFormNavigation">'+
				'<div align="right" class="dlgButton" ><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">'+sEditDisplay+'&nbsp;<span id="formEditButton"></span></a></div>'+
			'</div>' +			
			'<div id="dlgCMSFormOverlayShell">'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlgcollection" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						'<div class="dlgCMSFormField"><label for="collectionname" style="width:100px;">Collection Name:</label><input type="textbox" name="collectionname" id="collectionname" value="'+bean.beanGetter("collectionname")+'" size="40" maxlength="100" /></div>' +
						'<div class="dlgCMSFormField"><label for="displayname" style="width:100px;">Display Name:</label><input type="checkbox" name="displayname" id="displayname" '+sChecked+' /></div>' +	
					'</div>' +	
					'<div align="center" style="padding-bottom:4px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+	
					'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">'+
						sDelete+
						'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().save();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Save Info</a></span>'+
					'</div>' +		
				'</form>'+
			'</div>' ;
			
		return dlgCollectionHTML;
	}
		
}
