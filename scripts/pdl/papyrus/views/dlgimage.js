/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgImage = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgImage.prototype  = {	
	init : function () {
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");			
	},
	
	builddialogform : function (bean) {
		var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.refreshEditor();" title="Cancel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
		var sPreview = '';
		var sPath = PDL.util.PageURL.getURL()+bean.beanGetter("filepath").replace(/\\/i,"/")+'/'+bean.beanGetter("filename");
		var sUpload = '<div class="dlgCMSFormField"><label for="Filename" style="width:100px;">Select Document:</label><input type="file" name="Filename" id="Filename" size="20" /></div>';
		var sSave = '&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().uploadContent();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Save Info</a></span>';
		var sFormTitle = 'Create';
		var sInfo = '';
		var sEditDisplay = '';
		
		if(this.action == "Load"){
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete Image</a></span>';  
			//sUpload = '';
			sUpload = '<div class="dlgCMSFormField"><label for="Filename" style="width:100px;">Overwrite Current Image:</label><input type="file" name="Filename" id="Filename" size="20" /></div>';
			//sSave = '';
			sSave = '&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().uploadContent();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Overwrite Image</a></span>';
			sPreview = '<div><strong>Image Preview:</strong></div><div style="width:375px;height:150px;overflow:auto;"><img src="'+sPath+'" border="1" /></div><br/>';
			sFormTitle = 'Manage';
			sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+PDL.util.Date.formatSQLDate_MMMDDYYYY( bean.beanGetter("createddatetime") );
			sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
		}
		
		/*'<div><label>Document Size:</label>'+bean.beanGetter("filesize")+'</div><br/>' +*/
		var dlgImageHTML =  '<div class="dlgCMSFormNavigation">'+
				'<div align="right" class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">&nbsp;&nbsp; '+sEditDisplay+' <span id="formEditButton"></span></a></div>'+
			'</div>' +			
			'<div id="dlgCMSFormOverlayShell">'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlgimage" id="form_dlgimage" enctype="multipart/form-data" method="post" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						'<div class="dlgCMSFormField"><label>Image Name:</label>'+bean.beanGetter("filename")+'</div><br/>' +
						sUpload +
						sPreview+
					'</div>' +	
					'<div align="center" style="padding-bottom:4px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+
					'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">'+
						sDelete+
						sSave+
					'</div>' +	
				'</form>'+
			'</div>' ;
			
		return dlgImageHTML;
	}
}
