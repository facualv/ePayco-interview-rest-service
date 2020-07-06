const express = require("express");

const {
  AuthController,
  TransactionController,
  WalletController
} = require("../controllers");

const middlewares = require("../middlewares/auth.middleware");

const router = express.Router();
// any route in here is pre-pended with /auth

const defaultLoginError = "Unable to login";
const signInError = "That username is not unique. Please choose another one.";

router.get("/");
router.post("/signup");
router.post("/login");

module.exports = router;
