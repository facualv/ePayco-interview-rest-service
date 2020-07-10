const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const { SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET } = require('../config');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
const {
  AuthController,
  TransactionController,
  WalletController
} = require('../controllers');

const router = express.Router();

//Default Middlewares
router.use(express.json()).use(morgan('dev'));
router.use(helmet());
router.use(
  session({
    name: SESSION_NAME,
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    wallet: {
      maxAge: Number(SESSION_LIFETIME),
      // sameSite: 'none',
      secure: false //For development perpuses
    }
  })
);
router.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true
  })
);

//Working Properly
router.post('/signup', AuthController.signIn);
router.post('/login', AuthController.login);

//Email is sended itill need to connect to the soap service
router.post('/payment', TransactionController.payment);

router.post('/getBalance', WalletController.getBalace);

router.post('/recharge', (req, res, next) => {
  console.log(req.body);

  res.json({
    message: 'Recharge Route'
  });
});

//Other Middlewares
router.use(NotFoundMiddleware);
router.use(ErrorMiddleware);

module.exports = router;
