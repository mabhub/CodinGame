/**
 * Le cadeau
 */

// Total number of Oods.
var oods    =+readline();

// Money to pay
var amount  =+readline();

// Content of each one wallets
var wallets = [...Array(oods)].map(_ => +readline()).sort((a, b) => a - b);

// Polyfill
Array.prototype.sum = function () { return this.reduce((a, b) => a + b, 0); }

var getContribs = (wallet) => {
    /**
     * part: what the Ood should pay if he has enough money
     */
    let part = Math.floor(amount / oods);

    /**
     * contrib: how much the Ood will really pay.
     */
    let contrib = Math.min(part, wallet);

    /**
     * Remove the Ood and his participation from the remaining
     */
    amount -= contrib;
    oods   -= 1; // oods--;

    return contrib;
};

if (amount > wallets.sum()) {
    /**
     * Oods don't have money enough to pay for the gift.
     */
    print('IMPOSSIBLE');
} else {
    /**
     * Oods have money enough, compute & print the part of each.
     */
    let contribs = wallets.map(getContribs);
    contribs.forEach((contrib) => print(contrib));
}
