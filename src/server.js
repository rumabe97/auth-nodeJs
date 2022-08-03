// require express
const express = require("express");

//create an app using express constructor
const auth = express();

// declare your port
const port = 5000;

// require routes from the routes.js file
const routes = require("./api/routes");
// set the route for our application by passing the app to the routes object
routes(auth);

// call the listen method on the app
auth.listen(port, ()=>{
    console.log("Server is running is port: " + port);
});