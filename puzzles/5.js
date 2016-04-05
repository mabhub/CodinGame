/**
 * Le pouvoir de Thor
 */

// var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

const num   = +readline();
const start = num ? Infinity : 0;
const abs   = Math.abs;

print(
    readline().split(' ').map((x) => parseInt(x))  // Create an array of each values as numbers
        .reduce((previous, current) => {           // Process each element of array
            /**
             * Rules tell to return positive of two opposite values
             */
            if (current === (-1 * previous)) return abs(current);

            /**
             * Return number with lowest absolute value;
             */
            if (abs(current)  <  abs(previous)) return current;
            return previous;
        }, start)
);
