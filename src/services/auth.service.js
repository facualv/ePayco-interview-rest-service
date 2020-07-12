const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const { AuthDataAccess } = require('../data-access');

async function signUpService(newClient) {
  const { clientId, name, phone, email, password } = newClient;

  //Checks if the client is sending all the data to sign up
  if (!clientId || !name || !phone || !email || !password) {
    const error = new Error();
    error.status = 400;
    error.message = 'All the client data must be sent';
    throw error;
  }

  //Validates is the client is indeed a new client (THIS SHOULD BE CHANGE!!!!!!!!!!!!)
  const validationResponse = await AuthDataAccess.login(email);
  const { error, message } = validationResponse;

  //If the error is false it means that there is already a client with the same credentials
  if (!error) {
    const error = new Error();
    error.message = 'Another client is register with the same email, phone or client id';
    error.status = 401;
    throw error;
  }

  //Here comes the encryptyon of the password
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  // Sends the data to create a client and returns a response (check the response format in DATA ACCESS LAYER)
  return AuthDataAccess.signUp(clientId, name, phone, email, hashedPassword);
}

async function loginService(newLogin) {
  const { email, password } = newLogin;
  //Checks if there is a client with that email
  const response = await AuthDataAccess.login(email);
  //Extracts the client if exists, the message and IsError from the response
  const { error, message, client } = response;
  // If the client doesnt exists it returns an error
  if (!client && error) {
    const error = new Error();
    error.message = message;
    error.status = 404;
    throw error;
  }

  //It compares the passwords
  const loginPassword = password;
  const storedPassword = client.Password;
  const validPassword = compareSync(loginPassword, storedPassword);

  if (!validPassword) {
    const error = new Error();
    error.message = 'Invalid Password';
    error.status = 404;
    throw error;
  }
  return response;
}

module.exports = {
  loginService,
  signUpService
};
