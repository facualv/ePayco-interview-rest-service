const { WalletDataAccess } = require('../data-access');

async function getBalanceService(balanceData) {
  const { clientId, phone } = balanceData;

  if (!clientId || !phone) {
    const error = new Error();
    error.status = 400;
    error.message = 'Client Id and phone must be sent';
    throw error;
  }

  const response = await WalletDataAccess.getBalance(clientId, phone);
  console.log(response);

  if (!response.error) {
    const error = new Error();
    error.status = 418;
    error.message = 'Invalid Credentials';
    throw error;
  }

  return response;
}

module.exports = {
  getBalanceService
};
