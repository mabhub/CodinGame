/**
 * Skynet : le virus
 */

let nodes = [];
const Node = function (id) {

    this.id       = id;
    this.isExit   = false;
    this.siblings = {};

    nodes[this.id] = this;

    Object.defineProperties(this, {
        cnxCount: { get: _ => Object.getOwnPropertyNames(this.siblings).length }
    });

    Node.prototype.toString = function () { return this.id; };

    Node.prototype.addSibling = function (node) {
        if (!this.siblings[node.id]) this.siblings[node.id] = node;
        if (!node.siblings[this.id]) node.addSibling(this);
    };

    Node.prototype.remSibling = function (nid) {
        if (this.siblings[nid]) delete this.siblings[nid];
        if (nodes[nid].siblings[this.id]) delete nodes[nid].siblings[this.id];
    };
};

const log = n => printErr(require('util').inspect(n));

const BFS = function (startNode) {
    let nodeQueue = [];
    let distance = 0;
    nodeQueue.push(startNode);
    startNode.mark = true;

    while (nodeQueue.length) {
        let currentNode = nodeQueue.shift();
        log(currentNode.id + ':' + currentNode.isExit + ' ' + distance);

        for (let nid in currentNode.siblings) {
            let currentSibling = currentNode.siblings[nid];
            if (!currentSibling.mark) {
                nodeQueue.push(currentSibling);
                currentSibling.mark = true;
            }
        }

    }
};




/**
 * Return true if "node" is directly connected to node
 * Otherwise return false.
 */
const _inLink = (node, link) => (node === link[0] || node === link[1]);

/**
 * Return true if "link" is directly connected to a gateway
 * Otherwise return false.
 */
const _isExitLink = (link) => nodes[link[0]].isExit || nodes[link[1]].isExit;

/**
 * Return true if "link" is directly connected to Skynet Agent
 * Otherwise return false.
 */
const _isAgentLink = (agent_node, link) => (agent_node === link[0] || agent_node === link[1]);


// const _isLink
/**
 * Remove link_index element from links array
 */
const _cutLink = (link_index) => {
    let link = links[link_index];
    let n1   = nodes[link[0]];
    let n2   = nodes[link[1]];

    n1.remSibling(n2);
    print(link.join(' '));
    links.splice(link_index, 1);
};

let [nodes_num, links_num, exits_num] = readline().split(' ').map(n =>+n);

let links = [...Array(links_num)].map(_ => readline().split(' ').map(n=>+n));
links.forEach((link) => {
    let n1id = link[0];
    let n2id = link[1];
    let n1 = nodes[n1id] || new Node(n1id);
    let n2 = nodes[n2id] || new Node(n2id);

    n1.addSibling(n2);
});

let exits = [...Array(exits_num)].map(_ => +readline());
exits.forEach((nid) => nodes[nid].isExit = true);


BFS(nodes[11]);

while (true) {
    let agent_node   = +readline();
    let links_num    = links.length;
    let delete_index = false;

    /**
     * Check if agent is immediatly near exit
     */
    for (let i = 0 ; i < links_num ; i++) {
        if (_isExitLink(links[i]) && _isAgentLink(agent_node, links[i])) {
            delete_index = i;
        }
    }

    /**
     * If agent is not immediatly near exit,
     * delete link to the most connected node
     *
     * TODO: Find solution to do a better choice
     */
    let mostCnx = 0;
    if (delete_index === false) for (let i = 0 ; i < links_num ; i++) {
        let link = links[i];
        if (_isAgentLink(agent_node, link)) {
            let otherNode = nodes[link[!link.indexOf(agent_node) ? 1 : 0]];
            /**
             * Choose the link connected to the node with the most connections
             */
            if (otherNode.cnxCount >= mostCnx) {
                mostCnx = otherNode.cnxCount;
                delete_index = i;
            }
        }
    }

    _cutLink(delete_index);
}
