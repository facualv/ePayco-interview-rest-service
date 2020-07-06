const express = require("express");
const morgan = require("morgan");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");
const AuthRouter = require("./auth.route");

const router = express.Router();

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
