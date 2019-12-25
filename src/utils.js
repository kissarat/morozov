const config = require('config');

function promise(callback) {
    return new Promise(function(resolve, reject) {
        callback(function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

function now() {
    return new Date().toISOString();
}

function stamp(data, property) {
    const name = config.get(`stamps.${property}`);
    if (name) {
        data[true === name ? property : name] = new Date();
    }
}

module.exports = { promise, now, stamp };
