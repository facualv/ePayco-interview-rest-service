const getLoginXmlRquestBody = function (name, password) {
  return (xmlResult = `<?xml version="1.0" encoding="utf-8"?>
   <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
     <soap12:Body>
       <login xmlns="http://tempuri.org/">
         <email>${name}</email>
         <password>${password}</password>
       </login>
     </soap12:Body>
   </soap12:Envelope>`);
};

module.exports = {
  getLoginXmlRquestBody
};
