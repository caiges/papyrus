/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create view helper
*	dependencies: helper.js (init,setAction,setVO,checkQueueFlags,buildFormDivString)
*
*/


PDL.widget.Papyrus.pageContainersTreeHelper = PDL.util.Extend(PDL.widget.Papyrus.treeHelper);

PDL.widget.Papyrus.pageContainersTreeHelper.setupHelper = function (componentid) { 	// if a error occurs on page build re-initialize setupHelper()
	this.showLoadingOverlay();
	
	var service = new PDL.widget.Papyrus.connectionManager();
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	
	if (pageVO.beanGetter("treetype") == "pagecontainers") {
		var arg = '"'+componentid+'"';
		service.makeCall("POST","wsCMSPages","getPageContainers",arg,this.buildTreeDP,this.wsFailure,"");
		this.hasChanged = false;
		this.hasChangedEvent = new YAHOO.util.CustomEvent( "hasChangedEvent", this );
		this.hasChangedEvent.subscribe( this.onHasChanged, this );
	}	
	
}

PDL.widget.Papyrus.pageContainersTreeHelper.displayForm = function () {
	if(this.checkQueueFlags(this.dspQueue)) {
		// instead of calling helper.js method directly call form load in editor
		this.hideLoadingOverlay();
	}	
}



PDL.widget.Papyrus.pageContainersTreeHelper.setTreeStructure = function (tstruct) {
	this.treeStructure = eval('(' + tstruct + ')');	
	
	
	this.initTree();
	var tree = this.getTree();
	var root = tree.getRootNode();
	
	//alert(tstruct);
	this.treeArray = this.treeStruct2Array(this.treeStructure,root);
	
  	tree.draw();
  	tree.setupTreeNodes();
		
	
	this.ddnodemgr = new SourceNodeMgr( "treeView_sourceNode", tree );
	
	// now that tree struct is using arrays search tree component root and get rowid and put it into editor bean
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	pageVO.beanSetter(this.treeArray.structtype+"rowid",this.treeArray.rowid);
	
	this.setQueueFlag(0);
	this.displayForm();
	tree.setupDragNodeDragDrop();
}


PDL.widget.Papyrus.pageContainersTreeHelper.treeStruct2Array = function (tree,pref) {

	//console.log('in nodes (resort) ...');
	var a = new Array();
	var c = 0;
	for (var j in tree){
		a[c] = new Object();
		a[c]['sortorder'] = j;
		a[c]['valob'] = tree[j];
		c++;
	}
	//a.sort(this.sortObj);
	//console.log(pref + ' = '+ a.length)
	var aTmp = new Array();
	for (var i = 0; i < a.length; i++) {
		var cTmp = i;
		var oTmp = a[i].valob;
		aTmp[cTmp] = new Object();
			
		//console.log(' node type is '+oTmp.containertype.toLowerCase());
		
		if (oTmp.containertype.toLowerCase() == "heading") {
			for (var n in oTmp) {
				aTmp[cTmp][n] = oTmp[n];
				//console.log(' node attribute is '+aTmp[cTmp][n]);
			}
			var starget = "javascript:;";
			this.getTree().addNode( { label : ': '+ aTmp[cTmp]['containername'], href : starget, contentType : "container", contentid : aTmp[cTmp]['pagerowid'], contentassociationid : aTmp[cTmp]['pagecontainerrowid'], draggable : true, treeObject : this.getTree(), clickable:false }, pref, false, true );
			
		}
	}
	return aTmp;
		
}


PDL.widget.Papyrus.pageContainersTreeHelper.updateTreeSort = function () {
	var editor = PDL.widget.Papyrus.Editor;
	var tmpTT = editor.getEditorBean().beanGetter("treetype");
	var rnode = this.getTree().getRootNode();
	
	this.loopUpdateTreeSort(rnode,tmpTT);
	
}

PDL.widget.Papyrus.pageContainersTreeHelper.updateTreeSortOrder = function (atree,nodetype) {
	var service = new PDL.widget.Papyrus.connectionManager();
	if (nodetype.toLowerCase() == "pagecontainers") {
		service.makeCall("POST","wsCMSPages","updatePageContainersSortOrder",atree,this.refreshTree,this.wsFailure,"");
	}
}


PDL.widget.Papyrus.pageContainersTreeHelper.loopUpdateTreeSort = function (tree,pnodetype) {	
	var aso = this.buildNodeSortArray(tree);
	if(aso.length)
		this.updateTreeSortOrder(aso,pnodetype)
}


