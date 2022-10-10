import express from 'express';
import {firebaseRoutes} from "./firebase/routes";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import {swagger} from "../swagger";
import {initFirebaseModule} from "./config/ConfigFirebase";
import {invitationsRoutes} from "./invitation/routes";
import {initMongo} from "./config/ConfigMongo";
import {userRoutes} from "./user/routes";
import {initEureka} from "./config/EurekaConfig";
import actuator, {Options} from "express-actuator";
import {rateLimiterMiddleware} from "./shared/redis/RateLimiterRedis";
import {initConfig} from "./config/ConfigServer";

const app = express();
initConfig().then(config => {
    app.use(express.json())
    app.use(express.urlencoded({extended: true}));
    app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
    app.use(bodyParser.json({limit: '50mb'}));
    const PORT = config.get('server.port');

    // if (config.get('redis.enable')) app.use(rateLimiterMiddleware);
    initFirebaseModule(config.get('firebase.project.id'), config.get('firebase.apiKey'));
    initMongo(config.get('mongo.url'));
    initEureka(config.get('spring.application.name'), PORT);

    const options: Options = {
        basePath: '',
        infoGitMode: "simple",
        infoBuildOptions: null,
        infoDateFormat: null,
        customEndpoints: []
    };

    app.use(actuator(options));
    app.use('/api/v0/auth/firebase', firebaseRoutes);
    app.use('/api/v0/auth/invitation', invitationsRoutes);
    app.use('/api/v0/auth/user', userRoutes);
    app.use('/api/v0/auth', swaggerUi.serve, swaggerUi.setup(swagger, null, null, null));

    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`)
    })

    process.on('uncaughtException', err => {
        console.log('Caught exception ', err);
    })

    process.on('unhandledRejection', (reason, promise) => {
        console.log(`Unhandled rejection at ${promise} reason: ${reason}`)
    })
});
