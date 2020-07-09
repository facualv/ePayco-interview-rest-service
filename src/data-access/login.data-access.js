const soapRequest = require('easy-soap-request');
var { parseStringPromise, parseString } = require('xml2js');
const { REQUEST_URL } = require('../config');

const {
  IntegrationHelper: { generateXmlLoginBody }
} = require('../helpers');

// const url = 'https://localhost:44348/SoapWebService.asmx';

async function login(email) {
  const xmls = generateXmlLoginBody(email);
  const header = {
    'Content-Type': 'application/soap+xml'
  };

  const { response } = await soapRequest({
    url: 'https://localhost:44348/SoapWebService.asmx',
    headers: header,
    xml: xmls
  });

  const { headers, body, statusCode } = response;

  //here it return the bloody promise !!!!!!!!!!!!
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

      return JSON.parse(json);
    })
    .catch(function (err) {
      console.dir(err);
    });
}

module.exports = login;
