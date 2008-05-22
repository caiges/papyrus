<cfset kbProducts = #viewState.getValue("kbProducts")#>

<div id="sidebarRightOuter">
	<div id="sidebarRightOuterContent">
		<div id="sidebarRightInner">
			<div id="sidebarRightContent">
				<div id="sidebarRightHeading">
				&nbsp;KB Quick Search
				</div>
				<div id="sidebarRightContentContainer">

					<form name="kbQuickSearch" method="post" action="?event=knowledgebase.search">
						<table width="100%" cellspacing="0" cellpadding="0" border="0">
							<tr height="20">
								<td>Keyword(s)</td>
							</tr>
							<tr height="20">
								<td><input name="kbkeyword" id="kbkeyword" type="text" size="20" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);" /></td>
							</tr>
							<tr height="20">
								<td>Product</td>
							</tr>
							<tr height="20">
								<td>
									<select name="kbproduct" id="kbproduct" size="1" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);">
									<option value="" selected="selected">Select One</option>
									<cfoutput query="kbProducts">
										<option value="#kbProducts.productname#">#KbProducts.productname#</option>
									</cfoutput>
									</select>
							</tr>
							<tr height="40">
								<td><input name="kbarticlestatus" id="kbarticlestatus" type="hidden" value="Published"><input type="submit" value="Search" /></td>
							</tr>
						</table>
					</form>
					
					<div id="sidebarRightContentSpacer"></div>
				</div>
				<div id="sidebarRightContentFooter"></div>
			</div>
		</div>
	</div>
</div>
					