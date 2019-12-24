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
            resolve(chuncks.length == 1 ? chunks[0] : Buffer.from(chuncks));
        })
    })
}

async function loadJSON(readable) {
    const data = await load(readable);
    return JSON.parse(data.toString('utf8'));
}

module.exports = { promise, load, loadJSON };
