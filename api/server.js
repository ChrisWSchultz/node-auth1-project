// module imports
const express = require('express')
require('dotenv').config()

// middleware imports
const session = require('express-session')
const ConnectSessionKnex = require("connect-session-knex")(session)

const db = require('../data/dbConfig')

// route imports
const Register = require('./routes/register')
const Login = require('./routes/login')
const Users = require('./routes/users')

// app
const app = express()

// modules
app.use(express.json())
app.use(session({
    resave: false, // avoid creating sessions that have not changed
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    secret: process.env.SESSION_KEY, // cryptographically sign the cookie
    store: new ConnectSessionKnex({
        knex: db, // configured instance of knex
        createtable: true, // create a sessions table in the db if it doesn't exist
    }),
}))

// middleware


// routes
app.use('/api', Register)
app.use('/api', Login)
app.use('/api', Users)

module.exports = app
