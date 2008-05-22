<cfset pageInformation = viewState.getValue("pageinfo") />

<cfset sSectionRowID = "" />
<cfset sSectionName = "" />
<cfset sParentPageRowID = "" />
<cfset sParentPageName = "" />
<cfset sPageName = "Pearson Digital Learning Intranet" />
<cfif IsQuery(pageInformation)>
	<cfset sSectionRowID = pageInformation.SectionRowID />
	<cfset sSectionName = "#pageInformation.SectionName#" />
	<cfset sParentPageRowID = pageInformation.ParentPageRowID />
	<cfset sParentPageName = "#pageInformation.ParentTitle#" />
	<cfset sPageName = pageInformation.Title />
</cfif>

<cfoutput>
<div id="contentHeading">
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
		<tr>
			<td>
			<!--<span class="location"><a href="?event=sectionhome&sid=#sSectionRowID#">#sSectionName#</a><cfif len(sParentPageRowID)> / <a href="?event=page&pid=#sParentPageRowID#">#sParentPageName#</a></cfif></span><br />--->
			<span class="location">#sSectionName#<cfif len(sParentPageRowID)> / #sParentPageName#</cfif></span><br />
			#sPageName#
			</td>
			<td align="right" valign="top">
				<cfif viewstate.exists("session_userstruct") AND ListContainsNoCase("page.edit,page.read",viewstate.getvalue("event"))>
					<cfset userstruct = viewstate.getValue("session_userstruct") />
					<a class="tooltip" href="javascript:PDL.widget.Bookmark.addUserBookmark('#userstruct.getUserRowID()#','#viewState.getValue('pageinfo').rowid#');location='?event=page&pid=#viewState.getValue('pageinfo').rowid#';"><img src="img/add.gif" border="0"><span>Add to "My Bookmarks"</span></a>&nbsp;
				</cfif>
				<a class="tooltip" href="javascript:window.print();"><img src="img/printer.gif" border="0"><span>Print This Page</span></a>
				&nbsp;
			</td>
		</tr>
	</table>
	
</div>
</cfoutput>