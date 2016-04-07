/**
 * Le cadeau
 */

var oods    =+readline();
var amount  =+readline();
var wallets = [...Array(oods)].map(_ => +readline()).sort((a, b) => a - b);

if (amount > wallets.reduce((a, b) => a + b, 0)) {

    /**
     * Oods don't have enough money to pay for the gift
     */
    print('IMPOSSIBLE');

} else {

    wallets.map((wallet) => {

        /**
         * part: what the Ood should pay if he has enough money
         */
        let part = Math.floor(amount / oods--);

        /**
         * contrib: how much the Ood will really pay.
         */
        let contrib = wallet > part ? part : wallet;

        /**
         * Remove the Ood participation from the remaining amount
         */
        amount -= contrib;

        print(contrib);
    });
}
