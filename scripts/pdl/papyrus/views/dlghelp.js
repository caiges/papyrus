/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create help section for cms
*	dependencies: 
*
*/

PDL.widget.Papyrus.dlghelp = function() {
	return this.init();
}

PDL.widget.Papyrus.dlghelp.prototype  = {	
	
	init : function () {
		
		this.formbuilder = new PDL.util.MarkupFactory.FormElements.SelectBox();
		this.defaultTopics = '[{"label":"Sections","data":"container"},{"label":"Doc Collection","data":"collection_document"},{"label":"Link Collection","data":"collection_link"},{"label":"Text Block","data":"html"},{"label":"Image","data":"image"},{"label":"Document","data":"document"},{"label":"Link","data":"link"}]';
		this.vo = PDL.widget.Papyrus.Editor.getHelpBean();
		
	},
	
	buildHelpLayout : function () {
		
		// build video tutorials and print guides view
		var vtHTML = '<ul style="padding: 0px;margin: 0px;margin-left: 30px;list-style-image: url(' + PDL.util.PageURL.getURL() + '/img/bullet_black.gif' + ');vertical-align: middle;text-align: left;">';
		var pgHTML = '<ul style="padding: 0px;margin: 0px;margin-left: 30px;list-style-image: url(' + PDL.util.PageURL.getURL() + '/img/bullet_black.gif' + ');vertical-align: middle;text-align: left;">';
		var vtVideos = this.vo.beanGetter( "videos" );
		var pgGuides = this.vo.beanGetter( "videos" ); // reset this to point to guides. This will also require setting the bean properties.
		
		PDL.widget.VideoDialog.removeVideoGroup( "help" );
		PDL.widget.VideoDialog.addVideoGroup( "help" );
		
		for( var i = 0; i < vtVideos.length; i++ ) {
			
			var videoIndex = PDL.widget.VideoDialog.addVideoToGroup( vtVideos[ i ], "help" );
			
			var item = vtVideos[i];
			vtHTML += '<li><a href="javascript:PDL.widget.VideoDialog.openVideoGroup( \'help\', ' + videoIndex + ' );" style="font-size: 10px;">' + item.name + '</a></li>';
			
		}
		
		vtHTML += '</ul>';
		pgHTML += '<li><a href="assets/guides/PDL_Intranet_Getting_Started_Guide_Rev_1.1.pdf" target="_blank">Getting Started Guide</a></li><li><a href="assets/guides/PDL_Intranet_Cheat_Sheet_Rev_1.0.pdf" target="_blank">Cheat Sheet</a></li></ul>';
		
		
		var dlgHelpHTML = '<table cellspacing="0" cellpadding="5" border="0" width="100%" height="111">'+
				'<tr>'+
					'<td style="width: 175px;verticle-align:top;" valign="top">'+
						'<table cellspacing="0" cellpadding="0" border="0" height="101">'+
							'<tr>'+
								'<td style="font-weight:bold;"><img style="vertical-align: middle;" src="'+PDL.util.PageURL.getURL()+'/img/help.gif" />&nbsp;&nbsp;Editor Help</td>'+
							'</tr>'+
							'<tr>' + 
								'<td style="padding: 2px;">To display help information, select any item within the Outline window above or select a topic below.</td>' +
							'</tr>' +
							'<tr>'+
								'<td>Topics : '+this.vo.beanGetter("topics")+'</td>'+
							'</tr>'+
						'</table>'+
					'</td>'+
					'<td style="width: 360px;vertical-align: top;">'+
						'<div id="dlgCMSHelpTopicDiv">'+
							'<table cellspacing="0" cellpadding="0" border="0" style="">'+
								'<tr>'+
									'<td>'+
										'<strong>'+ this.vo.beanGetter("title") +' Description</strong><br>'+
										'<div style="height:80px;width:350px;overflow:auto;border:1px solid #ccc;background-color:white;">'+
										this.vo.beanGetter("description")+
										'</div>'+
									'</td>'+
									//'<td width="100" align="center">'+
										//'<a href="javascript:PDL.widget.Papyrus.Editor.dlgHelp.loadHelpTutorials();">Watch Tutorial</a><br/>'+
									//'</td>'+
								'</tr>'+
							'</table>'+
						'</div>' +
					'</td>'+
					'<td style="width: 157px;vertical-align: top;">'+
						'<div id="dlgCMSHelpTopicDiv">'+
							'<table cellspacing="0" cellpadding="0" border="0" style="">'+
								'<tr>'+
									'<td align="center" style="vertical-align: top;">'+
										'<table cellspacing="0" cellpadding="0" border="0">' +
											'<tr>' + 
												'<th><img border="0" src="' + PDL.util.PageURL.getURL() + '/img/film.gif" style="vertical-align: middle;" /> Video Tutorials</th>' +
											'</tr>' +
											'<tr>' +
												'<td>' + vtHTML + '</td>' +
											'</tr>' + 
										'</table>' +
									'</td>'+
								'</tr>'+
							'</table>'+
						'</div>' +
					'</td>'+
					'<td style="width: 157px;vertical-align: top;">'+
						'<div id="dlgCMSHelpTopicDiv">'+
							'<table cellspacing="0" cellpadding="0" border="0" style="">'+
								'<tr>'+
									'<td align="center" style="vertical-align: top;">'+
										'<table cellspacing="0" cellpadding="0" border="0">' +
											'<tr>' + 
												'<th><img border="0" src="' + PDL.util.PageURL.getURL() + '/img/page.gif" style="vertical-align: middle;" /> Print Guides</th>' +
											'</tr>' +
											'<tr>' +
												'<td>' + pgHTML + '</td>' +
											'</tr>' + 
										'</table>' +
									'</td>'+
								'</tr>'+
							'</table>'+
						'</div>' +
					'</td>'+
				'</tr>'+
			'</table>';
		return dlgHelpHTML;
	},
	
	loadHelpTutorials : function () {
		this.hideHelpTopics();
		PDL.widget.Papyrus.Editor.loadHelpTutorial(this.vo.beanGetter("videos"),'flash');
	},
	
	setLayout : function (displaytype) {
		switch(displaytype) {
			
			case "container":				
				this.resetDefaultTopics(displaytype);
				
				this.vo.beanSetter("title","Sections");
				this.vo.beanSetter("description","The major portions of your web pages are broken up into sections. Each section has a title that is displayed in blue and bolded. You can also see all the section titles for a page within the Page Headings panel on the right hand side.");
				this.vo.beanSetter("image","headings.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "collection_link":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"collection_link"},{"label":"Adding","data":"collection_link_add"},{"label":"Editing","data":"collection_link_edit"},{"label":"Move","data":"collection_link_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Link Collection");
				this.vo.beanSetter("description","Link collections work the same way as document collections. By grouping links together, you can provide a collection title that is displayed on the page. Links within a link collection are also displayed with a blue arrow to the left of them.");
				this.vo.beanSetter("image","lc.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "collection_document":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"collection_document"},{"label":"Adding","data":"collection_document_add"},{"label":"Editing","data":"collection_document_edit"},{"label":"Move","data":"collection_document_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Document Collection");
				this.vo.beanSetter("description","Document downloads are grouped together using document collections. When you create a new document collection, you can choose to display a collection title which helps to visually break up different collections on a page. These titles are bolded and grey.");
				this.vo.beanSetter("image","dc.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "document":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"document"},{"label":"Adding","data":"document_add"},{"label":"Editing","data":"document_edit"},{"label":"Move","data":"document_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Document");
				this.vo.beanSetter("description","On the intranet, any type of download is referred to as a document. Documents are generally placed into document collections. When adding a document, you may specify the title, description, and whether or not the document is internal only. Additional information such as who posted the document, the document type, and marking the document 'new' are automatically captured.");
				this.vo.beanSetter("image","d.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "link":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"link"},{"label":"Adding","data":"link_add"},{"label":"Editing","data":"link_edit"},{"label":"Move","data":"link_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Link");
				this.vo.beanSetter("description","Links direct a site visitor to either an internal (intranet) or external (outside of intranet) web page. Internal links will open within the same browser window while external links will launch in a new window. Links are generally grouped together in a link collection.");
				this.vo.beanSetter("image","l.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "html":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"html"},{"label":"Adding","data":"html_add"},{"label":"Editing","data":"html_edit"},{"label":"Move","data":"html_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Text Block");
				this.vo.beanSetter("description","A text block is made up of text and can include things like lists. When adding a text block, you can apply formatting to different portions of the text such as bold, italic, and strike-through.");
				this.vo.beanSetter("image","h.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "image":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"image"},{"label":"Adding","data":"image_add"},{"label":"Editing","data":"image_edit"},{"label":"Move","data":"image_move"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Image");
				this.vo.beanSetter("description","An image is a graphic or photo that may be added to a section.");
				this.vo.beanSetter("image","i.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			case "sections":
				this.resetDefaultTopics(displaytype);
				
				//var dsSubTopics = '[{"label":"What is it?","data":"heading"}]';
				//this.buildSubTopics(displaytype,dsSubTopics);
				
				this.vo.beanSetter("title","Sections");
				this.vo.beanSetter("description","The major portions of your web pages are broken up into sections. Each section has a title that is displayed in blue and bolded. You can also see all the section titles for a page within the Page Headings panel on the right hand side.");
				this.vo.beanSetter("image","headings.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
			break;
			
			default: 
				this.resetDefaultTopics("container");
				
				//var dsSubTopics = '[{"label":"How to Use?","data":"editor_use"}]';
				//this.buildSubTopics("editor_use",dsSubTopics);
				
				this.vo.beanSetter("title","Sections");
				this.vo.beanSetter("description","The major portions of your web pages are broken up into sections. Each section has a title that is displayed in blue and bolded. You can also see all the section titles for a page within the Page Headings panel on the right hand side.");
				this.vo.beanSetter("image","headings.jpg");
				
				var aVid = [{name:"Accessing Your Pages",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_1.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Exploring Page Layout",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_2.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Using The Page Editor",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_3.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Sections",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_4.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"},{name:"Working With Content",source:PDL.util.PageURL.getURL()+"assets/videos/PDL_Intranet_Tutorial_Lesson_5.swf",icon:PDL.util.PageURL.getURL()+"img/papyrus/lc.jpg"}];
				this.vo.beanSetter("videos",aVid);
				
				
			break;
		}
	},
	
	resetDefaultTopics : function (sval) {
		var dpHelpTopics = new PDL.util.dataprovider();
		var dsTopics = this.defaultTopics;
		dpHelpTopics.setDataSet(dsTopics);
		var tcbstring = this.formbuilder.buildComboBox(dpHelpTopics.getDataSet(),"cbHelpTopics","data","label",sval,"PDL.widget.Papyrus.Editor.switchDialogHelp");
		this.vo.beanSetter("topics",tcbstring);
	},
	
	buildSubTopics : function (sval,dp) {
		var dpHelpSubTopics = new PDL.util.dataprovider();
		var dsSubTopics = dp;
		dpHelpSubTopics.setDataSet(dsSubTopics);
		var stcbstring = this.formbuilder.buildComboBox(dpHelpSubTopics.getDataSet(),"cbHelpTopics","data","label",sval,"PDL.widget.Papyrus.Editor.switchDialogHelp");
		this.vo.beanSetter("subtopics",stcbstring);
	}
	
}

