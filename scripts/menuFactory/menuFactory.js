/*
*   author:  Caige Nash
*   created:  04/20/2006
*   purpose:  menu factory for creating and manipulating menus
*   dependencies: final_drop.css (Stylesheet), final_drop_ie.css (IE Specific Stylesheet)
*
*/

var id = null;
var visible = null;
var menuHTML = null;
var containerid = null;

// default constructor, requires an id for which the menu can be accessible
var Menu = function (menuId, containerId, menuXMLFile) {
	if(document.getElementById(containerId)) {
		this.id = menuId;	
		this.containerId = containerId;
		this.menuXMLFile = menuXMLFile;
		loadXML(this.menuXMLFile, this.containerId);	
		return true;
	} else {
		return false;
	}
}

// load xml doc, 
var loadXML = function(xmldoc, containerId) {
		var url = xmldoc;
		var pars = '';
		//AjaxHandler.call(callback, url);
		var myXML = new Ajax.Request(
				url, 
				{
					method: 'get', 
					parameters: pars, 
					onComplete: function (originalRequest) {
						buildXMLMenu(originalRequest, containerId);
					}
				});
		
}


 
// build menu from xml response
var buildXMLMenu = function (originalRequest, containerId) {
	var menuContainer = document.getElementById(containerId);
	var xmldoc = originalRequest.responseXML;
	// store menu html
	var menuHTML = '<div class="menu"><ul>';
	// get collection of menuheading xml objects
	var headings = xmldoc.getElementsByTagName('menuheading');
	// loop through menuheading xml objects to get heading titles and link
	for(var i = 0; i < headings.length; i++) {
		// get current headings title
		var headingtitle = headings[i].getElementsByTagName('headingtitle')[0].childNodes[0].nodeValue;
		// get current headings link
		var headinglink = headings[i].getElementsByTagName('headinglink')[0].childNodes[0].nodeValue;
		// get current heading id
		var headingid = headings[i].getElementsByTagName('headingid')[0].childNodes[0].nodeValue;
		menuHTML += '<li id="menuitemid_' + headingid + '"><a class="drop" href="' + headinglink + '" title="' + headingtitle + '">' + headingtitle + '<!--[if IE 7]><!--></a><!--<![endif]-->';
		// get alignment of heading sub menu
		var headingalign = headings[i].getElementsByTagName('headingalign')[0].childNodes[0].nodeValue;
		// get collection of menuheadings menuitems xml objects
		var menuitems = headings[i].getElementsByTagName('menuitem');
		// loop through menuitems xml objects to get menuitems titles and links
		if(menuitems.length > 0) {
			if(headingalign == 'right') { menuHTML += '<table><tr><td><ul class="menuright">'; } else if(headingalign == 'left') { menuHTML += '<table><tr><td><ul class="menuleft">'; }
			for(var mi = 0; mi < menuitems.length; mi++) {
				// get current menuitems title
				var mititle = menuitems[mi].getElementsByTagName('menuitemtitle')[0].childNodes[0].nodeValue;
				// get current menuitems link
				var milink = menuitems[mi].getElementsByTagName('menuitemlink')[0].childNodes[0].nodeValue;
				// get current menuitem id
				var miid = menuitems[mi].getElementsByTagName('menuitemid')[0].childNodes[0].nodeValue;
				// get alignment of sub menu's sub menu
				var menuitemalign = menuitems[mi].getElementsByTagName('menuitemalign')[0].childNodes[0].nodeValue;
				// get collection of menuitems submenuitems xml objects, we do this before creating the html for the menu item so that we can set class equal to 'drop' if the menuitem has a sub menu
				var submenuitems = menuitems[mi].getElementsByTagName('submenuitem');
				// if sub menu has a sub menu setup class if drop or upone
				if(submenuitems.length > 0) {
					menuHTML += '<li id="menuitemid_' + miid + '"><a class="drop" href="' + milink + '" title="' + mititle + '">' + mititle;
				} else if(mi != 0 && menuitems[mi-1].getElementsByTagName('submenuitem').length > 0) {
					menuHTML += '<li class="upone" id="menuitemid_' + miid + '"><a href="' + milink + '" title="' + mititle + '">' + mititle + '</a>';
				}else {
					menuHTML += '<li id="menuitemid_' + miid + '"><a href="' + milink + '" title="' + mititle + '">' + mititle + '</a>';
				}
				// loop through submenuitems xml objects to get submenuitems titles and links
				if(submenuitems.length > 0) {
					if(menuitemalign == 'right') { menuHTML += '<!--[if IE 7]><!--></a><!--<![endif]--><table><tr><td><ul class="submenuright">' } else if(menuitemalign == 'left') { menuHTML += '<!--[if IE 7]><!--></a><!--<![endif]--><table><tr><td><ul class="submenuleft">'; }
					for(var smi = 0; smi < submenuitems.length; smi++) {						
						// get submenuitems title
						var smititle = submenuitems[smi].getElementsByTagName('submenuitemtitle')[0].childNodes[0].nodeValue;
						// get submenuitems link
						var smilink = submenuitems[smi].getElementsByTagName('submenuitemlink')[0].childNodes[0].nodeValue;
						// get submenuitems id
						var smiid = submenuitems[smi].getElementsByTagName('submenuitemid')[0].childNodes[0].nodeValue;
						menuHTML += '<li><a href="' + smilink + '" title="' + smititle + '">' + smititle + '</a></li>';
					}
					menuHTML += '</ul></td></tr></table><!--[if lte IE 6]></a><![endif]-->';
				}
				menuHTML += '</li>';
			} // end menuitems loop
			menuHTML += '</ul></td></tr></table>';
		} // end if menuitems.length > 0
		menuHTML += '<!--[if lte IE 6]></a><![endif]--></li>';	
	} // end menuheadings loop
	menuHTML += '</ul></div>';
	
	menuContainer.innerHTML = menuHTML;
	
} // end buildXMLMenu function