/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgHtml = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgHtml.prototype  = {	
	init : function () {
		this.bo;
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");
	},
	
	builddialogform : function (bean) {

		var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.refreshEditor();" title="Cacnel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
		var viewtype = 'formfield';
		var sFormTitle = 'Create';
		var sInfo = '';
		var sEditDisplay = '';
		
		if(this.action == "Load"){
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete HTML</a></span>';  
			viewtype = 'formfieldclear';
			sFormTitle = 'Manage';
			sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+bean.beanGetter("createddatetime");
			sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
		}
		this.bo = bean;
		var dlgHtmlHTML =  '<div class="dlgCMSFormNavigation">'+
				'<div align="right" class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">&nbsp;&nbsp; '+sEditDisplay+' <span id="formEditButton"></span></a></div>'+
			'</div>' +			
			'<div id="dlgCMSFormOverlayShell">'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlghtml" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						'<div>Text Block:<br /><div id="htmlcontentcontainer"><div id="htmlcontent" class="'+viewtype+' mceEditor" style="width: 95%; height: 140px; overflow: auto;">'+bean.beanGetter("htmltext")+'</div></div></div>' +
					'</div>' +						
					'<div align="center" style="padding-bottom:0px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+
					'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">' + sDelete + '&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().save();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Save Info</a></span>'+
					'</div>'
				'</form>'+
			'</div>' ;
		return dlgHtmlHTML;
	}
	
}
