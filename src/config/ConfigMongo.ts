import * as mongo from 'mongodb';
import {connect} from 'mongoose';

export function initMongo(url: string) {
    const client = mongo.MongoClient;

    client.connect(url, function (err) {
        if (err) {
            console.log('database is not connected')
        } else {
            console.log('connected!!')
        }
    })
    connect(url).then(() => {
        console.log('Mongoose connected');
    });
}