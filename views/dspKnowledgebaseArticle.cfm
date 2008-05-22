<cfset kbarticle = #viewState.getValue("kbarticle")# />
<cfset serverSettings = #viewState.getValue("serverSettings")# />

<cfoutput query="kbarticle">
	<table width="100%" cellspacing="0" cellpadding="0" border="0">
		<tr>
			<td colspan="4"><p class="headingTitle">#articletitle#</p></td>
		</tr>
		<tr>
			<td colspan="4">&nbsp;</td>
		</tr>
		<tr>
			<td width="20%"><strong>Article Type:</strong></td>
			<td width="30%">#articletype#</td>
			<td width="20%"><strong>Skill Level:</strong></td>
			<td width="30%">#skilllevelname#</td>
		</tr>
		<tr>
			<td width="20%"><strong>Severity:</strong></td>
			<td width="30%">#severity#</td>
			<td width="20%"><strong>Security:</strong></td>
			<td width="30%"><cfif #security# EQ 0>Public<cfelseif #security# EQ 1>Internal Only</cfif></td>
		</tr>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td colspan="4" class="kbSectionHeading">Summary</td>
		</tr>
		<tr>
			<td colspan="4">&nbsp;</td>
		</tr>
		<tr>
			<td colspan="4">#articlesummary#</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td colspan="4" class="kbSectionHeading">Details</td>
		</tr>
		<tr>
			<td colspan="4">&nbsp;</td>
		</tr>
		<tr>
			<!--- Hack to replace the embedded url links with the old server address --->
			<td colspan="4" id="kbArticleDetails">#wrap( Replace(articlebody, "docs/", "#serverSettings.getOldDomain()#launchpad/knowledgebase/docs/", "all"), 78)#</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
		</tr>
		<tr class="subtext" height="15">
			<td><strong>Article Link:</strong></td>
			<td colspan="3"><a href="http://#serverSettings.getDomain()#/index.cfm?event=knowledgebase.article&kbarticleid=#articleid#">http://#serverSettings.getDomain()#/index.cfm?event=knowledgebase.article&kbarticleid=#articleid#</a></td>
		</tr>
		<tr class="subtext" height="15">
			<td><strong>Author:</strong></td>
			<td>#author#</td>
			<td><strong>Last Updated:</strong></td>
			<td>#DateFormat(reviseddate, "mmmm d, yyyy")#</td>
		</tr>
		<tr class="subtext" height="15">
			<td><strong>Keywords:</strong></td>
			<td>#tags#</td>
			<td><strong>Revision:</strong></td>
			<td>#revision#</td>
		</tr>
	</table>
</cfoutput>