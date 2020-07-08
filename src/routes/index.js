const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const { SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET } = require('../config');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
const { AuthController } = require('../controllers');

const router = express.Router();

//Default Middlewares
router.use(express.json()).use(morgan('dev'));
router.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: Number(SESSION_LIFETIME),
      sameSite: 'true',
      secure: false //For development perpuses
    }
  })
);
router.use(
  cors({
    origin: 'http://localhost:8080'
  })
);


router.post('/signup', AuthController.signIn);
router.post('/login', AuthController.login);


router.post('/payment', (req, res, next) => {
  res.json({
    messagee: 'payment Route'
  });
});

router.post('/recharge', (req, res, next) => {
  res.json({
    messagee: 'Recharge Route'
  });
});

router.post('/getBalance', (req, res, next) => {
  res.json({
    messagee: 'Current Balance Route'
  });
});

//Other Middlewares
router.use(NotFoundMiddleware);
router.use(ErrorMiddleware);

module.exports = router;
