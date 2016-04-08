/**
 * Scrabble
 */

const DICT    = [...Array(+readline())].map(_ => readline());
const LETTERS = readline();

const pts = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
    n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10
};

/**
 * Compute points of word
 */
const points = (word) => word.split('').reduce((score, letter) => score += pts[letter], 0);

/**
 * Check if all letters from word are present within letters
 */
const matchLetters =
    (word, letters) => word.split('').reduce((bool, letter) =>
        (letters.length > (letters = letters.replace(letter, '')).length)
        ? bool && true
        : false,
    true);


print(
    /**
     * Iterate over DICT and keep only the better word
     */
    DICT.reduce((previous, current) => {

        /**
         * Can't keep word with to many letters
         */
        if (current.length > LETTERS.length) return previous;

        /**
         * If current word don't match letter, delete it.
         */
        current = matchLetters(current, LETTERS) ? current : '';

        /**
         * If current word has more point thant previous, return it.
         * Otherwise return previous one
         */
        return points(current) > points(previous) ? current : previous;

    }, '')
);
