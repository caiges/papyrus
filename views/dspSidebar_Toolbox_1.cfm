<cfsilent>
	<cfset serverSettings = #viewState.getValue("serverSettings")# />
	<cfif viewstate.exists("session_userstruct")>
		<cfset userstruct = viewstate.getValue("session_userstruct") />
	</cfif>
	<cfif viewstate.exists("userbookmarks")>
		<cfset userbookmarks = viewstate.getValue("userbookmarks") />
	</cfif>
	<cfif viewstate.exists("userdownloads")>
		<cfset userdownloads = viewstate.getValue("userdownloads") />
	</cfif>
	<cfset sRefreshURL = "" />
	<cfif viewstate.exists("pid")>
		<cfset sRefreshURL = "?event=page&pid=#viewstate.getValue("pid")#">
	</cfif>
</cfsilent>
<dl class="myToolbox">
	
	<dt class="a-m-t">My Bookmarks</dt>
	<dd class="a-m-d">
	<div class="bd">
		<table class="bookmarkLinksTable">
		<cfif viewstate.exists("session_userstruct")>
			<cfif viewstate.exists("userbookmarks")>
			<cfoutput query="userbookmarks">
			<cfset sCurrentBookmarkName = userbookmarks.PageTitle />
			<cfif len(userbookmarks.PageTitle) gt 20>
				<cfset sCurrentBookmarkName = "#RemoveChars(userbookmarks.PageTitle, 20, len(userbookmarks.PageTitle))# ..." />
			</cfif>
			<tr>
				<td height="20" <cfif userbookmarks.currentrow lt userbookmarks.recordcount>style="border-bottom:1px solid silver;"</cfif>><a href="?event=page&pid=#userbookmarks.PageRowID#" style="text-decoration:none;" title="#userbookmarks.PageTitle#">#sCurrentBookmarkName#</a></td>
				<td align="right" <cfif userbookmarks.currentrow lt userbookmarks.recordcount>style="border-bottom:1px solid silver;"</cfif>><a href="javascript:PDL.widget.Bookmark.removeUserBookmark('#userbookmarks.rowid#');location='#sRefreshURL#';" title="Delete This Bookmark"><img src="img/delete_small.gif" width="12" height="12"></a></td>
			</tr>
			</cfoutput>
			</cfif>
			<cfif userbookmarks.recordcount is 0>
			<tr><td>No current bookmarks</td></tr>
			</cfif>
		<cfelse>
		<tr><td colspan="2">Please <a href="?event=login" style="text-decoration:underline;">Login / Register</a><br/>To Use This Feature</td></tr>
		</cfif>
		</table>
	</div>
	</dd>
	<dt class="a-m-t">My Recent Downloads</dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="downloadLinks">
	<cfif viewstate.exists("session_userstruct")>
		<cfif viewstate.exists("userdownloads")>
			<cfoutput query="userdownloads">
				<cfif userdownloads.currentrow lt userdownloads.recordcount>
					<li>
				<cfelse>
					<li>
				
				</cfif><cfset sCurrentFileTitle = userdownloads.FileTitle />
				<cfif len(userdownloads.FileTitle) gt 25>
					<cfset sCurrentFileTitle = "#RemoveChars(userdownloads.FileTitle, 25, len(userdownloads.FileTitle))# ..."  />
				</cfif>
				<a href="?event=file&fid=#userdownloads.FileRowID#" title="#userdownloads.FileTitle#">#sCurrentFileTitle#</a></li>
			</cfoutput>
			<cfif userdownloads.recordcount is 0>
			<li>No current downloads.</li>
		</cfif>
		</cfif>
	<cfelse>
	<li>Please <a href="?event=login" style="text-decoration:underline;">Login / Register</a><br/>To Use This Feature</li>
	</cfif>
	</ul>
	</div>
	</dd>
	
	<cfif viewState.exists("userPageRights")>
	<cfset q_upp = viewState.getValue("userPageRights") />
	
	<cfif q_upp.recordcount gt 0>
						
	<dt class="a-m-t">My Editable Pages</dt>
	<dd class="a-m-d mytoolbox_editable_pages">
	<div class="bd mytoolbox_editable_pages">
	<ul class="downloadLinks">

		<cfoutput query="q_upp">
			<li><a href="index.cfm?&event=page&pid=#q_upp.pagerowid#">#q_upp.title#</a></li>
		</cfoutput>

	</ul>
	</div>
	</dd>
	</cfif>
	</cfif>
	
	<dt class="a-m-t">Quick Links</dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="sidebarLinks">
		<li>Links to applications and resources found within the PDL Intranet.<br /><br /></li>
		<li class="underline"><a href="javascript:;" onClick="javascript:window.open('http://10.40.213.91/pdlgallery/main.php','galleryWindow','scrollbars=yes,height=1024,width=768,left=50,top=50,status=no,resizable=yes')">Pearson Photo Gallery</a></li>
		<li class="underline"><a href="<cfoutput>#serverSettings.getOldDomain()#</cfoutput>innovationforum/">Innovation Forum</a></li>
		<li class="underline"><a href="<cfoutput>#serverSettings.getOldDomain()#</cfoutput>salesmktg/tools/sr_history.cfm">ESS Search Tool</a></li>
        <li class="underline"><a href="http://uschan-as-013/public/">Top 10 Issues Report</a></li>
		<li class="underline"><a href="?event=page&pid=9D1B7B31-1422-7C78-71C316AACCFF3780">Office Supplies and Services</a></li>
		<li><a href="<cfoutput>#serverSettings.getOldDomain()#</cfoutput>onlinetools/amex.cfm">AMEX Purchase Card</a></li>
	</ul>
	</div>
	</dd>

	<dt class="a-m-t">Online Tools</dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="sidebarLinks">
		<li>Tools and applications available outside of the PDL Intranet.<br /><br /></li>
		<li class="underline"><a href="http://inside.ncspearson.com/inside/ncsapps.shtml" target="_blank">Oracle Apps Logon</a></li>
		<li class="underline"><a href="http://app2.outtask.com/default.asp?host=www.cwt.com" target="_blank">Cliqbook</a></li>
		<li class="underline"><a href="http://pearson.cwtbusinesstravelportal.com/main.asp" target="_blank">Travel Reservations</a></li>
		<li class="underline"><a href="http://webmail.pearson.com/" target="_blank">Microsoft Outlook Webmail</a></li>
		<li class="underline"><a href="http://teams.inside.ncspearson.com/" target="_blank">Inside Teams</a></li>
		<li><a href="https://learn.webex.com/" target="_blank">WebEx</a></li>
	</ul>
	</div>
	</dd>

	<dt class="a-m-t">Other Pearson Sites</dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="sidebarLinks">
		<li><strong>Intranet Sites</strong></li>
		<li class="underline"><a href="http://inside.ncspearson.com/" target="_blank">Inside NCS Pearson</a></li>
        <li class="underline"><a href="http://intranet.pearsontraining.com/training/peopledevelopment/multimedia/Final_Pearson/index.html" target="_blank">Pearson Development Network</a></li>
        <li class="underline"><a href="http://intranet.pearsoned.com/" target="_blank">Pearson Education</a></li>
		<li class="underline"><a href="http://intranet.pearsontopearson.com/" target="_blank">Pearson to Pearson</a></li>
		<li><a href="http://security.insidepearson.com/" target="_blank">Pearson Information Security</a></li>
		<br />
		<li><strong>Public Sites</strong></li>
		<li class="underline"><a href="http://www.pearsondigital.com/" target="_blank">PearsonDigital.com</a></li>
		<li class="underline"><a href="http://www.pearsondigital.com/productsupport/home.cfm" target="_blank">Community Connection</a></li>
		<li class="underline"><a href="http://www.pearsondigital.com/support/webinars/" target="_blank">PDL Class</a></li>
		<li class="underline"><a href="http://nclb.pearsondigital.com/" target="_blank">NCLB.PearsonDigital.com</a></li>
		<li class="underline"><a href="http://www.pearsoned.com" target="_blank">Pearson Education</a></li>
		<li class="underline"><a href="http://www.pearson.com" target="_blank">Pearson</a></li>
		<li><a href="http://pearsonfoundation.org/partnerships/novanet.htm" target="_blank">NovaNET Scholarship Fund</a></li>
	</ul>
	</div>
	</dd>
	
	
	<dt class="a-m-t">Pearson Blogs <img src="img/new.gif" alt="new" title="Check out PDL Blogs"/></dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="sidebarLinks">
    	<li class="underline"><a href="http://intranet.pearsondigital.com/blogs/branding">Branding</a>  <img src="img/new.gif" alt="new" title="Check out PDL Blogs"/></li>
		<li class="underline"><a href="http://intranet.pearsondigital.com/blogs/successmaker">SuccessMaker</a></li>
		<li class="underline"><a href="http://intranet.pearsondigital.com/blogs/systems">Systems Group</a></li>
		<li class="underline"><a href="http://intranet.pearsondigital.com/blogs/sharedplatform">Shared Platform</a></li>
		<li class="underline"><a href="http://intranet.pearsondigital.com/blogs/moversandshakers">Movers & Shakers &<br/>Technology Makers</a></li>
        <li><a href="http://intranet.pearsondigital.com/blogs/waterford">Waterford</a> <img src="img/new.gif" alt="new" title="Check out PDL Blogs"/></li>
	</ul>
	</div>
	</dd>
	

	
	<dt class="a-m-t">BlackBerry Tools</dt>
	<dd class="a-m-d">
	<div class="bd">
	<ul class="sidebarLinks">
		<li class="underline"><a href="http://intranet.pearsondigital.com/index.cfm?event=page&pid=C1BC1D64-1422-7C78-714CA45A36EC08A1">Whiteboard</a></li><!--- #C1BE21DB-1422-7C78-711877CCC57DF2BF --->
	</ul>
	</div>
	</dd>
	

	
</dl>
