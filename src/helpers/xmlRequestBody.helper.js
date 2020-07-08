const generateXmlLoginBody = function (email) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>
   <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
     <soap12:Body>
       <login xmlns="http://tempuri.org/">
         <email>${email}</email>\
       </login>
     </soap12:Body>
   </soap12:Envelope>`);
};

const generateXmlSignUpBody = function (clientId, name, phone, email, password) {
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

module.exports = {
  generateXmlLoginBody,
  generateXmlSignUpBody
};
