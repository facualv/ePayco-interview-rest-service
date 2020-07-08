# REST GATEWAY - BILLETERA VIRTUAL

Servicio REST desarrollado en el marco de una entrevista técnica para la empresa ePayco. Este servicio provee los endpoints para ser consumido por un app cliente que simula una billetera virtual.
Su objetivo es hacer de intermediario entre el cliente y un servicio web SOAP desarrollado en .NET el cual se conecta a una base de datos MySql.

## Stack Tecnológico

- Node.js
- Express.js
- Y otras librerias de npm como
  - Cors
  - Helmet para esconder info sensible de los headers
  - Express Async Errors
  - Xml2js para parsear xml
  - Nodemon
  - Morgan

## Documentacion

Proximamente en postman

## Endpoint del servicio

https://localhost:YOURPORT/

## Endpoints

### Autenticacion

#### POST /signup

Ejemplo del cuerpo de la petición:

  {
    "name": "User",
    "clientId": "personal id number",
    "email": "comUser@gmail.com",
    "phone": "3514121232",
    "password": "user"
  }

#### POST /login

Ejemplo del cuerpo de la petición:

  {
    "email": "comUser@gmail.com",
    "password": "user"
  }

#### GET /geBalance

- Devuelve el balance actual de la billetera

#### POST /recharge

- Recarga el saldo de la billetera

#### POST payment

- Realiza un pago
