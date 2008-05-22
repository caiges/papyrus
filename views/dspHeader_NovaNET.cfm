<cfset pageInformation = viewState.getValue("pageinfo") />

<cfset sSectionRowID = "" />
<cfset sSectionName = "" />
<cfset sParentPageRowID = "" />
<cfset sParentPageName = "" />
<!--- <cfset sPageHeader = "Default" /> --->
<cfset sPageName = "Pearson Digital Learning Intranet" />
<cfif IsQuery(pageInformation)>
	<cfset sSectionRowID = pageInformation.SectionRowID />
	<cfset sSectionName = "#pageInformation.SectionName#" />
	<cfset sParentPageRowID = pageInformation.ParentPageRowID />
	<cfset sParentPageName = "#pageInformation.ParentTitle#" />
	<cfset sPageName = pageInformation.Title />
	<!--- <cfset sPageHeader = pageInformation.HeaderType /> --->
</cfif>

<cfoutput>
<div id="contentHeading">
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
		<tr>
			<td>
			<span class="location"><a href="?event=sectionhome&sid=#sSectionRowID#">#sSectionName#</a><cfif len(sParentPageRowID)> / <a href="?event=page&pid=#sParentPageRowID#">#sParentPageName#</a></cfif></span><br />
			#sPageName#
			</td>
			<td align="right" valign="top">
				<cfif viewstate.exists("session_userstruct") AND ListContainsNoCase("page.edit,page.read",viewstate.getvalue("event"))>
					<cfset userstruct = viewstate.getValue("session_userstruct") />
					<a class="tooltip" href="javascript:PDL.widget.Bookmark.addUserBookmark('#userstruct.getUserRowID()#','#viewState.getValue('pageinfo').rowid#');location='?event=page&pid=#viewState.getValue('pageinfo').rowid#';"><img src="img/add.gif" border="0"><span>Add to "My Bookmarks"</span></a>&nbsp;
				</cfif>
				<a class="tooltip" href="javascript:window.print();"><img src="img/printer.png" border="0"><span>Print this page.</span></a>
				&nbsp;
			</td>
		</tr>
	<!--- <cfswitch expression="#sPageHeader#">
		<cfcase value="Waterford">
			<tr><td colspan="2"></td></tr>
		</cfcase>
		<cfcase value="SuccessMaker">
			<tr><td colspan="2"></td></tr>
		</cfcase>
		<cfcase value="NovaNET">
			<tr><td colspan="2"></td></tr>
		</cfcase>
		<cfcase value="KnowledgeBox">
			<tr><td colspan="2"></td></tr>
		</cfcase>	
	</cfswitch> --->
	</table>
</div>



<div>
<!--- start target table --->
<table cellpadding="2" cellspacing="0" border="0" width="100%" class="location">
	<tr bgcolor="grey" style="color:white;">
		<td align="center" height="20">Product Suites</td>
		<td align="center">Grade Levels</td>
		<td align="center">Target Markets</td>						
	</tr>
	<tr bgcolor="##eeeeee">
		<td align="center" style="border-right:1px solid grey;" valign="top">
			<table cellpadding="2" cellspacing="0" border="0" width="135">
				<tr><td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td><td>Foundations</td></tr>
				<tr><td height="25">&nbsp;</td><td>Achievement</td></tr>
				<tr><td height="25">&nbsp;</td><td>Graduation</td></tr>
			</table>
		</td>
		<td align="center" style="border-right:1px solid grey;" valign="top">
			<table cellpadding="2" cellspacing="0" border="0" width="200">
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>Pre-K</td>
					<td width="30" align="center">&nbsp;</td>
					<td>4th</td>
					<td width="30" align="center">&nbsp;</td>
					<td>9th</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>Kinder</td>
					<td width="30" align="center">&nbsp;</td>
					<td>5th</td>
					<td width="30" align="center">&nbsp;</td>
					<td>10th</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>1st</td>
					<td width="30" align="center">&nbsp;</td>
					<td>6th</td>
					<td width="30" align="center">&nbsp;</td>
					<td>11th</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25">&nbsp;</td>
					<td>2nd</td>
					<td width="30" align="center">&nbsp;</td>
					<td>7th</td>
					<td width="30" align="center">&nbsp;</td>
					<td>12th</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25">&nbsp;</td>
					<td>3rd</td>
					<td width="30" align="center">&nbsp;</td>
					<td>8th</td>
					<td width="30" align="center">&nbsp;</td>
					<td>Adult&nbsp;&nbsp;</td>
				</tr>
			</table>
		</td>
		<td align="center" valign="top">
			<table cellpadding="2" cellspacing="0" border="0" width="235">
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>Pre-K</td>
					<td width="30" align="center"><img src="img/check.gif" alt="check"></td>
					<td>Literacy</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>All-Day K</td>
					<td width="30" align="center"><img src="img/check.gif" alt="check"></td>
					<td>Math</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>Special Ed</td>
					<td width="30" align="center"><img src="img/check.gif" alt="check"></td>
					<td>Science</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>ELL/ESL</td>
					<td width="30" align="center"><img src="img/check.gif" alt="check"></td>
					<td>Gifted/Talented&nbsp;&nbsp;</td>
				</tr>
				<tr>
					<td width="30" align="center" height="25"><img src="img/check.gif" alt="check"></td>
					<td>Intervention</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<!--- end target table --->	
</div>
</cfoutput>
