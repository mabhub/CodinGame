/**
 * Skynet : le virus
 */

let nodes = [];
const Node = function (id) {
    this.id       = id;
    this.isExit   = false;
    this.cnxCount = 1;
};

Node.prototype.toString = function () {
    return this.id;
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
const _deleteLink = (link_index) => {
    links[link_index].forEach((nid) => nodes[nid].cnxCount--);
    print(links[link_index].join(' '));
    links.splice(link_index, 1);
};

let [nodes_num, links_num, exits_num] = readline().split(' ').map(n =>+n);
let links = [...Array(links_num)].map(_ => readline().split(' ').map(n=>+n));
let exits = [...Array(exits_num)].map(_ => +readline());

links.forEach((link) => {
    link.forEach((nid) => {
        if (nodes[nid]) nodes[nid].cnxCount++;
        else nodes[nid] = new Node(nid);
    })
});

exits.forEach((nid) => nodes[nid].isExit = true);

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

    _deleteLink(delete_index);
}
