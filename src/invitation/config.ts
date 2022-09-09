import * as mongo from 'mongodb';

export function initMongo(){
    const client = mongo.MongoClient;

    client.connect('mongodb://mongo:27017/twenti', function (err) {
        if(err) {
            console.log('database is not connected')
        }
        else {
            console.log('connected!!')
        }
    })
}