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
import {initEureka} from "./EurekaConfig";
import actuator, {Options} from "express-actuator";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(rateLimiterMiddleware);

initFirebaseModule();
initMongo();
const PORT = 3000;
// app.use('/health', healtRouter);
const options: Options = {
    basePath: '', // It will set /management/info instead of /info
    infoGitMode: "simple", // the amount of git information you want to expose, 'simple' or 'full',
    infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
    infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
    customEndpoints: [] // array of custom endpoints
};
app.use(actuator(options));
app.use('/api/v0/auth/firebase', firebaseRoutes);
app.use('/api/v0/auth/invitation', invitationsRoutes);
app.use('/api/v0/auth/user', userRoutes);
app.use('/api/v0/auth', swaggerUi.serve, swaggerUi.setup(swagger, null, null, null));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

initEureka('twenti-auth', 8080);

process.on('uncaughtException', err => {
    console.log('Caught exception ', err);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Unhandled rejection at ${promise} reason: ${reason}`)
})