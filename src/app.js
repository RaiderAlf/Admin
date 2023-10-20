//DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
//IMPORTS
const server = express();

//SERVER
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(morgan('dev'));
server.use('/', router)

module.exports = server;