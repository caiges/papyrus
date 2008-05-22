<p class="headingTitle">Intranet Login Recovery</p>

<cfif viewState.exists( "sentMessage" )>
	<div class="message">&nbsp;&nbsp;<img src="img/information.gif" title="information" />&nbsp;&nbsp;&nbsp;<cfoutput>#viewState.getValue( "sentMessage" )#</cfoutput></div>
<cfelseif viewState.exists( "errorMessage" )>
	<div class="errorMessage">&nbsp;&nbsp;<img src="img/exclamation.gif" title="exclamation" />&nbsp;&nbsp;&nbsp;<cfoutput>#viewState.getValue( "errorMessage" )#</cfoutput></div>
</cfif>

<p>Enter your email address and your login information will be e-mailed to you.</p>

<form class="form"action="index.cfm?event=sendRecoverUserLoginRequest" method="post">
	
	<fieldset>
		<legend><strong>User Details</strong></legend>
		<ul>
			<li><label for="emailaddress" class="required"><span>Email Address <em>*</em></span></label><input type="text" name="emailaddress" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
		</ul>
		<p><strong>Note:</strong> Required fields are marked with an asterisk (<em>*</em>)</p>
		<p><input type="submit" name="submit" value="Recover Login >>"></p>
		<!---<legend class="legend">User Details</legend>
		<table>
		<tr>
			<td align="left"><p><strong>Note:</strong> Required fields are marked with an asterisk (*)</p></td>
		</tr>
		</table>
		<table cellspacing="5" cellpadding="0" border="0">
			<tr>
				<td style="width:150px;"><p class="required">Email Address <span class="required">*</span></p></td>
				<td align="right"><input type="text" name=emailaddress size="25" class="formInputBlur text required" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td></td>
				<td align="right"><input type="submit" name="submit" value="Reset >>" class="submit"></td>
			</tr>
		</table>--->
		</fieldset>
</form>

