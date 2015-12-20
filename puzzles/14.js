/**
 * Câblage réseau
 */

var App = function () {

    var median = require('median');
    var length;
    var list = [];

    function _init () {
        var minX = Infinity;
        var maxX = -Infinity;
        var total = parseInt(readline());

        for (var i = 0; i < total; i++) {
            var inputs = readline().split(' ');
            var X      = parseInt(inputs[0]);
            var Y      = parseInt(inputs[1]);
            maxX       = Math.max(maxX, X);
            minX       = Math.min(minX, X);
            list.push(Y);
        }

        length = maxX - minX;
    }

    function _compute () {
        if (list.length === 1) {
            return 0;
        }

        var med   = Math.round(median(list));
        var cable = length;

        list.forEach(function (value) {
            cable += Math.abs(med - value);
        });

        return cable;
    }

    function _main () {
        _init();
        print(_compute());
    }

    this.start = _main;
};

var app = new App;

app.start();
