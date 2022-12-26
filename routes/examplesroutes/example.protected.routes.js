const express = require("express");
const permission = require("../../middleware/permission");
const router = express.Router();

// Permission list
const adminOnly = ["superadmin", "admin"];
const allEmployee = ["superadmin", "admin", "level1"];
const customer = ["user", "customer"];
const allUser = ["customer", "superadmin", "admin", "level1"];

//Example Auth midlleware + Permission Midleware
router.get("/admin", permission(adminOnly), async (req, res) => {
  return res.send({
    message: "Successfully Authenticated",
  });
});

module.exports = router;
