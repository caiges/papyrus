<cfset kbProducts = #viewState.getValue("kbProducts")#>
<cfset kbProductVersions = #viewState.getValue("kbProductVersions")#>
<cfset kbOperatingSystems = #viewState.getValue("kbOperatingSystems")#>
<cfset kbDatabases = #viewState.getValue("kbDatabases")#>
<cfset kbPlatforms = #viewState.getValue("kbPlatforms")#>

<script language = "JavaScript">
<!--

<cfoutput query="kbProductVersions" group="productname">
	// Create the array
	kbProductVersionArray#productname# = new Array();
	<cfset i = 0>
	// Populate the array
	<cfoutput>
		<cfset i = i + 1>
		kbProductVersionArray#productname#[#i#] = "#productversion#";
	</cfoutput>
</cfoutput>

// Function to populate the product version for the product selected
function PopulateProductVersions() {
	var kbproduct = document.getElementById("kbproduct");
	var kbproductversion = document.getElementById("kbproductversion");
	// Only process the function if the first item is not selected.
	if (kbproduct.selectedIndex != 0) {
		kbproductversion.disabled = false;
		// Get the product name
		var ThisProduct = kbproduct[kbproduct.selectedIndex].value;
		// Set the length of the product version drop down equal to the length of the product's array
		kbproductversion.length = eval("kbProductVersionArray" + ThisProduct + ".length");
		// Put 'Select One' as the first option in the product version dropdown
		kbproductversion[0].value = "";
		kbproductversion[0].text = "Select One";
		kbproductversion[0].selected = true;
		// Loop through the product's array and populate the product version's drop down
		for (i=1; i<eval("kbProductVersionArray" + ThisProduct + ".length"); i++) {
			kbproductversion.options[i] = new Option(eval("kbProductVersionArray" + ThisProduct + "[" + i + "]"), eval("kbProductVersionArray" + ThisProduct + "[" + i + "]"));
		}
	// If no product is selected, reset and disable product version drop down
	} else {
		kbproductversion[0].value = "";
		kbproductversion[0].text = "Select Product First";
		kbproductversion[0].selected = true;
		kbproductversion.disabled = true;
	}
}

//-->
</script>

<form name="kbSearch" method="post" action="index.cfm?event=knowledgebase.search">
	<table width="100%" cellspacing="0" cellpadding="0" border="0">
		<tr>
			<td width="60%" valign="top">
				<table width="100%" cellspacing="0" cellpadding="0" border="0">
					<tr>
						<td colspan="2"><p class="headingTitle">Knowledge Base Search</p></td>
					</tr>
					<tr height="20">
						<td colspan="2">Keyword(s)</td>
					</tr>
					<tr height="20">
						<td colspan="2"><input name="kbkeyword" id="kbkeyword" type="text" size="40" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);" value="<cfif viewState.exists( "kbkeyword" ) ><cfoutput>#viewState.getValue( "kbkeyword" )#</cfoutput></cfif>" /></td>
					</tr>
					<tr height="20">
						<td colspan="2">Product</td>
					</tr>
					<tr height="20">
						<td colspan="2">
							<select name="kbproduct" id="kbproduct" size="1" class="formInputBlur" onChange="PopulateProductVersions()" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
								<option value="" selected="selected">Select One</option>
								<cfoutput query="kbProducts">
									<option value="#kbProducts.productname#"<cfif viewState.exists( "kbproduct" ) and viewState.getValue( "kbproduct" ) eq kbProducts.productname> selected</cfif>>#kbProducts.productname#</option>
								</cfoutput>
							</select>
						</td>
					</tr>
				</table>
				<!--- advanced search options --->
				<table id="kbAdvancedSearch" style="display: none;" width="100%" cellspacing="0" cellpadding="0" border="0">
					<tr height="20">
						<td colspan="2">Product Version</td>
					</tr>
					<tr height="20">
						<td colspan="2">
							<select name="kbproductversion" id="kbproductversion" disabled="disabled" size="1" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
								<option value="">Select Product First</option>
							</select>
						</td>
					</tr>
					<tr height="20">
						<td colspan="2">Operating System</td>
					</tr>
					<tr height="20">
						<td colspan="2">
							<select name="kboperatingsystem" id="kboperatingsystem" size="1" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
								<option value="" selected="selected">Select One</option>
								<cfoutput query="kbOperatingSystems">
									<option value="#kbOperatingSystems.operatingsystem#">#kbOperatingSystems.operatingsystem#</option>
								</cfoutput>
							</select>
						</td>
					</tr>
					<tr height="20">
						<td colspan="2">Database Type</td>
					</tr>
					<tr height="20">
						<td colspan="2">
							<select name="kbdatabase" id="kbdatabase" size="1" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
								<option value="" selected="selected">Select One</option>
								<cfoutput query="kbDatabases">
									<option value="#kbDatabases.databasename#">#kbDatabases.databasename#</option>
								</cfoutput>
							</select>
						</td>
					</tr>
					<tr height="20">
						<td colspan="2">Hardware Platform</td>
					</tr>
					<tr height="20">
						<td colspan="2">
							<select name="kbhardwareplatform" id="kbhardwareplatform" size="1" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
							<option value="" selected="selected">Select One</option>
							<cfoutput query="kbPlatforms">
								<option value="#kbPlatforms.platformname#">#kbPlatforms.platformname#</option>
							</cfoutput>
							</select>
					</tr>
				</table>
				<table width="100%" cellspacing="0" cellpadding="0" border="0">
					<tr height="35">
						<td width="60%"><a id="kbAdvancedSearchSwitch" href="#">[Advanced Search]</a></td>
						<td width="40%"><input name="kbarticlestatus" id="kbarticlestatus" type="hidden" value="Published"><input id="searchKB" type="submit" value="Submit Search" /></td>
					</tr>
				</table>
			</td>
			<td width="40%" valign="top">
				<p><strong>Basic Search Help</strong></p>
				<p>To use the basic search to search for Knowledge Base articles, just type the keywords that you want to search on in the Keyword(s) field. Select a product to search from the products list, or accept the default option to search across all products.</p>
				<p>For a list of frequently used keywords and query words, view the <a href="assets/knowledgebase/knowledge_base_keywords.doc" title="Knowledge Base Keywords">catalog of special keywords</a> that the search engine uses.</p>
				<p>To get started, view the <a href="javascript:;" onclick="javascript:window.open( 'assets/knowledgebase/knowledge_base_demo.html', null, 'left=100,top=100,height=480,width=640,status=0' );">"Introduction to the PDL Knowledge Base"</a> video.</p> 
			</td>
		</tr>
	</table>
</form>
