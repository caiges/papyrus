/*
*   author:  Caige Nash
*   created:  04/11/2006
*   purpose:  multiple onload event handler 
*
*/

// addLoadEvent function to add function to onload 
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
			window.onload = func;
	} else {
			window.onload = function() {
					oldonload();
					func();
			}
	}
}