/*
*   author:  Caige Nash
*   created:  06/28/2006
*   purpose:  load all functionality gracefully to support those incompetent browsers
*   
*/

function loadKBSearch() {
	PDL.util.Knowledgebase.Search.init();
}

addLoadEvent(loadKBSearch);