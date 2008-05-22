<cfsilent>
	<cfset serverSettings = #viewState.getValue("serverSettings")# />
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
				[<a href="?event=logout">Log Out</a>]
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
									<div id="searchContent">&nbsp;&nbsp;Search Site: <input class="search" name="intranetSearchField" id="intranetSearchField" type="text" size="20" value="keywords" autocomplete="off" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search Roster: <input class="search" id="rosterSearchField" name="rosterSearchField" type="text" size="20" value="first or last name" autocomplete="off" disabled />&nbsp;&nbsp;&nbsp;&nbsp;</div> <!-- end searchContent -->
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
			
			<!---<div id="contentBannerAdOuter">
				<div id="contentBannerAdOuterContent">
					<div id="contentBannerAdInner">
						<div id="contentBannerAdContent">
							<div id="contentBannerAdContentHeader"></div>
							<div id="contentBannerAdContentContainer"><a href="http://www.waterford.org/bestpractices" target="_blank"><img src="img\banner_wfbestpractices07.jpg" alt="Waterford Best Practices Conference '07" border="0" /></a></div>
							<div id="contentBannerAdContentFooter"></div>
						</div>
					</div>
				</div>
			</div>--->

			<!---
			<div id="contentIntranetTourOuter">
				<div id="contentIntranetTourOuterContent">
					<div id="contentIntranetTourInner">
						<div id="contentIntranetTourContent">
							<div id="contentHeading">
								Take a Tour of the New Intranet
							</div>
							<div id="contentIntranetTourContentContainer">
								<table cellpadding="10" cellspacing="0" border="0" width="100%" height="100%">
									<tr>
										<td width="25%" style="color:white;" valign="top">
											<img src="img/intranettourthumbnail.gif" alt="Intranet Tour Icon" />
										</td>
										<td width="75%" style="background-color:white;" valign="top">
											<p><strong><a href="views/static/homepage/PDL Intranet - Personalized Login Tutorial.htm" target="_blank">Tutorial 1 - Personalized Logins</a></strong><br />This tutorial shows you how to create your own login for the PDL Intranet.  It also shows you how the My Bookmarks and My Recent Downloads work.</p>
											<p><strong><a href="views/static/homepage/PDL Intranet - User Interface Tutorial.htm" target="_blank">Tutorial 2 - User Interface</a></strong><br /><span class="subtext">In this tutorial you'll learn about the new features of the intranet user interface and we'll show you how to use the new search engine and searchable roster.</p>
											<p class="subtext">Can't find something? <a href="http://intranet-old.pearsondigital.com" target="_blank">http://intranet<strong>-old</strong>.pearsondigital.com</a><br />
											Need help or have a suggestion? <a href="mailto:josh.grauer@pearson.com; caige.nash@pearson.com; britton.halle@pearson.com?subject=Intranet help">Contact the web team</a></p>
										</td>
									</tr>
								</table>
							</div>
							<div id="contentIntranetTourContentFooter"></div>
						</div>
					</div>
				</div>
			</div>
			--->
			
			<div id="contentNewsOuter">
				<div id="contentNewsOuterContent">
					<div id="contentNewsInner">
						<div id="contentNewsContent">
							<div id="contentHeading">
								News and Announcements
							</div>
							<div id="contentNewsContentContainer">
								<table cellpadding="10" cellspacing="0" border="0" width="100%">
									<tr>
										<td width="65%" bgcolor="white" valign="top">
											<table>
											<tr>
												<td bgcolor="white">
													<table cellspacing="5">
                                                    <!--- <tr>
                                                        <td valign="top"><img src="img/homepage/pearson.gif" /></td>
                                                        <td><strong>National Sales Meeting</strong><br />July 17th - 20th, 2007<br />Orlando, Florida<br /><br />The agenda is now<br /><a href="views/static/homepage/NSM7.07DigitalAgenda.xls">available</a>&nbsp;<img style="vertical-align: middle;" src="img/page_white_excel.gif" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2"><br /></td>
                                                    </tr> --->
                                                    <!--<tr>
                                                        <td valign="top"><img src="img/homepage/pearson.gif" /></td>
                                                        <td><strong>All Scottsdale / Mesa Curriculum Employees Save The Date!</strong><br />We will have a Curriculum update meeting for ALL Scottsdale and Mesa Curriculum employees at the Mesa Convention Center Thursday, July 26.  Plan on arriving at noon for lunch followed by an afternoon meeting.    If you are unable to attend, please email:<br /><a href="mailto:tricia.larson@pearson.com">Tricia Larson</a>&nbsp;<a href="javascript:;" onclick="PDL.widget.SearchBoxPlugins.Finder.find( 'tricia.larson@pearson.com' );"><img src="img/vcard.gif" style="vertical-align: middle;" /></a><br />Thank you and see you then!<br /><br />The agenda is now<br /><a href="views/static/homepage/mesa_curriculum_meeting_20070726/mesa_curriculum_meeting_agenda_20070726.ppt">available</a>&nbsp;<img style="vertical-align: middle;" src="img/page_white_powerpoint.gif" /></td>
                                                    </tr> 
                                                    <tr>
                                                        <td colspan="2"><br /></td>
                                                    </tr>-->
													<!---<tr>
														<td colspan="2"><strong>Intranet Unavailable</strong><br />The Intranet will be unavailable December 7th, during the Chandler office move. It will be available by December 10th.<br /><br /></td>
													</tr>--->
                                                    <tr>
                                                        <td><a href="http://intranet.pearsondigital.com/?event=page&pid=273DEE4F-1422-7C78-71887AC5F60C3580"><img src="img/homepage/funding_finder.jpg" style="border: 1px solid #d2d2d2;" /></a></td>
                                                        <td><strong>The Funding Finder</strong><br />Introducing a new resource to help you create a customized list of potential funding sources for any customer!</td>
                                                    </tr>
                                                    <!---<tr>
                                                        <td colspan="2"><br /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><a href="http://www.pearsondigital.com/2007pdlconf/" target="_blank" title="2007 PDL Users' Conference"><img src="img/homepage/2007_pdl_users_conference.gif" /></a></td>
                                                        <td nowrap="nowrap"><strong>PDL Users' Conference</strong><br />
October 17th - 19th, 2007<br />
Omni Interlocken<br />Denver, Colorado</td>
													</tr>--->
													</table>
												</td>
											</tr>
											</table>
										</td>
										<td width="35%" style="color:white;" valign="top">
											<table>
											<tr>
												<td>
													<b>This Week</b>
													<!---<br /><br />
													<a href="javascript:;" onClick="PDL.util.Window.openWindow('views/static/homepage/weekly_update/weekly_update_20070727.html','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Bob's Weekly Update</a>
													<br />
													<span class="subtext">July 26th, 2007</span>--->
													<br /><br />
													<a href="javascript:;" onClick="PDL.util.Window.openWindow('views/static/marketing/theweekly/071206.htm','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">The Weekly</a>
													<br />
													<span class="subtext">December 6th, 2007</span>
													<br /><br />
<a href="javascript:;" onClick="PDL.util.Window.openWindow('views/static/marketing/azfacilityupdate/July_26_AZ_facility_update.pdf','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">AZ Facility Update </a>
													<br />
													<span class="subtext">July 26th,2007</span>
													<br /><br />
													<strong><span class="subtext"></span></strong>
													<ul style="margin-left: 0px;padding-left: 20px;line-height: 15px;">
														
													</ul>
												</td>
											</tr>
										</table>
										</td>
									</tr>
									<!---<tr>
										<td bgcolor="white">
											<strong><a href="/blogs/read/">PDL Read for the Record Blog</a></strong><br /><br />
											<span class="subtext">On August 24, PDL employees joined children and adults all across the country as they read Watty Piper's The Little Engine that Could as part of Jumpstart's Read for the Record campaign.  Check out the <a href="/blogs/read/">blog</a> to read and share your experience or thoughts on Read for the Record.</span>
										</td>
									</tr>--->
								</table>
							</div>
							<div id="contentNewsContentFooter"></div>
						</div>
					</div>
				</div>
			</div>

			<!---<div id="contentNewsOuter">
				<div id="contentNewsOuterContent">
					<div id="contentNewsInner">
						<div id="contentNewsContent">
							<div id="contentHeading">
								News and Announcements
							</div>
							<div id="contentNewsContentContainer">
								<table cellpadding="10" cellspacing="0" border="0" width="100%">
									<tr>
										<td width="65%" bgcolor="white">
											<strong><a href="http://intranet.pearsondigital.com/views/static/marketing/2007winterconference/" target="_blank">Register Today! - PDL Winter Conference '07</a></strong><br /><br /><br />
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td width="55%" valign="top"><a href="/views/static/marketing/2007winterconference/" target="_blank"><img src="img/logo-2007WC_final.gif" border="0" alt="2007 Winter Conference Registration" /></a></td>
													<td width="45%">
														<span class="subtext"><strong>PDL Winter Conference</strong><br />January 16 - 20, 2007<br />The Wyndham Hotel<br />Phoenix, AZ</span>
													</td>
												</tr>
											</table>
										</td>
										<td rowspan="6" width="35%" style="color:white;" valign="top">
											<b>This Week</b>
											<br /><br />
											<a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>docs/homepage/bobs_emails/WeeklyUpdate-December152006.htm','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Bob's Weekly Update</a>
											<br />
											<span class="subtext">December 15, 2006</span>
											<br /><br />
											<a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">The Weekly</a>
											<br />
											<span class="subtext">December 15, 2006</span>
											<br /><br />
											<strong><span class="subtext">This Week's Headlines</span></strong>
											<ul>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor1','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Pearson Digital Learning's Winter Conference</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor2','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Call for Presenters - Deadline Extended!</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor3','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Corporate Executive Briefing Reminder</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor4','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">Waterford TRC Slick Now Available for Download!</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor5','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;"># 2007 Waterford Best Practices Conference Highlights Agendas are Ready!</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor6','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">SME and MCS2 Update for December</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor7','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">SME Customer Letter</a></span></li>
												<li><span class="subtext"><a href="javascript:;" onClick="PDL.util.Window.openWindow('<cfoutput>#serverSettings.getOldDomain()#</cfoutput>theweekly/Weekly12_15_06.htm#anchor8','scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');" style="color:white;">We Are Hiring!</a></span></li>
											</ul>
										</td>
									</tr>
									<tr>
										<td bgcolor="white">
											<strong><a href="/blogs/read/">PDL Read for the Record Blog</a></strong><br /><br />
											<span class="subtext">On August 24, PDL employees joined children and adults all across the country as they read Watty Piper's The Little Engine that Could as part of Jumpstart's Read for the Record campaign.  Check out the <a href="/blogs/read/">blog</a> to read and share your experience or thoughts on Read for the Record.</span>
										</td>
									</tr>
								</table>
							</div>
							<div id="contentNewsContentFooter"></div>
						</div>
					</div>
				</div>
			</div>--->
			
			<div id="contentRecentOuter">
				<div id="contentRecentOuterContent">
					<div id="contentRecentInner">
						<div id="contentRecentContent">
							<div id="contentHeading">
								<table cellpadding="0" cellspacing="0" border="0" width="100%">
									<tr>
										<td>Recent Additions</td>
										<td class="filter" align="right"><strong>Filter by Section:</strong>
											<select name="filterRecent" onchange="location='?event=home&sid='+this.value;">
												<option value="ALL">All Sections</option>
												<option value="27CD07F4-1422-7C78-71625F9D2578F2EE" <cfif sid is '27CD07F4-1422-7C78-71625F9D2578F2EE'> selected</cfif>>Competitive Intelligence</option>
												<option value="27B4FD51-1422-7C78-71123725B9122F91" <cfif sid is '27B4FD51-1422-7C78-71123725B9122F91'> selected</cfif>>Financial & Field Ops</option>	
												<option value="2200162A-1422-7C78-717FA16A273A29FB" <cfif sid is '2200162A-1422-7C78-717FA16A273A29FB'> selected</cfif>>Instructional Services</option>									
												<option value="133761D9-BDB0-5FBB-97D84524B51ABA1B" <cfif sid is '133761D9-BDB0-5FBB-97D84524B51ABA1B'> selected</cfif>>Internal Support</option>	
												<option value="2D419430-1422-7C78-718C12DEC1096DA8" <cfif sid is '2D419430-1422-7C78-718C12DEC1096DA8'> selected</cfif>>Product News & Info</option>											
												<option value="27D35A6B-1422-7C78-7105EC766015FEB1" <cfif sid is '27D35A6B-1422-7C78-7105EC766015FEB1'> selected</cfif>>Product Research</option>
												<option value="F2E44644-1422-7C78-713D5314A7EDBED5" <cfif sid is 'F2E44644-1422-7C78-713D5314A7EDBED5'> selected</cfif>>Marketing</option>
												<option value="22936F40-1422-7C78-7139BED6EA5501FF" <cfif sid is '22936F40-1422-7C78-7139BED6EA5501FF'> selected</cfif>>Support & Engineering</option>																							
											</select>
										</td>
									</tr>
								</table>
							</div>
							
							
							<div id="contentRecentContentContainer">
							<div id="content_1">							
							<p>These are the last 10 downloads to be added to the intranet.  Use the drop-down menu above to filter by section.</p>
							<cfoutput><div id="expandAll_1" class="expandAllLinkContainer"><a id="expandAllLink_1" class="expandAllLink" href="##">Expand All</a></div></cfoutput>
								<cfif viewState.exists("qRecentDocs")>
									<cfset qRecentDocs = viewState.getValue('qRecentDocs') />
									<table class="dataTable">
									<cfoutput query="qRecentDocs">
									<tr <cfif qRecentDocs.currentrow MOD 2 is 0>class="even"<cfelse>class="odd"</cfif> id="dl_#qRecentDocs.id#">
										<td class="downloadName"><a href="?event=file&fid=#ListLast(qRecentDocs.id,"_")#"><cfif len(qRecentDocs.name) gt 50>#left(trim(qRecentDocs.name), 50)#...<cfelse>#trim(qRecentDocs.name)#</cfif></a>&nbsp;&nbsp;<cfif DateDiff('ww',qRecentDocs.createddate,DateAdd('ww',-2,now())) LTE 2><img src="img/new.gif" alt="new" title="Updated within the last 2 weeks!"/></cfif></td>
										<td class="downloadDate">#DateFormat(qRecentDocs.createddate,'mm/dd/yy')#</td>
										<td class="downloadIcons">
											<cfswitch expression="#ListLast(qRecentDocs.filename,'.')#">
												<cfcase value="pdf">
													<a class="tooltip" href="javascript:;"><img src="img/page_white_acrobat.gif" /><span>Adobe Acrobat Document</span></a>
												</cfcase>
												<cfcase value="doc,dot,rtf">
													<a class="tooltip" href="javascript:;"><img src="img/page_white_word.gif" /><span>Microsoft Word Document</span></a>
												</cfcase>
												<cfcase value="xls">
													<a class="tooltip" href="javascript:;"><img src="img/page_white_excel.gif" /><span>Microsoft Excel Document</span></a>
												</cfcase>
												<cfcase value="ppt">
													<a class="tooltip" href="javascript:;"><img src="img/page_white_powerpoint.gif" /><span>Microsoft PowerPoint Document</span></a>
												</cfcase>		
												<cfcase value="rm,wmv,mov,asf">
													<a class="tooltip" href="javascript:;"><img src="img/page_white_cd.gif" /><span>Video</span></a>
												</cfcase>
												<cfdefaultcase>
													<img src="img/page_white_put.gif" alt="Download" />
												</cfdefaultcase>								
											</cfswitch>
											
											
											&nbsp;&nbsp;&nbsp;<a class="tooltip" href="javascript:;"><cfif qRecentDocs.isinternal><img src="img/lock.gif" alt="lock" /><span>Internal use only.</span><cfelse><img src="img/world.gif" alt="world" /><span>Customer facing.</span></cfif></a>&nbsp;&nbsp;&nbsp;<a href="" id="dll_#qRecentDocs.rowid#" class="downloadDetail"><cfif len(qRecentDocs.thumbnail)><img border="0" src="img/page_white_magnify.gif" alt="Download Details" /><cfelse><img border="0" src="img/page_white_magnify.gif" alt="Download Details" /></cfif></a></td>
									</tr>
									
									<tr id="infoBoxRow_#qRecentDocs.rowid#" class="infoBoxRow">
										<td colspan="3" class="infoBoxCell">
											<table class="infoBoxTable" id="infoBoxTable_#qRecentDocs.rowid#">
											<cfif len(qRecentDocs.thumbnail) gt 0>
											<tr>
												<td class="infoBoxDocThumbnailCell"><img class="infoBoxDocThumbnail" src="#qRecentDocs.thumbnail#"></td>
												<td class="infoBoxDocDetailsCell">
													<table>
													<tr>
														<td><span class="infoBoxField">File Size:</span> <span class="infoBoxFieldData">#Round(qRecentDocs.size/1024)# KB</span></td>
														<td><span class="infoBoxField">Posted By:</span> <span class="infoBoxFieldData">#qRecentDocs.createdby#</span></td>
													</tr>
													<tr>
														<td><span class="infoBoxField">First Posted:</span> <span class="infoBoxFieldData">#DateFormat(qRecentDocs.createddate,'mm/dd/yy')#</span></td>
														<td><span class="infoBoxField">Last Updated:</span> <span class="infoBoxFieldData">N/A</span></td>
													</tr>
													<tr>
														<td id="infoBoxDocDescriptionCell" colspan="2"><div class="infoBoxDescription">#qRecentDocs.description#</div></td>
													</tr>
													</table>
												</td>
											</tr>
											<cfelse>
											<tr>
												<td><span class="infoBoxField">File Size:</span> <span class="infoBoxFieldData">#Round(qRecentDocs.size/1024)# KB</span></td>
												<td><span class="infoBoxField">First Posted:</span> <span class="infoBoxFieldData">#DateFormat(qRecentDocs.createddate,'mm/dd/yy')#</span></td>
												<td><span class="infoBoxField">Last Updated:</span> <span class="infoBoxFieldData">N/A</span></td>
												<td><span class="infoBoxField">Posted By:</span> <span class="infoBoxFieldData">#qRecentDocs.createdby#</span></td>
											</tr>
											<tr class="infoBoxDescription">
												<td colspan="4"><cfif len(qRecentDocs.description) is 0>#qRecentDocs.name#<cfelse>#qRecentDocs.description#</cfif></td>
											</tr>
											</cfif>
											</table>
										</td>
									</tr>
									</cfoutput>
									
									</table>
									<cfif qRecentDocs.recordcount is 0>
										There are currently no recent additions!
									</cfif>
								</cfif>
							</div>
							</div>
							
							
							<div id="contentRecentContentFooter"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="sidebarRightContainer">
			
			<cfif viewCollection.exists("sidebar_financial")>
				<cfoutput>#viewCollection.getView("sidebar_financial")#</cfoutput>
			</cfif>	
			
		</div>
		
		</div>
			
		<cfif viewCollection.exists( "footer" ) >
			<cfoutput>#viewCollection.getView( "footer" )#</cfoutput>
		</cfif>
	
	</div>

</body>
</html>