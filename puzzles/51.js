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


/**
 * Teads Sponsored Challenge
 */

const i = require('util').inspect; const log = (data) => printErr(i(data, { depth:3 }));
const N = +readline(); // the number of adjacency relations

var nodes = {}

const LINKS = [...Array(N)].map(_ => {
    let link  = readline().split(' ').map((s) => +s);
    let nodeA = nodes[link[0]] || new Node(link[0]);
    let nodeB = nodes[link[1]] || new Node(link[1]);
    nodeA.addSibling(nodeB.id, 1);
    nodeB.addSibling(nodeA.id, 1);
    return link;
});


var l = 0;

/**
 * There can't be more level than links
 * So, for each level, starting from level 2
 */
for (let level = 2 ; level < LINKS.length ; level++) {
    for (let n in nodes) {
        let empty       = true;
        let currentNode = nodes[n];

        if (typeof currentNode.siblings[level-1] !== 'undefined') {

            let currentSiblings = currentNode.siblings[level-1];

            for (let x = currentSiblings.length - 1 ; x >= 0 ; --x) {
                let nextSiblings = nodes[currentSiblings[x]].siblings[1];
l++;
                currentNode.addSiblings(nextSiblings, level);
                empty = false;

            }
        }
        if (empty) break;
    }
}

let lowest = +Infinity;
for (let n in nodes) {
    let node = nodes[n];
    lowest = Math.min(lowest, node.farestLevel);
}
log(l);
print(lowest);
