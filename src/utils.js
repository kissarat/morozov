const config = require('config');
const { ObjectId } = require('mongodb');

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

function isObjectIdString(value) {
    return 'string' === typeof value && /^[0-9a-f]{24}$/i.test(value);
}

function setupObjectIdFields(object) {
    const result;
    for(const key in query) {
        const value = query[key];
        result[key] = /(_id|Id)$/.test(key) && isObjectIdString(value)
            ? new ObjectId(query[key])
            : value;
    }
    return result;
}

module.exports = { promise, now, stamp, isObjectIdString, setupObjectIdFields };
