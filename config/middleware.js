const passport = require("passport")
const express = require("express")
const session = require("express-session")
require("dotenv").config()
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
require("./passport")
require("./database")


function middleware(app) {
    console.log("middleware function initialized")
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(methodOverride("_method"));
    

    //This sets up our session so passport can use it
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
         res.locals.user = req.user
         next()
     })
}

module.exports = middleware;