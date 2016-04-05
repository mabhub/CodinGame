(function () {
    "use strict";
    var width   = parseInt(readline());
    var height  = parseInt(readline());
    var text    = readline().toLowerCase();

    var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','?'];

    function fetchData () {
        var row, letter;
        var ascii = {};
        for (var i = 0; i < height; i++) {
            row = readline();
            for (var l = 0 ; l < 27 ; l++) {
                letter = letters[l];
                if (typeof ascii[letter] == 'undefined') ascii[letter] = [];
                ascii[letter].push(row.substr(l * width, width));
            }
        }
        return ascii;
    }

    function buildData () {
        var letter;
        var output = [];
        for (var j = 0 ; j < text.length ; j++) {
            letter = text[j];
            letter = (letters.join('').indexOf(letter) < 0) ? '?' : letter;
            output.push(ascii[letter]);
        }
        return output;
    }

    function printData () {
        var line;
        for (var i = 0; i < height; i++) {
            line = [];
            output.forEach(function (x) { line.push(x[i]); });
            print(line.join(''));
        }
    }

    var ascii  = fetchData();
    var output = buildData();
    printData();

}());
