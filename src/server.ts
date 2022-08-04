// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import express from 'express';
import {firebaseRoutes} from "./firebase/firebase";
import bodyParser from "body-parser";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

const PORT = 3000;
app.use('', firebaseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})