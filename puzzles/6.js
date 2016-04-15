const WIDTH  = +readline();
const HEIGHT = +readline();
const TEXT   = readline().toLowerCase();
const LINES  = [...Array(HEIGHT)].map(_=> readline());

const _getLetter = (letter) =>
    LINES.map((line) => line.substr('abcdefghijklmnopqrstuvwxyz?'.split('').indexOf(letter) * WIDTH, WIDTH));

TEXT.split('').reduce(
    (lines, letter) => lines.map((lineContent, lineIndex) => lineContent + _getLetter(letter)[lineIndex]),
    [...Array(HEIGHT)].fill('')
).forEach(x => print(x));
