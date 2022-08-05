import express from 'express';
import {firebaseRoutes} from "./firebase/firebase";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import * as fs from "fs";

const swaggerDocument = '/home/ruben/Escritorio/githubProyects/auth-nodeJs/swagger.json';
const swaggerData = fs.readFileSync(swaggerDocument, 'utf8');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

const PORT = 8080;
app.use('/api/v0/auth', firebaseRoutes);
app.use('/api/v0/auth', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerData), null, null, null));
app.use("*", (req, res) => {
    res.send("Make sure url is correct!");
})
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})