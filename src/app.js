const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./config/dbConnection");
const http = require('http');
const server = http.createServer(app);
const { SERVER } = require('./config/index');

// require("./services/jobConsumer");
global.baseDir = __dirname;

// Requiring API routes.
app.use(require("./routes/index"));
app.use('/upload', express.static(baseDir + '/upload'));
require("./services/jobScheduler");

server.listen(SERVER.PORT, () => {
    console.info(`Server running on port ${SERVER.PORT} ✅`)
});