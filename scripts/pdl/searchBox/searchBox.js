/*
*   author:  Caige Nash
*   created:  06/06/2006
*   purpose:  provide search functionality ui
*	  dependencies: yahoo-min.js, event-min.js, container-min.js, dom-min.js (yahoo yui library)
*
*/

PDL.widget.SearchBox =  {
	
	currentView : null,
	
	// roster results data cache
	rosterCache : [],
	rosterEventStack : [],
	rosterDivisions : [ "Management", "Education", "ELLIS", "Facilities", "Human Resources", "Operations", "Sales & Marketing", "Technical Services" ],
	
	// search results data cache
	searchEngineCache : [],
	searchEngineEventStack : [],
	
	init : function() {
		if( document.getElementById("searchOuter") != undefined ) {
			
			this.isRosterDataLoaded = false;
			
			this.overlay = new YAHOO.widget.Overlay(this.buildSearchContainer());
			var args = {};
			args.visible = false;
			args.zIndex = 29;
			this.overlay.cfg.applyConfig(args);
			this.overlay.render(document.body);
			
			Rounded("div#searchOuterContainer","bottom","transparent","#F5F5F5","border #7d7d7d");
					
			
			this.attachEvents();
			this.setBackgroundColor("#f5f5f5");
			this.resetPosition();
			
			// setup custom events
			
			// roster data specific events
			this.onStartRosterDataLoad = new YAHOO.util.CustomEvent( "onStartRosterDataLoad", this );
			this.onRosterDataLoad = new YAHOO.util.CustomEvent( "onRosterDataLoad", this );
			this.onRosterResultsLoad = new YAHOO.util.CustomEvent( "onRosterResultsLoad", this );
			this.onRosterBlankSearch = new YAHOO.util.CustomEvent( "onRosterBlankSearch", this );
			this.onRosterNoResults = new YAHOO.util.CustomEvent( "onRosterNoResults", this );
			
			
			// SearchBox specific behavoir
			this.onRosterSearchBoxOpen = new YAHOO.util.CustomEvent( "onRosterSearchBoxOpen", this );
			this.onRosterSearchBoxClose = new YAHOO.util.CustomEvent( "onRosterSearchBoxClose", this );
			this.onRosterRender = new YAHOO.util.CustomEvent( "onRosterRender", this );
			
			// roster field custom events
			//this.onRosterSearchFieldEnable = new YAHOO.util.CustomEvent( "onRosterSearchFieldEnable", this );
			
			// subscribe to custom events
			
			// roster data specific events
			this.onStartRosterDataLoad.subscribe( this.setRosterFieldLoading );
			//this.onStartRosterDataLoad.subscribe( this.disableRosterField );
			this.onRosterDataLoad.subscribe( this.enableRosterField );
			this.onRosterDataLoad.subscribe( this.resetRosterField );
			
			// SearchBox specific behavoir
			this.onRosterSearchBoxOpen.subscribe( this.clearRosterField );
			this.onRosterSearchBoxClose.subscribe( this.resetRosterField );
			this.onRosterRender.subscribe( this.showRosterIntructions );
			this.onRosterBlankSearch.subscribe( this.showRosterIntructions );
			this.onRosterBlankSearch.subscribe( this.clearRosterResults );
			this.onRosterNoResults.subscribe( this.showRosterNoResults );
			
			
						
			return this;	
		} else {
			return null;
		}
	},
	
	// attach SearchBox event handlers
	attachEvents : function() {
		YAHOO.util.Event.addListener("intranetSearchField", "focus", PDL.widget.SearchBox.openIntranetSearchBox);
		YAHOO.util.Event.addListener("rosterSearchField", "focus", PDL.widget.SearchBox.openRosterSearchBox);
		YAHOO.util.Event.addListener(window, "resize", PDL.widget.SearchBox.resetPosition);
	},
	
	// attach "Close SearchBox" event
	attachCloseSearchBoxEvent : function() {
		YAHOO.util.Event.addListener("closeSearchBoxLink", "click", PDL.widget.SearchBox.closeSearchBox);
	},
	
	// add content to the bottom of the current content stack
	searchEngineKeystrokeHandler : function(e) {
		//console.log(e.keyCode);
		switch(e.keyCode) {
			// spacebar
			case 32:
			break;
			
			// enter
			case 13:
			break;
			
			// backspace
			case 8:
				if(PDL.widget.SearchBox.searchEngineEventStack.length == 0) {
					// if event stack is empty push new event onto it
					PDL.widget.SearchBox.pushSearchEngineKeystrokeTimeout();
				} else {
					// if event stack is not empty clear event and push new event onto it
					PDL.widget.SearchBox.popSearchEngineKeystrokeTimeout();
					PDL.widget.SearchBox.pushSearchEngineKeystrokeTimeout();
				}
			break;
			
			// a - z
			default:
				// if key that was pressed is a - z
				if(PDL.util.Event.isAZ09(e.keyCode)) {
					if(PDL.widget.SearchBox.searchEngineEventStack.length == 0) {
						// if event stack is empty push new event onto it
						PDL.widget.SearchBox.pushSearchEngineKeystrokeTimeout();
					} else {
						// if event stack is not empty clear event and push new event onto it
						PDL.widget.SearchBox.popSearchEngineKeystrokeTimeout();
						PDL.widget.SearchBox.pushSearchEngineKeystrokeTimeout();
					}
				}
			break;
		}
		
	},
	
	pushSearchEngineKeystrokeTimeout : function() {
		//PDL.widget.SearchBox.searchEngineEventStack.push(window.setTimeout('PDL.widget.SearchBox.getSearchEngineQuery()', '500'));
		PDL.widget.SearchBox.searchEngineEventStack.push(window.setTimeout('PDL.widget.SearchBox.getSearchEngineQuery()', '500'));
	},
	
	popSearchEngineKeystrokeTimeout : function() {
		var timeoutID = PDL.widget.SearchBox.searchEngineEventStack.pop();
		window.clearTimeout(timeoutID);
	},
	
	// get current search query from rosterSearchField
	getSearchEngineQuery : function() {
		
		var intranetSearchField = document.getElementById("intranetSearchField");
		if(intranetSearchField != null) {
			PDL.widget.SearchBox.fillSearchEngineCache(encodeURI(intranetSearchField.value));
			//console.log(intranetSearchField.value);
			// search roster and store results in rosterResults
			//var rosterResults = PDL.widget.SearchBox.searchRosterCache(rosterField.value);
			// set roster results based upon results
			//PDL.widget.SearchBox.setRosterResults(rosterResults);	
		}	
		
	},
	
	// set search engine cache
	setSearchEngineCache: function(responseText) {
		var resultsObject = eval('(' + responseText + ')');
		PDL.widget.SearchBox.searchEngineCache = resultsObject.resultset.results;
		//console.log("put " + PDL.widget.SearchBox.searchEngineCache.length + " records into cache");
	},
	
	// template search results pane
	setSearchEngineResults : function(resultsData) {
		var resultsArray = resultsData;
		var resultsTable = document.getElementById("intranetResults");
		if(resultsTable != null) {
			
			var resultsHTML = '<table id="searchResultsTable">';
			//var resultsHTML = '<div>';
			if(resultsArray.length > 0) {
				PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Found " + resultsArray.length + " document(s).</h3>");
			} else {
				PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>No documents found.</h3>");
			}
			for(var i = 0; i < resultsArray.length; i++) {
			
			
				var elementId = "se_" + i;
				var docDetailsArray = resultsArray[i].custom1.split(",");
				var docDetails = {};
				var docType = docDetailsArray[0].substring(0,1);
				if(docType == "p") {
					docDetails["docType"] = "page";
					docDetails["rowId"] = docDetailsArray[0].substring(2, docDetailsArray[0].length);
					docDetails["createdDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[1]);
					docDetails["updatedDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[2]);
					
					docDetails["postedBy"] = docDetailsArray[3];
					//docDetails["docTitle"] = docDetailsArray[4];
					docDetails["docTitle"] = resultsArray[i].title;
					docDetails["docFileName"] = docDetailsArray[4];
					docDetails["icon"] = "world.gif";
					docDetails["actionIcon"] = "open_page.gif";
				} else if(docType == "d") {
					docDetails["docType"] = "document";
					docDetails["rowId"] = docDetailsArray[0].substring(2, docDetailsArray[0].length);
					docDetails["filesize"] = docDetailsArray[1];
					docDetails["createdDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[2]);
					docDetails["updatedDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[3]);
					
					docDetails["postedBy"] = docDetailsArray[4];
					//docDetails["docTitle"] = docDetailsArray[5];
					docDetails["docTitle"] = docDetailsArray[6];
					docDetails["docFileName"] = docDetailsArray[5];
					docDetails["extension"] = docDetails["docFileName"].substring(docDetails["docFileName"].length - 3, docDetails["docFileName"].length);
					switch(docDetails["extension"]) {
						case "doc":
							docDetails["icon"] = "page_white_word.gif";
						break;
						
						case "rtf":
							docDetails["icon"] = "page_white_word.gif";
						break;
						
						case "dot":
							docDetails["icon"] = "page_white_word.gif";
						break;
						
						case "xls":
							docDetails["icon"] = "page_white_excel.gif";
						break;
						
						case "ppt":
							docDetails["icon"] = "page_white_powerpoint.gif";
						break;
						
						case "pdf":
							docDetails["icon"] = "page_white_acrobat.gif";
						break;
						
						default:
							docDetails["icon"] = "page_white_magnify.gif";
						break;
					}
					
					docDetails["actionIcon"] = "download.gif";
					
				}				
							
				//resultsHTML += '<div>';
				
				if(i % 2 == 0){
					resultsHTML += '<tr class="even">';
				} else {
					resultsHTML += '<tr class="odd">';
				}
				//alert( docType );
				if(docType == "p") {
					
					resultsHTML += '<td id="searchResultTitle">' + '<a href="javascript:PDL.widget.SearchBox.setSearchEngineData(' + "'" + docDetails["rowId"] + "'" + ');" id="' + elementId + docDetails["rowId"] + '">' + docDetails["docTitle"] + '</a></td><td id="searchResultLastUpdated">' + (docDetails["updatedDate"].getMonth()+1) + "/" + docDetails["updatedDate"].getDate() + "/" + docDetails["updatedDate"].getFullYear() + '</td><td id="searchResultDocTypeImage"><img src="img/' + docDetails["icon"] + '"</td><td id="searchResultAction" align="right"><a href="' + resultsArray[i].custom4 + '" target="_blank" /><img src="img/' + docDetails["actionIcon"] + '" /></a></td></tr>';
					//resultsHTML += '<div>' + docDetails["docTitle"] + '</div></div>';
				} else if(docType == "d") {

					resultsHTML += '<td id="searchResultTitle">' + '<a href="javascript:PDL.widget.SearchBox.setSearchEngineData(' + "'" + docDetails["rowId"] + "'" + ');" id="' + elementId + docDetails["rowId"] + '">' + docDetails["docTitle"] + '</a></td><td id="searchResultLastUpdated">' + (docDetails["updatedDate"].getMonth()+1) + "/" + docDetails["updatedDate"].getDate() + "/" + docDetails["updatedDate"].getFullYear() + '</td><td id="searchResultDocTypeImage"><img src="img/' + docDetails["icon"] + '"</td><td id="searchResultAction" align="right"><a href="' + resultsArray[i].custom4 + '" /><img src="img/' + docDetails["actionIcon"] + '" /></a></td></tr>';
					//resultsHTML += '<div>' + docDetails["docTitle"] + '</div></div>';
				}
			}
			resultsHTML += '</table>';
			//resultsHTML += '</div>';
			resultsTable.innerHTML = resultsHTML;
			//alert( resultsTable.innerHTML );
		}
	},
	
	// set roster data using JSON object 
	setSearchEngineData : function(key) {
		var result = PDL.widget.SearchBox.findDownloadById(key);
		var resultFormatted = [];
		var docDetailsArray = result.custom1.split(",");
		var docDetails = {};
		docDetails["description"] = "This document does not have a decription.";
		if(docDetailsArray[0].substring(0,1) == "p") {
			docDetails["docType"] = "page";
			docDetails["rowId"] = docDetailsArray[0].substring(2, docDetailsArray[0].length);
			docDetails["filesize"] = "N/A";
			docDetails["createdDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[1]);
			docDetails["updatedDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[2]);
			
			docDetails["postedBy"] = docDetailsArray[3];
			docDetails["icon"] = "world.gif";
		} else if(docDetailsArray[0].substring(0,1) == "d") {
			docDetails["docType"] = "document";
			docDetails["rowId"] = docDetailsArray[0].substring(2, docDetailsArray[0].length);
			docDetails["filesize"] = docDetailsArray[1] + " KB";
			docDetails["createdDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[3]);
			docDetails["updatedDate"] = PDL.util.Date.parseSQLDate(docDetailsArray[3]);
			docDetails["postedBy"] = docDetailsArray[4];
			console.log( docDetailsArray );
			docDetails["description"] = ( docDetailsArray[8] == "" ? "This document does not have a description" : docDetailsArray[8] );
			docDetails["extension"] = result.custom4.substring(result.custom4.length - 4, result.custom4.length);
			switch(docDetails["extension"]) {
				case "doc":
					docDetails["icon"] = "page_white_word.gif";
				break;
						
				case "pdf":
					docDetails["icon"] = "page_white_acrobat.gif";
				break;
				
				default:
					docDetails["icon"] = "page_white_magnify.gif";
				break;
						
			}
					
		}
		
		var resultsHTML = '<div id="searchEngineResultDetailContainer">' + 
								'<table id="searchEngineResultDetailContainerTable">' +
								'<tr>' +
									'<td>' +
									'<table width="100%">' +
									'<tr>' +
										'<td id="sefilesizeLabel">File Size:</td>' +
										'<td id="sefilesize">' + docDetails["filesize"] + '</td>' +
										'<td id="sefirstpostedLabel">First Posted:</td>' +
										'<td id="sefirstposted">' + (docDetails["createdDate"].getMonth()+1) + "/" + docDetails["createdDate"].getDate() + "/" + docDetails["createdDate"].getFullYear() + '</td>' +
										'<td id="selastupdatedLabel">Last Updated:</td>' +
										'<td id="selastposted">' + (docDetails["updatedDate"].getMonth()+1) + "/" + docDetails["updatedDate"].getDate() + "/" + docDetails["updatedDate"].getFullYear() + '</td>' +
										'<td id="sepostedbyLabel">Posted By:</td>' +
										'<td id="sepostedby">' + docDetails["postedBy"] + '</td>' +
									'</tr>' +
									/*'<tr>' + 
										'<td id="sekeywords" colspan="8"><div id="sekeywordsLabel">Keywords:</div>&nbsp;&nbsp;' + resultFormatted['keywords'] + '</td>' +
									'</tr>' +*/
									'<tr>' + 
										'<td id="sedescription" colspan="8">' + docDetails["description"] + '</td>' +
									'</tr>' +
									'</table>' +
									'</td>' +
								'</tr>' +
								'</table>' +
							'</div>';
							
		var serdContainer = document.getElementById('intranetResultsDetails');
		if(serdContainer != null) {
			serdContainer.innerHTML = resultsHTML;
		}
		
	},
	
	// find download by id
	findDownloadById : function(id) {
		for(var i = 0; i < PDL.widget.SearchBox.searchEngineCache.length; i++) {
			var docDetail = PDL.widget.SearchBox.searchEngineCache[i].custom1.split(",");
			var key = docDetail[0].substring(2, docDetail[0].length);
			if(id == key) {
				return PDL.widget.SearchBox.searchEngineCache[i];
			}
		}	
	},
	
	// fill search engine cache
	fillSearchEngineCache : function(searchString) {
		if(searchString == "" || searchString == undefined) {
			PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Enter a keyword to search...</h3>");
		} else {
			PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Searching...</h3>");
		}
		// fill search engine cache if it hasn't already been filled, then populate results
		PDL.widget.SearchBox.searchEngineCache = [];
			var url = encodeURI("remote/searchWebService.cfm?searchType=cms&searchString=" + searchString);
			var callback = { 
		  		success: function(o) { 
		  			PDL.widget.SearchBox.setSearchEngineCache(o.responseText); // TODO: finish setSearchEngineCache method
		  			if(searchString == "" || searchString == undefined) {
		  				PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Enter a keyword to search...</h3>");
		  				//PDL.widget.SearchBox.setSearchEngineResults(new Array());
		  			} else {
		  				PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Searching...</h3>");
		  				PDL.widget.SearchBox.setSearchEngineResults(PDL.widget.SearchBox.searchEngineCache); // TODO: finish setSearchEngineResults method
		  			}
		  		}, 
		  		failure: PDL.widget.SearchBox.handleFailure // TODO: setup failure SearchBox situation
			}
			var query = YAHOO.util.Connect.asyncRequest("GET", url, callback);
	},
	
	// add content to the bottom of the current content stack
	rosterKeystrokeHandler : function(e) {
		//console.log(e.keyCode);
		switch(e.keyCode) {
			// if spacebar
			case 32:
				if(PDL.widget.SearchBox.rosterEventStack.length == 0) {
					PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
				} else {
					PDL.widget.SearchBox.popRosterKeystrokeTimeout();
					PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
				}
			break;
			// if backspace
			case 8:
				if(PDL.widget.SearchBox.rosterEventStack.length == 0) {
					PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
				} else {
					PDL.widget.SearchBox.popRosterKeystrokeTimeout();
					PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
				}
			break;
			
			// if a - z
			default:
				
				//console.log( e.keyCode );
			
				// if a - z, @, or . 
				if( e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode == 50 || e.keyCode == 190 || e.keyCode == 109 ) {
					if(PDL.widget.SearchBox.rosterEventStack.length == 0) {
						// if event stack is empty push new event onto it
						PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
					} else {
						// if event stack is not empty clear event and push new event onto it
						PDL.widget.SearchBox.popRosterKeystrokeTimeout();
						PDL.widget.SearchBox.pushRosterKeystrokeTimeout();
					}
				}
			break;
		}
		
	},
	
	pushRosterKeystrokeTimeout : function() {
		PDL.widget.SearchBox.rosterEventStack.push(window.setTimeout('PDL.widget.SearchBox.getRosterQuery()', '50'));
	},
	
	popRosterKeystrokeTimeout : function() {
		var timeoutID = PDL.widget.SearchBox.rosterEventStack.pop();
		window.clearTimeout(timeoutID);
	},
	
	// create search container
	buildSearchContainer : function() {
		var searchOuterContainer = document.createElement("DIV");
		searchOuterContainer.id = "searchOuterContainer";
		searchOuterContainer.style.width = "583px";
		searchOuterContainer.style.visibility = "hidden";
		var searchContainer = document.createElement("DIV");
		searchContainer.id = "searchContainer";
		searchContainer.style.height = "0px";
		searchContainer.style.visible = "hidden";
		searchOuterContainer.appendChild(searchContainer);
		return searchOuterContainer;
	},
	
	// create search intranet container
	buildIntranetSearchContainer : function() {
		//<a href="#" title="Open Advanced Search" id="intranetAdvancedSearch">Advanced Search</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" title="Open Search Help" id="intranetSearchHelp">Help</a>
		return '<div id="intranetSearchContainer">' + 
			        '<div id="intranetResults">&nbsp;</div>' + 
			        '<div id="intranetResultsDetails">&nbsp;</div>' + 
			        '<div id="intranetSearchControls">' + 
			        	'<div id="intranetSearchControlsLeft">&nbsp;</div>' +
			        	'<div id="intranetSearchControlsRight">&nbsp;&nbsp;<a href="#" id="closeSearchBoxLink" title="Close"><img id="closeSearchBoxIcon" src="img/cancel_red.gif"></a></div>' + 
			        '</div>' + 
			   '</div>';
			
	},
	
	// create roster search container
	buildRosterSearchContainer : function() {
		//<a href="#" title="Open Advanced Search" id="rosterAdvancedSearch">Advanced Search</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" title="Open Search Help" id="rosterSearchHelp">Help</a>	
		return '<div id="rosterSearchContainer">' + 
					'<div id="rosterResultsContainer">' + 
						'<div id="rosterResults">' + 
							
						'</div>' +
					'</div>' + 
					'<div id="rosterResultsDetails">' +

					'</div>' +
					//'<div id="rosterAdvancedSearchContainer">' + 
						//'<div id="rosterAdvancedSearchFiltersContainer"><table><tr><td><div>Division  ' + this.buildRosterDivisionsHTML() + '</div></td></tr><tr><td><div>Department  ' + this.buildRosterDepartmentsHTML() + '</div></td></tr><tr><td><div>Group  ' + this.buildRosterGroupsHTML() + '</div></td></tr><tr><td><div>Territory  ' + this.buildRosterTerritoriesHTML() + '</div></td></tr></table></div>' +
					//'</div>' +
					'<div id="rosterSearchControls">' +
						'<div id="rosterSearchControlsLeft"><a href="http://inside.ncspearson.com/edir/" target="_blank">NCS Pearson Directory</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://intranet.pearsontopearson.com/global_directory/" target="_blank">Pearson Global Directory</a></div>' +
						'<div id="rosterSearchControlsRight">&nbsp;&nbsp;<a href="#" id="closeSearchBoxLink" title="Close"><img id="closeSearchBoxIcon" src="img/cancel_red.gif"></a></div>' +
					'</div>' +
				'</div>';
	
	/*
	 
	 '<div id="rosterAdvancedSearch">' + 
			'<fieldset>' + 
				'<legend><strong>Advanced Search</strong></lengend>' +
					'<table cellspacing="0" cellpadding="5">' +
						'<tr><td><label for="rosterDivision">Division:</label></td><td><select name="rosterDivision" id="rosterDivision"><option value="">Select Division</option></select></td></tr>' +
						'<tr><td><label for="rosterDivision">Department:</label></td><td><select name="rosterDivision" id="rosterDivision"><option value="">Select Division</option></select></td></tr>' +
						'<tr><td><label for="rosterDivision">Group:</label></td><td><select name="rosterDivision" id="rosterDivision"><option value="">Select Division</option></select></td></tr>' +
					'</table>' +
			'</fieldset>' +
		'</div>' +
	  
	 */
	
	},
	
	buildRosterAdvancedSearch : function() {
		
		var rosterAdvancedSearchEl = document.createElement( "DIV" );
		rosterAdvancedSearchEl.id = "rosterAdvancedSearchContainer";
		rosterAdvancedSearchEl.innerHTML = "Advanced Search";
		
		var rosterSearchContainerEl = document.getElementById( "rosterSearchContainer" );
		var rosterSearchControlsEl = document.getElementById( "rosterSearchControls" );
		
		rosterSearchContainerEl.insertBefore( rosterAdvancedSearchEl, rosterSearchControlsEl );
		
		return rosterAdvancedSearchEl;
		
	},
	
	//|&nbsp;&nbsp;<a class="rosterImageButton" href="javascript:PDL.widget.SearchBox.toggleAdvancedSearch();"><img border="0" src="img/application_form_magnify.gif" style="vertical-align: bottom;" /></a>
	
	buildRosterDivisionsHTML : function() {
		
		var html = '<select id="rosterDivision" class="search" onchange="javascript:PDL.widget.SearchBox.searchRosterByFilter( ( this.value != \'\' ? \'division:\' + this.value : \'\' ) );"><option value="">Select a Division</option>';
		var rosterDivisions = PDL_ROSTER_DATA.positionFilters.companyDivisions;
		
		for( var i = 0; i < rosterDivisions.length; i++ ) {
			
			html += '<option value="' + rosterDivisions[i] + '">' + rosterDivisions[i] + '</option>';
			
		}
		
		html += '</select>';
		
		return html;
		
	},

	buildRosterDepartmentsHTML : function() {
		
		var html = '<select id="rosterDepartment" class="search" onchange="javascript:PDL.widget.SearchBox.searchRosterByFilter( ( this.value != \'\' ? \'department:\' + this.value : \'\' ) );"><option value="">Select a Department</option>';
		var rosterDepartments = PDL_ROSTER_DATA.positionFilters.companyDepartments;
		
		for( var i = 0; i < rosterDepartments.length; i++ ) {
			
			html += '<option value="' + rosterDepartments[i] + '">' + rosterDepartments[i] + '</option>';
			
		}
		
		html += '</select>';
		
		return html;
		
	},
	
	buildRosterGroupsHTML : function() {
		
		var html = '<select id="rosterGroup" class="search" onchange="javascript:PDL.widget.SearchBox.searchRosterByFilter( ( this.value != \'\' ? \'group:\' + this.value : \'\' ) );"><option value="">Select a Group</option>';
		var rosterGroups = PDL_ROSTER_DATA.positionFilters.companyGroups;
		
		for( var i = 0; i < rosterGroups.length; i++ ) {
			
			html += '<option value="' + rosterGroups[i] + '">' + rosterGroups[i] + '</option>';
			
		}
		
		html += '</select>';
		
		return html;
		
	},
	
	buildRosterTerritoriesHTML : function() {
		
		var html = '<select id="rosterTerritory" class="search" onchange="javascript:PDL.widget.SearchBox.searchRosterByFilter( ( this.value != \'\' ? \'territory:\' + this.value : \'\' ) );"><option value="">Select a Territory</option>';
		var rosterTerritories = PDL_ROSTER_DATA.positionFilters.companyTerritories;
		
		for( var i = 0; i < rosterTerritories.length; i++ ) {
			
			html += '<option value="' + rosterTerritories[i] + '">' + rosterTerritories[i] + '</option>';
			
		}
		
		html += '</select>';
		
		return html;
		
	},

	// find roster contact by id
	findRosterContactById : function(id) {
		for(var i = 0; i < PDL.widget.SearchBox.rosterCache.length; i++) {
			if(id == PDL.widget.SearchBox.rosterCache[i].rosterid) {
				return PDL.widget.SearchBox.rosterCache[i];
			}
		}	
	},
	
	// fill roster cache
	fillRosterCache : function() {
		
		this.onStartRosterDataLoad.fire();
		
		// fill roster cache if it hasn't already been filled, then populate results
		PDL.widget.SearchBox.rosterCache = [];
			/*var url = encodeURI("remote/searchWebService.cfm?searchType=roster&searchString=");
			var callback = { 
		  		success: function(o) {
					
		  			PDL.widget.SearchBox.setRosterCache(o.responseText);
		  			PDL.widget.SearchBox.onRosterDataLoad.fire(); 
		  			//PDL.widget.SearchBox.setRosterResults(PDL.widget.SearchBox.rosterCache);
		  			//PDL.widget.SearchBox.setRosterData(PDL.widget.SearchBox.rosterCache[0].rosterid);
		  		}, 
		  		failure: PDL.widget.SearchBox.handleFailure
			}
			
			var query = YAHOO.util.Connect.asyncRequest("GET", url, callback);
			*/
			
			PDL.widget.SearchBox.setRosterCache();
		  PDL.widget.SearchBox.onRosterDataLoad.fire(); 
	},
	
	// clear roster cache
	clearRosterCache : function() {
		PDL.widget.SearchBox.rosterCache = [];
	},
	
	// get current search query from rosterSearchField
	getRosterQuery : function() {
		
		var rosterField = document.getElementById("rosterSearchField");
		
		if(rosterField != null) {
	
			// search roster and store results in rosterResults
			var rosterResults = PDL.widget.SearchBox.searchRosterCache(rosterField.value);
				
			// set roster results based upon results
			PDL.widget.SearchBox.setRosterResults(rosterResults);
		
		}
		
	},
	
	// return first and last name criteria as well as search type (lastname or firstname search) as criteria object
	getRosterCriteria : function(searchCriteria) {
		//console.log(searchCriteria);
		var criteriaString = PDL.util.Text.trim( searchCriteria );
		var criteria = {};
		criteria.firstname = "";
		criteria.lastname = "";
		criteria.division = "";
		criteria.department = "";
		criteria.group = "";
		criteria.territory = "";
		criteria.phone = "";
		criteria.voicemail = "";
		criteria.cell = "";
		criteria.fax = "";
		criteria.extension = "";
		criteria.searchType = "";
		
		if(searchCriteria.length == 0) {
			
			criteria.searchType = "blank";
			
		} else {
			
			/*
			 * Position filter section. If any of these match the search type will be 'positionFilter'
			 * 
			 */
			
			var divisionRE = /(division:)(.*)/;
			var departmentRE = /(department:)(.*)/;
			var groupRE = /(group:)(.*)/;
			var territoryRE = /(territory:)(.*)/;
			
			if( divisionRE.test( criteriaString ) ) {
				
				criteria.searchType = "positionFilter";
				criteria.division = criteriaString.match( divisionRE )[2];
				//console.log( criteria.division );
				
			}
			
			if( departmentRE.test( criteriaString ) ) {
				
				criteria.searchType = "positionFilter";
				criteria.department = criteriaString.match( departmentRE )[2];
				//console.log( criteria.department );
				
			}
			
			if( groupRE.test( criteriaString ) ) {
				
				criteria.searchType = "positionFilter";
				criteria.group = criteriaString.match( groupRE )[2];
				//console.log( criteria.group );
				
			}
			
			if( territoryRE.test( criteriaString ) ) {
				
				criteria.searchType = "positionFilter";
				criteria.territory = criteriaString.match( territoryRE )[2];
				//console.log( criteria.territory );
				
			}
			
			// if email seach
			
			if( criteriaString.indexOf( "@" ) != -1 ) {
				
				criteria.searchType = "email";
				criteria.email = criteriaString;
				
			}
			
			// if reverse phone search

			if( criteriaString.match( /\d{3}-\d{3}-\d{4}/gi ) != null ) {
				
				criteria.searchType = "phone";
				criteria.phone = criteriaString;
				criteria.voicemail = criteriaString;
				criteria.mobile = criteriaString;
				criteria.fax = criteriaString;
				
			}
			
			// if extension search
			
			if( criteriaString.match( /#\d{4}/g ) != null ) {
				
				criteria.searchType = "extension";
				criteria.extension = criteriaString.substr( 1, criteriaString.length - 1 );
				
			}
			
			if( criteria.searchType.length == 0 ) {
			
				// check if latname or firstname search
				// check if firstname search
				if(searchCriteria.indexOf(",") == -1) {
						// if space is present
						if(searchCriteria.indexOf(" ") >= 0) {
							criteria.firstname = PDL.util.Text.trim(searchCriteria.substring(0, searchCriteria.indexOf(" ")));
							// if space is end of criteria, don't do anything, otherwise set lastname
							if(searchCriteria.indexOf(" ")+1 != searchCriteria.length) {
								criteria.lastname =  PDL.util.Text.trim(searchCriteria.substring(searchCriteria.indexOf(" ")+1, searchCriteria.length).toLowerCase());
							}
						// if space is not present
						} else {
							criteria.firstname =  PDL.util.Text.trim(searchCriteria.toLowerCase());
						}
						criteria.searchType = "firstname";
						//console.log("firstname search:: " + "firstname: " + firstname + " lastname: " + lastname);
				} else { // if lastname search
					criteria.lastname =  PDL.util.Text.trim(searchCriteria.substring(0, searchCriteria.indexOf(",")).toLowerCase());
					// if comma is end of criteria
					if(searchCriteria.indexOf(",") != searchCriteria.length) {
						criteria.firstname =  PDL.util.Text.trim(searchCriteria.substring(searchCriteria.indexOf(",")+2, searchCriteria.length).toLowerCase());
					}
					criteria.searchType = "lastname";	
					//console.log("lastname search:: " + "firstname: " + firstname + " lastname: " + lastname);			
				}
			}	
		}
		//console.log( "searchType: " + criteria.searchType );
		return criteria;
	},
	
	// check roster cache
	searchRosterCache : function( searchString ) {
		
		var criteria = this.getRosterCriteria( searchString );
		var resultArray = new Array();
		
		// if cache isn't empty search it
		if(PDL.widget.SearchBox.rosterCache.length > 0) {
			
			if(criteria.searchType == "firstname") {
				for (var i = 0; i < PDL.widget.SearchBox.rosterCache.length; i++) {
					var currentFirstName = PDL.widget.SearchBox.rosterCache[i].rosterfirstname;
					var currentLastName = PDL.widget.SearchBox.rosterCache[i].rosterlastname;
	
					if(currentFirstName.match(new RegExp("^" + criteria.firstname, "i")) != null) {
						// if space present, compare lastname of rostername
						if(criteria.lastname.length > 0) {
							if(currentLastName.match(new RegExp("^" + criteria.lastname, "i")) != null) {
								resultArray.push(PDL.widget.SearchBox.rosterCache[i]);
							}
						} else {
							resultArray.push(PDL.widget.SearchBox.rosterCache[i]);
						}
					} else if(currentLastName.match(new RegExp("^" + criteria.firstname, "i")) != null) {
							resultArray.push(PDL.widget.SearchBox.rosterCache[i]);
					}
				}
			} else if(criteria.searchType == "lastname") {
				for (var i = 0; i < PDL.widget.SearchBox.rosterCache.length; i++) {
					var currentFirstName = PDL.widget.SearchBox.rosterCache[i].rosterfirstname;
					var currentLastName = PDL.widget.SearchBox.rosterCache[i].rosterlastname;
					
					if(currentLastName.match(new RegExp("^" + criteria.lastname, "i")) != null) {
						// if comma present, compare firstname of rostername
						if(criteria.firstname.length > 0) {
							if(currentFirstName.match(new RegExp("^" + criteria.firstname, "i")) != null) {
								resultArray.push(PDL.widget.SearchBox.rosterCache[i]);
							}
						} else {
							resultArray.push(PDL.widget.SearchBox.rosterCache[i]);
						}
					}
				}
				
			} else if( criteria.searchType == "positionFilter" ) {
					
					for (var i = 0; i < this.rosterCache.length; i++) {
						
						var currentDivision = this.rosterCache[i].rosterdivision;
						//console.log( currentDivision );
						if( currentDivision.match( new RegExp( criteria.division ) ) ) {
							
							resultArray.push( this.rosterCache[i] );
							
						}
						/*
						var currentDepartment = this.rosterCache[i].rosterdepartment;
						//console.log( currentDivision );
						if( currentDepartment.match( new RegExp( criteria.department ) ) ) {
							
							resultArray.push( this.rosterCache[i] );
							
						} 						
						*/
				}
					
			} else if( criteria.searchType == "email" ) {
				
				for (var i = 0; i < this.rosterCache.length; i++) {
						
						var currentEmail = this.rosterCache[i].rosteremail.toLowerCase();
						
						if( currentEmail.match( new RegExp( criteria.email ) ) ) {
							
							resultArray.push( this.rosterCache[i] );
							
						} 						
		
				}
				
			} else if( criteria.searchType == "phone" ) {
				
				for (var i = 0; i < this.rosterCache.length; i++) {
						
						var currentPhone = this.rosterCache[i].rosterphone == 'undefined' ? "" : this.rosterCache[i].rosterphone;
						var currentVoicemail = this.rosterCache[i].rostervoicemail == 'undefined' ? "" : this.rosterCache[i].rostervoicemail;
						var currentMobile = this.rosterCache[i].rostermobile == 'undefined' ? "" : this.rosterCache[i].rostermobile;
						var currentFax = this.rosterCache[i].rosterfax == 'undefined' ? "" : this.rosterCache[i].rosterfax;
						//console.log( "phone: " + currentPhone + " voicemail: " + currentVoicemail + " cell: " + currentCell + " fax: " + currentFax );
						if( currentPhone.match( new RegExp( criteria.phone ) ) || currentVoicemail.match( new RegExp( criteria.voicemail ) ) || currentMobile.match( new RegExp( criteria.mobile ) ) || currentFax.match( new RegExp( criteria.fax ) ) ) {
							
							resultArray.push( this.rosterCache[i] );
							
						} 						
		
				}	
			
			} else if( criteria.searchType == "extension" ) {
			
				for (var i = 0; i < this.rosterCache.length; i++) {
						
						var currentExtension = this.rosterCache[i].rosterphone;
						currentExtension = currentExtension.substr( currentExtension.length - 4, currentExtension.length -1 );
						
						//console.log( extension );
						if( currentExtension.match( criteria.extension ) ) {
							
							resultArray.push( this.rosterCache[i] );
							
						} 						
		
				}		
			
			}else if(criteria.searchType == "blank") {
					
					// fire custom event
					PDL.widget.SearchBox.onRosterBlankSearch.fire();
											
			}
			
		} else { // if no contact in rosterCache
			
				// fire custom event
				PDL.widget.SearchBox.onRosterBlankSearch.fire();
			
		}
		
		return resultArray;
	
	},
	
	// set roster cache
	setRosterCache: function() {
		var resultsObject = PDL_ROSTER_DATA;
		PDL.widget.SearchBox.rosterCache = resultsObject.contacts.results;
		PDL.widget.SearchBox.onRosterDataLoad.fire();
		//console.log("put " + PDL.widget.SearchBox.rosterCache.length + " records into cache");
	},
	
	// template roster results pane
	setRosterResults : function(resultsData) {
		//alert( "starting..." );
		var start = new Date().getTime();		
		var resultsArray = resultsData;
		var resultsTable = document.getElementById("rosterResults");
		
		var rosterSearchFieldEl = document.getElementById( "rosterSearchField" );
		
		if(resultsArray.length > 0 && rosterSearchFieldEl.value != '' ) {
			
			PDL.widget.SearchBox.buildRosterDetail(resultsArray[0].rosterid);		
			
		} else if( resultsArray.length == 0 && rosterSearchFieldEl.value != '' ) {
			
			PDL.widget.SearchBox.onRosterNoResults.fire();
			
		}
		//console.log( resultsArray.length );
		if(resultsTable != null) {
			
			//var resultsHTML = '<table id="rosterResultsTable">';
			//var tr = '';
			var rosterTable = document.createElement( "table" );
			rosterTable.id = "rosterResultsTable";
			var tbody = document.createElement( "tbody" );
			var tableFragment = document.createDocumentFragment();
			var trEl, tdEl;
			
			for(var i = 0; i < resultsArray.length; i++) {
				
				trEl = document.createElement( "tr" );
				var elementId = "rc_" + i;
				//tr = '';
				if(i % 2 === 0){
					//tr += '<tr class="even">';
					trEl.className = "even";
					
				} else {
					//tr += '<tr class="odd">';
					trEl.className = "odd";
				}
				
				tdEl = document.createElement( "td" );
				tdEl.innerHTML = '<a href="javascript:PDL.widget.SearchBox.buildRosterDetail(' + resultsArray[i].rosterid + ');" id="' + elementId + '">' + resultsArray[i].rostername + '</a>';
				trEl.appendChild( tdEl );
				
				tdEl = document.createElement( "td" );
				tdEl.innerHTML = resultsArray[i].rosterdepartment;
				trEl.appendChild( tdEl );
				
				tdEl = document.createElement( "td" );
				tdEl.innerHTML = resultsArray[i].rostertitle;
				trEl.appendChild( tdEl );
				
				tdEl = document.createElement( "td" );
				tdEl.innerHTML = resultsArray[i].rosterphone;
				trEl.appendChild( tdEl );
				
				tableFragment.appendChild( trEl );
				//tr += '<td>' + '<a href="javascript:PDL.widget.SearchBox.setRosterData(' + resultsArray[i].rosterid + ');" id="' + elementId + '">' + resultsArray[i].rostername + '</a></td><td>' + resultsArray[i].rosterdepartment + '</td><td>' + resultsArray[i].rostertitle + '</td><td>' + resultsArray[i].rosterphone + '</td>';
				
				//tr += '</tr>';
				
			//resultsHTML += tr
			}
			start = new Date().getTime();
			tbody.appendChild( tableFragment );
			
			rosterTable.appendChild( tbody );
			
			resultsTable.innerHTML = '';
			resultsTable.appendChild( rosterTable );
			//resultsHTML += '</table>';
			
			//resultsTable.innerHTML = resultsHTML;
		
		}
		
		var end = new Date().getTime();
		
		//alert( ( end - start ) / 1000 + " seconds");
		
		this.isRosterDataLoaded = true;
		PDL.widget.SearchBox.onRosterResultsLoad.fire();
	
	},
	
	// set roster data using JSON object 
	buildRosterDetail : function(rosterid) {
		var contact = PDL.widget.SearchBox.findRosterContactById(rosterid);
		var contactFormatted = [];
		
		contactFormatted['rosteraddress'] = '';
		
		for ( var i in contact ) {
		
				switch(i) {
					
					case "rosterphoto":
						contactFormatted[i] = '<img id="rosterphoto" src="img/roster/' + contact[i] + '" width="144" height="144" />';
					break;
					
					case "rosteremail":
						contactFormatted[i] = '<a href="mailto:' + contact[i] + '">' + contact[i] + '</a>';
					break;
					
					case "rostermap":
						contactFormatted[i] = '<a href="http://maps.google.com/maps?q=' + contact[i] + '" target="_blank">Map Address</a>';
					break;
					
					case "rosteraddressstreet":
						contactFormatted['rosteraddress'] += contact['rosteraddressstreet'];
						
						if( contact['rosteraddresssuite'] != '' ) {
							contactFormatted['rosteraddress'] += '<br />' + contact['rosteraddresssuite'];
						}
						
						if( contact['rosteraddresscitystatezip'] != '' ) {
							contactFormatted['rosteraddress'] += '<br />' + contact['rosteraddresscitystatezip'];
						}
						
					break;
					
					case "rostertitle":
						if(contact[i].length > 35) {
							contactFormatted[i] = contact[i].substring(0, 33) + "...";
						} else {
							contactFormatted[i] = contact[i];
						}
					break;
					
					case "rosterreportsto":
					
						if( contact[i].length == 0 ) {
							
							contactFormatted[i] = 'N/A'
							
						} else {
							
							contactFormatted[i] = '<a href="javascript:PDL.widget.SearchBox.searchRosterByFilter(\'' + contact[i] + '\');">' + contact[i] + '</a>';
						
						}
					
					break;
					
					case "rosteradminassistant":
					
						if( contact[i].length == 0 ) {
							
							contactFormatted[i] = 'N/A';
							
						} else {
							
							contactFormatted[i] = '<a href="javascript:PDL.widget.SearchBox.searchRosterByFilter(\'' + contact[i] + '\');">' + contact[i] + '</a>';
						
						}
					
					break;
					
					default:
						if(contact[i].length == 0 || contact[i] == undefined) {
							contactFormatted[i] = 'N/A';
						} else {
							if(contact[i].length > 23) {
								contactFormatted[i] = contact[i].substring(0, 23) + "...";
							} else {
								contactFormatted[i] = contact[i];
							}
						}
					break;
				
				}
			
			
		}
		
		var resultsHTML = '<div id="rosterIdentityContainer">' + 
							'<div id="rosterPhotoContainer">' + contactFormatted['rosterphoto'] + '</div>' +
							  	'<div id="rosterIdentity">' +
									'<table id="rosterIdentityTable">' +
									'<tr>' +
										'<td>' +
										'<table>' +
										'<tr>' +
											'<td id="rostername">' + contactFormatted['rostername'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td id="rostertitle">' + contactFormatted['rostertitle'] + '</td>' +
										'</tr>' +
										'<tr>' + 
											'<td id="rosteremail">' + contactFormatted['rosteremail'] + '</td>' +
										'</tr>' +
										'</table>' +
										'</td>' +
									'</tr>' +
									'<tr>' +
										'<td>' +
										'<table>' +
										'<tr>' +
											'<td id="rosterReportsToLabel">Reports To:</td>' +
											'<td id="rosterreportsto">' + contactFormatted['rosterreportsto'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td id="rosterAdminAssistantLabel">Admin Assistant:</td>' +
											'<td id="rosteradminassistant">' + contactFormatted['rosteradminassistant'] + '</td>' +
										'</tr>' +
										'</table>' +
										'</td>' +
									'</tr>' +
									'<tr>' +
										'<td>' +
										'<table>' +
										'<tr>' +
											'<td id="rosterDivisionLabel">Division:</td>' +
											'<td id="rosterdivision">' + contactFormatted['rosterdivision'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td id="rosterDepartmentLabel">Department:</td>' +
											'<td id="rosterdepartment">' + contactFormatted['rosterdepartment'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td id="rosterGroupLabel">Group:</td>' +
											'<td id="rostergroup">' + contactFormatted['rostergroup'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td id="rosterTerritoryLabel">Territory:</td>' +
											'<td id="rosterterritory">' + contactFormatted['rosterterritory'] + '</td>' +
										'</tr>' +
										'</table>' +
										'</td>' +
									'</tr>' +
									'</table>' +
								'</div>' +
							'</div>' +
							'<div id="rosterContactContainer">' +
								'<div id="rosterContact">' +
									'<table id="rosterContactTable">' +
									'<tr>' +
										'<td id="rosterPhoneLabel"><img src="img/phone.gif" /></td>' + 
										'<td id="rosterphone">' + contactFormatted['rosterphone'] + '</td>' +
									'</tr>' +
									'<tr>' +
										'<td id="rosterVoiceMailLabel"><img src="img/extension.gif" /></td>' + 
										'<td id="rostervoicemail">' + contactFormatted['rostervoicemail'] + '</td>' +
									'</tr>' +
									'<tr>' +
										'<td id="rosterMobileLabel"><img src="img/mobile.gif" /></td>' + 
										'<td id="rostermobile">' + contactFormatted['rostermobile'] + '</td>' +
									'</tr>' +
									'<tr>' +
										'<td id="rosterFaxLabel"><img src="img/fax.gif" /></td>' + 
										'<td id="rosterfax">' + contactFormatted['rosterfax']+ '</td>' +
									'</tr>' +
									'<tr>' +
										'<td id="rosteraddress" colspan="2">' + contactFormatted['rosteraddress'] + '</td>' +
									'</tr>' +
									'<tr>' +
										'<td id="rosterMapLabel"><img src="img/map.gif" /></td>' + 
										'<td id="rostermap">' + contactFormatted['rostermap'] + '</td>' +
									'</tr>' +
									'</table>' +
								'</div>' +
							'</div>';
							
		
			
		var rosterIdentityContainer = document.getElementById('rosterResultsDetails');
		if(rosterIdentityContainer != null) {
			rosterIdentityContainer.innerHTML = resultsHTML;
		}
			
		
	},
	
	// set search engine results
	setSearchEngineResultsMock : function() {
	 var searchResultsContainer = document.getElementById("intranetResults");
	 if(searchResultsContainer != null) {
	 	searchResultsContainer.innerHTML = '<img src="img/searchResultsMock.jpg" />';
	 }
	},
	
	// set search engine result details
	setSearchEngineResultDetailMock : function() {
	var searchResultsDetailsContainer = document.getElementById("intranetResultsDetails");
		if(searchResultsDetailsContainer != null) {
	 		searchResultsDetailsContainer.innerHTML = '<img src="img/searchResultDetailsMock.jpg" />';
		 }
	},
	
	searchRosterByFilter : function( filter ) {
		
		this.setRosterField( filter );
		this.getRosterQuery();
		
	},
	
	clearRosterResults : function() {
		
		this.setRosterResults( [] );
		
	},
	
	// set loading inidicator image
	setLoadingIndicator : function(container) {
		var loadingContainer = document.getElementById(container);
		if(loadingContainer != null) {
			loadingContainer.innerHTML = '<table id="resultsloadingIndicator"><tr><td><img src="img/indicator_flower.gif" /></td></tr></table>';
		}
	},
	
	// clear loading indicator image
	clearLoadingIndicator : function( paramsArray ) {
		
		var params = paramsArray[0];
		var container = params.target;
		
		var loadingContainer = document.getElementById(container);
		if(loadingContainer != null) {
			loadingContainer.innerHTML = '';
		}
		
	},
	
	
	// show the advanced search interface when icon is clicked
	showRosterAdvancedSearch : function( e ) {
		
		// get the search container element so we can get it's real height
		var searchContainerEl = document.getElementById( "searchContainer" );
		
		// variable to hold the search container's real height
		var searchContainerHeight = searchContainerEl.offsetHeight;					
		var advHeight = 100;
		
		var rosterControlsEl = document.getElementById( "rosterSearchControls" );
		var rosterControlsXY = YAHOO.util.Dom.getXY( rosterControlsEl );
		rosterControlsXY[ 1 ] = rosterControlsXY[ 1 ] + advHeight;
				
		// get the roster container element so we can update it's height
		var rosterContainerEl = document.getElementById( "rosterSearchContainer" );
		//console.log( "before: " + rosterContainerEl.offsetHeight );	
		// update the roster's containers height and setup the advanced search interface once animation is complete
		var updateRSAInterface = function() {
			
			YAHOO.util.Dom.setStyle( rosterContainerEl, "height", ( parseInt( YAHOO.util.Dom.getStyle( rosterContainerEl, "height" ) ) + advHeight + 'px' )  );
			//console.log( "after: " + YAHOO.util.Dom.getStyle( rosterContainerEl, "height" ) + " change: " + ( parseInt( YAHOO.util.Dom.getStyle( rosterContainerEl, "height" ) ) + advHeight ) );
			
		}
		
		// define animations 
		var show = new YAHOO.util.Anim( "searchContainer", { height : { to: searchContainerHeight + advHeight } }, 0.15, YAHOO.util.Easing.easeOut);
		show.onComplete.subscribe( updateRSAInterface );
		
		var moveRosterControls = new YAHOO.util.Motion( "rosterSearchControls", { points : { to: rosterControlsXY } }, 0.12, YAHOO.util.Easing.easeOut );
		//var showAdvancedSearch = new YAHOO.util.Anim( "rosterAdvancedSearchContainer", { height: { to: parseInt( advHeight ) } }, 0.25, YAHOO.util.Easing.easeOut );
		
		// animate
		show.animate();
		moveRosterControls.animate();
		
		
		// build advanced search controls
				
		
		// update advanced search icon and link
		var advSearchLinkEl = document.getElementById( "rosterAdvancedSearchLink" );
		advSearchLinkEl.href = "javascript:PDL.widget.SearchBox.hideRosterAdvancedSearch();";
		advSearchLinkEl.title = "Close Advanced Seach";
		advSearchLinkEl.firstChild.src = "img/application_form_delete.gif";
		
	},
	
	// hide the advanced search interface when icon is clicked
	hideRosterAdvancedSearch : function( e ) {
		
		
		// get the search container element so we can get it's real height
		var searchContainerEl = document.getElementById( "searchContainer" );
		
		// variable to hold the search container's real height
		var searchContainerHeight = searchContainerEl.offsetHeight;					
		
		var advHeight = 0;
		var advCurrentHeightAddition = 100;
		
		var rosterControlsEl = document.getElementById( "rosterSearchControls" );
		var rosterControlsXY = YAHOO.util.Dom.getXY( rosterControlsEl );
		rosterControlsXY[ 1 ] = rosterControlsXY[ 1 ] - advCurrentHeightAddition;		
		
		// get the roster container element so we can update it's height
		var rosterContainerEl = document.getElementById( "rosterSearchContainer" );
		
		// update the roster's containers height and setup the advanced search interface once animation is complete
		var updateRSAInterface = function() {
			
			YAHOO.util.Dom.setStyle( rosterContainerEl, "height", ( parseInt( YAHOO.util.Dom.getStyle( rosterContainerEl, "height" ) ) - advCurrentHeightAddition + 'px' ) ) ;
			
		}
		
		var show = new YAHOO.util.Anim("searchContainer", { height: { to: searchContainerHeight - advCurrentHeightAddition } }, 0.15, YAHOO.util.Easing.easeOut );
		show.onStart.subscribe( updateRSAInterface );
		
		var moveRosterControls = new YAHOO.util.Motion( "rosterSearchControls", { points : { to: rosterControlsXY } }, 0.12, YAHOO.util.Easing.easeOut );
		//var showAdvancedSearch = new YAHOO.util.Anim( "rosterAdvancedSearchContainer", { height: { to: advHeight } }, 0.25, YAHOO.util.Easing.easeOut );
		
		// animate
		show.animate();
		moveRosterControls.animate();
		
		// update advanced search icon and link
		var advSearchLinkEl = document.getElementById( "rosterAdvancedSearchLink" );
		advSearchLinkEl.href = "javascript:PDL.widget.SearchBox.showRosterAdvancedSearch();";
		advSearchLinkEl.title = "Open Advanced Seach";
		advSearchLinkEl.firstChild.src = "img/application_form_magnify.gif";
		
	},
	
	showRosterNoResults : function() {
		
		this.setLoadingMessage( "rosterResultsDetails", '<h3>No results were found.</h3>' );
		
	},
	
	showRosterIntructions : function() {
		//<br /><br />You can also search by <a href="javascript:PDL.widget.SearchBox.searchRosterByFilter(\'caige.nash@pearson.com\');">email</a>, <a href="javascript:PDL.widget.SearchBox.searchRosterByFilter(\'480-429-4066\');">phone</a>, or <a href="javascript:PDL.widget.SearchBox.searchRosterByFilter(\'#4066\');">extension</a>.
		this.setLoadingMessage( "rosterResultsDetails", '<h3>Enter a first or last name to search the roster.</h3>' );
		
	},
	
	// set loading message
	setLoadingMessage : function(container, message) {
		
		var loadingMessageContainer = document.getElementById(container);
		
		if(loadingMessageContainer != null) {
			
			loadingMessageContainer.innerHTML = '<table id="messageLoadingContainer"><tr><td>' + message + '</td></tr></table>';
		}
	},
	
	// clear field if initial text is still present
	clearSearchField : function() {
		if(this.type == "text") {
			this.value = "";
		}
	},
	
	setRosterField : function( value ) {
		
		var rosterField = document.getElementById("rosterSearchField");
		
		if(rosterField != null) {
			
			rosterField.value = value;
			
		}
		
	},
	
	clearRosterField : function() {
		
		var rosterField = document.getElementById("rosterSearchField");
		
		if(rosterField != null) {
			rosterField.value = '';
		}
		
	},
	
	// disable search field until roster has loaded
	disableRosterField : function( e, args, scopeObject ) {
		
		var rosterField = document.getElementById("rosterSearchField");
		
		if(rosterField != null) {
			rosterField.disabled = true;
		}
		
	},
	
	// disable search field until roster has loaded
	enableRosterField : function( e, args, scopeObject ) {
		
		var rosterField = document.getElementById("rosterSearchField");
		
		if(rosterField != null) {
			
			rosterField.disabled = false;
			rosterField.value = '';
			
		}
		
	},
	
	// set roster search field value to 'loading...'
	setRosterFieldLoading : function() {
		
		var rosterField = document.getElementById( "rosterSearchField" );
		
		if( rosterField != null ) {
			
			rosterField.value = "loading...";
			
		}
		
	},
	
	// reset rosterSearchField
	resetRosterField : function() {
		var rosterField = document.getElementById("rosterSearchField");
		if(rosterField != null) {
			rosterField.value = "first or last name";
		}
	},
	
	// reset intranetSearchField
	resetIntranetField : function() {
		var intranetField = document.getElementById("intranetSearchField");
		if(intranetField != null) {
			intranetField.value = "keywords";
		}
	},
	
	// set background color for searchBox
	setBackgroundColor : function(colorCode) {
		this.bgColor = colorCode;
		document.getElementById("searchContainer").style.backgroundColor = this.bgColor;
	},
	
	// set position of searchBox
	setPosition : function(x, y) {
		PDL.widget.SearchBox.overlay.cfg.setProperty("x", x);
		PDL.widget.SearchBox.overlay.cfg.setProperty("y", y);
	},
	
	// reset searchBox position
	resetPosition : function() {
		// reset position of searchBox
		var searchOuter = document.getElementById("searchOuter");
		PDL.widget.SearchBox.setPosition(YAHOO.util.Dom.getX(searchOuter) , YAHOO.util.Dom.getY(searchOuter) + searchOuter.clientHeight + 1);
		
	},
	
	openSearchBox : function( id ) {
		PDL.widget.SearchBox.resetPosition();  // in case document changes size
		
		var searchFieldEl = document.getElementById( id );
		
		// if SearchBox is already open, don't try to re-open it.
		if(PDL.widget.SearchBox.overlay.cfg.getProperty("visible") == false) {
			PDL.widget.SearchBox.overlay.show();
			var attributes = { height: { to: 310 } };
			
			
			// load search engine interface
			if(searchFieldEl.id == "intranetSearchField") {
				
				//create show animation
				var show = new YAHOO.util.Anim("searchContainer", attributes, 0.25, YAHOO.util.Easing.easeOut);
				
				// set current view
				PDL.widget.SearchBox.currentView = "intranetSearch";
				// clear intranetSearchField
				searchFieldEl.value = "";
				searchFieldEl.diabled = true;
				var insertContent = function() {
					var searchContainer = document.getElementById("searchContainer");
					if(searchContainer != null) {
						searchContainer.innerHTML = PDL.widget.SearchBox.buildIntranetSearchContainer();
						PDL.widget.SearchBox.attachCloseSearchBoxEvent();
						PDL.widget.SearchBox.setLoadingMessage("intranetResultsDetails", "<h3>Enter a keyword to search...</h3>");
						PDL.widget.SearchBox.fillSearchEngineCache();
					}
					
				}
					// insert content into SearchBox once animation completes
					show.onComplete.subscribe( insertContent );
					// setup keystroke event handler
					YAHOO.util.Event.addListener(searchFieldEl, "keyup", PDL.widget.SearchBox.searchEngineKeystrokeHandler);
			
			} else if(searchFieldEl.id == "rosterSearchField") { // load roster interface
				
				// change attributes for use with roster interface, waiting on re-design of roster db
				//attributes.height.to = 410;
				// create show animation
				var show = new YAHOO.util.Anim("searchContainer", attributes, 0.25, YAHOO.util.Easing.easeOut);	
					
				// set current view
				PDL.widget.SearchBox.currentView = "rosterSearch";
				
				// update animation attributes
				
				
				var insertContent = function() {
					var searchContainer = document.getElementById("searchContainer");
					if(searchContainer != null) {
						PDL.widget.SearchBox.onRosterSearchBoxOpen.fire();
						searchContainer.innerHTML = PDL.widget.SearchBox.buildRosterSearchContainer();
						PDL.widget.SearchBox.attachCloseSearchBoxEvent();
						PDL.widget.SearchBox.onRosterRender.fire();
						//PDL.widget.SearchBox.setLoadingIndicator("rosterResults");
						//PDL.widget.SearchBox.setLoadingMessage("rosterResultsDetails", "Loading Roster...");
						//PDL.widget.SearchBox.fillRosterCache();
						//PDL.widget.SearchBox.setRosterResults(PDL.widget.SearchBox.rosterCache);
		  			//PDL.widget.SearchBox.setRosterData(PDL.widget.SearchBox.rosterCache[0].rosterid);
					}
				}
				
				// insert content into SearchBox once animation completes
				show.onComplete.subscribe ( insertContent );
				
				// setup keystroke event handler
				YAHOO.util.Event.addListener(searchFieldEl, "keyup", PDL.widget.SearchBox.rosterKeystrokeHandler);
			}
			
			show.animate();
		} else {
			
			if( searchFieldEl.id == "intranetSearchField" ) {
				
				if( PDL.widget.SearchBox.currentView != "intranetSearch" ) {
					
					PDL.widget.SearchBox.closeSearchBox();
					
					window.setTimeout( "PDL.widget.SearchBox.openIntranetSearchBox()", 300 );
					
				}
				
			}	else if( searchFieldEl.id == "rosterSearchField" ){ // if rosterSearchField
				
					if( PDL.widget.SearchBox.currentView != "rosterSearch" ) {
						
						PDL.widget.SearchBox.closeSearchBox();
						
						window.setTimeout( "PDL.widget.SearchBox.openRosterSearchBox()", 300 );
					
					}
					
			}		
			
		}
	},
	
	openRosterSearchBox : function() {
		
		PDL.widget.SearchBox.openSearchBox( "rosterSearchField" );
		
	},
	
	openIntranetSearchBox : function() {
		
		PDL.widget.SearchBox.openSearchBox( "intranetSearchField" );
		
	},
	
	// close helper for roster search
	closeRosterSearch : function() {
		
		// remove event listeners
		YAHOO.util.Event.removeListener("rosterSearchField", "keyup", PDL.widget.SearchBox.rosterKeystrokeHandler);
		
		// reset roster search field
		PDL.widget.SearchBox.resetRosterField();
		
	},
	
	// close helper for intranet search
	closeIntranetSearch : function() {
		YAHOO.util.Event.removeListener("intranetSearchField", "keyup", PDL.widget.SearchBox.searchEngineKeystrokeHandler);
		PDL.widget.SearchBox.resetIntranetField();
	},
	
	closeSearchBox : function(e) {		
		if(PDL.widget.SearchBox.currentView == "rosterSearch") {
			PDL.widget.SearchBox.closeRosterSearch();
			PDL.widget.SearchBox.onRosterSearchBoxClose.fire();
		} else if(PDL.widget.SearchBox.currentView == "intranetSearch") {
			PDL.widget.SearchBox.closeIntranetSearch();
		}
		
		var searchContainer= document.getElementById("searchContainer");
		searchContainer.innerHTML = "";
		var hide = new YAHOO.util.Anim("searchContainer", { height: { to: 0 } }, 0.25, YAHOO.util.Easing.easeOut);
		hide.onComplete.subscribe(PDL.widget.SearchBox.hideSearchBox);
		hide.animate();
	},
	
	hideSearchBox : function() {
		PDL.widget.SearchBox.overlay.hide();
	}
		
}

PDL.widget.SearchBoxPlugins = {}

PDL.widget.SearchBoxPlugins.Finder = {

    find : function( name ) {
        
        function find_callback() {
        
            PDL.widget.SearchBox.searchRosterByFilter( name );	
			
        }
        
        PDL.widget.SearchBox.onRosterRender.unsubscribe( find_callback );
        
        PDL.widget.SearchBox.onRosterRender.subscribe( find_callback );
        
        PDL.widget.SearchBox.openRosterSearchBox();
        
    }

}