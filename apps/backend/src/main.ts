import express = require('express')
import path = require('path')
const server = express()

// Servers static folder
server.use(express.static(path.resolve('app/static')))

// Allows us to use body
server.use(express.json())

// Register APIs
import eventAPI = require('./app/api/event')
import ticketAPI = require('./app/api/ticket')

server.use('/event', eventAPI.default)
server.use('/ticket', ticketAPI.default)

// Run server
server.listen(3333)