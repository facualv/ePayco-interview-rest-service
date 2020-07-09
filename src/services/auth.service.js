const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const dataAccess = require('../data-access');

async function signUp(newClient) {
  const { email } = newClient;

  //Checks if there is a client with the email
  const response = await dataAccess.LogIn(email);
  const { Client } = response;

  if (Client) {
    const error = new Error();
    error.message = 'Client already exist';
    error.status = 401;
    throw error;
  }

  //Here comes the encryptyon of the password
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(newClient.password, salt);
  newClient.password = hashedPassword;

  // Sends the data to create a client and returns a response (check the response format in DATA ACCESS LAYER)
  return await dataAccess.SignUp(newClient);
}

async function logIn(email, password) {
  //Searchs the client by email
  const response = await dataAccess.LogIn(email);

  //Extracts the client from the response
  const { Client } = response;

  // If the client doesnt exists it returns an error
  if (!Client) {
    const error = new Error();
    error.message = 'Client doesnt not exist';
    error.status = 404;
    throw error;
  }

  // console.log(Client);

  //It compares the passwords
  const loginPassword = password;
  const storedPassword = Client.Password;
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
  logIn,
  signUp
};
