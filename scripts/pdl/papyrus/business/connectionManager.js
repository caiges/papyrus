/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic helper
*	dependencies: *helper.js (setBeanId,setupHelper,setQueueFlags,displayForm)
*
*/

PDL.widget.Papyrus.connectionManager = function() {	
	return this.init();
}
PDL.widget.Papyrus.connectionManager.prototype = {
	init : function () {
	
		this.connection = null;
	
	},
	
	getConnection : function() {
		
		return this.connection;
		
	},
	
	getService : function (cfc,method) {
		var domainURL = PDL.util.PageURL.getURL();
		//var serviceURL = domainURL+'remote/'+cfc+'.cfc?method='+method;
		var serviceURL = domainURL+'remote/wsCMSFacade.cfc';
		return serviceURL;
	},
	
	getPage : function (cfc) {
		var domainURL = PDL.util.PageURL.getURL();
		var serviceURL = domainURL+'remote/'+cfc+'.cfm';
		return serviceURL;
	},
	
	makeCall : function (action,cfc,method,params,smethod,fmethod,ctype) {
		//console.log( action + ' ' + cfc + ' ' + method + ' ' + params + ' ' + smethod + ' ' + fmethod + ' ' + ctype );		
		var postArgs = null;
		if(action == "UPLOAD") {
			YAHOO.util.Connect.setForm(params,true);
			action = "POST";
			var url = encodeURI(this.getPage(cfc));
		} else {
			var a = new Object();
			a['us'] = new Object();
			a['us']['sid'] = 'sessionid';
			a['us']['uid'] = 'userrowid';
			a['call'] = new Object();
			a['call']['c'] = cfc;
			a['call']['f'] = method;
			a['call']['a'] = params;
			
			var ea = PDL.util.JSON.jsonEncode(a);
			//console.log( ea );
			postArgs = 'method=request&arg='+ea+'&dif=json';
			
			var url = encodeURI(this.getService(cfc,method));
		}
		
		var callback = { 
		        success: function(o) { 
		  		smethod(o);
                }, 
		  		failure: function(o) { 
		  		fmethod(o);
		  		},
				upload: function(o) { 
		  		smethod(o);
                } 
			}
		//console.log('making call to webservice : '+postArgs);
		this.connection = YAHOO.util.Connect.asyncRequest(action, url, callback, postArgs);
	}	
}
