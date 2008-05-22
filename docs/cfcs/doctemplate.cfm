<!--- <cfdump var="#stComponent#"> --->
<cfscript>
	function generateArgumentList(thisMethod) {
		var result = createObject("java", "java.lang.StringBuffer").init();
		var i = "";
		var argCount = arrayLen(thisMethod.arguments);
		for (i = 1; i LTE argCount; i = i + 1) {
			result.append(generateArgument(thisMethod.arguments[i]));
			if (i LT argCount)
				result.append(",&nbsp;");
		}
		return result.toString();
	}
	function generateArgument(argument) {
		var result = createObject("java", "java.lang.StringBuffer").init();
		if (NOT argument.required)
			result.append("[");
		result.append('<a href="#util.getDetailURL(argument.type,stComponent.path)#">#listLast(argument.type, '.')#</a> #argument.name#');
		if (NOT argument.required) {
			if (structKeyExists(argument, "default")) {
				result.append('="#argument.default#"');
			}
			result.append("]");
		}
		return result.toString();
	}
</cfscript>

<cfset HINT_INDENT = 10 />
<HR>
<!-- ======== START OF CLASS DATA ======== -->
<cfoutput>
<div style="float:left;">
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="float: right; margin-left: 10px;" target="_blank">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but21.gif" border="0" name="submit" alt="Make a paypal donation to help with the development of this and other free software.">
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
">
</form>
<a href="default.cfm" style="float: right;">Documentation home page</a>
</div>
<H2>
<span style="font-size: smaller">
<a href="components.cfm?package=#stComponent.package#&pathindex=#stComponent.pathindex#" target="components">#stComponent.package#</a>
</span>
<BR>
Component #stComponent.name#</H2>
<!--- build up the inheritance hierarchy from bottom to top --->
<cfscript>
	temp = stComponent;
	components = arrayNew(1);
	s = structNew();
	s.package = temp.package;
	s.name = temp.name;
	arrayPrepend(components, s);
	while (structKeyExists(temp, "superComponent")) {
		temp = temp.superComponent;
		s = structNew();
		s.package = temp.package;
		s.name = temp.name;
		arrayPrepend(components, s);
	}
</cfscript>
<PRE>
<cfloop from="1" to="#arrayLen(components) - 1#" index="i"
><A HREF="#util.getDetailURL(components[i].package & '.' & components[i].name, '')#" title="">#util.getPackageDisplayPrefix(components[i].package)##components[i].name#</A>
#repeatString("    ", i - 1)#  |
#repeatString("    ", i - 1)#  +--</cfloop
><B>#util.getPackageDisplayPrefix(stComponent.package)##stComponent.name#</B>
</PRE>

<cfif len(trim(stComponent.attributes.hint))>
<HR>
#stComponent.attributes.hint#
</cfif>
</cfoutput>
<HR>

<P>

<cfoutput>
<!-- ========== PROPERTY SUMMARY =========== -->
<cfset propertyNameSet = createObject("java", "java.util.HashSet").init() />
<A NAME="property_summary"><!-- --></A>
<cfif structCount(stComponent.properties)>

<TABLE BORDER="1" WIDTH="100%" CELLPADDING="3" CELLSPACING="0" SUMMARY="">

<TR BGCOLOR="##CCCCFF" CLASS="TableHeadingColor">
<TD COLSPAN=2><FONT SIZE="+2">
<B>Property Summary</B></FONT></TD>
</TR>

<cfset aNames = structKeyArray(stComponent.properties)>

<cfset arraySort(aNames,'textnocase')>

<cfloop from="1" to="#arrayLen(aNames)#" index="i">
<cfset thisProperty = stComponent.properties[aNames[i]]>
<cfset propertyNameSet.add(thisProperty.name) />
<TR BGCOLOR="white" CLASS="TableRowColor">
<TD VALIGN="top" WIDTH="1%"><CODE><B><A HREF="##propertydetail_#thisproperty.name#">#thisProperty.name#</A></B></CODE></TD>
<TD>
<cfif len(trim(thisProperty.hint))>
	#repeatString("&nbsp;", HINT_INDENT)##thisProperty.hint#
</cfif>
</TD>
</TR>

</cfloop>

</TABLE>
<p>
</cfif>

<cfset thisComponent = stComponent />
<cfloop condition="structKeyExists(thisComponent, 'superComponent')">
	<cfset thisComponent = thisComponent.superComponent />
	<cfset propertyNames = structKeyArray(thisComponent.properties) />
	<cfset inheritedPropertyNames = arrayNew(1) />
	<cfloop from="1" to="#arrayLen(propertyNames)#" index="i">
		<cfif propertyNameSet.add(propertyNames[i])>
			<cfset arrayAppend(inheritedPropertyNames, propertyNames[i]) />
		</cfif>
	</cfloop>

	<cfif arrayLen(inheritedPropertyNames) GT 0>
		<table border="1" width="100%" cellpadding="3" cellspacing="0" summary="">
		<tr bgcolor="##eeeeff" class="TableHeadingColorInherited">
			<td><strong>Properties inherited from #util.getPackageDisplayPrefix(thisComponent.package)#<a href="#util.getDetailURL(thisComponent.package & '.' & thisComponent.name, '')#">#thisComponent.name#</a></strong></td>
		</tr>
		<tr bgcolor="white" class="TableRowColorInherited">
			<td><code>
			<cfset count = arrayLen(inheritedPropertyNames) />
			<cfloop from="1" to="#count#" index="i">
				<a href="#util.getDetailURL(thisComponent.package & '.' & thisComponent.name, '')###propertydetail_#inheritedPropertyNames[i]#">#inheritedPropertyNames[i]#</a><cfif i LT count>, </cfif>
			</cfloop>
			</code></td>
		</tr>
		</table>
		<p>
	</cfif>
</cfloop>
</cfoutput>

<!-- ========== METHOD SUMMARY =========== -->

<cfoutput>
<cfset methodNameSet = createObject("java", "java.util.HashSet").init() />

<A NAME="method_summary"><!-- --></A>

<TABLE BORDER="1" WIDTH="100%" CELLPADDING="3" CELLSPACING="0" SUMMARY="">

<TR BGCOLOR="##CCCCFF" CLASS="TableHeadingColor">
<TD COLSPAN=2><FONT SIZE="+2">
<B>Method Summary</B></FONT></TD>
</TR>

<cfset aNames = structKeyArray(stComponent.methods)>

<cfset arraySort(aNames,'textnocase')>
<cfset constructorContent = "" />
<cfset methodContent = "" />

<cfloop from="1" to="#arrayLen(aNames)#" index="i">
<cfset thisMethod = stComponent.methods[aNames[i]]>
<cfset methodNameSet.add(thisMethod.name) />
<cfif listFindNoCase(application.constructorNames, thisMethod.name) GT 0>
	<cfsavecontent variable="constructorContent">#constructorContent#
	<TR BGCOLOR="eeeeff" CLASS="TableRowColorConstructor">
	<TD ALIGN="right" VALIGN="top" WIDTH="1%">
	<CODE>#thisMethod.access# <a href="#util.getDetailURL(thisMethod.returntype,stComponent.path)#" target="_self">#listLast(thisMethod.returnType, ".")#</a></CODE></TD>
	<TD><CODE><B><A HREF="###thismethod.name#()">#thisMethod.name#</A></B>(#generateArgumentList(thisMethod)#)</CODE>
	<cfif len(trim(thisMethod.hint))>
		<BR>
		#repeatString("&nbsp;", HINT_INDENT)##thisMethod.hint#
	</cfif></TD>
	</TR>
	</cfsavecontent>
<cfelse>
	<cfsavecontent variable="methodContent">#methodContent#
	<TR BGCOLOR="white" CLASS="TableRowColor">
	<TD ALIGN="right" VALIGN="top" WIDTH="1%">
	<CODE>#thisMethod.access# <a href="#util.getDetailURL(thisMethod.returntype,stComponent.path)#" target="_self">#listLast(thisMethod.returnType, ".")#</a></CODE></TD>
	<TD><CODE><B><A HREF="###thismethod.name#()">#thisMethod.name#</A></B>(#generateArgumentList(thisMethod)#)</CODE>
	<cfif len(trim(thisMethod.hint))>
		<BR>
		#repeatString("&nbsp;", HINT_INDENT)##thisMethod.hint#
	</cfif>
	<cfif structKeyExists(thisMethod, "deprecated")><br />#repeatString("&nbsp;", 10)#<strong>Deprecated.</strong> <em>#thisMethod.deprecated#</em></cfif>
	</TD>
	</TR>
	</cfsavecontent>
</cfif>
</cfloop>
#constructorContent#
#methodContent#
</TABLE>

<cfset thisComponent = stComponent />
<cfloop condition="structKeyExists(thisComponent, 'superComponent')">
	<cfset thisComponent = thisComponent.superComponent />
	<cfset methodNames = structKeyArray(thisComponent.methods) />
	<cfset inheritedMethodNames = arrayNew(1) />
	<cfloop from="1" to="#arrayLen(methodNames)#" index="i">
		<cfif methodNameSet.add(methodNames[i])>
			<cfset arrayAppend(inheritedMethodNames, methodNames[i]) />
		</cfif>
	</cfloop>

	<cfif arrayLen(inheritedMethodNames) GT 0>
		<p>
		<table border="1" width="100%" cellpadding="3" cellspacing="0" summary="">
		<tr bgcolor="##eeeeff" class="TableHeadingColorInherited">
			<td><strong>Methods inherited from #util.getPackageDisplayPrefix(thisComponent.package)#<a href="#util.getDetailURL(thisComponent.package & '.' & thisComponent.name, '')#">#thisComponent.name#</a></strong></td>
		</tr>
		<tr bgcolor="white" class="TableRowColorInherited">
			<td><code>
			<cfset count = arrayLen(inheritedMethodNames) />
			<cfloop from="1" to="#count#" index="i">
				<a href="#util.getDetailURL(thisComponent.package & '.' & thisComponent.name, '')####inheritedMethodNames[i]#()">#inheritedMethodNames[i]#</a><cfif i LT count>, </cfif>
			</cfloop>
			</code></td>
		</tr>
		</table>
	</cfif>
</cfloop>
&nbsp;
<P>
</cfoutput>

<cfif structCount(stComponent.properties)>
<!-- ============ PROPERTY DETAIL ========== -->


<A NAME="property_detail"><!-- --></A>
<TABLE BORDER="1" WIDTH="100%" CELLPADDING="3" CELLSPACING="0" SUMMARY="">
<TR BGCOLOR="#CCCCFF" CLASS="TableHeadingColor">
<TD COLSPAN=1><FONT SIZE="+2">
<B>Property Detail</B></FONT></TD>
</TR>
</TABLE>



<cfset aNames = structKeyArray(stComponent.properties)>

<cfset arraySort(aNames,'textnocase')>

<cfoutput>
<cfloop from="1" to="#arrayLen(aNames)#" index="i">
<cfset thisProperty = stComponent.properties[aNames[i]]>


<A NAME="propertydetail_#thisProperty.name#"><!-- --></A><H3>
#thisProperty.name#</H3>
<DL>
  <DD>#thisProperty.hint#</DD>
  <P>
  <DD>
    <B>Attributes:</B>
    <cfset attribArray = structKeyArray(thisProperty)>
    <cfset arraySort(attribArray,'textnocase')>
    <PRE>
      <table border="1" cellspacing="0" cellpadding="3" bordercolor="Black">
        <cfloop from="1" to="#arrayLen(attribArray)#" index="i"><tr><td bgcolor="##EEEEFF">#attribArray[i]#:</td><td>&nbsp;#thisProperty[attribArray[i]]#</td></tr></cfloop>
      </table>
    </PRE>
    <cfif revealCode>
      <DL>
        <DT><B>Code:</B></DT>
        <DD>
        <cf_coloredcode data="#thisProperty.fullTag#">
        </DD>
      </DL>
    </cfif>
  </DD>
</DL>
<HR>
</cfloop>
</cfoutput>

</cfif>
<!-- ============ METHOD DETAIL ========== -->


<A NAME="method_detail"><!-- --></A>
<TABLE BORDER="1" WIDTH="100%" CELLPADDING="3" CELLSPACING="0" SUMMARY="">
<TR BGCOLOR="#CCCCFF" CLASS="TableHeadingColor">
<TD COLSPAN=1><FONT SIZE="+2">
<B>Method Detail</B></FONT></TD>
</TR>
</TABLE>



<cfset aNames = structKeyArray(stComponent.methods)>

<cfset arraySort(aNames,'textnocase')>

<cfoutput>
<cfloop from="1" to="#arrayLen(aNames)#" index="i">
<cfset thisMethod = stComponent.methods[aNames[i]]>


<A NAME="#thisMethod.name#()"><!-- --></A><H3>
#thisMethod.name#</H3>

<PRE>
#thisMethod.access# <A HREF="#util.getDetailURL(thisMethod.returntype,stComponent.path)#" title="">#thisMethod.returnType#</A> <B>#thisMethod.name#</B>(#generateArgumentList(thisMethod)#)</PRE>
<DL>
  <DD>
  	<cfif structKeyExists(thisMethod, "deprecated")>
		<strong>Deprecated.</strong> <em>#thisMethod.deprecated#</em>
		<p>
	</cfif>
  	<cfif len(trim(thisMethod.hint))>
		#thisMethod.hint#
	    <P>
	</cfif>
	<cfif arrayLen(thisMethod.arguments) GT 0>
		<DL>
		  <DT><B>Parameters:</B></DT>
			<cfloop from="1" to="#arrayLen(thisMethod.arguments)#" index="j">
			  <DD><code>#generateArgument(thisMethod.arguments[j])#</code><cfif len(trim(thisMethod.arguments[j].hint))> - #thisMethod.arguments[j].hint#</cfif></DD>
			</cfloop>
		</DL>
	</cfif>
	<cfif structKeyExists(thisMethod, "throws")>
		<br />
		<dl>
			<dt><strong>Throws:</strong></dt>
			<cfloop list="#thisMethod.throws#" index="j">
				<dd><code>#j#</code></dd>
			</cfloop>
		</dl>
	</cfif>
    <cfif revealCode>
      <br>
      <DL>
        <DT><B>Code:</B></DT>
        <DD>
          <cf_coloredcode data="#thisMethod.fullTag#">
        </DD>
      </DL>
    </cfif>
  </DD>
</DL>
<HR>
</cfloop>
</cfoutput>

<cfif revealCode>
<DL>
  <DT><B>Full Component Code:</B></DT>
  <DD>
  <cf_coloredcode data="#stComponent.code#">
  </DD>
</DL>
<HR>
</cfif>
