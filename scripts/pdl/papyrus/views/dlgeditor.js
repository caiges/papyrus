/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlgeditor = function() {
	return this.init();
}

PDL.widget.Papyrus.dlgeditor.prototype  = {	
	
	init : function () {	
		this.setLayout("");
		var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	},
	
	buildEditorLayout : function () {
		var dlgEditorHTML = '<div class="hd">PDL Intranet Page Editor</div>'+
		'<div id="dlgCMSEditor" class="dlgCMSEditor">' +
		
		this.getLayout()+
		
		'</div>';
		return dlgEditorHTML;
	},
	
	setLayout : function (displaytype) {
		var rstring = "";
		switch(displaytype) {		
			case "editor": 
				rstring = '<table cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #DFDFDF;">' +
					'<tr>' +
						'<td valign="top" id="dlgCMSTreeDivHolderTD">' +
							'<div class="dlgCMSTreeDivHolder" style="background-image: url('+PDL.util.PageURL.getURL()+'/img/papyrus/editor_outline.gif);background-repeat: no-repeat;">'+
							'<div id="dlgCMSTreeDiv" class="dlgCMSTreeDivLoad"><form></form></div>' +
							'</div>' +
						'</td>' +
						'<td valign="top" id="dlgCMSFormDivHolderTD">' +
							'<div class="dlgCMSFormDivHolder" style="background-image: url('+PDL.util.PageURL.getURL()+'/img/papyrus/editor_editor.gif);background-repeat: no-repeat;">'+
							'<div id="dlgCMSFormDiv" class="dlgCMSFormDiv"><form></form></div>' +
							'</div>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td valign="top" colspan="2" id="dlgCMSHelpDivHolderTD">' +
							'<div class="dlgCMSHelpDivHolder" style="background-image: url('+PDL.util.PageURL.getURL()+'/img/papyrus/editor_help.gif);background-repeat: no-repeat;">'+
							'<div id="dlgCMSHelpDiv" class="dlgCMSHelpDiv"></div>'+
							'</div>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td valign="top" colspan="2">' +
							'<div class="dlgCMSEditorButtons" align="center">'+
							'<form onsubmit="return false;"><input type="button" id="dlgCloseButton" name="close" value="' + ( pageSettings.pageCached == "yes" ? 'Close Editor' : 'Publish Changes' ) + '" onclick="javascript:' + ( pageSettings.pageCached == 'yes' ? 'PDL.widget.Papyrus.Editor.hideDialogShell();' : 'PDL.widget.Papyrus.Editor.hideDialogShell();PDL.widget.Papyrus.Editor.updatePage( null, PDL.widget.Papyrus.Editor );' ) + '" /></form>'+
							'</div>' +
						'</td>' +
					'</tr>' +
				'</table>';
				break;
				
			case "container": 
				rstring = '<table cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#DFDFDF">' +
					'<tr>' +
						'<td valign="top" width="300" height="313">' +
							'<div class="dlgCMSFormDivHolder" style="background-image: url('+PDL.util.PageURL.getURL()+'/img/papyrus/editor_editor.gif);background-repeat: no-repeat;">'+
							'<div id="dlgCMSFormDiv" class="dlgCMSFormDiv"><form></form></div>' +
							'</div>'+
						'</td>' +
					'</tr>' +
				'</table>';
				break;
				
			case "pagecontainers": 
				rstring = '<table cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#DFDFDF">' +
					'<tr>' +
						'<td valign="top" height="313">' +
							'<div class="dlgCMSTreeDivHolder" style="background-image: url('+PDL.util.PageURL.getURL()+'/img/papyrus/editor_outline.gif);background-repeat: no-repeat;">'+
							'<div id="dlgCMSTreeDiv" class="dlgCMSTreeDivLoad"><form></form></div>' +
							'</div>'+
						'</td>' +
					'</tr>' +
				'</table>';
				break;
				
			default : 
				rstring = '<div id="dlgCMSFormDiv"><form></form></div>';
				break;
		}
		this.dspLayout = rstring;
	},
	
	getLayout : function () {
		return this.dspLayout;
	}
}
