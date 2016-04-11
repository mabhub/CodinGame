(function () {

    var board = {};
    var elevators = [];

    function readInit () {
        var inputs                = readline().split(' ');
        board.nbFloors              = parseInt(inputs[0]); // number of floors
        board.width                 = parseInt(inputs[1]); // width of the area
        board.nbRounds              = parseInt(inputs[2]); // maximum number of rounds
        board.exitFloor             = parseInt(inputs[3]); // floor on which the exit is found
        board.exitPos               = parseInt(inputs[4]); // position of the exit on its floor
        board.nbTotalClones         = parseInt(inputs[5]); // number of generated clones
        board.nbAdditionalElevators = parseInt(inputs[6]); // ignore (always zero)
        board.nbElevators           = parseInt(inputs[7]); // number of elevators

        for (var i = 0; i < board.nbElevators; i++) {
            inputs = readline().split(' ');
            elevators[parseInt(inputs[0])] = parseInt(inputs[1]);
        }
        elevators[board.exitFloor] = board.exitPos;
    }

    function read () {
        var inputs = readline().split(' ');
        return {
            y:   inputs[0],
            x:   inputs[1],
            dir: inputs[2] == 'RIGHT' ? 1 : -1
        };
    }

    function readLoop () {
        var first;

        while (first = read()) {
            if ((first.dir == 1 && first.x > elevators[first.y]) || (first.dir == -1 && first.x < elevators[first.y])) {
                print('BLOCK');
            } else if ((first.x == board.width - 1) || first.x == 0) {
                print('BLOCK');
            } else {
                print('WAIT');
            }
        }
    }

    readInit();
    readLoop();
}());
