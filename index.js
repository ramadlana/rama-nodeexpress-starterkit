// Load Env
require("dotenv").config();

// install express with `npm install express`
const express = require("express");
const app = express();
// Import main.routes.js
const main_routes = require("./main.routes");

// Enable cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Express File Upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Simulate delay
// app.use((req, res, next) => {
//   setTimeout(() => next(), 800);
// });

// Import required library
const logging_func = require("./startup/log"); // Logging function
const cors = require("cors"); // CORS fnction

// Cors midle ware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Enable req body parsing
app.use(express.json());

// Enable Request As Body (JSON)
app.use(express.urlencoded({ extended: true }));

// Load Logging function
logging_func();

// use main.routes.js
app.use(main_routes);

// Unhandled error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("SERVER ERROR");
});

// Start Listen
let server = app.listen(process.env.SERVER_PORT || 8000, () =>
  console.log(
    `starting web service on port http://localhost:${process.env.SERVER_PORT}`
  )
);

// in MS
server.keepAliveTimeout = 15 * 60 * 1000; // 1s = 1000ms

// export 'app'
module.exports = server;
