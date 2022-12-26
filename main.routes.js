// express
const express = require("express");
const app = express();
// Authorization middleware
const auth_midleware = require("./middleware/auth");

// Example routes import
const ex_unprotected_routes = require("./routes/examplesroutes/example.unprotected.routes");
const ex_crud_routes = require("./routes/examplesroutes/example.crud.routes");
const ex_protected_routes = require("./routes/examplesroutes/example.protected.routes");
const ex_prisma_routes = require("./routes/examplesroutes/example.prisma.routes");

// List public or unprotected router
// Main routes
app.use(require("./routes/root.routes"));
// Sign in, sign out, sign up routes
app.use("/sign", require("./routes/sign.routes"));
// // Example routes
app.use("/example-unprotected", ex_unprotected_routes); // Example
app.use("/example-crud", ex_crud_routes); //Example

// Enable auth_midleware
app.use(auth_midleware);
// All bellow is protected router
// Dashboard routes
app.use("/dashboard", require("./routes/dashboard.routes"));
// // Example:
app.use("/example-protected", ex_protected_routes); // Example
app.use("/prisma", ex_prisma_routes); // example prisma

module.exports = app;
