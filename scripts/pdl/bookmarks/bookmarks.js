/*
*   author:  Britton Halle
*   created:  06/26/2006
*   purpose:  make call to add user bookmark
*	dependencies: 
*
*/

// Bookmark widget
PDL.widget.Bookmark = {

	// setup Bookmark
	init : function() {	
		return this;
	},
	
	// make call to ws to add bookmark
	addUserBookmark : function(userString,pageString) {
	    // encoded via JSON
	    var argString = '&bookmark={"UserRowID":"'+userString+'","PageRowID":"'+pageString+'"}' ;
		var url = encodeURI("remote/wsPDLIntranet.cfc?method=addUserBookmark" + argString);
		var callback = { 
		        success: function(o) { 
		  		PDL.widget.Bookmark.setUsersBookmarkList(o.responseText);
                }, 
		  		failure: function(o) { 
		  		PDL.widget.Bookmark.handleFailure(o.responseText);
		  		}
			}
		var query = YAHOO.util.Connect.asyncRequest("GET", url, callback);
	},
	
	// make call to ws to delete bookmark
	removeUserBookmark : function(bookmarkString) {
	    // encoded via JSON
	    var argString = '&bookmarkrowid={"BookmarkRowID":"'+bookmarkString+'"}' ;
		var url = encodeURI("remote/wsPDLIntranet.cfc?method=deleteUserBookmark" + argString);
		var callback = { 
		        success: function(o) { 
		  		PDL.widget.Bookmark.setUsersBookmarkList(o.responseText);
                }, 
		  		failure: function(o) { 
		  		PDL.widget.Bookmark.handleFailure(o.responseText);
		  		}
			}
		var query = YAHOO.util.Connect.asyncRequest("GET", url, callback);
	},
	
	//TODO: reload list without hitting server
	setUsersBookmarkList : function(responseText) {},
	
	//TODO: say something ... it didnt work
	handleFailure : function(responseText) {}
}