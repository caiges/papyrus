<cfparam name="url.pathIndex" default="1" />

<cfoutput>
<form style="margin: 0px;">
	Root:
	<select onChange="parent.location='leftbar.cfm?pathIndex='+this.options[this.selectedIndex].value;">
		<cfloop from="1" to="#arrayLen(paths)#" index="i">
			<option value="#i#"<cfif url.pathIndex EQ i> selected="selected"</cfif>>#paths[i].prefix#</option></cfloop>
	</select>
</form>
<br>
<a href="components.cfm" target="components">All Components</a> &nbsp;|&nbsp;
<a href="#cgi.script_name#?refresh=1&pathIndex=#url.pathIndex#">Refresh</a>
<p>
Packages <br>
</cfoutput>
<cfset lastPackage = "">

<cfset tmpquery = application.queryStore[paths[url.pathIndex].path].filequery>
<cfoutput query="tmpquery" group="package">
	<a href="components.cfm?package=#tmpquery.package#&pathindex=#url.pathIndex#" target="components">#util.getPackageDisplayName(tmpquery.package)#</a><br>
</cfoutput>