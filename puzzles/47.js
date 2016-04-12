/**
 * Les Clones
 */

const inspect  = require('util').inspect;
const log      = (data) => printErr(inspect(data, { depth:3 }));

const [
    nbFloors,               // number of floors
    width,                  // width of the area
    nbRounds,               // maximum number of rounds
    exitF,                  // floor on which the exit is found
    exitX,                  // position of the exit on its floor
    nbTotalClones,          // number of generated clones
    nbAdditionalElevators,  // ignore (always zero)
    nbElevators             // number of elevators
] = readline().split(' ').map(n => +n);

/**
 * Init elevators
 */
var elevators = [...Array(nbElevators)]
    .map(_ => readline().split(' '))
    .reduce((arr, curr) => { arr[+curr[0]] = +curr[1]; return arr; }, []);

/**
 * Exit can be processed as elevator
 */
elevators[exitF] = exitX;

const readClone = _ => {
    const [y, x, d] = readline().split(' ');
    return {
        x:     +x,
        floor: +y,
        way:    d === 'RIGHT' ? 1 : -1 // 1 for right, -1 for left
    };
};

const shouldBlock = (clone) => (clone.way === 1 && clone.x > elevators[clone.floor]) || (clone.way === -1 && clone.x < elevators[clone.floor]) || ((clone.x === width - 1) || clone.x === 0);

while (true) {
    print(shouldBlock(readClone()) ? 'BLOCK' : 'WAIT');
}
