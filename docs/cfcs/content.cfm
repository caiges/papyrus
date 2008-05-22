<cfparam name="url.file" default="#orderedQuery.fullpath##directorySeparator##orderedQuery.name#">

<cfset showtemplate = false>
<cfset pathAllowed = false>

<cfloop from="1" to="#arrayLen(paths)#" index="i">
  <cfif left(url.file,len(paths[i].path)) EQ paths[i].path>
    <cfset pathAllowed = true>
  </cfif>
</cfloop>

<cfif listLast(url.file,'.') is 'cfc' 
	AND pathAllowed
	AND fileExists(url.file)>

	
	<cfset stComponent = util.getCFCInformation(url.file) />
	<cfset showTemplate = structKeyExists(stComponent, "name") />
	
	
</cfif>

<cfif showTemplate>

	<cfinclude template="doctemplate.cfm">

<cfelse>
  <cfinclude template="unknowncomponent.cfm">
</cfif>