/**
 * Le pouvoir de Thor
 */

var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

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

    thor.x += m.x;
    thor.y += m.y;

    print(('N S'[m.y + 1] + 'W E'[m.x + 1]).trim());
}
