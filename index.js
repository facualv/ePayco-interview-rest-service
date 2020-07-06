const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const router = require("./src/routes");

server.set("port", 5000);
server.use(router);
server.listen(server.get("port"), () => {
  console.log(`Server running on port ${server.get("port")}`);
});
