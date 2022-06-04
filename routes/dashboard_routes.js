const express = require("express");
const permission = require("../middleware/permission");
const router = express.Router();
const Joi = require("joi");
const midtransClient = require("midtrans-client");
const sha = require("js-sha512");

const { PrismaClient, Prisma } = require("@prisma/client");
const dayjs = require("dayjs");
const send_whatsapp = require("../utilities/send-whatsapp");
const prisma = new PrismaClient();
const axios = require("axios").default;

router.get("/", permission(), async (req, res) => {
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

// Get table data user with relation with country  table
router.get("/alluser", async (req, res) => {
  const alluser = await prisma.app_dummy_person.findMany();
  return res.send({
    alluser: alluser,
  });
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
  let { cursor, maxPerpage } = req.query;
  // query is string convert into INT
  // Cursor is last item in previous data
  // Cursor queries all Post records with an ID greater than the value of cursor
  const cursorInt = parseInt(cursor);
  const maxPerpageInt = parseInt(maxPerpage);

  try {
    const alluser = await prisma.app_dummy_person.findMany({
      cursor: {
        id: cursorInt,
      },
      take: maxPerpageInt,
      include: { app_dummy_country: true },
    });
    return res.send({
      data: alluser,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// PROD // PROD // PROD // PROD // PROD // PROD // PROD // PROD
// APP midtrans handle Checkout
router.get("/checkout", async (req, res) => {
  // Get id from params
  const { id } = req.query;

  // Get user attributes from radcheck table
  const user = await prisma.radcheck.findUnique({
    where: { id: parseInt(id) },
    include: { app_service: true },
  });

  if (!user) return res.send({ error: "user not found" });

  // Get gross_ammount, status_code, and order_id in order to generate signature key in transaction table
  const gross_amount = user.app_service.service_ammount;
  const status_code = 200;
  const serverkey = process.env.SERVER_KEY_MIDTRANS;

  let order_id;

  // Create app_transaction item in order generate order_id
  try {
    const transaction = await prisma.app_transaction.create({
      data: {
        gross_amount: gross_amount,
        radcheck_id: parseInt(id),
        transaction_time: new Date(),
      },
    });

    order_id = transaction.order_id;
  } catch (error) {
    return res.send({
      error: "error when creating transaction",
      detail: error.message,
    });
  }

  // Generate signature key
  const signature_key = sha.sha512(
    // convert orderId to string, and add .00 to gross amount because midtrans using .00 after gross ammount, for ex: 50000.00
    order_id.toString() + status_code + gross_amount + ".00" + serverkey
  );

  // Update app_transaction
  try {
    await prisma.app_transaction.update({
      where: {
        order_id: order_id,
      },
      data: {
        signature_key: signature_key,
        transaction_status: "pending",
      },
    });
  } catch (error) {
    return res.send({ error: error.message });
  }

  try {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction:
        process.env.IS_PRODUCTION_MIDTRANS === "false" ? false : true,
      serverKey: process.env.SERVER_KEY_MIDTRANS,
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
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      },
    };
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = await transaction.token;
    res.send({
      transactionToken: transactionToken,
      transactionDetail: transaction,
    });
  } catch (error) {
    res.send({
      error: "failed when creating payment gateway process",
      error_messages: error.ApiResponse
        ? error.ApiResponse.error_messages[0]
        : JSON.stringify(error),
    });
  }
});

// Get all radius user
router.get("/all-radius-user", permission(), async (req, res) => {
  let { maxPerpage, page, searchBy, searchString, sortBy, sortMethod } =
    req.query;
  // query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  try {
    // If searchby ID
    if (searchBy === "id") {
      const alluser = await prisma.radcheck.findUnique({
        where: { [searchBy]: parseInt(searchString) || 0 },
        select: {
          id: true,
          username: true,
          expirydate: true,
          email: true,
          address: true,
          first_name: true,
          last_name: true,
          phone: true,
        },
      });

      if (!alluser)
        return res.send({
          data: [],
        });

      return res.send({ data: [alluser] });
    }
    // if req.query Thruty in searchBy and Search String
    if (searchBy && searchString) {
      const alluser = await prisma.radcheck.findMany({
        where: { [searchBy]: { contains: searchString } },
        orderBy: { [sortBy]: sortMethod },
        take: maxPerpage,
        skip: (page - 1) * maxPerpage,
        select: {
          id: true,
          username: true,
          expirydate: true,
          email: true,
          address: true,
          first_name: true,
          last_name: true,
          phone: true,
        },
      });
      if (!alluser)
        return res.send({
          data: [],
        });
      return res.send({
        data: alluser,
      });
    }

    // If req.query Falsy in searchBy or Falsy in searchSring
    if (!searchBy || !searchString) {
      const alluser = await prisma.radcheck.findMany({
        orderBy: { [sortBy]: sortMethod },
        take: maxPerpage,
        skip: (page - 1) * maxPerpage,
        select: {
          id: true,
          username: true,
          expirydate: true,
          email: true,
          address: true,
          first_name: true,
          last_name: true,
          phone: true,
        },
      });
      if (!alluser)
        return res.send({
          data: [],
        });
      return res.send({
        data: alluser,
      });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Get single radius user and detail
router.get("/radiususer/:id", permission(), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.radcheck.findUnique({
      where: { id: parseInt(id) },
      include: { app_service: true, radusergroup: true },
    });
    delete user.attribute;
    delete user.op;
    res.send({ user: user });
  } catch (error) {
    return res.status(404).send({ success: false, message: "user not found" });
  }
});

// delete single radius user
router.delete("/radiususer/:id", permission(), async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await prisma.radcheck.findUnique({
      where: { id: parseInt(id) },
    });

    const delete_customer = await prisma.radusergroup.delete({
      where: { id: customer.radusergroup_id },
    });

    return res.send({
      success: true,
      message:
        "Sukses delete customer, anda dapat kembali ke menu sebelumnya dengan menekan tombol back",
    });
  } catch (error) {
    return res.send({ success: false, message: error });
  }
});

// Get single radius user and detail for ME user
router.get("/radiususer_me/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.radcheck.findUnique({
    where: { id: parseInt(id) },
    include: { app_service: true, radusergroup: true },
  });
  delete user.attribute;
  delete user.op;
  res.send({ user: user });
});

// Add new radius user
router.post("/radiususer", async (req, res) => {
  const formSchema = Joi.object({
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    service: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    retype_password: Joi.string().min(2),
    expiry_date: Joi.date(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(req.body.data);
  // Joi Error
  if (formValidate.error)
    return res
      .status(401)
      .send({ message: formValidate.error.details[0].message });
  const {
    username,
    first_name,
    last_name,
    address,
    phone,
    service,
    email,
    password,
    expiry_date,
  } = req.body.data;
  if (expiry_date) {
    try {
      const new_radius_user = await prisma.radcheck.create({
        data: {
          username: username,
          // Convert Password key to Value. Because Freeradius using value key instead password
          value: password,
          // expirydate: dayjs().add(30, "day").format(),
          expirydate: dayjs(`${expiry_date}`).format(),
          email: email,
          address: address,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          service_status: "active",
          app_service: { connect: { service_name: service } },
          radusergroup: {
            create: { username: username, groupname: service },
          },
        },
      });
      return res.send({ message: "SuccessFully Migrated" });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          return res.status(401).send({ message: "Username must be unique" });
        }
      }
      return res.status(401).send({
        status: "success",
        message: `Failed Adding user ${e?.message}`,
      });
    }
  }
  try {
    const new_radius_user = await prisma.radcheck.create({
      data: {
        username: username,
        // Convert Password key to Value. Because Freeradius using value key instead password
        value: password,
        // expirydate: dayjs().add(30, "day").format(),
        expirydate: dayjs("2000-01-01T07:00:00").format("YYYY-MM-DDTHH:mm:ssZ"),
        email: email,
        address: address,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        service_status: "registered",
        app_service: { connect: { service_name: service } },
        radusergroup: {
          create: { username: username, groupname: "registered" },
        },
      },
    });

    const message_whatsapp = await prisma.app_message.findFirst({
      where: { message_name: "register_berhasil" },
    });

    console.log(message_whatsapp);

    const computed_message = eval(
      "`" + (await message_whatsapp.message_content) + "`"
    );

    console.log(computed_message);

    const send_wa = await send_whatsapp(
      `${new_radius_user.phone}`,
      computed_message
    );

    return res.send({ message: send_wa?.data.message });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(401).send({ message: "Username must be unique" });
      }
    }
    console.log(e);
    throw e;
  }
});

// Edit radius user
router.patch("/radiususer", async (req, res) => {
  const { editedData } = req.body;
  const formSchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    value: Joi.string(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    services_id: Joi.string(),
    isChangeService: Joi.boolean(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(editedData);
  // Joi Error
  if (formValidate.error)
    return res
      .status(401)
      .send({ message: formValidate.error.details[0].message });
  const {
    id,
    username,
    first_name,
    last_name,
    address,
    phone,
    value,
    email,
    services_id,
    isChangeService,
  } = editedData;

  try {
    const current_user = await prisma.radcheck.findUnique({
      where: { id: id },
      include: { radusergroup: true, app_service: true },
    });

    if (isChangeService) {
      if (current_user.service_status === "active") {
        // change service id
        await prisma.radcheck.update({
          where: { id: id },
          data: {
            services_id: services_id,
          },
        });
        // change radusergroup
        await prisma.radusergroup.update({
          where: { id: current_user.radusergroup_id },
          data: {
            groupname: services_id,
          },
        });
        return res.send({ message: "Change Service Success" });
      }
      return res
        .status(403)
        .send({ message: "Account must be active before change service" });
    }

    await prisma.radcheck.update({
      where: { id: id },
      data: {
        username: username,
        email: email,
        address: address,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        value: value,
      },
    });
    return res.send({ message: "User info updated" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        return res.status(401).send({ message: "Username must be unique" });
      }
    }
    throw e;
  }
});

// get services list
router.get("/getservices", async (req, res) => {
  try {
    const services = await prisma.app_service.findMany({
      where: {
        NOT: [
          { service_name: "registered" },
          { service_name: "suspend" },
          { service_name: "terminated" },
        ],
      },
    });
    return res.send({ data: services });
  } catch (error) {}
});

// payment history
router.get("/payment-history/:id", async (req, res) => {
  const { id } = req.params;
  const payments = await prisma.app_transaction.findMany({
    where: { radcheck_id: parseInt(id) },
    orderBy: { transaction_time: "desc" },
    take: 15,
  });
  return res.send(payments);
});

// Get admin user
router.get("/admin-user", permission(), async (req, res) => {
  let { maxPerpage, page, searchBy, searchString, sortBy, sortMethod } =
    req.query;
  // query is string convert into INT
  maxPerpage = parseInt(maxPerpage);
  page = parseInt(page);

  const search_by_id = {
    where: { [searchBy]: parseInt(searchString) || 0 },
    select: {
      username: true,
      email: true,
      id: true,
      isActive: true,
      roles: true,
    },
  };

  const search_by_thurty = {
    where: { [searchBy]: { contains: searchString } },
    orderBy: { [sortBy]: sortMethod },
    take: maxPerpage,
    skip: (page - 1) * maxPerpage,
    select: {
      username: true,
      email: true,
      id: true,
      isActive: true,
      roles: true,
    },
  };

  const no_search_string = {
    orderBy: { [sortBy]: sortMethod },
    take: maxPerpage,
    skip: (page - 1) * maxPerpage,
    select: {
      username: true,
      email: true,
      id: true,
      isActive: true,
      roles: true,
    },
  };
  try {
    // If searchby ID
    if (searchBy === "id") {
      const alluser = await prisma.app_users.findUnique(search_by_id);

      if (!alluser)
        return res.send({
          data: [],
        });

      return res.send({ data: [alluser] });
    }
    // if req.query Thruty in searchBy and Search String
    if (searchBy && searchString) {
      const alluser = await prisma.app_users.findMany(search_by_thurty);
      if (!alluser)
        return res.send({
          data: [],
        });
      return res.send({
        data: alluser,
      });
    }

    // If req.query Falsy in searchBy or Falsy in searchSring
    if (!searchBy || !searchString) {
      const alluser = await prisma.app_users.findMany(no_search_string);
      if (!alluser)
        return res.send({
          data: [],
        });
      return res.send({
        data: alluser,
      });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// Snap in window
router.get("/pay-order-snap", async (req, res) => {
  // Get id from params
  const { id } = req.query;

  // Get user attributes from radcheck table
  const user = await prisma.radcheck.findUnique({
    where: { id: parseInt(id) },
    include: { app_service: true },
  });

  if (!user) return res.send({ error: "user not found" });

  // Get gross_ammount, status_code, and order_id in order to generate signature key in transaction table
  let gross_amount = user.app_service.service_ammount;

  if (user.service_status === "registered") {
    gross_amount = (
      parseInt(user.app_service.service_ammount) +
      parseInt(user.app_service.installation_fee)
    ).toString();
  }
  const status_code = 200;
  const serverkey = process.env.SERVER_KEY_MIDTRANS;

  let order_id;

  // Create app_transaction item in order generate order_id
  try {
    const transaction = await prisma.app_transaction.create({
      data: {
        gross_amount: gross_amount,
        radcheck_id: parseInt(id),
        transaction_time: new Date(),
      },
    });

    order_id = transaction.order_id;
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

  // Generate signature key
  const signature_key = sha.sha512(
    // convert orderId to string, and add .00 to gross amount because midtrans using .00 after gross ammount, for ex: 50000.00
    order_id.toString() + status_code + gross_amount + ".00" + serverkey
  );

  // Update app_transaction
  try {
    await prisma.app_transaction.update({
      where: {
        order_id: order_id,
      },
      data: {
        signature_key: signature_key,
        transaction_status: "pending",
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

  try {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction:
        process.env.IS_PRODUCTION_MIDTRANS === "false" ? false : true,
      serverKey: process.env.SERVER_KEY_MIDTRANS,
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
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      },
    };
    const transaction = await snap.createTransaction(parameter);
    res.send({
      transactionDetail: transaction,
    });
  } catch (error) {
    return res.status(400).send({
      message: "failed when creating payment gateway process",
      error_messages: error.ApiResponse
        ? error.ApiResponse.error_messages[0]
        : JSON.stringify(error),
    });
  }
});

router.post("/app-services", async (req, res) => {
  // get list of rules and return it
  const formSchema = Joi.object({
    service_name: Joi.string().required(),
    installation_fee: Joi.number().required(),
    service_ammount: Joi.number().required(),
    service_period: Joi.number().required(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(req.body);
  // Joi Error
  if (formValidate.error)
    return res.send({ error: formValidate.error.details[0].message });

  const { service_name, installation_fee, service_ammount, service_period } =
    req.body;
  // if success
  const new_app_service = await prisma.app_service.create({
    data: {
      service_name: service_name,
      installation_fee: installation_fee,
      service_ammount: service_ammount,
      service_period: service_period,
    },
  });
});

// APP services CRUD
router.get("/app-services", async (req, res) => {
  const app_services = await prisma.app_service.findMany({
    where: {
      NOT: { service_name: { in: ["registered", "terminated", "suspend"] } },
    },
    include: { radgroupreply: true },
  });
  return res.send({ message: app_services });
});

router.patch("/app-services", async (req, res) => {
  console.log(req.body.data);
  let {
    service_name,
    service_ammount,
    service_period,
    installation_fee,
    radgroupreply,
  } = req.body.data;

  // console.log(radgroupreply);
  // overide string to int
  service_period = parseInt(service_period);
  try {
    const edit = await prisma.app_service.update({
      where: { service_name: req.body.data.service_name },
      data: {
        installation_fee: installation_fee,
        service_ammount: service_ammount,
        service_name: service_name,
        service_period: service_period,
      },
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }

  // update rad group reply

  radgroupreply.forEach(async (item) => {
    try {
      const edit2 = await prisma.radgroupreply.update({
        where: { id: item.id },
        data: { value: item.value },
      });
    } catch (error) {
      console.log(error);
      return res.send({ success: false, message: error.message });
    }
  });

  return res.send({ success: true, message: "success update data" });
});

router.post("/manage-services", async (req, res) => {
  const formSchema = Joi.object({
    service_name: Joi.string().required(),
    service_ammount: Joi.string().required(),
    service_period: Joi.number().required(),
    installation_fee: Joi.string().required(),
    framed_pool: Joi.string().required(),
    mikrotik_rate_limit: Joi.string().required(),
  });
  // Joi Validate
  const formValidate = formSchema.validate(req.body.data);
  // Joi Error
  if (formValidate.error)
    return res.send({
      success: false,
      message: formValidate.error.details[0].message,
    });

  // if using POST using req body
  const {
    service_name,
    service_ammount,
    service_period,
    installation_fee,
    framed_pool,
    mikrotik_rate_limit,
  } = req.body.data;

  // add app_services
  try {
    await prisma.app_service.create({
      data: {
        service_name,
        installation_fee,
        service_ammount,
        service_period: parseInt(service_period),
      },
    });
  } catch (error) {
    // on Fail
    return res.send({ success: false, message: error.message });
  }

  try {
    await prisma.radgroupreply.createMany({
      data: [
        {
          groupname: service_name,
          attribute: "Mikrotik-Rate-Limit",
          op: ":=",
          value: mikrotik_rate_limit,
        },
        {
          groupname: service_name,
          attribute: "Framed-Pool",
          op: ":=",
          value: framed_pool,
        },
      ],
    });
  } catch (error) {
    // on Fail
    return res.send({ success: false, message: error.message });
  }

  // On Success
  return res.send({ success: true, message: "success update data" });
});

router.post("/deleteservices", async (req, res) => {
  // if using POST using req body
  const { service_name } = req.body;
  console.log(service_name);

  // delete on db
  try {
    await prisma.app_service.delete({
      where: { service_name: service_name },
    });
  } catch (error) {
    // on Fail
    console.log(error.message);
    if (error.message.includes("constraint"))
      return res.send({
        success: false,
        message:
          "Tidak bisa menghapus profile yang sedang terpakai oleh customer",
      });
    return res.send({ success: false, message: error });
  }

  // On Success
  return res.send({ success: true, message: "success Delete" });
});

// Pembayaran Cash
router.post("/cash-payment", async (req, res) => {
  const { customer_id, gross_amount, merchant_id } = req.body.data;
  // if status is register, change radcheck table. change user service_status to active. extend expiry date = today+30day
  const user_radcheck = await prisma.radcheck.findUnique({
    where: { id: parseInt(customer_id) },
  });

  if (
    user_radcheck.service_status === "registered" ||
    user_radcheck.service_status === "suspend"
  ) {
    // set expiry date +30 day from TODAY
    await prisma.radcheck.update({
      where: { id: parseInt(user_radcheck.id) },
      data: {
        service_status: "active",
        expirydate: dayjs().add(30, "day").format(),
      },
    });

    // change radiusgroup to service
    await prisma.radusergroup.update({
      where: { id: parseInt(user_radcheck.radusergroup_id) },
      data: { groupname: user_radcheck.services_id },
    });
  }

  if (user_radcheck.service_status === "active") {
    await prisma.radcheck.update({
      where: { id: parseInt(user_radcheck.id) },
      data: {
        service_status: "active",
        expirydate: dayjs(user_radcheck.expirydate).add(30, "day").format(),
      },
    });
  }

  // Save Payment change to DB
  try {
    await prisma.app_transaction.create({
      data: {
        // create
        transaction_time: dayjs().format(),
        transaction_status: "settlement",
        gross_amount: gross_amount,
        settlement_time: dayjs().format(),
        payment_type: "cash",
        merchant_id: merchant_id,
        radcheck_id: parseInt(customer_id),
      },
    });
    return res.send({ success: true, message: "Cash Payment success" });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message ? error.message : error,
    });
  }
});

module.exports = router;
