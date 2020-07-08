const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
const { SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET } = require('../config');

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

//Routes
router.post('/signup', (req, res, next) => {
  const { clientId } = req.body;
  req.session.clientId = clientId;
  console.log(req.session.id);
  res.json({
    messagee: 'login Route'
  });
});

router.post('/signin', (req, res, next) => {
  console.log(req);
  res.json({
    messagee: `Somebody just loged whit this id`
  });
});

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
