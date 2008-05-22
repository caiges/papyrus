<cfif viewstate.exists("serverSettings")>
	<cfset serverSettings = viewstate.getValue("serverSettings") />
</cfif>
<cfif viewstate.exists("downloadfile")>
	<cfset fileinfo = viewstate.getValue("downloadfile") />
	
	<cfheader name="Content-Disposition" value='attachment; filename="#fileinfo.getfilename()#"'>
	<cfcontent type="Application/Unknown" file="#serverSettings.getRootPath()#\#fileinfo.getFilepath()#\#fileinfo.getFilename()#">
	<cfabort>
</cfif>
