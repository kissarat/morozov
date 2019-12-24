const { collection } = require('./mongo');
const { promise, stamp } = require('./utils');
const config = require('config');
const { ObjectId } = require('mongodb');

const stampObject = data => {
    stamp(data, 'createdAt');
    stamp(data, 'updatedAt');
}

module.exports = async function handle(name, method, query = {}, data = null) {
    return promise(function(callback) {
        try {
            const $ = collection(name);
            if (query._id) {
                query._id = new ObjectId(query._id);
            }
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
                    $.update(query, data, config.get('mongo.update'), function(err, result) {
                        if (result) {
                            if (result.result.n === 0){
                                result.status = 404;
                                return callback(result);
                            }
                        }
                        callback(err, result);
                    });
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
