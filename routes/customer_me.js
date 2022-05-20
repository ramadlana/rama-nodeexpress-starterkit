// for sign in and sign up
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cookie = require("cookie");

const { PrismaClient } = require("@prisma/client");
const { set } = require("lodash");
const prisma = new PrismaClient();

// Login User
router.get("/", async (req, res) => {
  const user = req.user;
  //   user return object
  // {
  //     "id": 67,
  //     "username": "rama23345332122",
  //     "email": "hidayahweb@gmail.com",
  //     "iat": 1652832249,
  //     "exp": 1652918649
  // }

  res.send(user);
});

module.exports = router;
