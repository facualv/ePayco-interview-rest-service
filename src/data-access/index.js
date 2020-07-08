const soapRequest = require('easy-soap-request');
const { REQUEST_URL } = require('./src/config');

const {
  IntegrationHelper: { getLoginXmlBody }
} = require('../helpers');

// const url = 'https://localhost:44348/SoapWebService.asmx';

async function logIn(login) {
  const { email, password } = login;
  const xmlBody = getLoginXmlBody(email, password);
  const header = {
    'Content-Type': 'application/soap+xml'
  };

  //Calls the external resource
  const { response } = await soapRequest({
    url: REQUEST_URL,
    headers: header,
    xml: xmlBody
  });

  const { body, statusCode } = response;

  //Parses the body of the response to an objects with specific format
  parseStringPromise(body, { mergeAttrs: true }, function (err, result) {
    console.dir(result);
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
        .replace(' ]', '');

      const responseObject = JSON.parse(json);
      console.log(responseObject);
      return responseObject;
    })
    .catch(function (err) {
      console.dir(err);
    });
}

module.exports = { logIn };
