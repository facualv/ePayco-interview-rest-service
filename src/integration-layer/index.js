const soapRequest = require('easy-soap-request');
const {
  IntegrationHelper: { getLoginXmlRquestBody }
} = require('../helpers');

const url = 'https://localhost:44348/SoapWebService.asmx';

async function signIn() {

  const header = {
    'Content-Type': 'application/soap+xml'
  };

  const { response } = await soapRequest({
    url: 'https://localhost:44348/SoapWebService.asmx',
    headers: header,
    xml: xmls
  });

  const { body, statusCode } = response;

  console.log(JSON.stringify(body));

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
        .replace(']', '');


      const responseObject = JSON.parse(json);

      // const loginResponse = envelope['soap:Body']
      console.log(responseObject);
    })
    .catch(function (err) {
      console.dir(err);
    });
})();

module.exports = signIn;
