/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgDocument = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgDocument.prototype  = {	
	init : function () {
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");
		this.thumbnaildiv = '';
	},
	
	builddialogform : function (bean) {
		var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.refreshEditor();" title="Cancel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
		var sUpload = '<div class="dlgCMSFormField"><label for="filebrowse" style="width:130px;">Select Document:</label><input type="file" name="Filename" id="Filename" size="20" /></div>';
		var sFile = '';
		var sFormTitle = 'Create';
		var sInfo = '';
		this.setThumbnail('upload');
		var sEditDisplay = '';
		var now = new Date();		
		var sPostedDate = PDL.util.Date.formatAmerican( now );
		
		if(this.action == "Load"){
			sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete Document</a></span>';  
			//sUpload = '';
			sUpload = '<div class="dlgCMSFormField"><label for="filebrowse" style="width:130px;">Overwrite Current Doc:</label><input type="file" name="Filename" id="Filename" size="20" /></div>';
			sFile = '<div class="dlgCMSFormField"><label style="width:130px;">Document Name:</label>'+bean.beanGetter("filename")+'</div>';
			/* '<div><label>Document Size:</label>'+bean.beanGetter("filesize")+'</div>'*/
			sFormTitle = 'Manage';
			sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+PDL.util.Date.formatSQLDate_MMMDDYYYY( bean.beanGetter("createddatetime") );
			sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
			sPostedDate = PDL.util.Date.formatAmerican( PDL.util.Date.convertSQLDate_JS( bean.beanGetter("createddatetime") ) );
		}
		
		if(bean.beanGetter("isinternal")) {
			var sChecked = 'checked';
		}else {
			var sChecked = '';
		}
		
		var dlgDocumentHTML =  '<div class="dlgCMSFormNavigation">'+
				'<div align="right" class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">'+sEditDisplay+'&nbsp;<span id="formEditButton"></span></a></div>'+
			'</div>' +			
			'<div id="dlgCMSFormOverlayShell">'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlgdocument" id="form_dlgdocument" enctype="multipart/form-data" method="post" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						sFile +
						sUpload +
						'<div class="dlgCMSFormField"><label for="displayname" style="width:130px;">Display Name:</label><input type="textbox" name="displayname" id="displayname" value="'+bean.beanGetter("name")+'" size="35" maxlength="100" /></div>' +
						'<div class="dlgCMSFormField"><label for="isinternal" style="width:130px;">Internal Company Doc:</label><input type="checkbox" name="isinternal" '+sChecked+' /></div>' +
						'<div class="dlgCMSFormField"><label for="description" style="width:130px;">Description:</label><textarea name="description" id="description" cols="33" rows="5" >'+bean.beanGetter("description")+'</textarea></div>' +
						//'<div id="docthumbdiv">'+this.getThumbnail()+'</div>'+
						'<div class="dlgCMSFormField"><label for="posteddate" style="width:130px;">Posted Date:</label><input id="posteddate" size="10" maxlength="10" name="datetime2" type="text" value="'+sPostedDate+'"><img src="'+PDL.util.PageURL.getURL()+'/img/calendar.gif" onclick="showChooser(this, \'posteddate\', \'chooserSpan\', 1950, 2010, Date.patterns.ShortDatePattern, false);"></div>'+
						'<div id="chooserSpan" class="dateChooser select-free" style="position: relative;display: none; visibility: hidden; width: 160px;"></div>' +
					'</div>' +	
					'<div align="center" style="padding-bottom:4px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+
					'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">'+
						sDelete+
						'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().uploadContent();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Save Info</a></span>'+
					'</div>' +	
				'</form>'+
			'</div>' ;
			
		return dlgDocumentHTML;
	},
	
	setThumbnail : function (dtype) {
		var s= '';
		switch(dtype){
			case "upload":
				s = '<label for="filebrowse">Select Thumbanil:</label><input type="file" name="thumbnailbrowse" />';
			break;
			case "delete":
				s = 'click here to delete the thumbnail';
			break;
		}
		this.thumbnaildiv = s;
	},
	
	getThumbnail : function () {
		return this.thumbnaildiv;
			
	}
}
