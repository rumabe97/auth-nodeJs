import express from 'express';
import {firebaseRoutes} from "./firebase/routes";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {swagger} from "../swagger";
import {initFirebaseModule} from "./firebase/config";
import {rateLimiterMiddleware} from "./shared/redis/RateLimiterRedis";
import {invitationsRoutes} from "./invitation/routes";
import {initMongo} from "./invitation/config";
import {userRoutes} from "./user/routes";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(rateLimiterMiddleware);

initFirebaseModule();
initMongo();
const PORT = 3000;
app.use('/api/v0/auth/firebase', firebaseRoutes);
app.use('/api/v0/auth/invitation', invitationsRoutes);
app.use('/api/v0/auth/user', userRoutes);
app.use('/api/v0/auth', swaggerUi.serve, swaggerUi.setup(swagger, null, null, null));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

process.on('uncaughtException', err =>{
    console.log('Caught exception ', err);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled rejection at ${promise} reason: ${reason}`)
})