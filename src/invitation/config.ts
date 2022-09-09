import * as mongo from 'mongodb';
import { connect } from 'mongoose';

export function initMongo(){
    const client = mongo.MongoClient;
    const url = 'mongodb://mongo:27017/twenti';
    client.connect(url, function (err) {
        if(err) {
            console.log('database is not connected')
        }
        else {
            console.log('connected!!')
        }
    })
    connect(url).then( () => {
        console.log('Mongoose connected');
    });
}