/*
*   author:  Caige Nash
*   created:  05/26/2006
*   purpose:  create 'pdl' namespace to organize pdl specific code
*
*/

// create PDL namespace if it doesn't already exist
if (PDL == null || typeof(PDL) != "object") { var PDL = new Object(); }
// create PDL.util namespace if it doesn't already exist
if (PDL.util == null || typeof(PDL.util) != "object") { PDL.util = new Object(); }
// create PDL.widget namespace if it doesn't already exist
if (PDL.widget == null || typeof(PDL.widget) != "object") { PDL.widget = new Object(); }

// PDL Text Namespace
PDL.util.Text = {
	
	// Removes leading whitespaces
	LTrim : function( value ) {
		var re = /\s*((\S+\s*)*)/;
		return value.replace(re, "$1");
	},

	// Removes ending whitespaces
	RTrim : function( value ) {
		var re = /((\s*\S+)*)\s*/;
		return value.replace(re, "$1");	
	},

	// Removes leading and ending whitespaces
	trim : function( value ) {
		//return this.LTrim(this.RTrim(value));
		return value.replace( /^\s*|\s*$/g, "" );
	},
	
	// Strip all html tags from string, with or without escaped html tags
	stripHTML : function( string ) {
			
			// returns a new string with escaped and non escaped html tags removed.
			var newString = this.xmlDecode( string );
			newString = newString.replace( /(<([^>]+)>)/ig, "" );
			
			return newString;
			
	},
	
	xmlEncode : function(s) { // from tiny_mce
		s = "" + s;
		s = s.replace(/&/g, '&amp;');
		s = s.replace(new RegExp('"', 'g'), '&quot;');
		s = s.replace(/\'/g, '&#39;'); // &apos; is not working in MSIE
		s = s.replace(/</g, '&lt;');
		s = s.replace(/>/g, '&gt;');
		s = escape( s );
		return s;
	},
	
	xmlDecode : function( s ) {
		
		s = "" + s;
		s = s.replace(/&amp;/g, '&');
		s = s.replace(new RegExp('&quot;', 'g'), '"');
		s = s.replace(/&#39;/g, '\''); // &apos; is not working in MSIE
		s = s.replace(/&lt;/g, '<');
		s = s.replace(/&gt;/g, '>');
		//s = escape( s );
		return s;
		
	}
	
}

// PDL Event Namespace
PDL.util.Event = {
	
	// returns true if keyCode is a character "aA - zZ or 0 - 1"
	isAZ09 : function (keyCode) {
		if (keyCode >= 65 && keyCode <= 90) {
			return true;	
		}
		
		if(keyCode >= 48 && keyCode <= 57) {
			return true;	
		}
		
		if(keyCode >= 96 && keyCode <= 105) {
			return true;
		}
		
		// otherwise return false
		return false;
		
	}
	
}

// PDL Date Namespace
PDL.util.Date = {
	
	// parse sql date and return as Date object
	parseSQLDate : function( toValue ) {
		var value = PDL.util.Text.trim(toValue);
		var year = value.substring(0, 4);
		var month = parseInt(value.substring(5, 7)) - 1;
		var day = value.substring(8, 10);
		return new Date(year, month, day);
	},
	
	getMonthsAbvArray : function (i) {
		var months = new Array;
		months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		return months[i];
	},
	getDaysArray : function (i) {
		var days = new Array;
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		return days[i];
	},
	
	formatSQLDate_MMMDDYYYY : function (dt) {
		var cdt = dt.split(' ');
		var cd = cdt[0].split('-');
		var m = cd[1].toString();
		
		if(m.charAt(0) == 0 )
			m = m.charAt(1);
			
		m = m-1;
		var d = this.getMonthsAbvArray(m)+' '+cd[2]+', '+cd[0];
		return d;
	},
	
	convertSQLDate_JS : function (dt) {
		var cdt = dt.split(' ');
		var cd = cdt[0].split('-');
		var m = cd[1].toString();
		
		if(m.charAt(0) == 0 )
			m = m.charAt(1);
		
		m = m-1;
		var d = new Date(cd[0],m,cd[2]);
		return d;
	},
	
	formatAmerican : function (now) {
		var d = now.getMonth()+1 + '/' + now.getDate()  + '/' + this.y2k( now.getYear() ) ;
		return d;
	},
	
	y2k : function (number) { return (number < 1000) ? number + 1900 : number; }
}

// PDL Style Namespace
PDL.util.Style = {
	
	// Toggles highlight of a form input field
	
	toggleCurrent : function( element ) {
		
		if( YAHOO.util.Dom.hasClass( element, 'formInputBlur' ) ) {
			
			YAHOO.util.Dom.replaceClass( element, "formInputBlur", "formInputFocus" );
		
		} else {
			
			YAHOO.util.Dom.replaceClass( element, "formInputFocus", "formInputBlur" );
		
		}
		
	}
	
}

// PDL DOM Namespace
PDL.util.Dom = {
  
  // standard dom doesn't supply insertAfter function, only insertBefore
 	insertAfter : function(parentNode, newNode, targetNode) {
 	  var targetNodeSibling = targetNode.nextSibling;
 	  parentNode.insertBefore( newNode, targetNodeSibling );
 	},
 	
 	// returns the x, y coordinates of the mouse, Gecko 1.5+, IE 5.5+
 	getMouseLoc : function( event ) {
			try {
				var posX = null;
				var posY = null;
				if( event.pageX == undefined ) {  // if IE
					if( event.clientX && event.clientY ) {  // if IE 6
						var body = null;
						if( document.documentElement ) {
							body = document.documentElement;
						} else if( document.body ) {  // if IE < 6
							body = document.body;
						} else {	// if unsupported
							throw new PDL.util.Exception( "UnSupportedObjectPropertyException", "A property in document.body or document.documentElement isn't available." );
						}
	
						posX = event.clientX + body.scrollLeft;
						posY = event.clientY + body.scrollTop;
						//YAHOO.log( "calulated pos: (" + posX + ", " + posY + ")" );
					}
				} else if( event.pageX ) {	// if Gecko
					posX = event.pageX;
					posY = event.pageY;
					//YAHOO.log("(" + e.posX + ", " + e.posY + ")");
				} else {
					throw new PDL.util.Exception( "UnSupportedObjectPropertyException", "There isn't a usable property to calculate cursor position." );
				}	
				return { "x" : posX, "y" : posY };
		} catch ( e ) {
				YAHOO.log(e.name + " : " + e.message);
		}	
	}
		  
}

// PDL Window Namespace
PDL.util.Window = {

	openWindow : function(sUrl,params) {
		if(typeof sUrl == 'string') {
			var newWin = window.open(sUrl,null,'scrollbars=yes,width=620,height=500,left=200,top=200,status=no,resizable=1');
			return false;
		}
		
	},
	
	validateLink : function( link ) {
		
		if( typeof link == 'string' ) {
			
			var regex = /^http:\/\/|^https:\/\/|^ftp:\/\//i;
			
			if( link.match( regex ) != null && link.match.length > 0 ) {
				
				return true;
				
			} else {
				
				return false;
				
			}
				
		} else {
			
			return false;
		
		}
		
	}
		
	
}

// PDL Exception Namespace
PDL.util.Exception = function(name, message) {
	var exceptionTypes = {};
	exceptionTypes.UndefinedElementException = "Element is undefined in document.";
	exceptionTypes.UnknownStringPatternException = "String passed is unknown or unmatched.";
	exceptionTypes.UnSupportedObjectPropertyException = "Unsupported object property.";
	exceptionTypes.UnexpectedTypeException = "Unexpected type passed. Data type passed is not what was expected.";
	exceptionTypes.IndexOutOfBoundsException = "Index out of bounds.";
	
	
	var exception = {};
	exception.name = name;
	
	if(typeof message != 'string') {
		
		if(exceptionTypes[name] != undefined) {
			exception.message = exceptionTypes[name];
		} else {
			exception.message = "Exception message undefined.";
		}
		
	} else {
		exception.message = message;
	}
	
	return exception;
	var funcName
	var temp = "caige";
	var funcName = "set_" + temp;
	this[funcName] = function() {
		return funcName;
	}
	
}

// PDL Extend Namespace
PDL.util.Extend = function (object) {
	function f() {}
	f.prototype = object;
	return new f();
}


// generic bean object (value object)

PDL.util.Bean = function() {
}

PDL.util.Bean.prototype  = {
	buildbean : function (varlist) {
		var avars = varlist.split(",");				
		for (var x = 0; x < avars.length; x++) {
			this[avars[x]] = '';	
		}		
	},
	
	beanSetter : function (varname,pvalue) {
		this[varname] = pvalue;
	},
	
	beanGetter : function (varname) {
		return this[varname];
	}
}


// get page url path 

PDL.util.PageURL = {
	getURL : function () {
		var URL = unescape(document.location.href);	// get current URL in plain ASCII
		var xstart = URL.lastIndexOf("/") + 1;
		var xend = URL.length;
		var hereName = URL.substring(xstart,xend);	//index.cfm?event=page.edit&pid=EEE173B6-BDB0-5FBB-9BAFF6A51BBB7CF7
		var herePath = URL.substring(0,xstart); // http://127.0.0.1/cms
		return herePath;
	},
	getParamVal : function (param) {
		var URL = unescape(document.location.href);	// get current URL in plain ASCII
		var xstart = URL.lastIndexOf("/") + 1;
		var xend = URL.length;
		var hereName = URL.substring(xstart,xend);	//index.cfm?event=page.edit&pid=EEE173B6-BDB0-5FBB-9BAFF6A51BBB7CF7
		if(hereName.indexOf(param+"=") > 0) {
			var pstart = hereName.indexOf(param+"=") + 1 + param.length;
			var pend = hereName.indexOf(param+"=") + 1 + param.length + 35;
			var pval = hereName.substring(pstart,pend)
			return pval;
		}
	}
}

// strip wddxPacket 

PDL.util.wddxPackets = {
	stripit : function (s) {
		var wddxless = s.replace( /<wddxPacket version='1.0'><header\/><data><string>/, "" );
		wddxless = wddxless.replace( /<\/string><\/data><\/wddxPacket>/, "" );
		return wddxless;
	}
}

// capitalize first letter of word

PDL.util.wordCasing = {
	upperFirstLetter : function (s) {
		var pattern = /(\w)(\w*)/;
		var parts = s.match(pattern);
		var firstLetter = parts[1].toUpperCase();
        var restOfWord = parts[2].toLowerCase();
		var sWord = firstLetter+restOfWord;
		return sWord;
	}
}

PDL.util.stringFunc = {
	removeFirstAndLastChr : function (s) {
		var len = s.length;
		var ns = s.substring(1, len-1);
		return ns;
	}
}