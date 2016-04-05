var min = Infinity;

[...Array(+readline())]                             // Create empty array
    .map(_ => +readline())                          // Fill it with horses power
    .sort((a, b) => a - b)                          // Sort powers from lowest to highest
    .reduce((previous, current) => {
        min = Math.min(current - previous, min);    // Keep the lowest diff between each horses pair
        return current;
    }, -Infinity);                                  // Use imaginary value for diff with first value

print(min);
