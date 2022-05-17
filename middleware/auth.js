const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

function auth_midleware(req, res, next) {
  // Get Token using cookies
  const token =
    req.cookies[`${process.env.TOKEN_NAMING}`] || //Token using cookies
    req.headers[`${process.env.X_TOKEN_NAMING}`]; //Token using x-access_cookie

  // Validate token
  if (!token) {
    return res.status(401).send({
      message: "Access token required",
    });
  }
  // Verivy Token
  try {
    const decoded = jwt.verify(token, jwt_secret);
    // create new request attributes named "req.user" containing decoded token
    req.user = decoded;
    next();
    // continue chaining
  } catch (err) {
    if (err.message.includes("invalid"))
      return res.status(401).send({
        message: "You must logged in to access this page",
        detail: err.message,
      });
    if (err.message.includes("jwt malformed"))
      return res
        .status(401)
        .send({
          message: "You must logged in to access this page",
          detail: err.message,
        });
    else res.status(401).send({ message: err.message });
  }
}

module.exports = auth_midleware;
