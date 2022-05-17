const jwt = require("jsonwebtoken");
const mappingUrlToRule = require("../routes/route_mapping");

function permission() {
  return (req, res, next) => {
    // get JWT
    const jwt_decode = jwt.decode(req.headers[`${process.env.X_TOKEN_NAMING}`]);
    // get object matched with req.baseUrl
    let group_get = mappingUrlToRule.find((o) => {
      return o.url === req.baseUrl;
    });
    if (group_get.group.includes(jwt_decode.roles)) return next();
    return res
      .status(401)
      .send({
        message: "Sorry.. You dont have permission to access this page",
      });
  };
}

module.exports = permission;
