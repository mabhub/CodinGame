
const inspect  = require('util').inspect;
const deepCopy = require('../lib/deepcopy.js');
const log      = (data) => printErr(inspect(data, { depth:3 }));

/**
 * Glyph used to draw objects & positions
 */
const pxl = {
    wall: '■',
    way:  '◌',
    unkn: ' ',
    obj: '⚀⚁⚂⚃⚄⚅',
    player: '◉'
}

/**
 * Move commands bindings
 */
const dirs = {
    U: 'C', // Up
    D: 'D', // Down
    L: 'E', // Left
    R: 'A', // Right
    W: 'B'  // Wait
};

/**
 * Moves modifier
 */
const dirsId = {
    U:[0, -1],
    R:[1,  0],
    D:[0,  1],
    L:[-1, 0]
};
const directions = ['U', 'R', 'D', 'L'];

/**
 * Moves modifier
 */
const cardinalMoves = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
];


const dId2dir = (dId) => dirsId[dId];
const dir2dId = (dir) => Object.keys(dirsId).indexOf(dir);

/**
 * Ease the reading of coordinates
 */
const readcoords  = _ => {
    let c = readline().split(' ').map((n) => +n)
    return {
        x: c[0] + 1,
        y: c[1] + 1
    };
};

/**
 * Read initialisation data
 */
const initInputs  = [...Array(3)].map(_ => +readline());
const mapHeight   = initInputs[0];
const mapWidth    = initInputs[1];
const objectCount = initInputs[2];

/**
 * Init main map with init data
 */
var map = [...Array(mapHeight + 2)].map(_ => [...Array(mapWidth + 2)].map(_ => pxl.unkn));

const startDir  = 'R';
var currentDir  = startDir;

/**
 * Return the glyph at given coordinates
 */
const getPxl    = (position) => map[position.y][position.x];

/**
 * Position tests
 */
const isWall    = (position) => {
    if (position.x < 0 || position.y < 0 || position.x > mapWidth || position.y > mapHeight) return true;
    return getPxl(position) === pxl.wall ? true : getPxl(position) === pxl.way  ? false : undefined
};
const isWay  = (position) => {
    if (position.x < 0 || position.y < 0 || position.x > mapWidth || position.y > mapHeight) return false;
    return getPxl(position) === pxl.way  ? true : getPxl(position) === pxl.wall ? false : undefined
};

/**
 * Returns coordinates of next position with given direction
 */
const nextPosition = (player, direction) => {
    return {
        x: player.x + cardinalMoves[dir2dId(direction)][0],
        y: player.y + cardinalMoves[dir2dId(direction)][1]
    };
};

/**
 * Return direction allowing relative movements
 */
const turnRight = (dir) => directions.concat(directions)[directions.indexOf(dir) + 1];
const turnLeft  = (dir) => directions.concat(directions)[directions.indexOf(dir) + 3];
const turnU     = (dir) => directions.concat(directions)[directions.indexOf(dir) + 2];

const follow = (player, direction, side) => {
    let nextRight = nextPosition(player, turnRight(direction));
    let nextFront = nextPosition(player, direction);
    let nextLeft  = nextPosition(player, turnLeft(direction));

    let nextA = (side === 'Left') ? nextLeft : nextRight;
    let nextB = (side === 'Left') ? nextRight : nextLeft;
    let turnA = (side === 'Left') ? turnLeft : turnRight;
    let turnB = (side === 'Left') ? turnRight : turnLeft;

    if (isWay(nextA)) {
        direction = turnA(direction);
    } else if (isWall(nextFront) && isWay(nextB)) {
        direction = turnB(direction);
    } else if (isWall(nextB) && isWall(nextA) && isWall(nextFront)) {
        direction = turnU(direction);
    }

    return direction;

}

const followRight = (player, direction) => follow(player, direction, 'Right');
const followLeft  = (player, direction) => follow(player, direction, 'Left');

while (true) {
    let grid         = deepCopy(map);

    let neighborhood = [...Array(4)].map(_ => readline());
    let objects      = [...Array(objectCount - 1)].map(_ => readcoords());
    let player       = readcoords();

    /**
     * Add neighborhood to map
     */
    neighborhood.forEach((char, index) => {
        let pos = cardinalMoves[index];
        map[player.y  + pos[1]][player.x + pos[0]] = (char === '#' ? pxl.wall : pxl.way);
        grid[player.y + pos[1]][player.x + pos[0]] = (char === '#' ? pxl.wall : pxl.way);
    });

    /**
     * Add objects to grid
     * Position of object can be add to map as not wall
     */
    objects.forEach((object, index) => {
         map[object.y][object.x] = pxl.way; // Store position as not wall
        grid[object.y][object.x] = pxl.obj[index];
    });

    /**
     * Add player to grid
     */
    grid[player.y][player.x] = pxl.player;

    /**
     * Draw grid
     */
    grid.forEach((line) => log(' ' + line.join(' ') + ' '));

    // currentDir = (coin = !coin) ? followLeft(player, currentDir) : followLeft(player, currentDir);

    let nextRight = nextPosition(player, turnRight(currentDir));
    let nextFront = nextPosition(player, currentDir);
    let nextLeft  = nextPosition(player, turnLeft(currentDir));

    while (isWall(nextPosition(player, currentDir))) {
        currentDir = turnLeft(currentDir);
    }

    print(dirs[currentDir]);
}
