const {
  AuthService: { signUpService, loginService }
} = require('../services');

async function signUp(req, res) {
  const newClient = req.body;
  const signUpResponse = await signUpService(newClient);
  console.log(signUpResponse);

  res.send(signUpResponse);
}

async function login(req, res) {
  const newLogin = req.body;
  const loginResponse = await loginService(newLogin);
  //If there is a not falsy response from the login service the we create the session cookie
  // with al the data needed to perform a payment
  if (loginResponse) {
    const {
      client: { ClientId, Email, Phone }
    } = loginResponse;

    req.session.clientId = ClientId;
    req.session.email = Email;
    req.session.phone = Phone;
  }
  res.send(loginResponse);
}

module.exports = { signUp, login };
