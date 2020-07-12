const sh = require('shorthash');
const { EmailSender } = require('../helpers');
const {
  TransactionService: { paymentService, rechargeService }
} = require('../services');

async function payment(req, res) {
  const paymentData = req.body;

  //Adds the clienId to the payment data object
  paymentData.clientId = req.session.clientId;
  const paymentResponse = await paymentService(paymentData);
  res.send(paymentResponse);
}

async function recharge(req, res) {
  const rechargeData = req.body;
  const rechargeResponse = await rechargeService(rechargeData);
  console.log(rechargeResponse);
  return res.send(rechargeResponse);
}

module.exports = {
  payment,
  recharge
};
