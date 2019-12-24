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

function load(readable) {
    return new Promise(function(resolve, reject) {
        const chuncks = [];
        readable.on('data', function(chunk) {
            chuncks.push(chunk);
        })
        readable.on('error', reject) 
        readable.on('end', function() {
            resolve(chuncks.length == 1 ? chuncks[0] : Buffer.from(chuncks));
        })
    })
}

async function loadJSON(readable) {
    const data = await load(readable);
    if (data.length > 0) {
        return JSON.parse(data.toString('utf8'));
    }
    return null;
}

function now() {
    return new Date().toISOString();
}

function stamp(data, property) {
    const name = config.get(`stamps.${property}`);
    if (name) {
        data[true === name ? property : name] = now();
    }
}

module.exports = { promise, load, loadJSON, now, stamp };
