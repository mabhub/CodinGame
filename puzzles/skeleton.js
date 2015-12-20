/**
 * Skeleton
 */

var c   = require('../common.js');
var log = c.log;

var App = function () {


    function _init () {

    }

    function _doLoop () {
        var i = 0;
        while (true) {
            log(i++);

        }
    }

    function _main () {
        _init();
        _doLoop();
    }

    this.start = _main;
};

var app = new App;

app.start();
