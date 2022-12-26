const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get table data (pagination) user with relation with country
router.get("/alluser", async (req, res) => {
  let { page, maxPerpage, searchBy, searchValue, sortBy, sortMethod } =
    req.query;
  // Query is string convert into INT
  // Page is last item in previous data
  // Page queries all Post records with an ID greater than the value of page
  const pageInt = parseInt(page);
  const maxPerpageInt = parseInt(maxPerpage);
  // Conditional object, check if searchBy and sortBy has value
  let conditional_query = {
    include: { app_dummy_country: true },
  };
  if (searchBy || sortBy || page) {
    conditional_query.where = { [searchBy]: { contains: searchValue } };
    conditional_query.orderBy = { [sortBy]: sortMethod };
    conditional_query.skip = pageInt;
    conditional_query.take = maxPerpageInt;
  }
  try {
    const alluser = await prisma.app_dummy_person.findMany(conditional_query);
    return res.send(alluser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Get table data users with relation
router.get("/alluser-pagination", async (req, res) => {
  let { maxPerpage, page, searchBy, searchString, sortBy, sortMethod } =
    req.query;
  // Query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  try {
    // If req.query Thruty in searchBy and Search String
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
  // Query is string convert into INT
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
  let { cursor, maxPerpage } = req.query;
  // query is string convert into INT
  // Cursor is last item in previous data
  // Cursor queries all Post records with an ID greater than the value of cursor
  const cursorInt = parseInt(cursor);
  const maxPerpageInt = parseInt(maxPerpage);
  try {
    const alluser = await prisma.app_dummy_person.findMany({
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
