/**
 * Suite de Conway
 */

var c   = require('../common.js');
var log = c.log;

var App = function () {

    var start;
    var target;

    function _initialize () {
        start  = readline();
        target = parseInt(readline());
    }

    function _tell (input) {
        return input.split(' ').length + ' ' + input.split(' ')[0];
    }

    function _describe (elements) {
        /**
         * elements has to be a string
         */
        elements = elements.split(' ');

        /**
         * elements is now an array
         */
        var previous = elements[0];

        elements.forEach(function (element, index, array) {
            if (element !== previous) {
                array[index] = '/ ' + element;
            }
            previous = element;
        });

        elements = elements.join(' ');
        elements = elements.split(' / ');


        var sentence = [];

        elements.forEach(function (element) {
            sentence.push(_tell(element));
        });

        return sentence.join(' ');
    }

    function _conway (input, iterations) {
        var output = input;
        for (var i = 0 ; i < iterations ; i++) {
            output = _describe(output);
        }
        return output;
    }

    function _main () {
        _initialize();
        print(_conway(start, target - 1));
    }

    this.start = _main;
};

var app = new App;

app.start();
