// Load Env
require("dotenv").config();

// install express with `npm install express`
const express = require("express");
const app = express();

// Enable cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// simulate delay
app.use((req, res, next) => {
  setTimeout(() => next(), 400);
});

// Import required library
const logging_func = require("./startup/log");
const cors = require("cors");
const auth_midleware = require("./middleware/auth");

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

// Public Routes Controllers
app.use(require("./routes/main_routes")); // main routes
app.use("/sign", require("./routes/sign_routes"));
app.use("/customer", require("./routes/customer_login")); // customer portal route

// Start Auth Middleware, All routes after this need auth process
app.use(auth_midleware);

// Need Login Routes Controllers
app.use("/dashboard", require("./routes/dashboard_routes")); // admin routes

app.use("/me", require("./routes/customer_me")); // redirect me page

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, "Something broke!");
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
module.exports = app;
