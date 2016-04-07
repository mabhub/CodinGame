/**
 * Skeleton
 */

const i = require('util').inspect; const log = (data) => printErr(i(data, { depth:3 }));

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
