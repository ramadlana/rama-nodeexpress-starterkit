const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const { upload } = require("../middleware/s3bucket");
const prisma = new PrismaClient();

// Minio
let Minio = require("minio");
const { result } = require("lodash");
const { func } = require("joi");
let minio_bucket_name = "tes";
const minioClient = new Minio.Client({
  endPoint: "172.27.80.4", // we can use s3 here s3.amazon.com
  port: 9000,
  useSSL: false,
  accessKey: "qL3rqBxaDlEr9MvM",
  secretKey: "LNEpQvufiHcYnfKfhcG5SjRINgCsdM66",
});

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

// List All buckets from minio S3 compatible
// https://docs.min.io/docs/javascript-client-api-reference#listBuckets
router.get("/miniobuckets", async (req, res) => {
  try {
    // List all object paths in bucket my-bucketname.
    minioClient.listBuckets(function (err, buckets) {
      if (err) return res.status(400).send({ message: err });
      return res.status(200).send({ message: buckets });
    });
  } catch {
    return res.status(400).send({ message: "another error happen" });
  }
});

// Get all object in buckets
router.get("/miniobucketfiles", async (req, res) => {
  try {
    // List all object paths in bucket my-bucketname.
    let stream = minioClient.listObjectsV2("tes", "", true, "");
    /**
     * https://stackoverflow.com/questions/18857693/does-express-js-support-sending-unbuffered-progressively-flushed-responses
     * res send is automatically end after send, so for emiter or sream or socket we can use res write to pass to frontend
     * output "chunk"/potongan argument must be of type string or an instance of Buffer or Uint8Array, object is not allowed, so we can use stringify
     */
    stream.on("data", function (obj) {
      console.log(obj);
      res.write(JSON.stringify(obj));
    });
    stream.on("end", function () {
      res.end();
    });
    stream.on("error", function (err) {
      console.log(err);
    });
  } catch {
    return res.status(400).send({ message: "another error happen" });
  }
});

// Put file to bucket
router.post("/minioputfiles", async (req, res) => {
  let files = req.files;
  let file_keys = ["file1", "file2"];

  try {
    let result_all = [];
    file_keys.map(async (key) => {
      const result = await minioClient.putObject(
        minio_bucket_name,
        files[`${key}`]["name"],
        files[`${key}`]["data"]
      );
    });

    return res.status(200).send({ message: "successfully uploaded" }); // err should be null
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "another error happen" });
  }
});

module.exports = router;
