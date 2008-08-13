/**
*
* This design is heavily borrowed from the yui drag drop examples.
* 
* @fileoverview Sortable Lists.
* @author Dav Glass <dav.glass@yahoo.com>, Caige Nichols <caige@sevenblend.com>
* @version 0.2
* @class Sortable DragDrop List.
* @requires YAHOO
* @requires YAHOO.util.$D
* @requires YAHOO.util.$E
* @requires YAHOO.util.DragDrop
* @requires YAHOO.Tools
*
* @constructor
* @class Sortable List.
* @param {String/HTMLElement} elm The element to convert into a sortable list
*/

//YAHOO.util.DragDropMgr.mode = YAHOO.util.DragDropMgr.INTERSECT;

( function() {

	$D = YAHOO.util.Dom,
	$E = YAHOO.util.Event,
	$DDM = YAHOO.util.DragDropMgr,
	$ = $D.get;

YAHOO.widget.SortableList = function(elm, cfg) {
		
    this.elm = $(elm);
    this.drop = null;
    this.lastTarget = false;
    this._tagName = 'li';

    if (cfg) {
        if (cfg.tagname) {
            this._tagName = cfg.tagname;
        }
    }

    if (!this.elm) {
        return false;
    }
    /**
    * Custom $E
    * @type Object
    */
    this.onInit = new YAHOO.util.CustomEvent('oninit', this);
}
/**
* The init function to make the list sortable
*/
YAHOO.widget.SortableList.prototype.init = function() {
    this._setupList();
    this.onInit.fire();
}
/**
* @private
*/
YAHOO.widget.SortableList.prototype._setupList = function() {
	
	// setup ul targets
	new YAHOO.util.DDTarget( this.elm );
	
    this.lis = $D.getElementsByClassName( "sortable-list-item", "li" );
	$D.generateId(this.lis, 'ysortable');
	
    for ( var i = 0; i < this.lis.length; i++ ) {
		
		if( this.lis[i] !== undefined ) {
			
			new YAHOO.util.DDList( this.lis[ i ].id );
			
		}

	}
}


YAHOO.util.DDList = function( id, sGroup, config ) {

    YAHOO.util.DDList.superclass.constructor.call(this, id, sGroup, config);

    this.logger = this.logger || YAHOO;
    var el = this.getDragEl();
    $D = YAHOO.util.Dom;
	$D.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent
	$D.setStyle(el, "zIndex", "30000");
    this.goingUp = false;
    this.lastY = 0;

};

YAHOO.extend( YAHOO.util.DDList, YAHOO.util.DDProxy, {
		
    startDrag: function(x, y) {

        // make the proxy look like the source element
        var dragEl = this.getDragEl();
        var clickEl = this.getEl();
		$D.setStyle(clickEl, "visibility", "hidden");
        dragEl.innerHTML = clickEl.innerHTML;

        $D.setStyle(dragEl, "color", $D.getStyle(clickEl, "color"));
        $D.setStyle(dragEl, "backgroundColor", $D.getStyle(clickEl, "backgroundColor"));
        $D.setStyle(dragEl, "border", "2px solid gray");		
    },

    endDrag: function(e) {

        var srcEl = this.getEl();
        var proxy = this.getDragEl();

        // Show the proxy element and animate it to the src element's location
        $D.setStyle(proxy, "visibility", "");
        var a = new YAHOO.util.Motion( 
            proxy, { 
                points: { 
                    to: $D.getXY(srcEl)
                }
            }, 
            0.2, 
            YAHOO.util.Easing.easeOut 
        )
        var proxyid = proxy.id;
        var thisid = this.id;

        // Hide the proxy and show the source element when finished with the animation
        a.onComplete.subscribe(function() {
                $D.setStyle(proxyid, "visibility", "hidden");
                $D.setStyle(thisid, "visibility", "");
            });
        a.animate();
    },

    onDragDrop: function(e, id) {

        // If there is one drop interaction, the li was dropped either on the list,
        // or it was dropped on the current location of the source element.
        if ($DDM.interactionInfo.drop.length === 1) {

            // The position of the cursor at the time of the drop (YAHOO.util.Point)
            var pt = $DDM.interactionInfo.point; 

            // The region occupied by the source element at the time of the drop
            var region = $DDM.interactionInfo.sourceRegion; 

            // Check to see if we are over the source element's location.  We will
            // append to the bottom of the list once we are sure it was a drop in
            // the negative space (the area of the list without any list items)
            if (!region.intersect(pt)) {
                var destEl = $D.get(id);
                var destDD = $DDM.getDDById(id);
                destEl.appendChild(this.getEl());
                destDD.isEmpty = false;
                $DDM.refreshCache();
            }

        }
    },

    onDrag: function(e) {

        // Keep track of the direction of the drag for use during onDragOver
        var y = $E.getPageY(e);

        if (y < this.lastY) {
            this.goingUp = true;
        } else if (y > this.lastY) {
            this.goingUp = false;
        }

        this.lastY = y;
    },

    onDragOver: function(e, id) {

        var srcEl = this.getEl();
        var destEl = $D.get(id);

        // We are only concerned with list items, we ignore the dragover
        // notifications for the list.
        if (destEl.nodeName.toLowerCase() == "li") {
            var orig_p = srcEl.parentNode;
            var p = destEl.parentNode;

            if (this.goingUp) {
                p.insertBefore(srcEl, destEl); // insert above
            } else {
                p.insertBefore(srcEl, destEl.nextSibling); // insert below
            }

            $DDM.refreshCache();
        }
    }
} );

})();