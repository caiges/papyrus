/*
*   author:  Britton Halle via (http://crockford.com/)
*   created:  07/24/2006
*   purpose:  untangle js contructor pattern
*
*/

PDL.util.prototypal = function (o) {
    function f() {}
    f.prototype = o;
    return new f();
}