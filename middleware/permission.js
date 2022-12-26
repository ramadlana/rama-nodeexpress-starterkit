const jwt = require("jsonwebtoken");

function permission(roles) {
  return (req, res, next) => {
    // get JWT
    let bearer = req.headers["authorization"];
    let token = bearer ? bearer.replace("Bearer ", "") : null;
    const jwt_decode = jwt.decode(token);

    // If jwt decode roles is included on roles
    if (roles.includes(jwt_decode.roles)) return next();
    return res.status(401).send({
      message: "You dont have permission to access this page",
    });
  };
}

module.exports = permission;
