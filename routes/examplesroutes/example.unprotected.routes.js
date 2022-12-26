const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send({
    status: 200,
    data: null,
    message: "This is unprotected routes",
  });
});

module.exports = router;
