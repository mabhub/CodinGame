/**
 * Winamax Sponsored Challenge
 */

// var c   = require('../common.js');
// var log = c.log;

var Player = function () {
    this.name;
    this.id;
    this.cards = [];
    this.stack = [];

    function _pick (card) {
        if (card instanceof Array) {
            card.forEach(_pick.bind(this));
        } else {
            //TODO: Test if the card is a valid one
            this.cards.push(card);
        }

        return this.cards.length;
    }

    function _play () {
        var card = this.cards.shift();
        if (card) {
            this.stack.push(card);
            return card;
        } else {
            return false;
        }
    }

    function _flush () {
        var cards = this.stack;
        this.stack = [];
        return cards;
    }

    function _cover () {
        for (var i = 0 ; i < 3 ; i++) {
            this.play();
        }
    }

    this.pick  = _pick;
    this.play  = _play;
    this.flush = _flush;
    this.cover = _cover;
};

var App = function () {

    var p1 = new Player();
    var p2 = new Player();
    var players = [p1, p2];

    var faceCardValues = {
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14
    }

    players.forEach(function (player, index) {
        player.id = index + 1;
        player.name = 'Player' + player.id;

        var numberOfCards = readline();
        for (var i = 0; i < numberOfCards; i++) {
            player.pick(readline());
        }

    });

    var _parseFace = function _parseFace (card) {
        if (!card) return 0;
        var value = parseInt(card);
        return value ? value : faceCardValues[card[0]];
    }

    var _play = function _play (player1, player2) {
        var v1 = _parseFace(player1.play());
        var v2 = _parseFace(player2.play());

        if (v1 > v2) {
            return player1;
        } else if (v2 > v1) {
            return player2;
        } else {
            return false;
        }
    };

    var _goOn = function _goOn () {
        if (p1.cards.length && p2.cards.length) {
            return true;
        } else {
            return false;
        }
    };

    var _cover = function _cover () {
        p1.cover();
        p2.cover();

        return p1.stack.length === p2.stack.length;
    }

    var _main = function _main () {
        var round = 0;

        while (_goOn()) {
            roundWinner = _play(p1, p2);

            if (roundWinner) {
                round++;
                roundWinner.pick(p1.flush().concat(p2.flush()));
            } else {
                if (_cover()) {
                    continue;
                } else {
                    roundWinner = false;
                    break;
                }
            }
        }
        if (roundWinner) {
            print(roundWinner.id + ' ' + round);
        } else {
            print('PAT');
        }
    };

    this.start = _main;
};

var app = new App();

app.start();
