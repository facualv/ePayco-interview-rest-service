const sh = require('shorthash');
const { EmailSender } = require('../helpers');

let storedToken = '';

const paymentConfirmation = (req, res, next) => {
  const { sessionId, token } = req.body;
  const { email, id, clientId } = req.session;

  console.log(req.session);

  if (!sessionId && !token && email) {
    //Generate a token
    storedToken = sh.unique(JSON.stringify(req.body));
    //Sends the email
    EmailSender(email, storedToken, id);
    res.send({ message: 'Token and SessionId Sended to your email' });
  } else {
    //
    const validToken = storedToken == token;
    const validSessionId = sessionId == id;

    if (validToken && validSessionId) {
      //Clears the sessionId and token out of the request after validate them
      delete req.body.sessionId;
      delete req.body.token;
      // Sends the request to the next middleware or controlller
      next();
    } else {
      res.status(403).send({ message: 'INVALID TOKEN OR SESSION ID' });
    }
  }
};

module.exports = paymentConfirmation;
