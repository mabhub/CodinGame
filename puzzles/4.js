/**
 * Le pouvoir de Thor
 */

// var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

var App = function () {

    const dirs   = {
        '-1': { '1':'SW', '0':'W', '-1':'NW' },
        '0':  { '1': 'S', '0': '', '-1': 'N' },
        '1':  { '1':'SE', '0':'E', '-1':'NE' }
    };
    const getDir = (x, y) => dirs[x][y];

    var thor, light;

    function _main () {
        /**
         * Fetch initial values
         */
        var inputs = readline().split(' ').map(n => parseInt(n));

        /**
         * Position of target (Light)
         */
        light = {
            x: inputs[0],
            y: inputs[1]
        };

        /**
         * Initial position of Thor
         */
        thor = {
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
        };
    }

    this.start = _main;
};

var app = new App;

app.start();
