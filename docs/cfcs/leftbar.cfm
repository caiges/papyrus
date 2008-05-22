<cfparam name="url.pathIndex" default="1" />
<cfoutput>
<frameset rows="40%,60%">
	<frame src="packages.cfm?pathIndex=#url.pathIndex#" name="packages"></frame>
	<frame src="components.cfm" name="components"></frame>
</frameset><noframes></noframes>
</cfoutput>