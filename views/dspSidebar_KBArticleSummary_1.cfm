<cfset kbarticle = #viewState.getValue("kbarticle")#>
<cfset kbarticleproductversions = #viewState.getValue("kbarticleproductversions")#>
<cfset kbarticleimplementationmodels = #viewState.getValue("kbarticleimplementationmodels")#>
<cfset kbarticleoperatingsystems = #viewState.getValue("kbarticleoperatingsystems")#>
<cfset kbarticledatabases = #viewState.getValue("kbarticledatabases")#>
<cfset kbarticleplatforms = #viewState.getValue("kbarticleplatforms")#>

<div id="sidebarRightBottomOuter">
	<div id="sidebarRightBottomOuterContent">
		<div id="sidebarRightBottomInner">
			<div id="sidebarRightBottomContent">
				<div id="sidebarRightBottomHeading">
				&nbsp;Article Details
				</div>
				<div id="sidebarRightBottomContentContainer">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td><strong>Product</strong></td>
						</tr>
						<tr>
							<td><cfoutput>#kbarticle.productname#<br /></cfoutput></td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><strong>Version(s)</strong></td>
						</tr>
						<tr>
							<td>
								<cfif kbarticleproductversions.RecordCount GT 0>
									<cfoutput query="kbarticleproductversions">#productversion#<br /></cfoutput>
								<cfelse>
									N/A
								</cfif>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><strong>Implementation(s)</strong></td>
						</tr>
						<tr>
							<td>
								<cfif kbarticleimplementationmodels.RecordCount GT 0>
									<cfoutput query="kbarticleimplementationmodels">#implementationmodel#<br /></cfoutput>
								<cfelse>
								N/A
								</cfif>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><strong>Operating System(s)</strong></td>
						</tr>
						<tr>
							<td>
								<cfif kbarticleoperatingsystems.RecordCount GT 0>
									<cfoutput query="kbarticleoperatingsystems">#operatingsystem#<br /></cfoutput>
								<cfelse>
								N/A
								</cfif>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><strong>Database(s)</strong></td>
						</tr>
						<tr>
							<td>
								<cfif kbarticledatabases.RecordCount GT 0>
									<cfoutput query="kbarticledatabases">#databasename#<br /></cfoutput>
								<cfelse>
								N/A
								</cfif>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td valign="top"><strong>Platform(s)</strong></td>
						</tr>
						<tr>
							<td>
								<cfif kbarticleplatforms.RecordCount GT 0>
									<cfoutput query="kbarticleplatforms">#platformname#<br /></cfoutput>
								<cfelse>
								N/A
								</cfif>
							</td>
						</tr>
					</table>
					<div id="sidebarRightContentSpacer"></div>
				</div>
				<div id="sidebarRightContentFooter"></div>
			</div>
		</div>
	</div>
</div>
					