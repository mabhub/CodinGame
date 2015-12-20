/**
 * Pertes en bourse
 */

var c   = require('../common.js');
var log = c.log;

var Grid = function () {
    this.list = [];

    this.store = function store () {

    };

};

var App = function () {

    var grid = [];

    function _init () {
        var n      = parseInt(readline());
        var inputs = readline().split(' ');

        for (var i = 0; i < n; i++) {
            var v = parseInt(inputs[i]);
            grid.push({
                index: i,
                value: v
            });
        }

    }

    function _doLoop ()  {
        var largest = 0;

        grid.forEach(function (item) {
            !item.deltas &&  (item.deltas  = []);
            !item.largest && (item.largest = 0);

            var i = item.index + 1;
            while (grid[i]) {
                log('delta from: ' + item.index + ' and ' + grid[i].index);

                item.largest = Math.max(item.value - grid[i].value, item.largest);

                item.deltas.push({
                    with: i,
                    delta: item.value - grid[i].value
                });

                i++;
            }

            log('largest : ' + item.largest);
            largest = Math.max(item.largest, largest);
        });

        return -1 * largest;
    }

    function _main () {
        _init();
        var largest = _doLoop();

        print(largest);
    }

    this.start = _main;
};

var app = new App;

app.start();
