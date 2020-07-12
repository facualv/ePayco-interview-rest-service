const soapRequest = require('easy-soap-request');
var { parseStringPromise } = require('xml2js');
const { REQUEST_URL } = require('../config');
const {
  IntegrationHelper: { generateXmlPayment, generateXmlRecharge }
} = require('../helpers');

//------------------------ PAYMENT FUNCTION-----------------------------------------
async function payment(clientId, amount, detail) {
  const xmls = generateXmlPayment(clientId, amount, detail);

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
        result['soap:Envelope']['soap:Body'][0]['paymentResponse'][0]['paymentResult'][0];

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

async function recharge(clientId, phone, amount, detail) {
  const xmls = generateXmlRecharge(clientId, phone, amount, detail);

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
        result['soap:Envelope']['soap:Body'][0]['rechargeResponse'][0][
          'rechargeResult'
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
      console.log(responseObject);
      return responseObject;
    })
    .catch(function (err) {
      console.dir(err);
    });
}

module.exports = { payment, recharge };
