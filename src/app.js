//DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
const hbs = require('hbs');
//IMPORTS
const server = express();

//SERVER
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
server.use(express.urlencoded({extended : true}))
server.use('/', router)
 
// TEMPLATE ENGINE
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
server.set('view engine', 'hbs');
server.set("views", __dirname + "/views");

server.use(express.static(__dirname + "/public"));

module.exports = server;