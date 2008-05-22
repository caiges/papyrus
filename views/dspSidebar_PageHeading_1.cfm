<cfif viewState.exists("pageheadings")>

<div id="sidebarRightOuter">
	<div id="sidebarRightOuterContent">
		<div id="sidebarRightInner">
			<div id="sidebarRightContent">
				<div id="sidebarRightHeading">
				&nbsp;Page Headings
				</div>
				<div id="sidebarRightContentContainer">
										
					<cfoutput>#viewState.getValue("pageheadings")#</cfoutput>
					
					<div id="sidebarRightContentSpacer"></div>
					
				</div>
				<div id="sidebarRightContentFooter"></div>
			</div>
		</div>
	</div>
</div>

</cfif>