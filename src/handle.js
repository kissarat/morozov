const { collection } = require('./mongo');
const { promise, stamp } = require('./utils');
const config = require('config');

const stamps = {};
for(const name of ['createdAt', 'updatedAt']) {
    const newName = config.get(`stamps.${name}`);
    stamps[name] = true === newName ? name : newName;
}

module.exports = async function handle(name, method, query = {}, data = null) {
    return promise(function(callback) {
        try {
            const now = new Date();
            const $ = collection(name);
            switch (method) {
                case 'GET':
                    $.find(query).toArray(callback);
                    break;
                case 'POST':
                    if (stamps.createdAt) {
                        data[stamps.createdAt] = now;
                    }
                    if (stamps.updatedAt) {
                        data[stamps.updatedAt] = now;
                    }
                    $.insert(data, config.get('mongo.insert'), callback);
                    break;
                case 'PUT':
                case 'PATCH':
                    $.findOne(query, function(err, old) {
                        if (err) {
                            return callback(err);
                        }
                        if ('PATCH' === method) {
                            data = { ...old, ...data };
                        }
                        if (stamps.createdAt) {
                            data[stamps.createdAt] = old[stamps.createdAt];
                        }
                        if (stamps.updatedAt) {
                            data[stamps.updatedAt] = now;
                        }
                        $.update(query, data, config.get('mongo.update'), function(err, result) {
                            if (result) {
                                if (result.result.n === 0){
                                    result.status = 404;
                                    return callback(result);
                                }
                            }
                            callback(err, result);
                        });
                    })
                    
                    break;
                case 'DELETE':
                    $.remove(query, config.get('mongo.remove'), callback);
                    break;
                default:
                    callback({ status: 405 });
            }
        } catch(err) {
            callback(err);
        }
    })
}
