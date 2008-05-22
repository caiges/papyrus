<cfsilent>
	<cfif viewstate.exists("session_userstruct")>
		<cfset userstruct = viewstate.getValue("session_userstruct") />
	</cfif>
	<cfif viewstate.exists("sid")>
		<cfset sid = viewstate.getValue("sid") />
	<cfelse>
		<cfset sid = "" />
	</cfif>
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
	<script type="text/javascript" src="scripts/yahoo/yahoo-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/event-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/dom-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/animation-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/container-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/connection-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/dragdrop-min.js"></script>
	<script type="text/javascript" src="scripts/yahoo/logger-min.js"></script>
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
			<cfif viewstate.exists("session_userstruct")>
			<div id="loginLoginName">				
				Logged In: <strong><cfoutput>#userstruct.getUserFullName()#</cfoutput></strong>
			</div>
			<div id="loginLoginActions">
				[<a href="?event=logout">Log Out</a>] [<a href="#">My Profile</a>]
			</div>
			<cfelse>
			<div id="loginLoginActions">
				[<a href="?event=login">Login / Register</a>]&nbsp;&nbsp;[<a href="?event=recoverUserLoginRequest">Forgot Login?</a>]
			</div>
			</cfif>
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
		</div>
		
		<div id="contentContainer">
			<div id="contentOuter">
				<div id="contentOuterContent">
					<div id="contentInner">
						<div id="contentContent">
							
								<cfif viewstate.exists("pid")>
									<cfinclude template="../views/static/#Replace(viewstate.getValue("pid"),".","/","all")#.cfm" />
								</cfif>
								
							
							<div id="contentContentFooter"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
				
		<div id="sidebarRightContainer">
			
		</div>
		
		</div>
			
		<cfif viewCollection.exists( "footer" ) >
			<cfoutput>#viewCollection.getView( "footer" )#</cfoutput>
		</cfif>
		
	</div>

</body>
</html>