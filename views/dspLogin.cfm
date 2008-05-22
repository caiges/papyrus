<p class="headingTitle">Intranet Login</p>
<cfif viewState.exists( "logindenied" )>
	<div class="errorMessage">&nbsp;&nbsp;<img src="img/exclamation.gif" title="exclamation" />&nbsp;&nbsp;&nbsp;<cfoutput>#viewState.getValue( "logindenied" )#</cfoutput></div><br />
</cfif>
<form class="form" action="index.cfm?event=userLogin" method="post">
	<fieldset>
	  <legend><strong>User Details</strong></legend>
		<ul>
			<li><label for="j_username" class="required"><span>Username <em>*</em></span></label><input type="text" name="j_username" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
			<li><label for="j_password" class="required"><span>Password <em>*</em></label></span><input type="password" name="j_password" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
		</ul>
		<p><strong>Note:</strong> Required fields are marked with an asterisk (<em>*</em>)</p>
		<p><input type="submit" name="submit" value="Login >>">&nbsp;&nbsp;&nbsp;<a href="?event=recoverUserLoginRequest">Forgot your login?</a></p>
	</fieldset>
		<!---<table cellspacing="5" cellpadding="0" border="0">
			<tr class="form_row">
				<td style="width: 150px;"><p class="required">Username *</p></td>
				<td><input type="text" name="j_username" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td><p class="required">Password *</p></td>
				<td><input type="password" name="j_password" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td colspan="2" valign="middle" align="right"><input type="submit" name="submit" value="Login >>"></td>
			</tr>
			<tr>
				<td colspan="2"><p><a href="?event=resetPasswordRequest">Forgot your password?</a></p></td>
			</tr>
		</table>--->
</form>

<br /><br />
<hr width="100%" noshade="noshade" size="1" />
	
<p class="headingTitle">Site Registration</p>
<p>Not yet registered?  Complete and submit the form below and your login information will be e-mailed to you.</p>

<form class="form" action="index.cfm?event=register" method="post">
<fieldset>
		<legend><strong>User Registration Details</strong></legend>
		<ul>
			<li><label for="emailaddress" class="required"><span>E-mail Address <em>*</em></span></label><input type="text" name="emailaddress" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
			<li><label for="username" class="required"><span>Username <em>*</em></label></span><input type="password" name="username" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
			<li><label for="password" class="required"><span>Password <em>*</em></label></span><input type="password" name="password" size="25" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></li>
		</ul>
		<p><strong>Note:</strong> Required fields are marked with an asterisk (<em>*</em>)</p>
		<p><input type="submit" name="submit" value="Register >>"></p>
	</fieldset>
	<!---<fieldset>
		<legend class="legend">User Registration Details</legend>
		<table>
		<tr>
			<td align="left"><p><strong>Note:</strong> Required fields are marked with an asterisk (*)</p></td>
		</tr>
		</table>
		<table cellspacing="5" cellpadding="0" border="0">
			<tr>
				<td style="width: 150px;"><p class="required">E-mail Address *</p></td>
				<td><input type="text" name="emailaddress" size="25" maxlength="100" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td><p class="required">Username *</p></td>
				<td><input type="text" name="username" size="25" maxlength="50" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td><p class="required">Password *</p></td>
				<td><input type="password" name="password" size="25" maxlength="50" class="formInputBlur" onfocus="javascript:PDL.util.Style.toggleCurrent(this);" onblur="javascript:PDL.util.Style.toggleCurrent(this);"></td>
			</tr>
			<tr>
				<td colspan="2" align="right"><input type="submit" name="submit" value="Register >>"></td>
			</tr>
		</table>
	</fieldset>--->
</form>
