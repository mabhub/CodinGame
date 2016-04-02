/**
 * Skynet : le virus
 */

var App = function () {

    var links = [];
    var exits = [];

    /**
     * Return true if "node" is directly connected to node
     * Otherwise return false.
     */
    var _inLink = (node, link) => (node === link[0] || node === link[1]);

    /**
     * Return true if "link" is directly connected to a gateway
     * Otherwise return false.
     */
    function _isExitLink (link) {
        let exits_num = exits.length;
        for (let i = 0 ; i < exits_num ; i++) {
            let exit = exits[i];
            if (_inLink(exit, link)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return true if "link" is directly connected to Skynet Agent
     * Otherwise return false.
     */
    var _isAgentLink = (agent_node, link) => (agent_node === link[0] || agent_node === link[1]);

    /**
     * Remove link_index element from links array
     */
    function _deleteLink (link_index) {
        print(links[link_index].join(' '));
        links.splice(link_index, 1);
    }

    function _init () {
        let inputs    = readline().split(' ');
        let nodes_num = +inputs[0];
        let links_num = +inputs[1];
        let exits_num = +inputs[2];

        for (let i = 0; i < links_num; i++) {
            let inputs = readline().split(' ');
            links.push([+inputs[0], +inputs[1]]);
        }

        for (let i = 0; i < exits_num; i++) {
            exits.push(+readline());
        }
    }

    function _doLoop () {
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
             * delete any exit link
             *
             * TODO: Find solution to do a better choice
             */
            if (delete_index === false) for (let i = 0 ; i < links_num ; i++) {
                if (_isExitLink(links[i])) {
                    delete_index = i;
                }
            }

            _deleteLink(delete_index);
        }
    }

    function _main () {
        _init();
        _doLoop();
    }

    this.start = _main;
};

var app = new App;
app.start();
