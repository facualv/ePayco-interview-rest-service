const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PORT, APPLICATION_NAME } = require('./src/config');
require('express-async-errors');

const server = express();
const router = require('./src/routes');

server.set('port', PORT);
server.use(router);
server.listen(PORT, () => {
  console.log(`${APPLICATION_NAME} running on port ${PORT}`);
});
