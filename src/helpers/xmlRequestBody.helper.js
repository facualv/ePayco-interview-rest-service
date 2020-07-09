const generateXmlLogin = function (email) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>
   <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
     <soap12:Body>
       <login xmlns="http://tempuri.org/">
         <email>${email}</email>\
       </login>
     </soap12:Body>
   </soap12:Envelope>`);
};

const generateXmlSignUp = function (clientId, name, phone, email, password) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>\
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
    <soap12:Body>\
      <signup xmlns="http://tempuri.org/">\
        <clientId>${clientId}</clientId>\
        <name>${name}</name>\
        <phone>${phone}</phone>\
        <email>${email}</email>\
        <password>${password}</password>\
      </signup>\
    </soap12:Body>\
  </soap12:Envelope>`);
};

const generateXmlGetBalance = function (clientId, phone) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>\
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
    <soap12:Body>\
      <getBalance xmlns="http://tempuri.org/">\
        <clientId>${clientId}</clientId>\
        <phone>${phone}</phone>\
      </getBalance>\
    </soap12:Body>\
  </soap12:Envelope>`);
};

const generateXmlPayment = function (clientId, ammount, detail) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>\
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
    <soap12:Body>\
      <payment  xmlns="http://tempuri.org/">\
        <clientId>${clientId}</clientId>\
        <ammount>${ammount}</ammount>\
        <detail>${detail}</detail>\
      </payment >\
    </soap12:Body>\
  </soap12:Envelope>`);
};

const generateXmlRecharge = function (clientId, phone, ammount, detail) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>\
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\
    <soap12:Body>\
      <recharge xmlns="http://tempuri.org/">\
        <clientId>${clientId}</clientId>\
        <phone>${phone}</phone>\
        <ammount>${ammount}</ammount>\
        <detail>${detail}</detail>\
      </recharge>\
    </soap12:Body>\
  </soap12:Envelope>`);
};

module.exports = {
  generateXmlLogin,
  generateXmlSignUp,
  generateXmlGetBalance,
  generateXmlPayment,
  generateXmlRecharge
};
