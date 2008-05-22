
<cfif viewState.exists("LookingPod")>
	
<div id="sidebarRightBottomOuter">
				
<div id="sidebarRightBottomOuterContent">

<div id="sidebarRightBottomInner">
	<div id="sidebarRightBottomContent">
	
		<div id="sidebarRightBottomHeading">
		&nbsp;Looking For...
		</div>
		
		<div id="sidebarRightBottomContentContainer">
			
			<cfoutput>#viewState.getValue("LookingPod")#</cfoutput>
			
			<div id="sidebarRightBottomContentSpacer"></div>
			
		</div>
		
		<div id="sidebarRightBottomContentFooter"></div>

	</div>
</div>

</div>

</div>
</cfif>