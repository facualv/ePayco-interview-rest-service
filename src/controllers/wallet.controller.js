const { GetBalance } = require('../data-access');

async function getBalace(req, res) {
  const { clientId, phone } = req.body;

  console.log(req.body);

  if (clientId && phone) {
    const response = await GetBalance(clientId, phone);
    const { Message, StatusCode, IsError, CurrentBalance } = response;
    // If the client is not null it means that it was succesfully validated
    if (response) {
      console.log(response);
      res.json({ message: Message, currentBalance: CurrentBalance });
    }
  } else {
    res.status(400);
  }
}

module.exports = {
  getBalace
};
