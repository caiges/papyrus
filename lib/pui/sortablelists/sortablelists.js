/**
* @fileoverview Sortable Lists.
* @author Dav Glass <dav.glass@yahoo.com>, Caige Nichols <caige@sevenblend.com>
* @version 0.1.1
* @class Sortable DragDrop List.
* @requires YAHOO
* @requires YAHOO.util.Dom
* @requires YAHOO.util.Event
* @requires YAHOO.util.DragDrop
*
* @constructor
* @class Sortable List.
* @param {String/HTMLElement} elm The element to convert into a sortable list
*/
YAHOO.widget.SortableList = function( elm, cfg ) {
	
	$D = YAHOO.util.Dom;
	$E = YAHOO.util.Event;
	$ = $D.get;
	
    this.elm = $( elm );
    this.drop = null;
	// The last element that was dragged over
    this.lastTarget = false;
    this._tagName = 'li';
	
    if ( cfg ) {
        if ( cfg.tagname ) {
            this._tagName = cfg.tagname;
        }
    }

    if ( !this.elm ) {
        return false;
    }
    /**
    * Custom Event
    * @type Object
    */
	
    this.onInit = new YAHOO.util.CustomEvent( 'oninit', this );
};
/**
* The init function to make the list sortable
*/
YAHOO.widget.SortableList.prototype.init = function() {
    this._setupList();
    this.onInit.fire();
};
/**
* @private
*/
YAHOO.widget.SortableList.prototype._setupList = function() {
    this.lis = this.elm.getElementsByTagName( this._tagName );
    $D.generateId( this.lis, 'yui-sortable' ); 
    for ( var i = 0; i < this.lis.length; i++ ) {
        var ID = this.lis[ i ].id;
        this.lis[ i ]._yuiGroup = this.elm.id;
        new YAHOO.util.DDTarget( ID );
        var tmp = new YAHOO.util.DD( ID, this.elm.id );
        tmp.onDragDrop = this.onDragDrop;
        tmp.onDragOver = this.onDragOver;
        tmp.onMouseUp = this.onMouseUp;
    }
};
/**
* @private
*/
YAHOO.widget.SortableList.prototype.onDragDrop = function( ev, id ) {
    var tar = $E.getTarget( ev );
    if ( this.lastTarget && ( id === this.lastTarget ) && ( tar.id != id ) ) {
        $D.removeClass( this.lastTarget, 'yui-sortover' );
        var tmp = $( id );
        if ( tmp.previousSibling != tar ) {
            tar.parentNode.removeChild( tar );
            tmp.parentNode.insertBefore( tar, tmp );
        } else {
            tar.parentNode.removeChild( tar );
            tmp.parentNode.insertBefore( tar, tmp.nextSibling );
        }
    }
};
/**
* @private
*/
YAHOO.widget.SortableList.prototype.onDragOver = function( ev, id ) {
    if ( this.lastTarget ) {
        $D.removeClass( this.lastTarget, 'yui-sortover' );
    }
    this.lastTarget = id;
    $D.addClass( id, 'yui-sortover' );
};
/**
* @private
*/
YAHOO.widget.SortableList.prototype.onMouseUp = function( ev ) {
    var tar = $E.getTarget( ev );
    if ( this.lastTarget ) {
        $D.removeClass( this.lastTarget, 'yui-sortover' );
    }
    $D.setStyle( tar, 'position', 'static' );
    $D.setStyle( tar, 'top', '' );
    $D.setStyle( tar, 'left', '' );
};

