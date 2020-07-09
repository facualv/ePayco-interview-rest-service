const soapRequest = require('easy-soap-request');
var { parseStringPromise, parseString } = require('xml2js');
const { REQUEST_URL } = require('../config');
const {
  IntegrationHelper: { generateXmlSignUpBody }
} = require('../helpers');

// const url = 'https://localhost:44348/SoapWebService.asmx';

async function signUp(newClient) {
  const { clientId, name, phone, email, password } = newClient;
  const xmls = generateXmlSignUpBody(clientId, name, phone, email, password);

  const header = {
    'Content-Type': 'application/soap+xml'
  };

  const { response } = await soapRequest({
    url: REQUEST_URL,
    headers: header,
    xml: xmls
  });

  const { headers, body, statusCode } = response;
  console.log(JSON.stringify(body));

  parseStringPromise(body, { mergeAttrs: true }, function (err, result) {
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

      const responseObject = JSON.parse(json);
      console.log(responseObject);
      return responseObject;
    })
    .catch(function (err) {
      console.dir(err);
    });
}

module.exports = signUp;
