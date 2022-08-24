const jwt = require("jsonwebtoken");

/**
 * 
 *superadmin
  admin
  user
  customer
  level1
  level2
  level3
  level4
 */

function permission(roles) {
  return (req, res, next) => {
    // get JWT
    const jwt_decode = jwt.decode(req.headers[`${process.env.X_TOKEN_NAMING}`]);

    if (roles.includes(jwt_decode.roles)) return next();
    return res.status(401).send({
      message: "Sorry.. You dont have permission to access this page",
    });
  };
}

module.exports = permission;
