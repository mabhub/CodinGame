/**
 * Skynet : le saut
 */

// var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

var App = function () {

    function _main () {
        /**
         * Fetch initial values
         */
        var inputs   = [...Array(3)].map(_ => +readline());
        var road     = inputs[0]; // The length of the road road the gap.
        var gap      = inputs[1]; // The length of the gap.
        var platform = inputs[2]; // The length of the landing platform.

        /**
         * Game loop
         */
        while (true) {
            let speed  = +readline();     // The motorbike's speed.
            let posX   = +readline() + 1; // The position on the road of the motorbike.

            let action = 'WAIT';          // Default action

            /**
             * If we are beyond the gap
             */
            if (posX > road + gap || speed > gap + 1) {
                action = 'SLOW'

            /**
             * If speed is less than the gap length
             */
            } else if (speed <= gap) {
                action = 'SPEED';

            /**
             * If we are at the edge of the gap
             */
            } else if (posX == road) {
                action = 'JUMP'
            }


            print(action);
        };
    }

    this.start = _main;
};

var app = new App;

app.start();
