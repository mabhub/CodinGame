/**
 * Pertes en bourse
 */

var App = function () {

    var grid = [];

    function _initialize () {
        var n       = parseInt(readline());
        var inputs  = readline().split(' ');

        for (var i = 0; i < n; i++) {
            var v = parseInt(inputs[i]);
            grid.push(v);
        }
    }

    function _doLoop () {
        var gridLargest = 0;

        grid.forEach(function (item, index) {
            var iteLargest = 0;
            for (var i = index + 1 ; i < grid.length ; i++) {
                iteLargest = Math.max(item - grid[i], iteLargest);
            }
            gridLargest = Math.max(iteLargest, gridLargest);
        });

        return -1 * gridLargest;
    }

    function _start () {
        _initialize();
        print(_doLoop());
    }

    this.start = _start;
};

var app = new App;

app.start();
