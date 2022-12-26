const express = require("express");
const router = express.Router();

// auth middleware
const auth_midleware = require("../middleware/auth");

// Home
router.get("/", async (req, res) => {
  return res.status(200).send({ message: "This is home page" });
});

// Endrpoint to check and verivy user authorization
router.get("/getauth", auth_midleware, async (req, res) => {
  return res.status(200).send({
    status: 200,
    data: null,
    message: "Successfully Authenticated",
  });
});

module.exports = router;
