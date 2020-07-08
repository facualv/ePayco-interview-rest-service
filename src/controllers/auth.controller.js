module.exports = {
  signIn: async (req, res) => {
    const { name, clientId, phone, email, password } = req.body;
    if (name && phone && email && password && clientId) {
      const newClient = req.body;
      console.log(newClient);
      //  await AuthService.signIn(newClient);
      res.json({ added: 'ok' });
    } else {
      res.status(400);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const newLogin = req.body;
      console.log(newLogin);
      //  IntegrationLayer.signIn(email, password);
      res.json({ modified: 'ok' });
    } else {
      res.status(400);
    }
  }
};
