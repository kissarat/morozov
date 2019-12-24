const { collection } = require('./mongo');
const { promise, stamp } = require('./utils');
const config = require('config');

const stampObject = data => {
    stamp(data, 'createdAt');
    stamp(data, 'updatedAt');
}

module.exports = async function handle(name, method, query = {}, data = null) {
    return promise(function(callback) {
        try {
            const $ = collection(name);
            switch (method) {
                case 'GET':
                    $.find(query).toArray(callback);
                    break;
                case 'POST':
                    stampObject(data);
                    $.insert(data, config.get('mongo.insert'), callback);
                    break;
                case 'PUT':
                    stampObject(data);
                    $.update(query, data, config.get('mongo.update'), callback);
                    break;
                default:
                    callback({ status: 405 });
            }
        } catch(err) {
            callback(err);
        }
    })
}
