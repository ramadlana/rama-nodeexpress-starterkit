const express = require("express");
const router = express.Router();

// Example CRUD
router
  .route("/")
  // Add Data
  .post(async (req, res) => {
    const client_message = req.body["client_message"];
    return res.status(200).send({
      status: 200,
      data: {
        from_client_message: client_message,
      },
      message: null,
    });
  })
  // Get Data
  .get(async (req, res) => {
    return res.status(200).send({
      status: 200,
      data: null,
      message: "success Read",
    });
  })
  .put(async (req, res) => {
    return res.status(200).send({
      status: 200,
      data: null,
      message: "success Update",
    });
  })
  .delete(async (req, res) => {
    return res.status(200).send({
      status: 200,
      data: null,
      message: "success Delete",
    });
  });

module.exports = router;
