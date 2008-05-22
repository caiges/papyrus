/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create view helper
*	dependencies: helper.js (init,setAction,setVO,checkQueueFlags,buildFormDivString)
*
*/


PDL.widget.Papyrus.treeHelper = PDL.util.Extend(new PDL.widget.Papyrus.helper());

PDL.widget.Papyrus.treeHelper.setBeanId = function () {}

PDL.widget.Papyrus.treeHelper.setupHelper = function (componentid) { 	// if a error occurs on page build re-initialize setupHelper()
	this.showLoadingOverlay();
	this.dpSectionPages = new PDL.util.dataprovider();
	var service = new PDL.widget.Papyrus.connectionManager();
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	var formVO = PDL.widget.Papyrus.Editor.getFormBean();
	//console.log(componentid);
	if (pageVO.beanGetter("treetype") == "container") {
		var arg = '"'+componentid+'"';
		service.makeCall("POST","wsCMSContainers","getContainerStruct",arg,this.buildTreeDP,this.wsFailure,"");
		this.hasChanged = false;
		this.hasChangedEvent = new YAHOO.util.CustomEvent( "hasChangedEvent", this );
		this.hasChangedEvent.subscribe( this.onHasChanged, this );
	} else {
		var arg = 'page="'+componentid+'"';
		//service.makeCall("POST","wsCMSContainers","getContainerStruct",arg,this.buildTreeDP,this.wsFailure,"");
	}	
	
	// init tree dlg overlay
	this.initOverlay( "treeDialogOverlay" , 450, 324 );
}

PDL.widget.Papyrus.treeHelper.setQueueFlags = function () {
	switch(this.action) {
		case "Load":
			this.dspQueue = [0]; // flag 0 = buildTreeDP
		break;
		default:
			this.dspQueue = [1]; // flag 0 = buildTreeDP
		break;
	}
}

PDL.widget.Papyrus.treeHelper.displayForm = function () {
	
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	if(this.checkQueueFlags(this.dspQueue)) {
		
		// instead of calling helper.js method directly call form load in editor
		this.hideLoadingOverlay();
		var componenttype = pageVO.beanGetter("formtype");
		var componentrowid = pageVO.beanGetter(componenttype+"rowid");	
		
		this.uieditor.switchDialogForm(pageVO.beanGetter("action"),componenttype,componentrowid);
		
	}	
}



PDL.widget.Papyrus.treeHelper.initTree = function () {
	this.treeView = null;
	this.treeView = new TreeView( "PapyrusTreeDiv", "treeView_dragNode", null );
}

PDL.widget.Papyrus.treeHelper.killTree = function () {
	
	this.treeView = null;
	
	document.getElementById("documentCollectionDD").dragNodeMgr = null;
	document.getElementById("linkCollectionDD").dragNodeMgr = null;
	document.getElementById("documentDD").dragNodeMgr = null;
	document.getElementById("linkDD").dragNodeMgr = null;
	document.getElementById("htmlDD").dragNodeMgr = null;
	document.getElementById("imageDD").dragNodeMgr = null;
	
	this.ddnodemgr = null;
	
}

PDL.widget.Papyrus.treeHelper.getTree = function () {
	return this.treeView;
}

PDL.widget.Papyrus.treeHelper.getTreeArray = function () {
	return this.treeArray;
}

PDL.widget.Papyrus.treeHelper.setTreeStructure = function (tstruct) {
	this.treeStructure = eval('(' + tstruct + ')');	
	//YAHOO.log('returned tree struct of '+tstruct)
	
	this.initTree();
	var tree = this.getTree();
	var root = tree.getRootNode();
	
	this.treeArray = this.treeStruct2Array(this.treeStructure,root);
	
  	tree.draw();
  	tree.setupTreeNodes();
		
	
	this.ddnodemgr = new SourceNodeMgr( "treeView_sourceNode", tree );
	
	var ddnode1 = new SourceNode( "documentCollectionDD", this.ddnodemgr, "collection_document", null );
	var ddnode2 = new SourceNode( "linkCollectionDD", this.ddnodemgr, "collection_link", null );
	var ddnode3 = new SourceNode( "documentDD", this.ddnodemgr, "document", "collection_document" );
	var ddnode4 = new SourceNode( "linkDD", this.ddnodemgr, "link", "collection_link" );
	var ddnode5 = new SourceNode( "htmlDD", this.ddnodemgr, "html", null );
	var ddnode6 = new SourceNode( "imageDD", this.ddnodemgr, "image", null );
		
	// now that tree struct is using arrays search tree component root and get rowid and put it into editor bean
	var pageVO = PDL.widget.Papyrus.Editor.getEditorBean();
	pageVO.beanSetter(this.treeArray.structtype+"rowid",this.treeArray.rowid);
	
	this.setQueueFlag(0);
	this.displayForm();
	tree.setupDragNodeDragDrop();
}


PDL.widget.Papyrus.treeHelper.sortObj = function(a,b) {
  if (a['sortorder']<b['sortorder']) return -1;
  if (a['sortorder']>b['sortorder']) return 1;
  return 0;
}

PDL.widget.Papyrus.treeHelper.treeStruct2Array = function (tree,pref) {
	if(tree.structvals == undefined) {
		//YAHOO.log('in nodes (resort) ...');
		var a = new Array();
		var c = 0;
		for (var j in tree){
			a[c] = new Object();
			a[c]['sortorder'] = j;
			a[c]['valob'] = tree[j];
			c++;
		}
		a.sort(this.sortObj);
		//YAHOO.log(pref + ' = '+ a.length)
		var aTmp = new Array();
		for (var i = 0; i < a.length; i++) {
			var cTmp = i;
			var oTmp = a[i].valob;
			aTmp[cTmp] = new Object();
			
			//YAHOO.log(' node type is '+oTmp.type);
			
			//	TODO : combine code if possible
			switch (oTmp.type.toLowerCase()) {
				case "collection" :
					//YAHOO.log('insert colllection : call self on loop of collection (sort) ');
					for (var n in oTmp) {
						if(n != "collection") {
							aTmp[cTmp][n] = oTmp[n];
						}
					}
					var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+oTmp.type.toLowerCase()+'_'+oTmp.collectiontype.toLowerCase()+"','"+oTmp.rowid+"');";
					var pnode = this.getTree().addNode( { label : ': '+ aTmp[cTmp]['name'], href : starget, contentType : oTmp.type.toLowerCase()+'_'+oTmp.collectiontype.toLowerCase(), contentid : oTmp.rowid, contentassociationid : oTmp.id, draggable : true, treeObject : this.getTree(), clickable : true, collectionid : oTmp.collectionrowid }, pref, false, true );
					aTmp[cTmp]['collection'] = this.treeStruct2Array(oTmp['collection'],pnode);			
					//console.log(oTmp.collectionrowid)			
				break;
				
				case "html" :
					for (var n in oTmp) {
						aTmp[cTmp][n] = oTmp[n];
					}
					//YAHOO.log('insert html : ');
					var sleng = aTmp[cTmp]['htmltext'].length;
					if (sleng > 30) {
						var sTrim = PDL.util.Text.stripHTML( aTmp[cTmp]['htmltext'] );
						sTrim = sTrim.substr( 0, 30 ) + '...';
					} else {	
						var sTrim = PDL.util.Text.stripHTML( aTmp[cTmp]['htmltext'] );
					}
					var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+oTmp.type.toLowerCase()+"','"+oTmp.rowid+"');";
					this.getTree().addNode( { label : ': '+ sTrim, href : starget, contentType : "html", contentid : oTmp.rowid, contentassociationid : oTmp.id, draggable : true, treeObject : this.getTree(), clickable : true }, pref, false, true );
				break;
				
				case "image" :
					for (var n in oTmp) {
						aTmp[cTmp][n] = oTmp[n];
					}
					//YAHOO.log('insert image : ');
					var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+oTmp.type.toLowerCase()+"','"+oTmp.rowid+"');";
					this.getTree().addNode( { label : ': '+ aTmp[cTmp]['name'], href : starget, contentType : "image", contentid : oTmp.rowid, contentassociationid : oTmp.id, draggable : true, treeObject : this.getTree(), clickable : true }, pref, false, true );
				break;
				
				case "document" :
					for (var n in oTmp) {
						aTmp[cTmp][n] = oTmp[n];
					}
					//YAHOO.log('insert document : ');
					var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+oTmp.type.toLowerCase()+"','"+oTmp.rowid+"');";
					this.getTree().addNode( { label : ': '+ aTmp[cTmp]['name'], href : starget, contentType : "document", contentid : oTmp.rowid, targetContentType : "collection_document", contentassociationid : oTmp.id, draggable : true, treeObject : this.getTree(), clickable : true }, pref, false, true );
				break;
				
				case "link" :
					for (var n in oTmp) {
						aTmp[cTmp][n] = oTmp[n];
					}
					//YAHOO.log('insert link : ');
					var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+oTmp.type.toLowerCase()+"','"+oTmp.rowid+"');";
					//YAHOO.log(pref + aTmp[cTmp]['name'] + starget)
					this.getTree().addNode( { label : ': '+ aTmp[cTmp]['name'], href : starget, contentType : "link", contentid : oTmp.rowid, targetContentType : "collection_link", contentassociationid : oTmp.id, draggable : true, treeObject : this.getTree(), clickable : true }, pref, false, true );
				break;
			}
		}
		return aTmp;
	} else { // TODO : code for page level tree use structtype in if
		var aTmp = new Object();
		for (var i in tree) {
			if(i != "structvals") {
				aTmp[i] = tree[i];
			} 
		}
		//var starget = "javascript:PDL.widget.Papyrus.Editor.switchDialogForm('Load','"+tree['structtype']+"','"+tree['rowid']+"');";
		//var pnode = this.getTree().addNode( { label : tree['name'], href : starget, contentType : "container", draggable : true, treeObject : this.getTree() }, pref, true, true );
		//YAHOO.log('in tree going to nodes');
		aTmp['structvals'] = this.treeStruct2Array(tree[i],pref);
				
		return aTmp;
	}	
}


PDL.widget.Papyrus.treeHelper.searchTreeByTypeRowID = function (tree,pnode,nodetype,noderowid) {
	var editor = PDL.widget.Papyrus.Editor;
	var parentnode = new Object();
	var resultObj = new Object();
	var nodetype = nodetype.toLowerCase();
	
	if(pnode.data == undefined){
		var tmpTT = editor.getEditorBean().beanGetter("treetype");
		parentnode.contentType = tmpTT;
		if(tmpTT == "container"){
			parentnode.contentid = editor.getEditorBean().beanGetter("containerrowid");
		} else if (tmpTT == "page") {
			parentnode.contentid = editor.getEditorBean().beanGetter("pagerowid");
		}
	} else {
		parentnode.contentid = pnode.data.contentid;
		parentnode.contentType = pnode.data.contentType;	
		//if(parentnode.contentType.toLowerCase() == "collection_link" || parentnode.contentType.toLowerCase() == "collection_document") {
		//	parentnode.contentid = pnode.data.collectionid;
		//}
	}

	for (var i = 0; i < tree.children.length; i++) {
		var node = tree.children[i];
		var cnodetype = node.data.contentType;
		var cnodeid = node.data.contentid;
		
		if(cnodetype.toLowerCase() == "collection_link" || cnodetype.toLowerCase() == "collection_document") {
			cnodetype = "collection";
		}
		
		if(cnodetype == "collection") {
			var tmpObj = this.searchTreeByTypeRowID(node,node,nodetype,noderowid);
			if(tmpObj.type != undefined) {
				resultObj.treeid = node.labelElId;
				resultObj.type = tmpObj.type;
				resultObj.rowid = tmpObj.rowid;
				resultObj.ptype = tmpObj.ptype;
				resultObj.prowid = tmpObj.prowid;
				break;	
			} 
		}
		
		if(cnodetype == nodetype && cnodeid == noderowid){
			resultObj.treeid = node.labelElId;
			resultObj.type = cnodetype;
			resultObj.rowid = cnodeid;
			resultObj.ptype = parentnode.contentType;
			resultObj.prowid = parentnode.contentid;
			break;	
		}
	}
	
	return resultObj;
}

PDL.widget.Papyrus.treeHelper.searchTreeByYID = function (tree,pnode,yid) {
	var editor = PDL.widget.Papyrus.Editor;
	var parentnode = new Object();
	var resultObj = new Object();
	var yid = yid;
	
	if(pnode.data == undefined){
		var tmpTT = editor.getEditorBean().beanGetter("treetype");
		parentnode.contentType = tmpTT;
		if(tmpTT == "container"){
			parentnode.contentid = editor.getEditorBean().beanGetter("containerrowid");
		} else if (tmpTT == "page") {
			parentnode.contentid = editor.getEditorBean().beanGetter("pagerowid");
		}
	} else {
		parentnode.contentType = pnode.data.contentType;
		parentnode.contentid = pnode.data.contentid;
		if(parentnode.contentType.toLowerCase() == "collection_link" || parentnode.contentType.toLowerCase() == "collection_document") {
			parentnode.contentid = pnode.data.collectionid;
		}
	}
//console.log('rain '+parentnode.contentType+'  '+tree.children.length);
	for (var i = 0; i < tree.children.length; i++) {
		var node = tree.children[i];
		var cnodetype = node.data.contentType;
		var cnodeid = node.data.contentid;
//console.log(cnodetype+' '+cnodeid)
		if(cnodetype.toLowerCase() == "collection_link" || cnodetype.toLowerCase() == "collection_document") {
			cnodetype = "collection";
		}
		
		if(cnodetype == "collection") {
//console.log('in collection')
			var tmpObj = this.searchTreeByYID(node,node,yid);
			if(tmpObj.type != undefined) {
//console.log('setting object');
				resultObj.treeid = node.labelElId;
				resultObj.type = tmpObj.type;
				resultObj.rowid = tmpObj.rowid;
				resultObj.ptype = tmpObj.ptype;
				resultObj.prowid = tmpObj.prowid;
				break;	
			} 
		}
		
		if(node.labelElId == yid){
//console.log('found it '+node.labelElId+' '+cnodetype+' '+cnodeid+' '+parentnode.contentType+' '+parentnode.contentid);
			resultObj.treeid = node.labelElId;
			resultObj.type = cnodetype;
			resultObj.rowid = cnodeid;
			resultObj.ptype = parentnode.contentType;
			resultObj.prowid = parentnode.contentid;
			break;	
		}
	}
	
	return resultObj;
}


PDL.widget.Papyrus.treeHelper.buildNodeSortArray = function (tree) {
	var aSort = new Array();
	
	for (var i = 0; i < tree.children.length; i++) {
		var node = tree.children[i];
		var cnodeid = node.data.contentassociationid;
		aSort[i] = cnodeid;
	}
	
	return aSort;
}


PDL.widget.Papyrus.treeHelper.setNodeContentData = function (tree,yid,da) {
	//alert('called'+tree.children.length);
	for (var i = 0; i < tree.children.length; i++) {
		var node = tree.children[i];
		var cnodeyid = node.labelElId;
		var cnodetype = node.data.contentType;
		var cnodeid = node.data.contentid;
		var rv = false;
		//alert(cnodeyid +'=='+ yid)
		//alert(cnodetype)
		if(cnodeyid == yid){
			node.data.contentid = da.contentid;
			node.data.contentassociationid = da.contentassociationid;
			//alert(node.data.contentid + ' ' +node.data.contentassociationid)
			rv = true;
			break;	
		} else if(cnodetype.toLowerCase() == "collection_link" || cnodetype.toLowerCase() == "collection_document") {
			if( this.setNodeContentData(node,yid,da) ) {			
				rv = true;
				break;
			}
		}
	}
	//alert('returning '+rv);
	return rv;
}


PDL.widget.Papyrus.treeHelper.updateTreeSortOrder = function (o,nodetype) {
	var service = new PDL.widget.Papyrus.connectionManager();
	
	if (nodetype.toLowerCase() == "container") {
		//alert('call to container len:'+o.carray.length);
		service.makeCall("POST","wsCMSContainers","updateContainerContentsSortOrder",o,null,this.wsFailure,"");
	} else {
		//alert('call to collection len:'+o.carray.length);
		service.makeCall("POST","wsCMSCollections","updateCollectionContentsSortOrder",o,null,this.wsFailure,"");
	}
}


PDL.widget.Papyrus.treeHelper.updateTreeSort = function () {
	var editor = PDL.widget.Papyrus.Editor;
	var tmpTT = editor.getEditorBean().beanGetter("treetype");
	var rnode = editor.getDialogTreeHelper().getTree().getRootNode();
	
	if (tmpTT.toLowerCase() == "container") {
		var tmpTR = editor.getEditorBean().beanGetter("containerrowid");
	} else if (tmpTT.toLowerCase() == "pagecontainers") {
		var tmpTR = editor.getEditorBean().beanGetter("pagerowid");
	}
	
	if ( editor.getDialogTreeHelper().loopUpdateTreeSort(rnode,tmpTT,tmpTR) ){
		PDL.widget.Papyrus.Editor.showPageRefreshMsg();
		PDL.widget.Papyrus.Editor.refreshEditor();
		// so that close button will refresh the page
		PDL.widget.Papyrus.Editor.onHasChanged.fire();
	}
	
}

PDL.widget.Papyrus.treeHelper.onHasChanged = function() {
	
	
	var dlgButtonRevertSortingLink = document.getElementById( "dlgButtonRevertSortingLink" );
	var dlgImageRevertSorting = document.getElementById( "dlgImageRevertSorting" );
	
	dlgButtonRevertSortingLink.href = "javascript:PDL.widget.Papyrus.Editor.getDialogTreeHelper().refreshTree();";
	dlgButtonRevertSortingLink.style.pointer = "auto";
	YAHOO.util.Dom.removeClass( dlgButtonRevertSortingLink, "dlgLinkDead" );
	dlgImageRevertSorting.src = dlgImageRevertSorting.src.replace( /_bw/gi, "" );
	
	
	var dlgButtonTreeApplySort = document.getElementById( "dlgButtonTreeApplySort" );
	var dlgImageApplySorting = document.getElementById( "dlgImageApplySorting" );
	
	dlgButtonTreeApplySort.href = "javascript:PDL.widget.Papyrus.Editor.getDialogTreeHelper().updateTreeSort();";
	dlgButtonTreeApplySort.style.pointer = "auto";
	YAHOO.util.Dom.removeClass( dlgButtonTreeApplySort, "dlgLinkDead" );
	dlgImageApplySorting.src = dlgImageApplySorting.src.replace( /_bw/gi, "" );

	
	var flashAnimation = function( n ) {
		
		if( n == 0 ) {
			
			// This is the last animation in the flash sequence.
			var startAnim = new YAHOO.util.ColorAnim( dlgButtonTreeApplySort, { color: { to: '#CC6666' } }, 0.75 );
			startAnim.animate();
			
			return true;
		
		} else {
			
			var recursiveCallback = function() {
				
				return flashAnimation( n - 1 );
				
			}
			
			var endAnimation = function() {
		
				var endAnim = new YAHOO.util.ColorAnim( dlgButtonTreeApplySort, { color: { to: '#3366FC' } }, 0.75 );
				endAnim.onComplete.subscribe( recursiveCallback );
				endAnim.animate();
			
			}
		
			var startAnimation = function() {
			
				var startAnim = new YAHOO.util.ColorAnim( dlgButtonTreeApplySort, { color: { to: '#CC6666' } }, 0.75 );
				startAnim.onComplete.subscribe( endAnimation );
				startAnim.animate();
			
			}
		
			startAnimation();
			
		}
		
	}
	
	flashAnimation( 1 );
	
}


PDL.widget.Papyrus.treeHelper.loopUpdateTreeSort = function (tree,pnodetype,pnoderowid) {
	//alert(pnodetype+', pid = '+pnoderowid );
	var aso = this.buildNodeSortArray(tree);
	if(aso.length) {
		var o = new Object();
		o.carray = aso;
		o.crowid = pnoderowid;
		//alert('a = '+o.carray.length + ', pid = '+o.crowid );
		this.updateTreeSortOrder(o,pnodetype)
	}
	
	var st = 0;
	while (st <= 10000) {st ++;}
	
	for (var i = 0; i < tree.children.length; i++) {
		var node = tree.children[i];
		var cnodetype = node.data.contentType;
		var cnoderowid = node.data.contentid;
		if(cnodetype.toLowerCase() == "collection_link" || cnodetype.toLowerCase() == "collection_document") {
			var tmpObj = this.loopUpdateTreeSort(node,"collection",cnoderowid);
		}
	}
		
	return true;
}


PDL.widget.Papyrus.treeHelper.buildTreeDP = function(o) { 
	var rtxt = PDL.util.wddxPackets.stripit(o.responseText);
	PDL.widget.Papyrus.Editor.getDialogTreeHelper().setTreeStructure(rtxt);
	//YAHOO.log(rtxt);
}




PDL.widget.Papyrus.treeHelper.setMode = function (mode) {
	var view = this.uieditor.getDialogForm();
	if (mode == 'edit'){
		this.showOverlay( "treeDialogOverlay" , "dlgCMSTreeOverlayShell" , "overlayMask" );
		//document.getElementById('dlgCMSTreeOverlayShell').setAttribute("class","overlayMask");
	} else if (mode == 'tree') {
		this.hideOverlay( "treeDialogOverlay" );
		//document.getElementById('dlgCMSTreeOverlayShell').removeAttribute("class");
	} else {
		this.killOverlay( "treeDialogOverlay" );
	}
}


PDL.widget.Papyrus.treeHelper.showLoadingOverlay = function () {
	var dlgCMSEditor = document.getElementById( "dlgCMSTreeOverlayShell" );
	var dlgLoadingOverlay = document.getElementById("treeLoadingOverlay");
	var dlgCMSTreeDiv = document.getElementById("dlgCMSTreeDiv");
	if( dlgLoadingOverlay != undefined ) {
		dlgCMSEditor.style.visibility = "hidden";
		dlgLoadingOverlay.style.display = "inline";
	}	
	
	dlgCMSTreeDiv.setAttribute("class","dlgCMSTreeDivLoad");	
}
	
PDL.widget.Papyrus.treeHelper.hideLoadingOverlay = function () {
	document.getElementById("treeLoadingOverlay").style.display = "none";
	//document.getElementById("dlgCMSTreeOverlayShell").style.display = "";
	document.getElementById("dlgCMSTreeDiv").setAttribute("class","dlgCMSTreeDiv");	
	document.getElementById("dlgCMSTreeOverlayShell").style.display = "";
}

PDL.widget.Papyrus.treeHelper.refreshTree = function () {
	PDL.widget.Papyrus.Editor.refreshDialogTree();
}



PDL.widget.Papyrus.treeHelper.repositionOverlay = function () {
	var overlayShell = document.getElementById( "treeDialogOverlay" );
	if(overlayShell != null)
		this.positionOverlay( overlayShell , "dlgCMSTreeOverlayShell" );
}






var TreeViewDomController = function() {


	/**
	 * Fired when a node's label element is clicked.
	 * 
	 * @param {Object} e Event reference.
	 * @param {Object} scopeObject Scope object.
	 */	 	
	 
	this.onLabelClickNodeEvent = function( e, scopeObject ) {
		scopeObject.setSelectedNode( this.id );
	}
	
	
	/**
	 * Fired on mouse down of a node's
	 * 
	 * @param {Object} e
	 * @param {Object} scopeObject
	 */ 
	 
	this.onMouseDownNodeEvent = function( e, scopeObject ) {
		var labelEl = scopeObject.getLabelEl( this );
		if ( labelEl != null ) {
			//YAHOO.log( typeof scopeObject.initializeDrag );
			scopeObject.initializeDrag( labelEl.id );
		} else {
			//YAHOO.log( "FATAL: Drag could not be initialized!" );
		}
	}
	
	
	/**
	 * Fired when mouse is over a node's icon element.
	 * 
	 * @param {Object} e Event reference.
	 * @param {Object} scopeObject Sope object.
	 */
	
	this.onMouseOverNodeIconEvent = function( e, scopeObject ) {
		scopeObject.drawDragNode( this );
	}
	
	
	/**
	 * Fired when mouse is moved off a node's icon element.
	 * 
	 * @param {Object} e Event reference.
	 * @param {Object} scopeObject Scope object.
	 */
	
	this.onMouseOutDragNodeEvent = function( e, scopeObject ) {
		scopeObject.eraseDragNode( this );
	}
	
}


/**
 * Drag & Drop Treeview implementation using YUI Library
 * 
 * @param {Object} id Element to contain the TreeView.
 */

var TreeView = function( id ) {
	
	this.tree = null;
	this.domController = null;
	this.treeViewController = null;
	this.selectedNode = null;
	this.overNode = null;
	this.insertedPlacebos = null;
	this.dragLocked = null;
	this.dragNodeElId = null;

	
	/**
	 * Initializes the Treeview.
	 * 
	 * @param {Object} id
	 */
	
	this.init = function( id ) {
		this.tree = new YAHOO.widget.TreeView( id );
		this.domController = new TreeViewDomController();
	  this.insertedPlacebos = [];
		
		// set drag lock to false
		this.dragLocked = false;
		
		// set dragNode element id
		this.dragNodeElId = "treeView_dragNode";
	
		//this.setupDragNodeDragDrop();
	}
	
	
	
	/**
	 * Adds a new node to the Treeview.
	 * 
	 * @param {Object} data
	 * @param {Object} parent
	 * @param {Object} expanded
	 */
	
	this.addNode = function( attributes, parent, expanded, renderHidden ) {
		var node = new YAHOO.widget.TextNode( attributes, parent, expanded );
		node.data["labelElId"] = node.labelElId;
		
		if( typeof renderHidden == 'boolean' ) {
			node.renderHidden = renderHidden;
		} else {
			node.renderHidden = false;
		}
		
		return node;
	}
	
	/**
	 * Adds event listeners to a node's label element.
	 * 
	 * @param {Object} nodeId Id of node's label element.
	 */
	
	this.addNodeEventCallbacks = function( nodeId ) {
		YAHOO.util.Event.addListener( nodeId, "mouseup", this.domController.onMouseClickNodeEvent, this );
	}
	
	/**
	 * Returns root node of TreeView.
	 */
	
	this.getRootNode = function() {
		return this.tree.getRoot();
	}
	
	/**
	 * Sets a nodes properties
	 * 
	 * @param {Object} node
	 * @param {Object} properties
	 */
	
	this.setNodeProperties = function( node, properties ) {
		for( var i in properties ) {
			node.data[i] = properties[i];	
		}
	}
	
	
	/**
	 * Sets the selectedNode property to the clicked nodes element id.
	 * 
	 * @param {Object} id
	 */
	
	this.setSelectedNode = function( id ) {
		this.selectedNode = id;
		//YAHOO.log("Node Selected was: " + id);
	}
	
	
	/**
	 * Loops through the entire tree attaching events and setting up behaviors for tree nodes.
	 * 
	 */
	
	this.setupTreeNodes = function() {
		
		// get all top level nodes
		var nodes = this.tree.getRoot().children;
		// loop through top level nodes
		for( var i = 0; i < nodes.length; i++ ) {
			this.setupNodeTD( nodes[i] );
			this.setupNodeStyles( nodes[i] );
			this.attachLabelClickEvent( nodes[i] );
			//this.attachIconDownEvent( nodes[i] );
			this.attachIconOverEvent( nodes[i] );
			for( var j = 0; j < nodes[i].children.length; j++ ) {
				this.setupNodeTD( nodes[i].children[j] );
				this.setupNodeStyles( nodes[i].children[j] );
				this.attachLabelClickEvent( nodes[i].children[j] );
				//this.attachIconDownEvent( nodes[i].children[j] );
				this.attachIconOverEvent( nodes[i].children[j] );
			}	
		}
		
	}
	
	
	/**
	 * Adds icons to tree nodes depending on their content type. Function used by setupTreeNodes.
	 * 
	 * @param {Object} node Node to add icon to.
	 */
	
	this.setupNodeStyles = function( node ) {
		var nodeTD = this.getNodeTD( node );
		var imgId = YAHOO.util.Dom.generateId();
		switch( node.data.contentType ) {
			
			case "html": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/page_white_text.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "image": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/image.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "link": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/page_link.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
		
			case "collection_document": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/folder_page.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "collection_link": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/folder_link.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "document": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/page_white_office.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "placebo":
				YAHOO.util.Dom.generateId( nodeTD );
				nodeTD.className = 'node_placebo';
				var ddtarget = new YAHOO.util.DDTarget( nodeTD.id, "placeboGroup" );
			
			break;	
			
			case "container":
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/brick.gif" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			default:
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="'+PDL.util.PageURL.getURL()+'img/page_white.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			/*
			case "html": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/html.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "image": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/image.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "link": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/page_link.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
		
			case "documentCollection": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/folder_page.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "linkCollection": 
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/folder_link.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			
			case "document":
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/page_white_office.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;	
			
			case "placebo":
				nodeTD.className = 'node_placebo';
				
				var ddtarget = new YAHOO.util.DDTarget( nodeTD.id, "placeboGroup" );
				
			break;	
			
			default:
				nodeTD.innerHTML = '<img id="' + imgId + '" class="nodeIcon" src="img/treeView/page_white.png" style="vertical-align: middle;" /> ' + nodeTD.innerHTML;
			break;
			*/
		}
		
	}
	
	
	/**
	 * Sets up drag and drop to the tree nodes depending on whether they are draggable or not. Drag and drop
	 * support is added to the tree node's parent table cell, which then a unique id is created and assigned. 
	 * Function used by setupTreeNodes.
	 * 
	 * @param {Object} node Node used to add drag and drop.
	 */
	
	this.setupNodeTD = function( node ) {
		var nodeTD = this.getNodeTD( node );
		YAHOO.util.Dom.generateId( nodeTD.id );
	}
	
	
	/**
	 * Attaches a click event listener to the label element in the tree. Event callback is handled through the 
	 * TreeViewDomController.
	 * 
	 * @param {Object} node Node used to attach event handler to.
	 */
	this.attachLabelClickEvent = function( node ) {
		if(node.data.clickable != null)
			if(node.data.clickable == true)
				YAHOO.util.Event.addListener( node.labelElId, "click", this.domController.onLabelClickNodeEvent, this );
	}
	
	
	/**
	 * Attaches a mouse over event listener to the icon element in the tree. Event callback is handled through
	 * the TreeViewDomController.
	 * @param {Object} node Node used to attach event handler to.
	 */
	
	this.attachIconOverEvent = function( node ) {
		
		var nodeIcon = this.getNodeIcon( node );
		
		if( nodeIcon != null ) {
			YAHOO.util.Event.addListener( nodeIcon, "mouseover", this.domController.onMouseOverNodeIconEvent, this );
		}
		
	}
	
	
	/**
	 * Returns the label element when passed an element contained withing the table cell container for
	 * tree nodes.
	 * 
	 * @param {Object} element Element contained within treeview node table cell.
	 */
	
	this.getLabelEl = function( element ) {
		var parentTD = element.parentNode;
		if( parentTD.nodeName == 'TD' ) {
			var links = parentTD.getElementsByTagName("a");
			
			if( links.length > 0 ) {
				if( links[0].className.indexOf( "ygtvlabel" ) >= 0 ) {
					return links[0];
				} else {
					return null;
				}
			} else {
				return null;
			}
			
		}
	}
	
	
	/**
	 * Returns the current node's parent table cell.
	 * 
	 * @param {Object} node
	 */
	
	this.getNodeTD = function ( node ) {
		var labelElement = document.getElementById( node.labelElId );		
		return labelElement.parentNode;
	}
	
	
	/**
	 * Returns a reference to a TreeView node label element.
	 * 
	 * @param {Object} element Element reference to any element within the TreeView node's table cell.
	 */
	
	this.getNodeFromTD = function( element ) {
		var parent = element.parentNode;
		var elements = parent.getElementsByTagName("a");
		if( elements.length == 1 ) {
			if( elements[0].className.indexOf("ygtvlabel") >= 0 ) {
				return elements[0];
			} else {
				return null;
			}
		}
	}
	
	/**
	 * Returns the node's icon element for the current node. Image element should have a class name of 'nodeIcon' 
	 * attached to it. Returns null if an image node isn't found or is found but doesn't meet the above criteria.
	 * 
	 * @param {Object} node Node used to reference icon in the same table cell.
	 */
	
	this.getNodeIcon = function( node ) {
		var elements = this.getNodeTD( node ).getElementsByTagName('img');
		if( elements.length == 1 ) {
			if(elements[0].className.indexOf('nodeIcon') >= 0 ) {
				return elements[0];
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	
	/**
	 * Insert placebo tree nodes before and after every node in the tree. Placebo nodes will not be placed 
	 * below the node before the targeted node or above the node after the targeted node. Placebos will 
	 * also be placed within collapsed node's children.
	 * 
	 * @param {Object} targetedNode
	 */
	
	this.insertPlacebos = function( targetedNode, placeboLabel ) {
		
		if( targetedNode != null ) {
			var targetedIndex = targetedNode.index;
		} else {
			var targetedIndex = -1;
		}
	
		var thisObj = this;
		
		// Insert placebo before current target.
		var insertPlaceboBefore = function( placebo, targetNode ) {
			// Keep following logging statement.
			//YAHOO.log( "Placebo: " + placebo + " Target: " + targetNode );
			thisObj.tree.popNode( placebo );
			placebo.insertBefore( targetNode );
			return true;
		}
		
		// Insert placebo after current target.
		var insertPlaceboAfter = function( placebo, targetNode ) {
			// Keep following logging statement.
			//YAHOO.log( "Placebo: " + placebo + " Target: " + targetNode );
			thisObj.tree.popNode( placebo );
			placebo.insertAfter( targetNode );
			return true;
		}
		
		// Get all top level nodes.
		//var nodes = this.tree.getRoot().children;
		
		var TREE_ROOT = this.tree.getRoot();
		
		if( this.tree.getRoot().children.length > 0 ) {
		
		// Loop through top level nodes.
		for( var i = 0; i < this.tree.getRoot().children.length; i++ ) {
    	
			var node = TREE_ROOT.children[i];		
			var previousNode = TREE_ROOT.children[i-1];
			var nextNode = TREE_ROOT.children[i+1];
			
			if( nextNode == undefined ) {
				var nextNode = {};
				nextNode.index = -1;
			}
	
			var indexCount = 0;
					
			if( previousNode != null && previousNode.children.length > 0 ) {
				indexCount = Math.floor( previousNode.children.length / 2 );						
			}
			
			if( i == 0 ) { // The first node in the tree.
				
				if( targetedIndex != node.index ) {				
					var before = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, node.parent, false );
					insertPlaceboBefore( before, node );
					this.insertedPlacebos[ this.insertedPlacebos.length ] = before;
					
					// Set i because we are adding nodes while iterating through the current tree.
					i++;
					
					if( targetedIndex != nextNode.index ) {
						var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, node.parent, false );
						insertPlaceboAfter( after, node );
						this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
						
						// Set i because we are adding nodes while iterating through the current tree.
						i++;
						
					}
					
				} 
				
			} else if( i == this.tree.getRoot().children.length-1 ) { // The last node in the tree.
					
					// If this is the last node, ensure it isn't the target.
					if( node.index != targetedIndex ) {
						var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, node.parent, false );
						insertPlaceboAfter( after, node );
						this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
						
						// Set i because we are adding nodes while iterating through the current tree.
						i++;
							
					}
					
				} else { // The middle nodes.
	
					// insert placebo after only if next node isn't target.			
					if( nextNode != null ) {
						if( node.index != targetedIndex && nextNode.index != targetedIndex ) {
							var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, node.parent, false );
							insertPlaceboAfter( after, node );
							this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
							
							// Set i because we are adding nodes while iterating through the current tree.
							i++;
							
						}
					}
										
			}
			
			// Check if targets match for child nodes "collections"
			if( node.data.contentType == targetedNode.data.targetContentType ) {
			
			
			// add a placebo node to an empty collection
			if( node.children.length == 0 ) {
				
				if( node.data.contentType == "collection_document" || node.data.contentType == "collection_link" ) {
					var newPlacebo = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, node, false );
					this.insertedPlacebos[ this.insertedPlacebos.length ] = newPlacebo;
					node.expanded = true;
				}
				
			} else {
			
				// loop through second level nodes	
				for( var j = 0; j < node.children.length; j++ ) {
		
					var childNode = node.children[j];
					var previousChildNode = node.children[j-1];
					var nextChildNode = node.children[j+1];
					
					if( nextChildNode == undefined ) {
						nextChildNode = {};
						nextChildNode.index = -1;
					}
					
					
					if( j == 0 ) { // The first child node.
						
						if( targetedIndex != childNode.index ) {	
						
							var before = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, childNode.parent, false );
							insertPlaceboBefore( before, childNode );
							this.insertedPlacebos[ this.insertedPlacebos.length ] = before;
							
							// Set j because we are adding child nodes while iterating through the current tree.
							j++;
							
							if( targetedIndex != nextChildNode.index ) {
								
								var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, childNode.parent, false );
								insertPlaceboAfter( after, childNode );
								this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
								
								// Set j because we are adding child nodes while iterating through the current tree.
								j++;
							}
						
						} 
					} else if( j == node.children.length-1 ) { // The last child node.
						
								// If this is the last node, ensure it isn't the target.
								if( childNode.index != targetedIndex ) {
									var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, childNode.parent, false );
									insertPlaceboAfter( after, childNode );
									this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
									
									// Set j because we are adding child nodes while iterating through the current tree.
									j++;
								}
								
						} else { // The middle child nodes.
						
							if( nextChildNode != null ) {
								if( childNode.index != targetedIndex && nextChildNode.index != targetedIndex ) {
							
									var after = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, childNode.parent, false );
									insertPlaceboAfter( after, childNode );
									this.insertedPlacebos[ this.insertedPlacebos.length ] = after;
									
									// Set j because we are adding child nodes while iterating through the current tree.
									j++;
								}
							}
						}
					}	
				}
			} // end if node.expanded
			} // end for loop, rootNode's children
		} else { // if tree has no nodes
			
			var newPlacebo = new YAHOO.widget.TextNode( { label : placeboLabel, href : "#", contentType : "placebo", draggable : false, targetContentType : "none", treeObject : this }, this.tree.getRoot(), false );
			this.insertedPlacebos[ this.insertedPlacebos.length ] = newPlacebo;
			
		}
		
		this.tree.getRoot().refresh();		
		this.setupTreeNodes();

	}
	
	
	/**
	 * Removes all placebo elements from the tree.
	 *
	 */
	
	this.removePlacebos = function() {
		var start = new Date();
		
		var insertedPlacebos = this.insertedPlacebos;
		var tree = this.tree;
		for( var i = 0; i < insertedPlacebos.length; i++ ) {
			tree.popNode( insertedPlacebos[i], false );	
		}
		
		// Set this.insertedPlacebos to an empty Array
		this.insertedPlacebos = [];
		
		this.tree.getRoot().refresh();
		this.setupTreeNodes();
		
		var end = new Date();
		//console.log( end - start );
	}
	
	
	/**
	 * Initializes drag and drop functionality on dragNode object
	 * 
	 */
	
	this.setupDragNodeDragDrop = function() {
		
		//var divHTML = '<div id="treeView_dragNode" style="position: relative;background: #d3d3d3; width: 10px; height: 10px; visibility: visible; opacity: 0; filter: alpha(opacity=0);">&nbsp;</div>';
		
		
	  var treeElement = document.getElementById( this.tree.id );
		//treeElement.innerHTML += divHTML;
		
		var div = document.getElementById( this.dragNodeElId );
		
		// Setup drag & drop
		var dd = new YAHOO.util.DD( div.id, "placeboGroup" );
	
		// Setup event handling for drag node
		var thisObj = this;
		var domController = this.domController;
		var treeViewController = this.treeViewController;
		
		var timeout = null;
		var loop = true;
		var scrollUpControl = document.getElementById("PapyrusTreeDivScrollUpControl");
		var scrollDownControl = document.getElementById("PapyrusTreeDivScrollDownControl");
		var treeView = document.getElementById("PapyrusTreeDiv");
		
		function scrollUp() {
			loop = true;
			if( loop == true ) {
				if( treeView.scrollTop != 0 ) {
					treeView.scrollTop -= 2;
				}
			
				timeout = setTimeout( scrollUp, 1 );
			}
			
		}
		
		function scrollDown() {
			loop = true;
			if( loop == true ) {
				if( treeView.offsetHeight + treeView.scrollTop != treeView.scrollHeight ) {
					treeView.scrollTop += 2;
				}
				
				timeout = setTimeout( scrollDown, 1 );
			}
			
		}
		
		function stopScroll() {
			loop = false;
			clearTimeout( timeout );
		}		
		
		dd.onMouseDown = function( e ) {
			var nodeLabelEl = thisObj.overNode.getLabelEl();
			YAHOO.util.Dom.generateId( nodeLabelEl );
			
			div.style.textAlign = "center";
			div.style.width = nodeLabelEl.parentNode.offsetWidth + 10 + "px";
			div.style.height = nodeLabelEl.parentNode.offsetHeight + "px";
			//div.innerHTML = nodeLabelEl.parentNode.innerHTML;
			var nodeIcon = thisObj.getNodeIcon( thisObj.overNode );
			var nodeText = nodeLabelEl.innerHTML;
			div.innerHTML = '<img src="' + nodeIcon.src + '" style="vertical-align: middle" />' + nodeText;
			if( div.style.filter === undefined ) { // gecko et. al.
				div.style.opacity = 0.5;
			} else { // if ie
				div.style.filter = "alpha(opacity=50)";
			}
		}
		
		dd.onMouseUp = function( e ) {
			
			thisObj.eraseDragNode( div );
			
		}
		
		dd.onDragEnter = function( e, id ) {
	
			if ( id == "PapyrusTreeDivScrollUpControl" ) {
				scrollUp();
			} else if( id == "PapyrusTreeDivScrollDownControl") {
				scrollDown();
			} else {
					var nodeTD = document.getElementById( id );
					if( nodeTD != null ) {
						nodeTD.className = "node_placebo_over";
					}
				}
		}
		
		dd.onDragOut = function( e, id ) {
		
			if ( id == "PapyrusTreeDivScrollUpControl" ) {
				stopScroll();
			} else if( id == "PapyrusTreeDivScrollDownControl") {
				stopScroll();
			} else {
					var nodeTD = document.getElementById( id );
					if( nodeTD != null ) {
						nodeTD.className = "node_placebo";
					}
				}
		}
		
		dd.startDrag = function( e ) {
			div.style.pointer = "move";
			thisObj.dragLocked = true;
			var labelElement = thisObj.overNode.getLabelEl();
			if( labelElement != null ) {
				var nodeIndex = labelElement.id.substr( 11, labelElement.id.length );
				targetedNode = YAHOO.widget.TreeView.getNode( thisObj.tree.id, nodeIndex );
				thisObj.insertPlacebos( targetedNode , "-- Move Here --" );
			}
		}
		
		dd.endDrag = function( e ) {
			thisObj.dragLocked = false;
			thisObj.removePlacebos();
			//thisObj.eraseDragNode( div );
		}
		
		dd.onDragDrop = function( e, id ) {
			thisObj.dropDragNode( id );
		}
		
	}
	
	
	/**
	 * Triggered on mouseover of a TreeView's nodeIcon. 
	 * 
	 * @param {Object} nodeIconElement Element reference to a node's icon element.
	 */
	
	this.drawDragNode = function( nodeIconElement ) {
		
		if( this.dragLocked == false ) {
			var nodeTD = nodeIconElement.parentNode;
			var elements = nodeTD.getElementsByTagName("a");
			var labelElement = null;
			for( var i = 0; i < elements.length; i++ ) {
				if( elements[i].className.indexOf( 'ygtvlabel' ) >= 0 ) {
					labelElement = elements[i];
				}
			}
			var node = null;
			if( labelElement != null ) {
				var nodeIndex = labelElement.id.substr( 11, labelElement.id.length );
				node = YAHOO.widget.TreeView.getNode( this.tree.id, nodeIndex );
			}

			if( node != null ) {
				this.overNode = node;
			}
			
			var div = document.getElementById( this.dragNodeElId );
			var DIV_STYLE = div.style;	// Performance, object lookup
			DIV_STYLE.height = nodeIconElement.offsetHeight + "px";
			DIV_STYLE.lineHeight = nodeIconElement.offsetHeight + 3 + "px";
			DIV_STYLE.width = nodeIconElement.offsetWidth + "px";
			DIV_STYLE.visibility = "visible";
			DIV_STYLE.display = "";
			if( DIV_STYLE.filter === undefined ) { // gecko et. al.
				DIV_STYLE.opacity = 0;
			} else { // if ie
				DIV_STYLE.filter = "alpha(opacity=0)";
			}
			
			// Set new position
			YAHOO.util.Dom.setXY( div, YAHOO.util.Dom.getXY( nodeIconElement ) );		
			
			// Set constraints		
			var YD = YAHOO.util.Dom;	
			var treeElement = document.getElementById( "PapyrusTreeDiv" );
			var ddNode = YAHOO.util.DragDropMgr.getDDById( div.id );
			
				
			var xLeftConstraint = YD.getX( div ) - (YD.getX( treeElement.id ) + 10);
			var xRightConstraint = ( YD.getX( treeElement.id ) + treeElement.offsetWidth ) - ( YD.getX( div ) + 110 );
			var yTopConstraint = YD.getY( div ) - YD.getY( treeElement.id ) + 20;
			var yBottomConstraint = ( YD.getY( treeElement ) + treeElement.offsetHeight ) - ( YD.getY( div ) + div.offsetHeight ) + 20;
		
			// must reset constraints for new constraints to be set
			ddNode.resetConstraints();
			//alert( YD.get( this.tree.id ).offsetWidth );
			ddNode.setXConstraint( xLeftConstraint, xRightConstraint, 1 );
			//alert( yTopConstraint + " : " + yBottomConstraint );
			ddNode.setYConstraint( yTopConstraint, yBottomConstraint, 1 );
			
			
		}
		
	}
	
	
	/**
	 * Removes the dragNode element from the document.
	 * 
	 * @param {Object} dragNode Element reference of the dragNode.
	 */
	
	this.eraseDragNode = function( dragNode ) {
		try{
			dragNode.innerHTML = "";
			if( dragNode.style.filter === undefined ) { // gecko et. al.
				dragNode.style.opacity = 0;
			} else { // if ie
				dragNode.style.filter = "alpha(opacity=0)";
			}
			dragNode.style.display = "none";
		} catch( e ) {
			//YAHOO.log( e );
		}
		
	}
	
	
	/**
	 * Triggered when the dragNode is dropped.
	 * 
	 * @param {Object} id Id of the element that the dragNode was dropped on.
	 */
	
	this.dropDragNode = function( id ) {
		var droppedOn = document.getElementById( id );
		if( droppedOn.className.indexOf( 'node_placebo' ) >= 0 ) {
			var nodeTD = document.getElementById( id );
			var elements = nodeTD.getElementsByTagName( "a" );
			var labelElement = null;
			for( var i = 0; i < elements.length; i++ ) {
				if( elements[i].className.indexOf( "ygtvlabel" ) >= 0 ) {
					labelElement = elements[i];
				}
			}
		
			if( labelElement != null ) {
				var nodeIndex = labelElement.id.substr( 11, labelElement.id.length );
				node = YAHOO.widget.TreeView.getNode( this.tree.id, nodeIndex );
				
				if( node != null ) {
					
					/* 
					 * get parent node so we can collapse it. Otherwise the parent's childNode container 
					 * remains displayed after the new tree is rendered. IE only. Bug #53
					 */
					
					var parentNode = this.overNode.parent;
					
					if( parentNode.data != null ) {
						
						parentNode.collapse();
						
					}
					
					// insert new node
					this.overNode.insertAfter( node );
					
					if( parentNode.data != null ) {
						
						if( parentNode.children.length > 0 ) {
							
							parentNode.expand();
							
						}
						
						
					}					
					
					// set hasChanged
					if( PDL.widget.Papyrus.treeHelper.hasChangedEvent ) {
						
						PDL.widget.Papyrus.treeHelper.hasChanged = true;
						PDL.widget.Papyrus.treeHelper.hasChangedEvent.fire();
					
					} else if( PDL.widget.Papyrus.pageContainersTreeHelper.hasChangedEvent ) {
						
						PDL.widget.Papyrus.pageContainersTreeHelper.hasChanged = true;
						PDL.widget.Papyrus.pageContainersTreeHelper.hasChangedEvent.fire();
						
					} 
					
				}
			}
			
		}
	}
	
	
	/**
	 * Draws the Treeview.
	 * 
	 */
	
	this.draw = function() {
		
		this.tree.draw();
		//this.insertDragNode();
	}
	
	
	this.setupDragDD = function( nodeIcon, nodeLabel ) {
		
	}
	
	
	// initialize object
	this.init( id );
}


var SourceNodeMgr = function( dragNodeElId, targetTree ) {
	
	this.activeSource = null;
	this.dragNodeElId = null;
	this.targetTree = null;
	this.sourceNodes = null;
	this.dragLock = null;
	
	
	this.init = function( dragNodeElId, targetTree ) {
		
		this.dragNodeElId = dragNodeElId;
		this.sourceNodes = [];
		
		// set target tree
		if( typeof targetTree == 'string' ) {
			this.targetTree = YAHOO.widget.TreeView.getTree( targetTree );
			if( this.targetTree == null ) {
				return false;
			}
		} else {
			this.targetTree = targetTree;
			if( ! this.targetTree instanceof TreeView ) {
				return false;
			}
		}
		
		
		this.dd = new YAHOO.util.DD( this.dragNodeElId, "placeboGroup" );
		
		var thisObject = this;
		
		var timeout = null;
		var loop = true;
		var scrollUpControl = document.getElementById("PapyrusTreeDivScrollUpControl");
		var scrollDownControl = document.getElementById("PapyrusTreeDivScrollDownControl");
		var treeView = document.getElementById("PapyrusTreeDiv");
		
		function scrollUp() {
			loop = true;
			if( loop == true ) {
				if( treeView.scrollTop != 0 ) {
					treeView.scrollTop -= 2;
				}
			
				timeout = setTimeout( scrollUp, 1 );
			}
			
		}
		
		function scrollDown() {
			loop = true;
			if( loop == true ) {
				if( treeView.offsetHeight + treeView.scrollTop != treeView.scrollHeight ) {
					treeView.scrollTop += 2;
				}
				
				timeout = setTimeout( scrollDown, 1 );
			}
			
		}
		
		function stopScroll() {
			loop = false;
			clearTimeout( timeout );
		}
		
		this.dd.onMouseDown = function( e ) {
			thisObject.dragLock = true;	
			var sourceElement = document.getElementById( thisObject.getActiveSource().elementId );
			var dragNodeEl = document.getElementById( dragNodeElId );
			dragNodeEl.style.padding = "3px";
			dragNodeEl.style.cursor = "move";
			if( dragNodeEl.style.filter == undefined ) { // Gecko et. al.
				dragNodeEl.style.opacity = "0.5";
			} else { // IE
				dragNodeEl.style.filter = "alpha(opacity=50)";
			}
			dragNodeEl.innerHTML = sourceElement.innerHTML;
			
		}
		
		this.dd.onMouseUp = function( e ) {
			thisObject.dragLock = false;	
			var sourceElement = document.getElementById( thisObject.getActiveSource().elementId );
			var dragNodeEl = document.getElementById( dragNodeElId );
			dragNodeEl.style.padding = "0px";
			dragNodeEl.style.cursor = "default";
			if( dragNodeEl.style.filter == undefined ) { // Gecko et. al.
				dragNodeEl.style.opacity = "0";
			} else { // IE
				dragNodeEl.style.filter = "alpha(opacity=0)";
			}
			dragNodeEl.innerHTML = "";
			
		}
		
		this.dd.startDrag = function( e ) {
			var dragNodeEl = document.getElementById( dragNodeElId );
			dragNodeEl.style.cursor = "move";
			thisObject.targetTree.insertPlacebos( { data : { targetContentType : thisObject.getActiveSource().targetContentType } }, "-- Add Here --" );	
		}
		
		this.dd.onDragEnter = function( e, id ) {
			if ( id == "PapyrusTreeDivScrollUpControl" ) {
				scrollUp();
			} else if( id == "PapyrusTreeDivScrollDownControl") {
				scrollDown();
			} else {
				var dragNodeEl = document.getElementById( dragNodeElId );
				dragNodeEl.style.cursor = "pointer";
				var nodeTD = document.getElementById( id );
				if( nodeTD != null ) {
					nodeTD.className = "node_placebo_over";
				}
			}
		}
		
		this.dd.onDragOut = function( e, id ) {
			if ( id == "PapyrusTreeDivScrollUpControl" ) {
				stopScroll();
			} else if( id == "PapyrusTreeDivScrollDownControl") {
				stopScroll();
			} else {
				var dragNodeEl = document.getElementById( dragNodeElId );
				dragNodeEl.style.cursor = "move";
				var nodeTD = document.getElementById( id );
				if( nodeTD != null ) {
					nodeTD.className = "node_placebo";
				}
			}
		}
		
		this.dd.onDragDrop = function( e, id ) {
			
			var droppedOn = document.getElementById( id );
			
			if( droppedOn.className.indexOf( 'node_placebo' ) >= 0 ) {
				var nodeTD = document.getElementById( id );
				var elements = nodeTD.getElementsByTagName( "a" );
				var labelElement = null;
				for( var i = 0; i < elements.length; i++ ) {
					if( elements[i].className.indexOf( "ygtvlabel" ) >= 0 ) {
						labelElement = elements[i];
					}
				}
			
				if( labelElement != null ) {
					var nodeIndex = labelElement.id.substr( 11, labelElement.id.length );
					node = YAHOO.widget.TreeView.getNode( thisObject.targetTree.tree.id, nodeIndex );
					if( node != null ) {
						var newNode = new YAHOO.widget.TextNode( { label : "New Content", href : "#", contentType : thisObject.getActiveSource().contentType, targetContentType : thisObject.getActiveSource().targetContentType, draggable : true, treeObject : thisObject.targetTree.tree }, node.parentNode, false, true );
						newNode.insertAfter( node );
						
						//added
						//alert(newNode.labelElId);
						PDL.widget.Papyrus.Editor.getEditorBean().beanSetter("treeposid",newNode.labelElId);
						PDL.widget.Papyrus.Editor.switchDialogForm("Create",newNode.data.contentType,"","editor");
					}
				}
				
			}
			
		}
		
		this.dd.endDrag = function( e ) {
			thisObject.targetTree.removePlacebos();
		}
	}
	
	this.setActiveSource = function( sourceNode ) {
		this.activeSource = sourceNode;
	}
	
	this.getActiveSource = function() {
		return this.activeSource;
	}
	
	this.registerSourceNode = function( sourceNode ) {
		this.sourceNodes[ this.sourceNodes.length ] = sourceNode;
	}
	
	return this.init( dragNodeElId, targetTree );
			
}


var SourceNode = function( elementId, dragNodeMgr, contentType, targetContentType ) {
	
	this.init = function( elementId, dragNodeMgr, contentType, targetContentType ) {
		
		// set element id
		if( document.getElementById( elementId ) ) {
			this.elementId = elementId;
		} else {
			return false;
		}
	
		
		// set content type
		this.contentType = contentType;
		
		// set target content type
		this.targetContentType = targetContentType;
		
		// set drag node reference
		this.dragNodeMgr = dragNodeMgr;
				
		// setup drag & drop if not already setup
		this.setupDragDrop();
		
		// setup mouse events on source element
		this.attachMouseEvents();
		
		this.dragNodeMgr.registerSourceNode( this );
		
	}
	
	this.setupDragDrop = function() {
						
	}
	
	this.attachMouseEvents = function() {
		
		// setup mouseover list element
		YAHOO.util.Event.addListener( this.elementId, "mouseover", this.mouseOverEvent, this );
		
		// setup mouseout list element
		YAHOO.util.Event.addListener( this.elementId, "mouseout", this.mouseOutEvent, this );
		
	}
	
	this.detachMouseEvents = function() {
		
		// setup mouseover list element
		YAHOO.util.Event.removeListener( this.elementId, "mouseover", this.mouseOverEvent, this );
		
		// setup mouseout list element
		YAHOO.util.Event.removeListener( this.elementId, "mouseout", this.mouseOutEvent, this );
		
	}
	
	this.mouseOverEvent = function( e, scope ) {
		if( !scope.dragNodeMgr.dragLock ) {
			var dragNodeEl = document.getElementById( scope.dragNodeMgr.dragNodeElId );
			
			// log active source
			//YAHOO.log( scope.elementId );
			
			dragNodeEl.style.height = this.offsetHeight + 'px';
			dragNodeEl.style.width = this.offsetWidth - 10 + 'px';
			dragNodeEl.style.lineHeight = this.offsetHeight + "px";
			dragNodeEl.style.textAlign = "center";
			dragNodeEl.style.cursor = "pointer";
			YAHOO.util.Dom.setXY( dragNodeEl, YAHOO.util.Dom.getXY( this ) );
			
			// set activeSource
			scope.dragNodeMgr.setActiveSource( scope );
			
			// Set constraints		
			var YD = YAHOO.util.Dom;	
			var treeElement = document.getElementById( scope.dragNodeMgr.targetTree.tree.id );
			var ddNode = YAHOO.util.DragDropMgr.getDDById( dragNodeEl.id );
			var xLeftConstraint = YD.getX( dragNodeEl ) - (YD.getX( "dlgCMSTreeAddDiv" ) );
			var xRightConstraint = ( YD.getX( treeElement.id ) + treeElement.offsetWidth ) - ( YD.getX( dragNodeEl ) + 110 );
			var yTopConstraint = YD.getY( dragNodeEl ) - YD.getY( treeElement.id ) + 20;
			var yBottomConstraint = ( YD.getY( treeElement ) + treeElement.offsetHeight ) - ( YD.getY( dragNodeEl ) + dragNodeEl.offsetHeight ) + 20;
		
			// must reset constraints for new constraints to be set
			ddNode.resetConstraints();
			//alert( YD.get( this.tree.id ).offsetWidth );
			ddNode.setXConstraint( xLeftConstraint, xRightConstraint, 1 );
			//alert( yTopConstraint + " : " + yBottomConstraint );
			ddNode.setYConstraint( yTopConstraint, yBottomConstraint, 1 );
		
		}
		
	}
	
	this.mouseOutEvent = function( e, scope ) {

	}

	
	return this.init( elementId, dragNodeMgr, contentType, targetContentType );
	
}
