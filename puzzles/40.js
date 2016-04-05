(function () {
    var pInt = parseInt;

    function initRead () {
        var ground = [];
        var n = parseInt(readline()); // the number of points used to draw the surface of Mars.
        for (var i = 0; i < n; i++) {
            var inputs = readline().split(' ');
            ground.push({ x: parseInt(inputs[0]), y: parseInt(inputs[1]) });
        }
        return ground;
    }

    function loopRead () {
        var inputs = readline().split(' ');
        return {
            pos: {
                x: pInt(inputs[0]),
                y: pInt(inputs[1])
            },
            speed: {
                vx: pInt(inputs[2]),
                vy: pInt(inputs[3])
            },
            fuel: pInt(inputs[4]),
            cmd: {
                rot: pInt(inputs[5]),
                pow: pInt(inputs[6])
            }
        };
    }

    function findFlat (ground) {
        var flats = [];

        for (var i = 0 ; i < ground.length ; i++) {
            var cGround = ground[i];
            var nGround = ground[i+1];
            if (!nGround) break;

            if (cGround.y == nGround.y) {
                flats.push({
                    x: {
                        left:  cGround.x,
                        right: nGround.x
                    },
                    y: cGround.y
                })
            }
        }

        return flats;
    }

    function adjustSpeed(vy, limit, pow) {
        if (Math.abs(vy) <= limit && pow > 0) {
            pow--;
        } else if (Math.abs(vy) > limit && pow < 4) {
            pow++;
        }
        return pow;
    }

    var ground = initRead();
    var flats  = findFlat(ground);
    var land   = flats[0];
    var ml, vmove, hmove, rot, pow = 0, dst;
    while (true) {
        ml = loopRead();

        // Direction adjustments
        if (ml.pos.x <= land.x.left) {
            vmove = 0;
            hmove = 1;
        } else if (ml.pos.x >= land.x.right) {
            vmove = 0;
            hmove = -1;
        } else {
            vmove = 1;
            hmove = 0;
        }

        // Speed adjsutments
        if (vmove) {
            dst = ml.pos.y - land.y;
        }

        rot = (-45 * hmove);

        if (dst > 2500) {
            pow = adjustSpeed(ml.speed.vy, 50, pow);
        } else if (dst > 1800) {
            pow = adjustSpeed(ml.speed.vy, 40, pow);
        } else {
            pow = adjustSpeed(ml.speed.vy, 38, pow);
        }

        print([rot, pow].join(' '));
    }
}());
