/**
 * Le cadeau
 */

var oods    =+readline(); // Total number of Oods.
var amount  =+readline(); // Money to pay

const wallets  = [...Array(oods)].map(_ => +readline()).sort((a, b) => a - b); // Content of each one wallets
const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

if (amount > arraySum(wallets)) {
    /**
     * Oods don't have money enough to pay for the gift.
     */
    print('IMPOSSIBLE');
} else {
    /**
     * Oods have money enough, compute & print the part of each.
     */
    wallets.forEach((wallet) => {
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

        print(contrib);
    });
}
