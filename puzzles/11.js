/**
 * Indiana - Niveau 1
 */

var c   = require('../common.js');
var log = c.log;

var App = function () {

    var meta = {};

    var types = [
        {}, { // Type 1
            TOP:   [0, 1],
            LEFT:  [0, 1],
            RIGHT: [0, 1],
        }, { // Type 2
            LEFT:  [1, 0],
            RIGHT: [-1, 0]
        }, { // Type 3
            TOP:   [0, 1]
        }, { // Type 4
            TOP:   [-1, 0],
            RIGHT: [0, 1]
        }, { // Type 5
            TOP:   [1, 0],
            LEFT:  [0, 1]
        }, { //Type 6
            LEFT:  [1, 0],
            RIGHT: [-1, 0]
        }, { // Type 7
            TOP:   [0, 1],
            RIGHT: [0, 1]
        }, { // Type 8
            LEFT:   [0, 1],
            RIGHT:  [0, 1]
        }, { // Type 9
            LEFT:   [0, 1],
            TOP:    [0, 1]
        }, { // Type 10
            TOP:    [-1, 0]
        }, { // Type 11
            TOP:    [1, 0]
        }, { // Type 12
            RIGHT:  [0, 1]
        }, { // Type 13
            LEFT:   [0, 1]
        }
    ];

    function _init () {
        var grid = [];


        var inputs = readline().split(' ');
        var W      = parseInt(inputs[0]); // number of columns.
        var H      = parseInt(inputs[1]); // number of rows.

        for (var i = 0; i < H; i++) {
            grid.push(readline().split(' ').map(function (i) { return parseInt(i); }));
        }

        meta.grid = grid;
        meta.exit = [parseInt(readline()), H - 1];

        log(meta);
    }

    function _doLoop () {
        var i = 0;
        while (true) {
            log(i++);
            var inputs  = readline().split(' ');
            var XI      = parseInt(inputs[0]);
            var YI      = parseInt(inputs[1]);
            var FROM    = inputs[2];


            var currentType = meta.grid[YI][XI];
            var move        = types[currentType][FROM];
            var next        = [XI + move[0], YI + move[1]];

            print(next.join(' '));
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
