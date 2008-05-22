/*
*   author:   Britton Halle
*   created:  07/24/2006
*   purpose:  create generic dataprovider
*	dependencies: 
*
*/

PDL.util.dataprovider = function() {	
	return this.init();
}

PDL.util.dataprovider.prototype  = {	
	init : function () {
		var ilist = [];
		var initlist = [];
		var bupdated = false;
	},
		
	
	setDataSet : function (responseText) {
		var resultsObject = eval('(' + responseText + ')');
		this.removeAll();
		this.setInitList(new Array());
		this.ilist = resultsObject;
		this.setInitList(this.ilist);
		//YAHOO.log(this.getLength() + " records into dataset");
		//YAHOO.log(responseText);
	},
		
	getDataSet : function () {
		return this.ilist;
	},
	
	
	
	
	
	
	
	addItem : function (item) {
		this.ilist[this.getLength()] = item;
	},
	
	addItemAt : function (item,num) {
		// TODO : add code 
		//var tempItem;
		//var bfin = false;
		//
		//if(this.getLength() > 0) {
		//	tempItem = this.ilist[this.getLength()];
		//} else {
		//	tempItem = item;
		//	bfin = true;
		//}
		//addItem(tempItem);
		//
		//if (num > 0 && bfin == false) {
		//	var startat = this.getLength()-2;
		//	if(num < startat) {
		//		for(var i = startat; i > num; i--) {
		//			this.ilist[i] = this.ilist[i-1];
		//		}
		//		this.ilist[num] = item;
		//	} elseif (num = startat) {
		//		this.ilist[num] = item;
		//	}			
		//}		
	},
	
	getItemAt : function (num) {
		for(var i = 0; i < this.getLength(); i++) {
			if(num == i) {
				return this.ilist[i];
			}
		}	
	},
	
	removeAll : function () {
		this.ilist = [];
	},
	
	removeItemAt : function () {
		// TODO : add code
	},
	
	getLength : function () {
		return this.ilist.length;
	},
		
	
	
	
	
	
	
	
	setFilter : function () {
		// TODO : add code
	},
	
	setSort : function () {
		// TODO : add code
	},
	
	refresh : function () {
		// TODO : add code
	},
	
	
	
	
	
	
	
	setListChanged : function (yn) {
		this.bupdated = yn;
	},
	
	getListChanged : function () {
		return this.bupdated;
	},
	
	contains : function () {
		// TODO : add code
	},
	
	setInitList : function (list) {
		this.initlist = list;
	}
		
}
