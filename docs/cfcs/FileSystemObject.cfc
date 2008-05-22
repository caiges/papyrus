<cfcomponent hint="The FileSystemObject component provides methods to access and interact with the filesystem.">

	<cfset variables.rootpath = "">
	<cfset variables.directorySeparator = "">

	<cffunction name="init" access="public" output="false" returnType="FileSystemObject" hint="This method initializes the component setting the root path and directory separator that are used by the other methods.">
		<cfargument name="rootPath" type="string" required="false" default="" />
		<cfargument name="directorySeparator" required="true" type="string" />
		
		<cfset variables.directorySeparator = arguments.directorySeparator>
		<cfif directoryExists(arguments.rootPath) and directoryExists(arguments.rootpath)>
			<cfset variables.rootpath = arguments.rootpath>
		</cfif>
		
		<cfreturn this />
		
	</cffunction>
	
	
	
	<cffunction name="list" access="public" returntype="query" output="false" hint="The list method returns a list of all files in the directory path that match the given filter. It adds fullpath and package columns to the standard query returned by the cfdirectory tag. If the recurse argument is set to true, the method will also return the contents of all sub-directories of the rootpath.">
		<cfargument name="recursive" default="false" type="boolean" />
		<cfargument name="filter" default="" type="string" />
    <cfargument name="prefix" required="yes">
		<cfargument name="path" required="false" default="#variables.rootpath#" />
		
		<cfset var qFiles = "">
		<cfset var qSubDirectoryFiles = "">
		<cfset var aPath = arrayNew(1)>
		<cfset var aPackage = arrayNew(1)>
		<cfset var aQueries = arrayNew(1)>
		<cfset var i = 0>
		<cfset var packageStart = "">
		<cfset var subPath = "">
		<cfset var package = "">
		
		<cfset filter = lcase(replace(arguments.filter,'*','%','all'))>
		
		<cfdirectory action="list" directory="#arguments.path#" name="qFiles">

		<cfif qFiles.recordcount>
		
			<cfset subPath = prefix & directorySeparator & replaceNoCase(arguments.path,variables.rootpath,'')>
			<cfset package = listChangeDelims(subPath,'.','/\')>
		
			<cfset arraySet(aPath,1,qFiles.recordcount,arguments.path)>
			<cfset arraySet(aPackage,1,qFiles.recordcount,package)>
		
		</cfif>
		
		<cfset queryAddColumn(qFiles,'fullpath',aPath)>
		<cfset queryAddColumn(qFiles,'package',aPackage)>
		
		
		<cfif arguments.recursive>
			<cfloop query="qFiles">
				<cfif qFiles.type is 'dir'>
					<cfset arrayAppend(aQueries,this.list(true,arguments.filter,arguments.prefix,arguments.path & variables.directorySeparator & qFiles.name))>
				</cfif>
			</cfloop>
					
			
			<cfloop from="1" to="#arrayLen(aQueries)#" index="i">
				<cfset q = aQueries[i]>
				<cfif q.recordCount>
					<cfquery dbtype="query" name="qFiles">
						SELECT *
						FROM qFiles
						<cfif len(arguments.filter)>
						WHERE LOWER(qFiles.name) LIKE('#filter#')
						</cfif>
	
						UNION
	
						SELECT *
						FROM q
						<cfif len(arguments.filter)>
						WHERE LOWER(q.name) LIKE('#filter#')
						</cfif>
	
						ORDER BY fullpath
					</cfquery>
				</cfif>
			</cfloop>
			
		</cfif>
		
		<cfquery dbtype="query" name="qFiles">
			SELECT *
			FROM qFiles
			<cfif len(arguments.filter)>
				WHERE LOWER(qFiles.name) LIKE('#filter#')
			</cfif>
		</cfquery>
		
		<cfreturn qFiles>
		
	</cffunction>


</cfcomponent>