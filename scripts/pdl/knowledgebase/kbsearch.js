/*
*   author:  Caige Nash
*   created:  06/28/2006
*   purpose:  knowledgebase utility 
*
*/

PDL.util.Knowledgebase = {};

PDL.util.Knowledgebase.Search = {

	view : "basic",
	kbAdvancedSearch : "kbAdvancedSearch",
	toggleLink : "kbAdvancedSearchSwitch",
	
	// init
	init : function() {
		PDL.util.Knowledgebase.Search.attachToggleSearchEvent(PDL.util.Knowledgebase.Search.toggleLink);
		
	},

	// toggle search options
	toggleSearchOptions : function(e) {
		YAHOO.util.Event.preventDefault(e);
		// toggle display of search options
		var kbAdvancedSearch = document.getElementById(PDL.util.Knowledgebase.Search.kbAdvancedSearch);
		//console.log(kbAdvancedSearch.nodeType);
		if(kbAdvancedSearch != undefined && kbAdvancedSearch != null) {
		
			if(PDL.util.Knowledgebase.Search.getSearchOptionsStatus(kbAdvancedSearch) == false) {
				PDL.util.Knowledgebase.Search.view = "advanced";
				kbAdvancedSearch.style.display = 'block';
			} else {
				PDL.util.Knowledgebase.Search.view = "basic";
				kbAdvancedSearch.style.display = 'none';
			}
			// update link text 
			var kbAdvancedSearchSwitch = document.getElementById(PDL.util.Knowledgebase.Search.toggleLink);
			if(kbAdvancedSearchSwitch != undefined && kbAdvancedSearchSwitch != null) {
				if(kbAdvancedSearchSwitch.innerHTML == '[Advanced Search]') {
					kbAdvancedSearchSwitch.innerHTML = '[Basic Search]';
				} else {
					kbAdvancedSearchSwitch.innerHTML = '[Advanced Search]';
				}
			}
			
		}
	},
	
	// return true if advanced options are showing, false if not showing
	getSearchOptionsStatus : function(element) {
		if(element.style.display == 'block') {
			return true;
		} else {
			return false;
		}
	},
	
	// update search options link when link is clicked
	updateSearchOptionsLink : function() {
		if(document.getElementById('kbAdvancedSearchSwitch').innerHTML == '[Advanced Search]') {
			document.getElementById('kbAdvancedSearchSwitch').innerHTML = '[Basic Search]';
		} else {
			document.getElementById('kbAdvancedSearchSwitch').innerHTML = '[Advanced Search]';
		}
	},
	
	// attach search type event handler
	attachToggleSearchEvent : function(element) {
		var toggleLink = document.getElementById(element);
		
		if(toggleLink != undefined) {
			YAHOO.util.Event.addListener(toggleLink, "click", PDL.util.Knowledgebase.Search.toggleSearchOptions);
		}
	}

}