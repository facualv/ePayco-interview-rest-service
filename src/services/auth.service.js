const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const dataAccess = require('../data-access');

async function signUp(client) {
  const { email } = client;

  const { clientexist } = await dataAccess.LogIn(email);

  if (clientexist) {
    const error = new Error();
    error.message = 'Client already exist';
    error.status = 401;
    throw error;
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(client.password, salt);
  client.password = hashedPassword;

  return await dataAccess.SignUp(client);
}

async function logIn(email, password) {
  //Searchs the client by email
  const { Client } = await dataAccess.LogIn(email);

  // Check if there is a value
  if (!Client) {
    const error = new Error();
    error.message = 'User does not exist';
    error.status = 404;
    throw error;
  }

  //If the client exists ir compares the passwords
  const loginPassword = password;
  const storedPassword = Client.password;
  const validPassword = compareSync(loginPassword, storedPassword);

  if (!validPassword) {
    const error = new Error();
    error.message = 'Invalid Password';
    error.status = 404;
    throw error;
  }
  return Client;
}

module.exports = {
  logIn,
  signUp
};
