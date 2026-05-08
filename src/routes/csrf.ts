const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();

/* GET home page. */
router.use(
  session({
    secret: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000,
    },
  })
);
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

let sessionData =  {};