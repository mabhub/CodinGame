var JSONprint = require('json-print');

module.exports = (function () {

    var log = function (data) {
        if (typeof data === 'object') {
            data = JSONprint(JSON.stringify(data));
        }

        printErr(data);
    };

    return {
        console: {
            log: log
        },
        log: log
    }
}())
