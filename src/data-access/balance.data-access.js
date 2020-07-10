const soapRequest = require('easy-soap-request');
var { parseStringPromise } = require('xml2js');
const { REQUEST_URL } = require('../config');
const {
  IntegrationHelper: { generateXmlGetBalance }
} = require('../helpers');

//------------------------ LOGIN FUNCTION-----------------------------------------
async function getBalance(clientId, phone) {
  const xmls = generateXmlGetBalance(clientId, phone);

  const header = {
    'Content-Type': 'application/soap+xml'
  };

  const { response } = await soapRequest({
    url: 'https://localhost:44348/SoapWebService.asmx',
    headers: header,
    xml: xmls
  });

  const { headers, body, statusCode } = response;

  // const xmlBody = JSON.stringify(body).replace("\ufeff", "");

  return parseStringPromise(body, { mergeAttrs: true }, function (err, result) {
    // console.dir(result);
  })
    .then(function (result) {
      const response =
        result['soap:Envelope']['soap:Body'][0]['getBalanceResponse'][0][
          'getBalanceResult'
        ][0];

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
      // console.log(responseObject);
      return responseObject;
    })
    .catch(function (err) {
      console.dir(err);
    });
}
module.exports = getBalance;
