const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;

function auth_midleware(req, res, next) {
  // Get Token using cookies
  let bearer = req.cookies.authorization;
  let token = bearer ? bearer.replace("Bearer ", "") : null;

  // Validate token
  if (!token) {
    return res.status(401).send({
      status: 401,
      data: null,
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
        status: 401,
        data: null,
        message: "You must logged in to access this page",
        detail: err.message,
      });
    if (err.message.includes("jwt malformed"))
      return res.status(401).send({
        status: 401,
        data: null,
        message: "You must logged in to access this page",
        detail: err.message,
      });
    else res.status(401).send({ message: err.message });
  }
}

module.exports = auth_midleware;
