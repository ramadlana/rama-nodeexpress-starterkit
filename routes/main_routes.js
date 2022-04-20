const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Start routes

// Home
router.get("/", async (req, res) => {
  return res.status(200).send({ message: "this is home page" });
});

router.post("/prisma", async (req, res) => {
  try {
    const newUser = await prisma.radcheck.create({
      data: {
        username: "Alice",
        attribute: "Cleartext-Password",
        op: ":=",
        value: "passwordalice",
        expirydate: new Date("2022-04-11"),
      },
    });
    return res.send(newUser);
  } catch (error) {
    if (error.code === "P2002")
      return res.send({ message: `${error.meta.target} must be unique` });
    return res.send(error);
  }
});

router.get("/prisma", async (req, res) => {
  const result = await prisma.radcheck.findUnique({
    where: {
      username: "Alice",
    },
  });
  return res.send(result);
});

module.exports = router;
