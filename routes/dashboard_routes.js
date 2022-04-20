const express = require("express");
const permission = require("../middleware/permission");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const { query } = require("express");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  return res.send({
    message: "Successfully Authenticated",
  });
});

//Need Auth midlleware + Permission Midleware
router.get("/admin", permission(), async (req, res) => {
  return res.send({
    message: "Successfully Authenticated",
  });
});

// Get table data user with relation with country table
router.get("/alluser", async (req, res) => {
  const alluser = await prisma.person.findMany();
  return res.send({
    alluser: alluser,
  });
});

// Get table data users with relation
router.get("/alluserrelation", async (req, res) => {
  let { maxPerpage, page, searchBy, searchString } = req.query;
  // query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  try {
    const alluser = await prisma.person.findMany({
      where: { [searchBy]: { contains: searchString } },
      take: maxPerpage,
      skip: (page - 1) * maxPerpage,
      include: { country: true },
    });
    return res.send({
      alluser: alluser,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Get table data user where and select
router.get("/alluserwhererelate", async (req, res) => {
  let { maxPerpage, page, searchBy, searchString } = req.query;
  // query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  try {
    const alluser = await prisma.person.findMany({
      where: { country: { country: { contains: "Indo" } } },
      take: maxPerpage,
      skip: (page - 1) * maxPerpage,
      include: { country: true },
    });
    return res.send({
      alluser: alluser,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});
// Get table data user with query page and skip

module.exports = router;
