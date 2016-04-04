/**
 * La descente
 */


/**
 * Short one
 */
while (true) {
    var mountains =
        [...Array(8)]           // Init an array of 8 values
        // Array(8).fill(0)     // Init an array of 8 values (other way)
        .map(_ => +readline()); // Fill each values with +readline()
    print(mountains.indexOf(Math.max(...mountains)));
}

/**
 * Long one
 */
while (true) {
    let max = -Infinity,
        maxIndex;
    for (var i = 0; i < 8; i++) {
        let value = +readline();
        if (value > max) {
            max = value;
            maxIndex = i;
        }
    }
    print(maxIndex);
}
