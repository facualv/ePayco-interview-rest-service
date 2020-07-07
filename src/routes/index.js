const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const AuthRouter = require("./auth.route");
const { SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET} = require("../config");

const router = express.Router();
const IN_PROD = (NODE_ENV === )


router.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: "true",
      secure: false //For development perpuses
    }
  })
);
//Default Middlewares
router.use(express.json()).use(morgan("dev"));

//Routes
router.use("/auth", AuthRouter);

router.post("/payment", (req, res, next) => {
  res.json({
    messagee: "payment Route"
  });
});

router.post("/recharge", (req, res, next) => {
  res.json({
    messagee: "Recharge Route"
  });
});

router.get("/currentBalance", (req, res, next) => {
  res.json({
    messagee: "Current Balance Route"
  });
});

//Other Middlewares
router.use(NotFoundMiddleware);
router.use(ErrorMiddleware);

module.exports = router;
