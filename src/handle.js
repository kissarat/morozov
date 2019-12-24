const { collection } = require('./mongo');
const { promise } = require('./utils');

module.exports = async function handle(name, method, query = {}, data = null) {
    return promise(function(callback) {
        const $ = collection(name);
        switch (method) {
            case 'GET':
                $.find(query).toArray(callback);
                break;
            case 'POST':
                $.find(query).toArray(callback);
                break;
        }
    })
}
