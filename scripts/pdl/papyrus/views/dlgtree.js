/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic beans
*	dependencies: 
*
*/

PDL.widget.Papyrus.treeContainer = function() {	
	return this.init();
}

PDL.widget.Papyrus.treeContainer.prototype  = {	
	init : function () {
	var tree;
	},
	
	builddialogform : function (treetype) {
		switch(treetype) {
			case "pagecontainers": 
				var treeContainerHTML = '<div id="treeLoadingOverlay" class="treeLoadingOverlay" align="center"><br/><br/><br/><img src="'+PDL.util.PageURL.getURL()+'/img/indicator_flower.gif" /> LOADING SECTION CONTENT... </div>'+
				'<div id="dlgCMSTreeOverlayShell" class="dlgCMSTreeOverlayShell" style="display: none;">'+
					'<div id="PapyrusTreeDivContainer">' +
								'<div id="PapyrusTreeDivScrollUpControl" class="PapyrusTreeDivScrollUpControl" style="width: 400px;"><img src="img/papyrus/up_arrow.gif" alt="Up" /></div>'+
								'<div id="PapyrusTreeDiv" style="width: 400px;"></div>'+
								'<div id="PapyrusTreeDivScrollDownControl" class="PapyrusTreeDivScrollDownControl" style="width: 400px;"><img src="img/papyrus/down_arrow.gif" alt="Down" /></div>'+
								'<div id="treeView_dragNode" style="position: relative;background: #d3d3d3; width: 10px; height: 10px; visibility: visible; opacity: 0; filter: alpha(opacity=0);">&nbsp;</div>' +
								'</div>' +
						'<div align="center" id="dlgCMSTreeButtons" class="dlgCMSTreeButtons2">' +
							'<span class="dlgButton"><a id="dlgButtonRevertSortingLink" href="javascript:;" title="Revert Sorting" style="text-decoration:none;font-weight:bold;" class="dlgLinkDead"><img id="dlgImageRevertSorting" src="'+PDL.util.PageURL.getURL()+'/img/arrow_refresh_bw.gif" style="vertical-align:middle;" /> Revert Sorting</a></span>&nbsp;&nbsp;&nbsp;&nbsp;'+
							'<span class="dlgButton"><a id="dlgButtonTreeApplySort" href="javascript:;" title="Save Sorting" style="text-decoration:none;font-weight:bold;" class="dlgLinkDead"><img id="dlgImageApplySorting" src="'+PDL.util.PageURL.getURL()+'/img/disk_multiple_bw.gif" style="vertical-align:middle;" /> Save Sorting</a></span>&nbsp;&nbsp;&nbsp;&nbsp;'+
							'<span class="dlgButton"><a href="javascript:PDL.widget.Papyrus.Editor.hideDialogShell();PDL.widget.Papyrus.Editor.updatePage( null, PDL.widget.Papyrus.Editor );" title="Done" style="text-decoration:none;font-weight:bold;"><img src="'+PDL.util.PageURL.getURL()+'/img/tick.gif" style="vertical-align:middle;" /> Done</a></span>'+
						'</div>' +	
				'</div>';
			break;
			
			default:
				var treeContainerHTML = '<div id="treeLoadingOverlay" class="treeLoadingOverlay" align="center"><br/><br/><br/><img src="'+PDL.util.PageURL.getURL()+'/img/indicator_flower.gif" /> LOADING SECTION CONTENT... </div>'+
					'<div id="dlgCMSTreeOverlayShell" style="display: none;">'+
					'<form name="dlgTreeForm" method="POST" action="" onsubmit="return false;">' +
								'<div id="dlgCMSTreeAddDiv">'+
									'<div style="margin-bottom: 10px;"><strong>Drag-To-Add</strong></div>'+
									'<ul style="list-style:none;padding: 0px;margin:0px">'+
										'<li style="padding-left: 2px;margin-bottom: 4px;margin-left: 0px;width: 100px;height:19px;" id="documentCollectionDD"><img id="content_collection_document" src="'+PDL.util.PageURL.getURL()+'img/folder_page.gif" style="vertical-align: middle;" alt="document collection" />&nbsp;&nbsp;Doc Collection</li>'+
										'<li style="padding-left: 11px;margin-bottom: 10px;margin-left: 0px;width: 100px;height:19px;" id="documentDD"><img id="content_document" src="'+PDL.util.PageURL.getURL()+'img/page_white_office.gif" style="vertical-align: middle;" alt="document" />&nbsp;&nbsp;Document</li>'+
										'<li style="padding-left: 2px;margin-bottom: 4px;margin-left: 0px;width: 100px;height:19px;" id="linkCollectionDD"><img id="content_collection_link" src="'+PDL.util.PageURL.getURL()+'img/folder_link.gif" style="vertical-align: middle;" alt="link collection" />&nbsp;&nbsp;Link Collection</li>'+
										'<li style="padding-left: 11px;margin-bottom: 10px;margin-left: 0px;width: 100px;height:19px;" id="linkDD"><img id="content_link" src="'+PDL.util.PageURL.getURL()+'img/page_link.gif" style="vertical-align: middle;" alt="link" />&nbsp;&nbsp;Link</li>'+
										'<li style="padding-left: 2px;margin-bottom: 10px;margin-left: 0px;width: 100px;height:19px;" id="htmlDD"><img id="content_html" src="'+PDL.util.PageURL.getURL()+'img/page_white_text.gif" style="vertical-align: middle;" alt="html" />&nbsp;&nbsp;Text Block</li>'+
										'<li style="padding-left: 2px;margin-bottom: 10px;margin-left: 0px;width: 100px;height:19px;" id="imageDD"><img id="content_image" src="'+PDL.util.PageURL.getURL()+'img/image.gif" style="vertical-align: middle;" alt="image" />&nbsp;&nbsp;Image</li>'+
									'</ul>'+
								'</div>' +
							 	 '<div id="PapyrusTreeDivContainer">' +
									'<div id="PapyrusTreeDivContainerInfo"></div>'+
									'<div id="PapyrusTreeDivScrollUpControl" class="PapyrusTreeDivScrollUpControl"><img src="img/papyrus/up_arrow.gif" alt="Up" /></div>'+
									'<div id="PapyrusTreeDiv"></div>'+
									'<div id="PapyrusTreeDivScrollDownControl" class="PapyrusTreeDivScrollDownControl"><img src="img/papyrus/down_arrow.gif" alt="Down" /></div>'+
								 	'<div id="treeView_dragNode" style="position: relative;background: #d3d3d3; width: 10px; height: 10px; visibility: visible; opacity: 0; filter: alpha(opacity=0);">&nbsp;</div>' +
								 	'<div id="treeView_sourceNode" style="position: relative;background: #d3d3d3; width: 10px; height: 10px; visibility: visible; opacity: 0; filter: alpha(opacity=0));">&nbsp;</div>'+
								 '</div>' +
								'<div align="center" id="dlgCMSTreeButtons" style="z-index: 50;">'+
									'<span class="dlgButton"><a id="dlgButtonRevertSortingLink" href="javascript:;" title="Revert Sorting" style="text-decoration:none;font-weight:bold;" class="dlgLinkDead"><img id="dlgImageRevertSorting" src="'+PDL.util.PageURL.getURL()+'img/arrow_refresh_bw.gif" style="vertical-align:text-top;" /> Revert Sorting</a></span>&nbsp;&nbsp;<span class="dlgButton"><a id="dlgButtonTreeApplySort" href="javascript:;" title="Save Sorting" style="text-decoration:none;font-weight:bold;" class="dlgLinkDead"><img id="dlgImageApplySorting" src="' + PDL.util.PageURL.getURL() + 'img/disk_multiple_bw.gif" style="vertical-align:text-top;" /> Save Sorting</a></span>'+
								'</div>'+
						'</form>'
				'</div>';
			break;
		}
		
		return treeContainerHTML;
	}
	
}
