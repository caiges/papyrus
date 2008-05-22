/*
*   author:  Britton Halle
*   created:  07/24/2006
*   purpose:  create bean based on type requested
*	dependencies: bean.js, prototypal.js
*
*/

PDL.widget.Papyrus.beanfactory = function() {
	return this.init();
}

PDL.widget.Papyrus.beanfactory.prototype  = {
	init : function () {
		this.object = PDL.util.Extend;
		this.bean = PDL.util.Bean;
	},
	getbean : function (beantype) {
		var vo = this.object(new this.bean());
		
		switch(beantype) {
			
			case "pageVO": 
			vo.buildbean("pagetitle,isactive,ownertype,ownerrowid,privacylevelrowid,parentpagerrowid,userrowid,sectionrowid,rowid");
			break;
			
			case "containerVO": 
			vo.buildbean("createddatetime,createdby,containername,containertyperowid,isactive,ownertype,ownerrowid,privacylevelrowid,userrowid,pagerowid,pagecontainerrowid,containerrowid,rowid,sortorder");
			break;
			
			case "collectionVO": 
			vo.buildbean("sortorder,createddatetime,createdby,collectionname,collectiontype,displayname,userrowid,isactive,ownertype,ownerrowid,privacylevelrowid,containerrowid,rowid,contentrowid,containerrowidinit");
			break;
			
			case "fileVO":
			vo.buildbean("sortorder,createddatetime,createdby,name,description,filename,filesize,filepath,ownertype,ownerrowid,isinternal,isactive,userrowid,createddatetime,contenttype,privacylevelrowid,thumbnailrowid,rowid,contentrowid,belongstoinit,belongsto,containerrowidinit,containerrowid");
			break;
			
			case "htmlVO": 
			vo.buildbean("sortorder,createddatetime,createdby,htmltext,userrowid,isactive,ownertype,ownerrowid,privacylevelrowid,containerrowid,rowid,contentrowid,contenttype,containerrowidinit");
			break;
			
			case "linkVO": 
			vo.buildbean("sortorder,createddatetime,createdby,linktext,linkurl,linktarget,userrowid,isactive,ownertype,ownerrowid,privacylevelrowid,containerrowid,belongsto,rowid,contentrowid,contenttype,containerrowidinit,belongstoinit");
			break;
			
			case "cmsVO": 
			vo.buildbean("action,formtype,treetype,treeposid,treetypename,pagerowid,containerrowid,contentrowid,collectionrowid,pagecontainerrowid,privacylevelrowid,sectionrowid,userrowid");
			break;
			
			case "helpVO": 
			vo.buildbean("topics,subtopics,title,description,image,videos");
			break;
			
		}
	
		return vo;
	}
}