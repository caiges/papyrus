<cfif viewState.exists("kbSearchResults")>
	<cfset kbSearchResults = "#viewState.getValue("kbSearchResults")#" />
	<table cellspacing="0" cellpadding="0" border="0">
		<tr height="20">
			<td colspan="2"><hr width="100%" noshade="noshade" size="1" /></td>
		</tr>
		<tr height="40">
			<td colspan="2"><strong>Search Results</strong></td>
		</tr>
		<cfif kbSearchResults.RecordCount GT 0>
			<cfoutput query="kbSearchResults">
				<tr height="20">
					<td width="60%"><a href="?event=knowledgebase.article&kbarticleid=#key#">#title#</a></td>
					<td width="40%" align="right"><strong>#custom2#</strong></td>
				</tr>
				<tr height="20">
					<td colspan="2">#wrap( context, 78 )#</td>
				</tr>
				<tr height="20">
					<td colspan="2" class="subtext"><strong>Keywords:</strong> #custom3#</td>
				</tr>
				<tr height="20">
					<td colspan="2">&nbsp;</td>
				</tr>
			</cfoutput>
		<cfelse>
			<tr>
				<td>No results were found.</td>
			</tr>
		</cfif>
	</table>
</cfif>