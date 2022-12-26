const express = require("express");
const router = express.Router();

// For authenticated init
router.get("/", async (req, res) => {
  return res.status(200).send({
    message: "This is Dashboard",
  });
});

module.exports = router;
