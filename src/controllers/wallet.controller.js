const {
  WalletService: { getBalanceService }
} = require('../services');

async function getBalace(req, res) {
  const balanceData = req.body;
  const getBalanceResponse = await getBalanceService(balanceData);
  return res.status(200).send(getBalanceResponse);
}

module.exports = {
  getBalace
};
