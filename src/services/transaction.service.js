const { TransactionDataAcces } = require('../data-access');
const { payment } = require('../data-access/transaction.data-access');

async function paymentService(paymentData) {
  const { clientId, amount, detail } = paymentData;

  if (!clientId || !amount) {
    const error = new Error();
    error.status = 400;
    error.message = 'Client Id and amount of the payment must be sent';
    throw error;
  }

  const paymentResponse = TransactionDataAcces.payment(clientId, amount, detail);
  const { message, status, error } = paymentResponse;

  if (error) {
    const error = new Error();
    error.status = status;
    error.message = message;
    throw error;
  }

  return paymentResponse;
}

async function rechargeService(rechargeData) {
  const { clientId, phone, amount, detail } = rechargeData;

  if (!clientId || !phone || !amount) {
    const error = new Error();
    error.status = 400;
    error.message = 'Client Id, phone and amount of the recharge must be sent';
    throw error;
  }

  return TransactionDataAcces.recharge(clientId, phone, amount, detail);
}

module.exports = {
  paymentService,
  rechargeService
};
