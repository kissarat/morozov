const config = require('config');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL || config.get('mongo.url'));
let db;

function collection(name) {
    return db.collection(name);
}

const connect = () => new Promise(function(resolve, reject) {
    client.connect(function (err) {
        if (err) {
            reject(err);
        } else {
            db = client.db(process.env.MONGO_DATABASE || config.get('mongo.database'));
            resolve(db);
        }
    })
})

module.exports = { connect, client, collection, db };
