/**
 * APU : Phase d'initialisation
 */

var width  = parseInt(readline());
var height = parseInt(readline());
var grid   = [];
var output = [];

function transform (input) {
    return input.split('').map(function (i) {
        return i === '0';
    });
}

function search (x, y) {
    var right = '-1 -1';
    var down  = '-1 -1';

    for (var i = x + 1 ; i < width ; i++) {
        if (grid[y][i]) {
            right = [i, y].join(' ');
            break;
        }
    }

    for (var j = y + 1 ; j < height ; j++) {
        if (grid[j][x]) {
            down = [x, j].join(' ');
            break;
        }
    }

    return [right, down].join(' ');
}

/**
 *
 * Create a grid with all cells
 * true:  existing node
 * false: empty cell
 */
for (var i = 0; i < height; i++) {
    grid.push(transform(readline()));
}

/**
 * Go through each cell,
 * if there is a node, do search closests
 */
grid.forEach(function (line, y) {
    line.forEach(function (isNode, x) {
        if (isNode) {
            output.push([x, y, search(x, y)].join(' '));
        }
    });
});

output.forEach(function (o) {
    print(o);
});
