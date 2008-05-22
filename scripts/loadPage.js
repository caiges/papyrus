/*
*   author:  Caige Nash
*   created:  05/24/2006
*   purpose:  load all functionality gracefully to support those incompetent browsers
*   
*/

// round corners
function roundCorners() {
	
	if(!NiftyCheck())
		return;
	Rounded("div#headerOuter","bottom","transparent","#eee");
	Rounded("div#headerInner","bottom","transparent","#dbe3ff","border #7d7d7d");
	Rounded("div#searchOuter","top","transparent","#ffec94","border #7d7d7d");
	Rounded("div#sidebarLeftOuter","all","transparent","#eee");
	Rounded("div#sidebarLeftInner","all","transparent","#e0d5ff","border #7d7d7d");
	Rounded("div#contentOuter","all","transparent","#eee");
	Rounded("div#contentInner","all","transparent","#eeeeee","border #7d7d7d");
	Rounded("div#sidebarRightOuter","all","transparent","#eee");
	Rounded("div#sidebarRightInner","all","transparent","#d2ffbf","border #7d7d7d");
	Rounded("div#sidebarRightBottomOuter","all","transparent","#eee");
	Rounded("div#sidebarRightBottomInner","all","transparent","#fddeb3","border #7d7d7d");
	Rounded("div#footerOuter","top","transparent","#eee");
	Rounded("div#footerInner","top","transparent","#dbe3ff","border #7d7d7d");	
	Rounded("div#sidebarRightFinancialOuter","all","transparent","#eee");
	Rounded("div#sidebarRightFinancialInner","all","transparent","#ffcecf","border #7d7d7d");
	Rounded("div#sidebarLeftPapyrusOuter","all","transparent","#eee");
	Rounded("div#sidebarLeftPapyrusInner","all","transparent","#fffbd5","border #7d7d7d");
	if(document.getElementById("whiteboard") != null) {
		// round
	}

	Rounded("div#contentBannerAdOuter","all","transparent","#eee");
	Rounded("div#contentBannerAdInner","all","transparent","#eeeeee","border #7d7d7d");
	Rounded("div#contentIntranetTourOuter","all","transparent","#eee");
	Rounded("div#contentIntranetTourInner","all","transparent","#eeeeee","border #7d7d7d");
	Rounded("div#contentNewsOuter","all","transparent","#eee");
	Rounded("div#contentNewsInner","all","transparent","#eeeeee","border #7d7d7d");
	Rounded("div#contentRecentOuter","all","transparent","#eee");
	Rounded("div#contentRecentInner","all","transparent","#eeeeee","border #7d7d7d");
	
	Rounded("div#contentSuccessMakerOuter","all","transparent","#eee");
	Rounded("div#contentSuccessMakerInner","all","transparent","#DBE3FF","border #7d7d7d");
	Rounded("div#contentWaterfordOuter","all","transparent","#eee");
	Rounded("div#contentWaterfordInner","all","transparent","#DBE3FF","border #7d7d7d");
	Rounded("div#contentNovaNETOuter","all","transparent","#eee");
	Rounded("div#contentNovaNETInner","all","transparent","#DBE3FF","border #7d7d7d");
	Rounded("div#contentKnowledgeBoxOuter","all","transparent","#eee");
	Rounded("div#contentKnowledgeBoxInner","all","transparent","#DBE3FF","border #7d7d7d");
	
}

// Overlays 
function loadOverlays() {
	if(PDL.widget.OverlayComponent != undefined) {
		
		var headerOverlay = new PDL.widget.OverlayComponent().init("headerInner", true, 30);
		var sidebarLeftOverlay = new PDL.widget.OverlayComponent().init("sidebarLeftContainer", true, 10);
		var sidebarRightOverlay = new PDL.widget.OverlayComponent().init("sidebarRightContainer", true, 10);
	}	
}

// FollowMe containers
function loadSidebarFollow() {
	if(PDL.widget.FollowMe != undefined) {
		
		var sidebarleft = new PDL.widget.FollowMe().init('sidebarLeftContainer');
		var sidebarright = new PDL.widget.FollowMe().init('sidebarRightContainer');
		
		YAHOO.util.Event.addListener(window, "scroll", PDL.widget.FollowMeMgr.resetContainerEvent);
		YAHOO.util.Event.addListener(window, "resize", PDL.widget.FollowMeMgr.resetContainerEvent);
		//window.onscroll = resetContainer;
	}
}

// InfoBox
function loadInfoBox() {
	if(PDL.widget.InfoBoxMgr != undefined) {
		//infoBoxMgr = new PDL.widget.InfoBoxMgr();
		PDL.widget.InfoBoxMgr.init();
		PDL.widget.InfoBoxMgr.addClassType("downloadDetail");
		PDL.widget.InfoBoxMgr.attachEvents();
		PDL.widget.InfoBoxMgr.attachExpandAllLinkEvents();
	}
}
	
// Dashboard
function loadDashboard() {
	if(PDL.widget.Dashboard != undefined) {
		PDL.widget.Dashboard.init();
	}
	
}

// SearchBox
function loadSearchBox() {
	if(PDL.widget.SearchBox != undefined) { 
		PDL.widget.SearchBox.init();
		PDL.widget.SearchBox.fillRosterCache();
	}	
}

// Bookmarks
function loadBookmarks() {
	if(PDL.widget.Bookmark != undefined) {
		PDL.widget.Bookmark.init();	
	}
}


// Thumbnails
function loadThumbnails() {
	if(PDL.widget.Thumbnails != undefined) {
		PDL.widget.Thumbnails.init();	
	}
}

// Papyrus Editing Tools
function loadPapyrus() {
	
	if(PDL.widget.Papyrus != undefined && PDL.widget.Papyrus.PapyrusManager != undefined) {
	
		PDL.widget.Papyrus.PapyrusManager.init();
	
	}
	
}

// YAHOO Logger
function loadYUILogger() {
	var debug = true;
	if(debug == true && YAHOO.widget.LogReader != undefined) {
		var yuilogger = new YAHOO.widget.LogReader();
	}
}


// Setup YAHOO DragDrop 
function setupYUIDragDrop() {
	

	if( YAHOO.util.DragDropMgr ) {
		
		YAHOO.util.DragDropMgr.useCache = false;
		
	}	
	
}


// MCE Editor
if( typeof tinyMCE != 'undefined' ) {
	tinyMCE.init( { 
		mode : "exact", 
		elements : "htmlcontent", 
		theme : "cmshtmlcontent", 
		auto_reset_designmode : true, 
		encoding : "xml",
		verify_css_classes : true,
		inline_styles : true
	} );
}

	// round corners
	addLoadEvent(roundCorners);
	// load follow me container functionality
	addLoadEvent(loadSidebarFollow);
	// create overlays
	addLoadEvent(loadOverlays);
	// load InfoBox Manager
	addLoadEvent(loadInfoBox);
	// load Dashboard
	//addLoadEvent(loadDashboard);
	// load searchBox
	//addLoadEvent(loadSearchBox);
	// load bookmarks
	addLoadEvent(loadBookmarks);
	// load thumbnails
	addLoadEvent(loadThumbnails);
	// load Papyrus
	addLoadEvent(loadPapyrus);
	// setup yui drag drop
	addLoadEvent(setupYUIDragDrop);
	// load yui logger
	//addLoadEvent(loadYUILogger);
	