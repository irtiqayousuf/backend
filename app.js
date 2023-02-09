{/*const http = require("http")
  
// Creating server 
const server = http.createServer((req, res) => {
    // Sending the response
    res.write("This is the response from the server")
    res.end();
})
  
// Server listening to port 3000
server.listen((3000), () => {
    console.log("Server is Running");
})*/}
require("dotenv").config();
require('./config/database').connect();
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var router = require('./routing/routing');
app.use(router);




var dotenv = require ('dotenv');

dotenv.config();
var port = process.env.PORT || 8081

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})