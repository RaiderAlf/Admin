//DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
//IMPORTS
const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(cors());
server.use(express.urlencoded({extended : true}))
server.use('/', router)

module.exports = server;