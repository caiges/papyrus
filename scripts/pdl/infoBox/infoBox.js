/*
*   author:  Caige Nash
*   created:  05/25/2006
*   purpose:  provide an information box slide down with support different events
*	dependencies: yahoo-min.js, event-min.js, dom-min.js, animation-min.js (yahoo interface library)
*
*/

// default constructor for InfoBoxMgr functionality
PDL.widget.InfoBoxMgr = new function() {
	
	this.init = function() {
		
		// array of class names to check document for elements to attach event handlers to
		this.classTypes = new Array();
		// array of currently animated InfoBox objects. Added on animation start and removed when animation completes
		this.animQueue = new Array();

	}
	
	this.attachEvents = function() {
		if(this.classTypes != null && this.classTypes.length > 0) {
			// loop through class types 
			for(var i = 0; i < this.classTypes.length; i++) {
				var elementArray = YAHOO.util.Dom.getElementsByClassName(this.classTypes[i], "a");
				// loop through found elements if any are found
				if(elementArray.length > 0) {
					for(var x = 0; x < elementArray.length; x++) {
						var idArray = elementArray[x].id.split("_");
						var id = idArray[1];
						var infoRowId = "infoBoxRow_" + id;
						var infoBoxRow = document.getElementById(infoRowId);
						var infoTableId = "infoBoxTable_" + id;
						var infoBoxTable = document.getElementById(infoTableId);
						if(infoBoxRow != null && infoBoxTable != null) {
							/* Stylesheet scope isn't seen by the script environment, so we
							 *  must set styles to be manipulated in script first */
							// if infoBoxRow is the last row in its parent table remove border
							if(infoBoxRow.rowIndex == infoBoxRow.parentNode.rows.length -1) {
								infoBoxTable.style.border = "0px";
							}
							// set height for use in animating info box to the height its contents (autofit)
							infoBoxTable.style.height = infoBoxTable.clientHeight + "px";
							//infoBoxTable.style.height = "70px";
							// set display to none by default
							infoBoxTable.style.display = "none";
							YAHOO.util.Event.addListener(elementArray[x], "click", PDL.widget.InfoBox.toggleInfoBox);
							
							/*elementArray[x].onclick = function() {
								// we are now in the elements scope not InfoBoxEventMgr				
								PDL.widget.InfoBox.toggleInfoBox(this);
								
								// prevent default action
								return false;
							}*/
						}	
					}	
				}
			}
		}
	}
	
	// adds a contentType to the InfoBox Manager InfoBoxContentTypes array, requires string contentType
	this.addClassType = function(contentType) {
		if(typeof contentType == 'string' && contentType.length > 0) {
			this.classTypes.push(contentType);
		}
	}
	
	this.attachExpandAllLinkEvents = function() {
		var elementArray = YAHOO.util.Dom.getElementsByClassName("expandAllLink", "a");
		for(var i = 0; i < elementArray.length; i++) {
			YAHOO.util.Event.addListener(elementArray[i].id, "click", this.expandAllInfoBoxes);
		}
	}
	
	this.expandAllInfoBoxes = function( e ) {
		// if no InfoBox objects are currently being animated, prevents the infoboxes from attempting to animate while the last animation is still taking place on the same InfoBox object
		if( PDL.widget.InfoBoxMgr.animQueue.length == 0 ) {
			// prevent default event
			YAHOO.util.Event.preventDefault(e);
			if(this.innerHTML == "Expand All") {
				this.innerHTML = "Collapse All";
			} else {
				this.innerHTML = "Expand All";
			}
			var tempId = this.id.split("_");
			var contentId = "content_" + tempId[tempId.length-1];
			
			var contentContainer = document.getElementById(contentId);
			var downloadDetailLinks = YAHOO.util.Dom.getElementsByClassName("downloadDetail", "a", contentContainer);
			
			for(var i = 0; i < downloadDetailLinks.length; i++) {
				
				// check if InfoBox is already expanded/closed
				var infoBoxTable = document.getElementById("infoBoxTable_" + downloadDetailLinks[i].id.split("_")[1]);
				
				if(infoBoxTable != null) {			
					// if event is to collapse all, then innerHTML will return the opposite, see above
					if(this.innerHTML == "Expand All") {
						if(infoBoxTable.style.display == "") {
							PDL.widget.InfoBox.generateClickEvent(downloadDetailLinks[i]);
						}
					}  else if(this.innerHTML == "Collapse All") {
							if(infoBoxTable.style.display == "none") {
								PDL.widget.InfoBox.generateClickEvent(downloadDetailLinks[i]);
						}
					}
				}
			}
		}
	}
}


// InfoBox object
PDL.widget.InfoBox = {
	
	// toggle InfoBox, accepts callback event and calling object attached using YAHOO.util.Event in attachInfoBox
	toggleInfoBox : function(e) {
		var element = this;
		YAHOO.util.Event.preventDefault(e);
		var idArray = element.id.split("_");
		var id = idArray[1];
		var infoRowId = "infoBoxRow_" + id;
		var infoBoxRow = document.getElementById(infoRowId);
		var infoTableId = "infoBoxTable_" + id;
		var infoBoxTable = document.getElementById(infoTableId);
		if(infoBoxTable != null) {
			if(infoBoxTable.style.display == "none") {
				PDL.widget.InfoBox.showInfoBox(infoBoxRow, infoBoxTable);
			} else {
				PDL.widget.InfoBox.hideInfoBox(infoBoxRow, infoBoxTable);
			}
		}	
	},
	
	// show InfoBox
	showInfoBox : function(infoBoxRow, infoBoxTable) {
			infoBoxRow.style.backgroundColor = "#ffffe0";
			// showInfoBoxRow
			var showInfoBoxTable = function() {
				infoBoxTable.style.display = "";
				
				PDL.widget.InfoBoxMgr.animQueue.pop();
			}
			var infoBoxTableHeight = parseInt(infoBoxTable.style.height);
			var anim = new YAHOO.util.Anim(infoBoxRow, { height: { from: 0, to: infoBoxTableHeight }, padding: { to: 0 } }, 0.25, YAHOO.util.Easing.easeOut);	
			anim.onComplete.subscribe( showInfoBoxTable );
			anim.animate();
			
			PDL.widget.InfoBoxMgr.animQueue.push( anim );
	},
	
	// hide InfoBox
	hideInfoBox : function(infoBoxRow, infoBoxTable) {
		
			// hideInfoBoxRow
			var hideInfoBoxTable = function() {
				infoBoxTable.style.display = "none";
			}
			// change infoBoxRow background color to nothing
			var changeInfoRowBG = function() {
				infoBoxRow.style.backgroundColor = "";
				
				PDL.widget.InfoBoxMgr.animQueue.pop();
			}
			var infoBoxTableHeight = parseInt(infoBoxTable.style.height);
			hideInfoBoxTable();
			var anim = new YAHOO.util.Anim(infoBoxRow, { height: { from: infoBoxTableHeight, to: 0 }, padding: { to: 0 } }, 0.25, YAHOO.util.Easing.easeOut);	
			anim.onComplete.subscribe( changeInfoRowBG );
			anim.animate();
			
			PDL.widget.InfoBoxMgr.animQueue.push( anim );
	},
	
	generateClickEvent : function(element) {
		if(element != null) {
			// if ie
			if(document.createEvent == undefined) {
				element.click();
			} else { // if firefox and others
				var clickEvent = document.createEvent("MouseEvents");
				clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				element.dispatchEvent(clickEvent);
			}
		}
	}
}