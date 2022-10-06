const express = require("express");
const permission = require("../middleware/permission");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Permission list
const adminOnly = ["superadmin", "admin"];
const allEmployee = ["superadmin", "admin", "level1"];
const customer = ["user", "customer"];
const allUser = ["customer", "superadmin", "admin", "level1"];

router.get("/", async (req, res) => {
  return res.send({
    message: "Successfully Authenticated",
  });
});

//Need Auth midlleware + Permission Midleware
router.get("/admin", permission(adminOnly), async (req, res) => {
  return res.send({
    message: "Successfully Authenticated",
  });
});

// Get table data user with relation with country  table
router.get("/alluser", async (req, res) => {
  let { page, maxPerpage, searchBy, searchValue, sortBy, sortMethod } =
    req.query;

  // query is string convert into INT
  // page is last item in previous data
  // page queries all Post records with an ID greater than the value of page

  const pageInt = parseInt(page);
  const maxPerpageInt = parseInt(maxPerpage);

  console.log({
    include: { app_dummy_country: true },
    where: { [searchBy]: { contains: searchValue } },
    orderBy: { [sortBy]: sortMethod },
    skip: pageInt,
    take: maxPerpageInt,
  });
  try {
    const alluser = await prisma.app_dummy_person.findMany({
      include: { app_dummy_country: true },
      where: { [searchBy]: { contains: searchValue } },
      orderBy: { [sortBy]: sortMethod },
      skip: pageInt,
      take: maxPerpageInt,
    });

    return res.send(alluser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Get table data users with relation
router.get("/alluser-pagination", async (req, res) => {
  let { maxPerpage, page, searchBy, searchString, sortBy, sortMethod } =
    req.query;
  // query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  try {
    // if req.query Thruty in searchBy and Search String
    if (searchBy && searchString) {
      const alluser = await prisma.app_dummy_person.findMany({
        where: { [searchBy]: { contains: searchString } },
        orderBy: { [sortBy]: sortMethod },
        take: maxPerpage,
        skip: (page - 1) * maxPerpage,
        include: { app_dummy_country: true },
      });
      return res.send({
        data: alluser,
      });
    }

    // If req.query Falsy in searchBy or Falsy in searchSring
    if (!searchBy || !searchString) {
      const alluser = await prisma.app_dummy_person.findMany({
        orderBy: { [sortBy]: sortMethod },
        take: maxPerpage,
        skip: (page - 1) * maxPerpage,
        include: { app_dummy_country: true },
      });
      return res.send({
        data: alluser,
      });
    }
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
    const alluser = await prisma.app_dummy_person.findMany({
      where: { country: { country: { contains: "Indo" } } },
      take: maxPerpage,
      skip: (page - 1) * maxPerpage,
      include: { app_dummy_country: true },
    });
    return res.send({
      data: alluser,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Cursor Based Pagination
router.get("/alluser-cursor", async (req, res) => {
  let { cursor, maxPerpage, searchBy, searchValue, sortBy, sortMethod } =
    req.query;

  // query is string convert into INT
  // Cursor is last item in previous data
  // Cursor queries all Post records with an ID greater than the value of cursor

  const cursorInt = parseInt(cursor);
  const maxPerpageInt = parseInt(maxPerpage);

  try {
    const alluser = await prisma.app_dummy_person.findMany({
      where: { [searchBy]: { contains: searchValue } },
      orderBy: { [sortBy]: sortMethod },
      include: { app_dummy_country: true },
      cursor: {
        id: cursorInt,
      },
      take: maxPerpageInt,
    });

    return res.send(alluser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = router;
