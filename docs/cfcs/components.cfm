<cfoutput>
<cfif NOT structKeyExists(url, "package")>
	<strong>All Components</strong><br />
<cfelse>
	<strong>#util.getPackageDisplayName(url.package)#</strong><br>
</cfif>
<cfloop query="orderedQuery">
<cfif NOT structKeyExists(url, "package") OR orderedQuery.package EQ url.package>
<a href="content.cfm?file=#urlEncodedFormat(orderedQuery.fullpath&directorySeparator&orderedQuery.name)#" target="content">#listFirst(orderedQuery.name,'.')#</a><br>
</cfif>
</cfloop>
</cfoutput>