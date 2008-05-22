/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgLink = function() {	
	return this.init();
}

PDL.widget.Papyrus.dlgLink.prototype  = {	
	init : function () {
		this.formbuilder = new PDL.util.MarkupFactory.FormElements.SelectBox();	
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
		this.action = pageVO.beanGetter("action");	
	},
	
	builddialogform : function (bean) {
		
		if(this.action == "Load"){
			var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().inactive();" title="Delete" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Delete Link</a></span>';  
			var sFormTitle = 'Manage';
			var sInfo = '<strong>Created By:</strong> '+bean.beanGetter("createdby")+' <strong>On</strong> '+bean.beanGetter("createddatetime");
			var sEditDisplay = '<img src="'+PDL.util.PageURL.getURL()+'/img/pencil.gif" style="vertical-align:text-top;" />';
			var linkurl = ( bean.beanGetter( "linkurl" ).length > 0 ? bean.beanGetter( "linkurl" ) : "http://" ) ;
		} else {
			var sDelete = '<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.refreshEditor();" title="Cancel" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/delete.gif" style="vertical-align:text-top;" /> Cancel</a></span>';
			var sFormTitle = 'Create';
			var sInfo = '';
			var sEditDisplay = '';
			var linkurl = ( bean.beanGetter( "linkurl" ).length > 0 ? bean.beanGetter( "linkurl" ) : "http://" ) ;
		}
		
		var dlgLinkHTML =  '<div class="dlgCMSFormNavigation">'+
				'<div align="right" class="dlgButton" ><a href="javascript:PDL.widget.Papyrus.Editor.switchEditorMode();">&nbsp;&nbsp; '+sEditDisplay+' <span id="formEditButton"></span></a></div>'+
			'</div>' +			
			'<div id="dlgCMSFormOverlayShell">'+
				'<div align="center" id="savedNotification">&nbsp;</div>'+
				'<form name="form_dlglink" onsubmit="return false;">' +
					'<div class="dlgCMSForm">'+
						'<div class="dlgCMSFormField"><label for="linktext" style="width:90px;">Link Text:</label><input type="textbox" name="linktext" id="linktext" value="'+bean.beanGetter("linktext")+'" size="40" maxlength="100" /></div>' +
						'<div class="dlgCMSFormField"><label for="linkurl" style="width:90px;">Link URL:</label><input type="textbox" name="linkurl" id="linkurl" value="'+ linkurl +'" size="40" maxlength="500" />&nbsp;&nbsp;<a href="javascript:;" id="linktest" onclick="PDL.widget.Papyrus.linkHelper.testLink();" title="Test Link"><img src="' + PDL.util.PageURL.getURL() + '/img/link_go.gif" alt="Test Link" /></a></div>' +
						/*+this.getTargets()+*/
						'<div class="dlgCMSFormField"><label for="linktarget" style="width:90px;">Link Target:</label>' +this.getTargets()+ '</div>' +	
					'</div>' +	
					'<div align="center" style="padding-bottom:4px;padding-right:5px;">'+sInfo+'&nbsp;</div>'+
					'<div align="center" id="dlgCMSFormButtons" class="dlgCMSFormButtons">'+
						sDelete+
						'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.getDialogFormHelper().save();" title="Save" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/disk.gif" style="vertical-align:text-top;" /> Save Info</a></span>'+
					'</div>' +		
				'</form>'+
			'</div>' ;
		return dlgLinkHTML;
	},
	
	getTargets : function () {
		return this.cbSectionPages;
	},
	
	setTargets : function (dp,s) {
		var secp = this.formbuilder.buildComboBox(dp.getDataSet(),"cbLinkTarget","data","label",s);
		this.cbSectionPages = secp;
	}
}
