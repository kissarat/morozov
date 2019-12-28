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

function isObjectIdString(value) {
    return 'string' === typeof value && /^[0-9a-f]{24}$/i.test(value);
}

function setupObjectIdFields(object) {
    const result = {};
    for(const key in object) {
        const value = object[key];
        result[key] = /(_id|Id)$/.test(key) && isObjectIdString(value)
            ? new ObjectId(value)
            : value;
    }
    return result;
}

module.exports = { promise, isObjectIdString, setupObjectIdFields };
