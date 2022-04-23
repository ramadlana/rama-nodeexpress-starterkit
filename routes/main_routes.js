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

// Mid Trans Checkout
router.post("/checkout", async (req, res) => {
  const { order_id } = req.body;
  const midtransClient = require("midtrans-client");
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-fy6I1u7MkJ2HC8EU8WFwPMBr",
  });

  let parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = await transaction.token;
    res.send({
      transactionToken: transactionToken,
      transactionDetail: transaction,
    });
  } catch (error) {
    console.log(error);
    res.send({ transaction: "failed" });
  }
});

// If payment success/processed
router.post("/handle-payment", async (req, res) => {
  // do logic if payment success here
  console.log(req.body);
  return res.send(JSON.stringify(req.body));
});

router.get("/payment-success", async (req, res) => {
  return res.send({ message: "horay.. pembayaran berhasil" });
});

router.get("/payment-failed", async (req, res) => {
  return res.send({ message: "pembayaran gagal, silahkan dicoba kembali" });
});

router.get("/payment-unfinished", async (req, res) => {
  return res.send({ message: "yah pembayaran belum selesai, dilanju yah" });
});

module.exports = router;
