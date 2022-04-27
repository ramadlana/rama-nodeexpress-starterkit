const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sha = require("js-sha512");
// Start routes

// Home
router.get("/", async (req, res) => {
  return res.status(200).send({ message: "this is home page" });
});

// Mid Trans Checkout
router.get("/checkout", async (req, res) => {
  const { order_id } = req.query;

  const gross_amount = "50000.00";
  const status_code = 200;
  // const gross_amount = 10000;
  const serverkey = "SB-Mid-server-fy6I1u7MkJ2HC8EU8WFwPMBr";

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
      gross_amount: gross_amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "hidayah",
      last_name: "ramadlana",
      email: "hidayah.pra@gmail.com",
      phone: "08111222333",
    },
  };

  const signature_key = sha.sha512(
    order_id + status_code + gross_amount + serverkey
  );

  // Save to table transaction
  try {
    const save = await prisma.app_transaction.create({
      data: {
        order_id: order_id,
        signature_key: signature_key,
        transaction_status: "pending",
      },
    });
  } catch (error) {
    res.send({ error: error });
  }

  try {
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = await transaction.token;
    res.send({
      transactionToken: transactionToken,
      transactionDetail: transaction,
    });
  } catch (error) {
    res.send({
      transaction: "failed",
      error_messages: error.ApiResponse
        ? error.ApiResponse.error_messages[0]
        : JSON.stringify(error),
    });
  }
});

// Midtrans POST payment handle -> If payment success enable radius account
router.post("/handle-payment", async (req, res) => {
  // get data from req.body HOOK midtrans
  const {
    status_code,
    order_id,
    gross_amount,
    signature_key,
    transaction_status,
  } = req.body;

  // get signature_key from app_transaction
  const app_transaction_db = await prisma.app_transaction.findUnique({
    where: {
      order_id: order_id,
    },
  });

  // if generated signature key from checkout match with signature key from midtrans
  if (app_transaction_db.signature_key === signature_key) {
    // do logic if payment success here
    await prisma.app_transaction.update({
      where: { order_id: order_id },
      data: {
        status_code: status_code,
        gross_amount: gross_amount,
        transaction_status: transaction_status,
      },
    });
    return res.send({ message: "success" });
  }

  return res.send({ message: "error" });
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
