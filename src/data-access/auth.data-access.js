const soapRequest = require('easy-soap-request');
var { parseStringPromise } = require('xml2js');
const { REQUEST_URL } = require('../config');
const {
  IntegrationHelper: { generateXmlSignUp, generateXmlLogin }
} = require('../helpers');

//------------------------ SIGNUP FUNCTION-----------------------------------------
async function signUp(clientId, name, phone, email, password) {
  const xmls = generateXmlSignUp(clientId, name, phone, email, password);

  const header = {
    'Content-Type': 'application/soap+xml'
  };

  const { response } = await soapRequest({
    url: REQUEST_URL,
    headers: header,
    xml: xmls
  });

  const { headers, body, statusCode } = response;

  return parseStringPromise(body, { mergeAttrs: true }, function (err, result) {
    // console.dir(result);
  })
    .then(function (result) {
      const response =
        result['soap:Envelope']['soap:Body'][0]['signupResponse'][0]['signupResult'][0];

      const json = JSON.stringify(response, null, 4)
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(' ]', '')
        .replace(' [', '')
        .replace(' ]', '');

        console.log(JSON.parse(json))

      return JSON.parse(json);
    })
    .catch(function (err) {
      console.dir(err);
    });
}

//------------------------ LOGIN FUNCTION-----------------------------------------
async function login(email) {
  // Calls the xml generator
  const xmls = generateXmlLogin(email);

  const header = {
    'Content-Type': 'application/soap+xml'
  };

  // Calls the external service
  const { response } = await soapRequest({
    url: 'https://localhost:44348/SoapWebService.asmx',
    headers: header,
    xml: xmls
  });

  //Extracts the properties
  const { headers, body, statusCode } = response;

  //This function parses the body and returns it (a promise!!!!)
  return parseStringPromise(body, { mergeAttrs: true }, function (err, result) {
    // console.dir(result);
  })
    .then(function (result) {
      const response =
        result['soap:Envelope']['soap:Body'][0]['loginResponse'][0]['loginResult'][0];

      const json = JSON.stringify(response, null, 4)
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(']', '')
        .replace(' [', '')
        .replace(' ]', '')
        .replace(' [', '')
        .replace(' ]', '');

      // Here ir returns the parsed reponse
      return JSON.parse(json);
    })
    .catch(function (err) {
      console.dir(err);
    });
}

module.exports = { signUp, login };
