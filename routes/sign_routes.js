// for sign in and sign up
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register new User
router.post("/up", async (req, res) => {
  // get req Body
  const { username, password, email } = req.body;

  // Validate form
  // Joi Schema
  const formSchema = Joi.object({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(5),
    email: Joi.string().email().required(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(req.body);
  // Joi Error
  if (formValidate.error)
    return res
      .status(401)
      .send({ error: formValidate.error.details[0].message });

  // Generate gen salt
  const salt = await bcrypt.genSalt(10);

  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const save = await prisma.app_users.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
    return res.status(201).send({
      message: `User ${username} created successfully`,
      details: save,
    });
  } catch (err) {
    //   if "duplicate" in err.message
    if (err.message.includes("duplicate")) {
      return res.status(400).send({ message: "user already exists" });
    } else return res.status(400).send({ message: err.message });
  }
});

// Login User
router.post("/in", async (req, res) => {
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
    const user = await prisma.app_users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return res.status(401).send({ message: "Oops .. username not found" });

    if (user && !user.isActive)
      return res
        .status(401)
        .send({ message: "Oops your username is not active yet" });

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "wrong username or passwords" });

    // if user valid, generate token jwt and
    const token = jwt.sign(
      {
        // Select Data to store in JWT PAYLOAD DATA
        id: user.id,
        username: user.username,
        roles: user.roles,
        email: user.email,
      },
      //  Secret
      process.env.JWT_SECRET_KEY,
      // Jwt Params
      { expiresIn: "1d" }
    );

    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("access_token", token, {
    //     // DEV Option (localhost and HTTP)
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax",
    //     maxAge: 3600,
    //     path: "/",
    //     // END DEV Option
    //     //
    //     // PROD (RemoteHost API Backend And HTTPS)
    //     // httpOnly: true,
    //     // secure: false,
    //     // sameSite: "none",
    //     // maxAge: 3600,
    //     // path: "/",
    //     // END PROD (RemoteHost API Backend And HTTPS)
    //   })
    // );

    // Return token in Body
    return res.send({
      message: "login success",
      access_token: token,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Logout User
router.get("/out", async (req, res) => {
  try {
    res.clearCookie("access_token", {
      path: "/",
    });
    return res.send({ message: "token clear" });
  } catch (error) {
    return res.status(400).send({ message: `error happen ${error}` });
  }
});

module.exports = router;
