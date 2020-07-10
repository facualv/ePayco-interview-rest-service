const sh = require('shorthash');
const { EmailSender } = require('../helpers');
const { TransactionService } = require('../services');
let storedToken = '';

async function payment(req, res) {
  const { ammount, detail, sessionId, token } = req.body;
  const email = req.session.email;
  const sessId = req.session.id;

  if (!sessionId && !token && email) {
    console.log(req.session);

    const email = req.session.email;
    console.log(email);

    //Generate a token
    storedToken = sh.unique(JSON.stringify(req.body));
    console.log(storedToken);

    //Saves the generated token
    EmailSender(email, storedToken, sessId);
    res.send({ message: 'Token and SessionId Sended to your email' });
  }

  if (ammount && detail && sessionId && token) {
    console.log(sessionId);

    if (storedToken == token && sessionId == sessId) {
      // calls the data access payment function
      res.send({ message: 'VALID TOKEN AND SESSION ID' });
    } else {
      res.send({ message: 'INVALID TOKEN OR SESSION ID' });
      res.status(403);
    }
  }
}

async function recharge(req, res) {
  const { clientId, phone, ammount } = req.body;

  if (clientId && phone && ammount) {
    // Sends the credentials to the auth service expecting a client object id they are valid
    res.json({ message: 'Recharge Route' });
  } else {
    res.status(400);
  }
}

module.exports = {
  payment,
  recharge
};
