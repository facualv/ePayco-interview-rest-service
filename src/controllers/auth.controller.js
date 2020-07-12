const { AuthService } = require('../services');

module.exports = {
  signIn: async (req, res) => {
    const { name, clientId, phone, email, password } = req.body;
    if (name && phone && email && password && clientId) {
      const newClient = req.body;
      console.log(newClient);
      await AuthService.signUp(newClient);
      res.json({ added: 'ok' });
    } else {
      res.status(400);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // Sends the credentials to the auth service expecting a client object id they are valid
      const { Client } = await AuthService.logIn(email, password);
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // If the client is not null it means that it was succesfully validated
      if (Client) {
        req.session.clientId = Client.ClientId;
        req.session.email = Client.Email;
        req.session.phone = Client.Phone
        console.log(req.session);
        // The session middleware is working properly
        res.json({ message: 'Login Successful' });
      }
    } else {
      res.status(400);
    }
  }
};
