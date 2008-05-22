<cfsetting showdebugoutput="false">

<cfapplication name="cfcdocumenter_1">

<cfparam name="application.queryStore" default="#structNew()#">

<cfparam name="application.initialized" default="false">

<cfif isDefined('url.refresh')>
	<cfset application.initialized = false>
</cfif>

<cfif not application.initialized>

	<cfset basePath = expandPath('./')>

	<cffile action="read" file="#basePath#/config.xml" variable="config">

	<cfset  configXML = xmlParse(config)>

	<cfset application.revealCode = trim(configXML.config.revealCode.xmlText)>
	<cfset application.showRootPath = trim(configXML.config.showRootPath.xmlText)>
	<cfset application.paths = arrayNew(1)>
	<cfloop from="1" to="#arrayLen(configXML.config.root)#" index="i">
		<cfset package = structNew()>
		<cfset package.prefix = trim(configXML.config.root[i].prefix.xmltext)>
		<cfset path = trim(configXML.config.root[i].path.xmltext)>
		<cfif left(path,1) is '.'>
			<cfset package.path = expandPath(path)>
		<cfelse>
			<cfset package.path = path>
		</cfif>
		<cfset arrayAppend(application.paths,package)>
	</cfloop>
	<cfset application.constructorNames = "" />
	<cfloop from="1" to="#arrayLen(configXML.config.constructorname)#" index="i">
		<cfset application.constructorNames = listAppend(application.constructorNames, trim(configXML.config.constructorname[i].xmltext)) />
	</cfloop>

	<cfset application.initialized = true>
</cfif>


<cfset revealCode = application.revealCode>
<cfset showRootPath = application.showRootPath>

<!--- Change the app title to what ever you wish to appear in the title bar of the web browser --->
<cfset apptitle = "CFC Documentation tool">
<cfset paths = application.paths>

<cfparam name="application.pathindex" default="1">

<cfif isDefined('url.pathindex')
	AND isNumeric(url.pathIndex)
	AND url.pathIndex GT 0
	AND url.pathIndex LTE arrayLen(paths)>

	<cfset application.pathIndex = url.pathindex>

</cfif>

<cfif application.pathIndex GT arrayLen(paths)>
	<cfset application.pathIndex = 1>
</cfif>

<cfset rootpath = paths[application.pathIndex].path>

<cfif isDefined('url.refresh')>
	<cfset structDelete(application.querystore,rootpath)>
</cfif>

<cfloop from="1" to="#arrayLen(paths)#" index="i">
  <cfset currentpath = paths[i].path>
  <cfif not structKeyExists(application.queryStore,currentpath)>
  	<cfset application.queryStore[currentpath] = structNew()>
  </cfif>


  <cfset packageRoot = listLast(currentpath,'/\')>

  <cfif server.os.name contains "windows">
  	<cfset directorySeparator = "\">
  <cfelse>
  	<cfset directorySeparator = "/">
  </cfif>

  <cfset fso = createObject('component','FileSystemObject').init(currentpath,directorySeparator)>

  <cfif not structKeyExists(application.queryStore[currentpath],'filequery')>
    <cfset application.queryStore[currentpath].fileQuery = fso.list(true,'*.cfc',paths[i].prefix)>
  </cfif>


</cfloop>



<cfset filequery = application.queryStore[rootpath].filequery>


<cfquery dbtype="query" name="orderedQuery">
SELECT *, LOWER(name) AS lname
FROM fileQuery
ORDER BY lname ASC
</cfquery>

<cfset util = createObject('component','Util').init(rootpath,packageroot,directorySeparator,paths)>

<cfset util.setRootPath(rootpath)>
