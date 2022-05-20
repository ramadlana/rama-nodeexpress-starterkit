// for sign in and sign up
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const Joi = require("joi");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const formSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(req.body);
  // Joi Error
  if (formValidate.error)
    return res
      .status(401)
      .send({ message: formValidate.error.details[0].message });

  try {
    // Get User
    const user = await prisma.radcheck.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return res.status(401).send({ message: "Aih .. user not found" });

    // Check password
    if (password !== user.value)
      return res.status(401).send({ message: "wrong username or passwords" });

    // if user valid, generate token jwt and
    const token = jwt.sign(
      {
        // Select Data to store in JWT PAYLOAD DATA
        id: user.id,
        username: user.username,
        email: user.email,
      },
      //  Secret
      process.env.JWT_SECRET_KEY,
      // Jwt Params
      { expiresIn: "1d" }
    );

    // Return token in Body
    return res.send({
      message: "login success",
      access_token: token,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
