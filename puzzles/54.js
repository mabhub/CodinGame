/**
 * APU : Phase d'initialisation
 */

/**
 * '+' is used as shorthand for parseInt
 */
const width   = +readline();
const height  = +readline();
var grid      = [];
var output    = [];

var transform = (input) => input.split('').map((i) => i === '0');

function search (x, y) {
    var right = '-1 -1';
    var down  = '-1 -1';

    for (let i = x + 1 ; i < width ; i++) {
        if (grid[y][i]) {
            right = [i, y].join(' ');
            break;
        }
    }

    for (let j = y + 1 ; j < height ; j++) {
        if (grid[j][x]) {
            down = [x, j].join(' ');
            break;
        }
    }

    return [right, down].join(' ');
}

/**
 * Create a grid with all cells
 * true:  existing node
 * false: empty cell
 */
for (let i = 0; i < height; i++) {
    grid.push(transform(readline()));
}

/**
 * Go through each cell,
 * if there is a node, do search closests
 */
grid.forEach((line, y) => {
    line.forEach((isNode, x) => {
        if (isNode) {
            output.push([x, y, search(x, y)].join(' '));
        }
    });
});

output.forEach((o) => print(o));
