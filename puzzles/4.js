/**
 * Le pouvoir de Thor
 */

var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

const getDir = (x, y) => (y > 0 ? 'S' : y < 0 ? 'N' : '') + (x > 0 ? 'E' : x < 0 ? 'W' : '');

/**
 * Fetch initial values
 */
var inputs = readline().split(' ').map(n => parseInt(n));

/**
 * Position of target (Light)
 */
let light = {
    x: inputs[0],
    y: inputs[1]
};

/**
 * Initial position of Thor
 */
let thor = {
    x: inputs[2],
    y: inputs[3]
};

/**
 * Game loop
 */
while (true) {
    let remainingTurns = +readline();

    let m = {
        x: Math.sign(light.x - thor.x),
        y: Math.sign(light.y - thor.y)
    };

    let dir = getDir(m.x, m.y)

    thor.x += m.x;
    thor.y += m.y;

    print(dir);
}
