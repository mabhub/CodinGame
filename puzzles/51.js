/**
 * Teads Sponsored Challenge
 */

var log = (data) => printErr(require('util').inspect(data, { depth:3 }));

var App = function () {

    var nodes = {}
    var links = [];

    /**
     * Node Class
     */
    var Node = function (init_id) {
        if (typeof init_id === 'undefined') throw new Error('Can\'t create Node without ID');
        if (nodes[init_id]) throw new Error('A node already exists with this ID');

        this.id        = init_id;
        this.siblings  = [];
        this.refs      = [];
        this.farestLevel = 0;

        /**
         * Add this node to nodes store
         */
        nodes[this.id] = this;

        /**
        * Add a new directly connected node
        */
        Node.prototype.addSibling = function (nodeId, level) {
            if (this.knows(nodeId)) return false;
            if (nodeId === this.id) return false;

            if (!this.siblings[level]) this.siblings[level] = [];

            this.register(nodeId);
            this.siblings[level].push(nodeId);

            this.farestLevel = Math.max(this.farestLevel, level);

            return this;
        };

        Node.prototype.addSiblings = function (nidArray, level) {
            nidArray.forEach((nid) => this.addSibling(nid, level));
        };

        Node.prototype.knows = function (nid) {
            return this.refs.indexOf(nid) > -1;
        };

        Node.prototype.register = function (nid) {
            this.refs.push(nid);
            return this;
        };

    };


    function _init () {
        var n = +readline(); // the number of adjacency relations
        for (let i = 0; i < n; i++) {
            let inputs = readline().split(' ');
            links.push([+inputs[0], +inputs[1]]);

            let nodeA = nodes[+inputs[0]] || new Node(+inputs[0]);
            let nodeB = nodes[+inputs[1]] || new Node(+inputs[1]);
            nodeA.addSibling(nodeB.id, 1);
            nodeB.addSibling(nodeA.id, 1);
        }
    }

    function _populate () {
        /**
         * There can't be more level than links
         * So, for each level, starting from level 2
         */
        for (let level = 2 ; level < links.length ; level++) {
            for (let n in nodes) {
                let empty       = true;
                let currentNode = nodes[n];

                if (typeof currentNode.siblings[level-1] !== 'undefined') {

                    let currentSiblings = currentNode.siblings[level-1];

                    for (let x = currentSiblings.length - 1 ; x >= 0 ; --x) {
                        let nextSiblings = nodes[currentSiblings[x]].siblings[1];

                        currentNode.addSiblings(nextSiblings, level);
                        empty = false;

                    }
                }
                if (empty) break;
            }
        }
    }

    function _getLowestFarest () {
        let lowest = +Infinity;
        for (let n in nodes) {
            let node = nodes[n];
            lowest = Math.min(lowest, node.farestLevel);
        }
        print(lowest);
    }

    function _main () {
        _init();
        _populate();
        _getLowestFarest();
    }

    this.start = _main;
};

var app = new App;

app.start();
