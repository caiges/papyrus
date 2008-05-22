<cfset RS_Total_Daily = viewState.getValue("RSDailyTotal") />
<cfset RS_Total_Week = viewState.getValue("RSWeekTotal") />
<cfset serverSettings = #viewState.getValue("serverSettings")# />

<div id="sidebarRightFinancialOuter">
				
<div id="sidebarRightFinancialOuterContent">

<div id="sidebarRightFinancialInner">
	<div id="sidebarRightFinancialContent">
	
		<div id="sidebarRightFinancialHeading">
		&nbsp;Financial Dashboard
		</div>
		
		<div id="sidebarRightFinancialContentContainer">
			<br />
			<strong><a href="javascript:;" onClick="javascript:window.open('views/static/homepage/whiteboard/','Whiteboard','toolbar=yes,menubar=yes,scrollbars=yes,width=760,height=600')">Digital Whiteboard</a></strong>
			<br /><br />
			<cfoutput>
			Today's Total: #NumberFormat(RS_Total_Daily.OrderValue, "$999,999,999")#
			<br />
			Week Ending: #NumberFormat(RS_Total_Week.OrderValue, "$999,999,999")#
			</cfoutput>
			<br /><br />
			<a href="javascript:;" onClick="javascript:window.open('/views/static/homepage/whiteboard/','Whiteboard','toolbar=yes,menubar=yes,scrollbars=yes,width=760,height=600,resizable=yes')"><img src="img/thumb_whiteboard.jpg" width="155" height="114" border="0" alt="Whiteboard"></a>			
			<br /><br />
			<hr />
            
			<!-- Start of Yahoo! Finance code -->
			<iframe allowtransparency="true" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="http://api.finance.yahoo.com/instrument/1.0/PSO/badge;chart=5d;quote/HTML/f.white?AppID=y5H71ITgew1mrGSCYpQ6svD_7wU-&sig=fVWXJCmUVN8VHEWPCu4z4WUghBU-&t=1162401688849" width="160px" height="450px"></iframe>
			<!-- End of Yahoo! Finance code -->
			<div id="sidebarRightFinancialContentSpacer"></div>
			
		</div>
		
		<div id="sidebarRightFinancialContentFooter"></div>

	</div>
</div>

</div>

</div>


			
			
		