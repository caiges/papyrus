<cfsilent>
	<cfset userstruct = viewstate.getValue("session_userstruct") />
</cfsilent>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd" >
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
<head>
	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
	<title>PDL Intranet</title>

	<!-- stylesheets -->
	<link rel="stylesheet" type="text/css" href="css/layout.css" />
	<link rel="stylesheet" type="text/css" href="css/general.css" />
	<link rel="stylesheet" type="text/css" href="css/typography.css" />
	<link rel="stylesheet" type="text/css" href="css/niftyCorners/niftyCorners.css" />
	<link rel="stylesheet" type="text/css" href="css/niftyCorners/niftyPrint.css" media="print" />
	<link rel="stylesheet" type="text/css" href="css/menu/menu.css" />
	<link rel="stylesheet" type="text/css" href="css/accordionMenu/accordionMenu2.css" /> 
	<link rel="stylesheet" type="text/css" href="css/accordionMenu/myToolbox.css" /> 
	<link rel="stylesheet" type="text/css" href="css/pdl/infoBox/infoBox.css" /> 
	<link rel="stylesheet" type="text/css" href="css/pdl/searchBox/searchBox.css" />
	<cfif viewState.getValue("userHasPageRights") is true>
		<link rel="stylesheet" type="text/css" href="css/pdl/papyrus/papyrus.css" />
		<link rel="stylesheet" type="text/css" href="css/pdl/papyrus/dialog.css" />
		<link rel="stylesheet" type="text/css" href="css/pdl/papyrus/container.css" />
		<link rel="stylesheet" type="text/css" href="css/yahoo/assets/menu.css" />
		<link rel="stylesheet" type="text/css" href="css/yahoo/assets/tree.css" />
		<link rel="stylesheet" type="text/css" href="css/pdl/papyrus/treeView.css" />
		
		<link rel="stylesheet" type="text/css" href="css/dateChooser/datechooser.css">
		<!--[if lte IE 6.5]>
		<link rel="stylesheet" type="text/css" href="css/dateChooser/select-free.css"/>
		<![endif]-->
	</cfif>
	<link rel="stylesheet" type="text/css" href="css/yahoo/assets/logger.css" />
	<!-- end stylesheets -->
	
	
	<!-- IE dependent stylesheets and scripts -->
	<!--[if lte IE 6]>
	<link rel="stylesheet" media="all" type="text/css" href="css/menu/menu_ie.css" />
	<link rel="stylesheet" media="all" type="text/css" href="css/layout_ie.css" />
	<script type="text/javascript" src="scripts/followMe_ie.js"></script>

	<![endif]-->
	
	<!-- dependent scripts -->
	
	<!-- addLoadEvent -->
	<script type="text/javascript" src="scripts/loadEvent.js"></script>
	<!-- end addLoadEvent -->
	
	<!-- nifty corners -->
	<script type="text/javascript" src="scripts/niftyCorners/nifty.js"></script>
	<!-- end nifty corners -->
	
	<!-- yahoo -->
	<script type="text/javascript" src="scripts/yahoo/yahoo/yahoo.js"></script>
	<script type="text/javascript" src="scripts/yahoo/event/event.js"></script>
	<script type="text/javascript" src="scripts/yahoo/dom/dom.js"></script>
	<script type="text/javascript" src="scripts/yahoo/dragdrop/dragdrop.js"></script>
	<script type="text/javascript" src="scripts/yahoo/animation/animation.js"></script>
	<script type="text/javascript" src="scripts/yahoo/container/container.js"></script>
	<script type="text/javascript" src="scripts/yahoo/connection/connection.js"></script>
	<script type="text/javascript" src="scripts/yahoo/logger/logger.js"></script>
	<script type="text/javascript" src="scripts/yahoo/menu/menu-yui-0112.js"></script>
	<script type="text/javascript" src="scripts/yahoo/treeview/treeview.js"></script>
	<script type="text/javascript" src="scripts/yahoo/effects/PanelEffect.js"></script>
	<!-- end yahoo -->
	
	<!-- accordian menu -->
	<script type="text/javascript" src="scripts/accordionMenu/accordionMenu2.js"></script>
	<!-- end accordian menu -->
	
	<!-- menu factory -->
	<!-- <script type="text/javascript" src="scripts/menuFactory/menuFactory.js"></script> -->
	<!-- end menu factory -->
	
	<!-- PDL JavaScript Library -->
	<script type="text/javascript" src="scripts/pdl/pdl/pdl.js"></script>
	<!-- end PDL JavaScript Library -->
	
	<!-- followMe, using yahoo overlays for IE z-index fixes -->
	<script type="text/javascript" src="scripts/pdl/followMe/followMe.js"></script>
	<!-- end followMe -->
	
	<!--  Overlays for elements requiring proper layout properties -->
	<script type="text/javascript" src="scripts/pdl/overlays/overlays.js"></script>
	<!--  end Overlays -->
	
	<!--  InfoBox  -->
	<script type="text/javascript" src="scripts/pdl/infoBox/infoBox.js"></script>
	<!--  end InfoBox -->
	
	<!--  Dashboard -->
	<!--  <script type="text/javascript" src="scripts/pdl/dashboard/dashboard.js"></script>  -->
	<!--  end Dashboard -->
		
	<!--  Search Box  -->
	<script type="text/javascript" src="scripts/pdl/searchBox/searchBox.js"></script> 
	<!--  end Search Manager -->
	
	<!--  Bookmarks  -->
	<script type="text/javascript" src="scripts/pdl/bookmarks/bookmarks.js"></script>
	<!--  end Bookmarks -->
	
	<!--  Markup Factory  -->
	<script type="text/javascript" src="scripts/pdl/markupfactory/markupfactory.js"></script>
	<!--  end Markup Factory -->
	
	<!--  SWFObject  -->
	<script type="text/javascript" src="scripts/swfObject/swfobject.js"></script>
	<!--  end SWFObject  -->
	
	<!--  Video Dialog -->
	<script type="text/javascript" src="scripts/pdl/videoDialog/videoDialog.js"></script>
	<!--  end Video Dialog -->
		
	<cfif viewState.getValue("userHasPageRights") is true>
		<cfif IsQuery(pageInformation)>
			<cfset jSectionRowID = pageInformation.SectionRowID />
			<cfset jUserRowID = userstruct.getUserRowID() />
			<script type="text/javascript">
				<cfoutput>
				var pageSettings= new Object();
				pageSettings.pagerowid = '#viewState.getValue( "pid" )#';
				pageSettings.sectionrowid = '#jSectionRowID#';
				pageSettings.userrowid = '#jUserRowID#';
				pageSettings.privacylevelrowid = '861243D0-BDB0-5FBB-93E5339C6A4E51DB';
				pageSettings.containertyperowid = '86153091-BDB0-5FBB-9FB15F6E76AC23E5';
				pageSettings.pageCached = '#viewState.getValue( "cached" )#';
				</cfoutput>
			</script>
		</cfif>
		
		<!--  Papyrus Editing Tools  -->
		
		<script type="text/javascript" src="scripts/pdl/json/json.js"></script>
		<script type="text/javascript" src="scripts/pdl/contextMenu/contextMenu.js"></script>
		<script type="text/javascript" src="scripts/pdl/dataprovider/dataprovider.js"></script>
		
		<script type="text/javascript" src="scripts/pdl/papyrus/papyrus.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/business/connectionManager.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/vo/beanfactory.js"></script>
 		
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/helper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/collectionhelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/containerhelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/documenthelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/htmlhelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/imagehelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/linkhelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/treehelper.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/helpers/pagecontainerstreehelper.js"></script>
		
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlghelp.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgeditor.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgcontainer.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgcollection.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlghtml.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgimage.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlglink.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgdocument.js"></script>
		<script type="text/javascript" src="scripts/pdl/papyrus/views/dlgtree.js"></script>
		
		<!--  end Papyrus  -->
		
		<!--  dateChooser -->
		<script src="scripts/dateChooser/date-functions.js" type="text/javascript"></script>
		<script src="scripts/dateChooser/datechooser.js" type="text/javascript"></script>
		<!--  end dateChooser -->
		
		<!--  tinymce editor  -->
		<script type="text/javascript" src="scripts/tinymce/jscripts/tiny_mce/tiny_mce_src.js"></script>
		<!--  end tinymce  -->
		
	</cfif>
	
	<!-- end dependent scripts -->

	<!-- gracefully load functionality -->
	<script type="text/javascript" src="scripts/loadPage.js"></script>
	<!-- end gracefully load functionality -->
	
	<!-- load roster data -->
	<script type="text/javascript">
	
	<cfif viewState.getValue( "rosterJSON", "" ) NEQ "[]" >
		
	var <cfoutput>#toScript( viewState.getValue( "rosterInfoJSON" ), "PDL_ROSTER_DATA")#;</cfoutput>
	var PDL_ROSTER_DATA = eval( '(' + PDL_ROSTER_DATA + ')' );
	
	<cfelse>
	
	var PDL_ROSTER_DATA = { contacts : { results : [] } };
		
	</cfif>
	
	</script>
	<!-- end load roster data -->
	
</head>

<body>
	<div id="container">
	
		<div id="login" class="loginText">
			<div id="loginLoginName">				
				Logged In: <strong><cfoutput>#userstruct.getUserFullName()#</cfoutput></strong>
			</div>
			<div id="loginLoginActions">
				[<a href="?event=logout">Log Out</a>]
			</div>
		</div>
		
		<div id="headerContainer">
		 	<div id="headerOuter">
				<div id="headerOuterContent">
					<div id="headerInner">
						<div id="headerInnerContent">
							<!-- start headercontent -->												
							<div id="headerTop">
								<a href="index.cfm"><img id="logo" src="img/logo_rgb.gif" alt="logo" /></a>
								<div id="menuFloat"><div id="mainNav">
									<cfif viewCollection.exists("menu")>
										<cfoutput>#viewCollection.getView("menu")#</cfoutput>
									</cfif>
								</div></div>
							</div> <!-- end headercontent -->
							<div id="headerMiddle"></div> <!-- end headerMiddle -->
							<div id="headerBottom">
								<div id="searchOuter">
									<div id="searchContent">&nbsp;&nbsp;Search Site: <input class="search" name="intranetSearchField" id="intranetSearchField" type="text" size="20" value="keywords" autocomplete="off" />&nbsp;&nbsp;<input type="image" src="img/grey_arrow.gif" name="submit" value="submit" />&nbsp;&nbsp;&nbsp;Search Roster: <input class="search" id="rosterSearchField" name="rosterSearchField" type="text" size="20" value="first or last name" autocomplete="off" />&nbsp;&nbsp;<img src="img/grey_arrow.gif" alt="arrow" />&nbsp;&nbsp;</div> <!-- end searchContent -->
								</div> <!-- end searchOuter -->
							</div> <!-- end headerBottom -->
							<!-- end headerInnerContent -->
						</div> 
					</div>
				</div>
			</div>
		</div> 
	
		<div id="wrapper">
		
		<div id="sidebarLeftContainer">
		
			<div id="sidebarLeftOuter">
				<div id="sidebarLeftOuterContent">
					<div id="sidebarLeftInner">
						<div id="sidebarLeftContent">
							<div id="sidebarLeftHeading">
							&nbsp;My Toolbox
							</div>
							<div id="sidebarLeftContentContainer">
								<cfif viewCollection.exists("sidebar_toolbox")>
									<cfoutput>#viewCollection.getView("sidebar_toolbox")#</cfoutput>
								</cfif>
							</div>
							<div id="sidebarLeftContentFooter"></div>
						</div>
					</div>
				</div>
			</div>
			
			<cfif viewState.getValue("userHasPageRights") is true>
				<cfif viewCollection.exists("sidebar_papyrus")>
					<cfoutput>#viewCollection.getView("sidebar_papyrus")#</cfoutput>
				</cfif>
			</cfif>
			
		</div>
		
		<div id="contentContainer">
			<div id="contentOuter">
				<div id="contentOuterContent">
					<cfif viewState.exists("pageheaderstyle")>
						<cfoutput>
						<div id="content#viewState.getValue("pageheaderstyle")#Inner">
							<div id="content#viewState.getValue("pageheaderstyle")#Content">
						</cfoutput>
					<cfelse>
						<div id="contentInner">
							<div id="contentContent">
					</cfif>	
							<cfif viewCollection.exists("header")>
								<cfoutput>#viewCollection.getView("header")#</cfoutput>
							</cfif>	
							<div id="contentContentContainer">
								<cfif viewCollection.exists("content")>
									<cfoutput>#viewCollection.getView("content")#</cfoutput>
								</cfif>			
							</div>
							<div id="contentContentFooter"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="sidebarRightContainer">
			
			
			<cfif viewCollection.exists("sidebar_pageheading")>
				<cfoutput>#viewCollection.getView("sidebar_pageheading")#</cfoutput>
			</cfif>	
			
			
			<cfif viewCollection.exists("sidebar_lookingfor")>
				<cfoutput>#viewCollection.getView("sidebar_lookingfor")#</cfoutput>
			</cfif>	
			
		
		</div>
		
		</div>
			
		<cfif viewCollection.exists( "footer" ) >
			<cfoutput>#viewCollection.getView( "footer" )#</cfoutput>
		</cfif>
		
	</div>
	<div id="cmsDialog"></div>
	<div id="videoDialog" style="overflow:hidden;position:relative;"></div>
</body>
</html>
<!---
<cfoutput>#createUUID()#<br>userrowid: #userstruct.getUserRowID()#</cfoutput>
<cfdump var="#session#">
 --->