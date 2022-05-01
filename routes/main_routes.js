const express = require("express");
const router = express.Router();

// Dayjs Import
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Start routes

// Home
router.get("/", async (req, res) => {
  return res.status(200).send({ message: "Billing Management System" });
});

// Midtrans POST payment handle -> If payment success enable radius account
router.post("/handle-payment", async (req, res) => {
  // get data from req.body HOOK midtrans
  const {
    va_numbers,
    transaction_id,
    settlement_time,
    payment_type,
    payment_amounts,
    status_code,
    status_message,
    merchant_id,
    fraud_status,
    order_id,
    signature_key,
    transaction_status,
    currency,
  } = req.body;

  if (!signature_key)
    return res.status(403).send({ message: "you have no access" });

  const settlement_time_formatted = new Date(settlement_time);

  // get signature_key from app_transaction
  const app_transaction_db = await prisma.app_transaction.findUnique({
    where: {
      order_id: parseInt(order_id),
    },
  });

  // if generated signature key from checkout match with signature key from midtrans
  if (app_transaction_db.signature_key === signature_key) {
    // do logic if payment success here

    // Save to DB
    try {
      await prisma.app_transaction.update({
        where: { order_id: parseInt(order_id) },
        data: {
          // update transaction status
          transaction_status: transaction_status,
          va_numbers: va_numbers,
          payment_amounts: payment_amounts,
          transaction_id: transaction_id,
          settlement_time: settlement_time_formatted,
          payment_type: payment_type,
          status_code: status_code,
          status_message: status_message,
          merchant_id: merchant_id,
          fraud_status: fraud_status,
          currency: currency,
        },
      });
      return res.send({ message: "success" });
    } catch (error) {
      return res.send({ error: error.message ? error.message : error });
    }
  }
  return res.send({ message: "error" });
});

router.get("/payment-success", async (req, res) => {
  const { order_id, transaction_status } = req.query;
  return res.send({
    message: `horay.. pembayaran berhasil status pembayaran kamu dengan order ID: ${order_id} masih ${transaction_status} ketika sudah sukses kami akan mengirimkan notifikasi`,
  });
});

router.get("/payment-failed", async (req, res) => {
  return res.send({ message: "pembayaran gagal, silahkan dicoba kembali" });
});

router.get("/payment-unfinished", async (req, res) => {
  return res.send({ message: "yah pembayaran belum selesai, dilanju yah" });
});

module.exports = router;
