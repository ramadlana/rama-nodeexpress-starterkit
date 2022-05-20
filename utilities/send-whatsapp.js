const axios = require("axios").default;

async function send_whatsapp(target_number, wa_message) {
  try {
    const sendWA = await axios.post(
      `${process.env.WA_GW}`,
      {
        instances_id: `${process.env.WA_GW_INSTANCES}`,
        to: target_number,
        content: wa_message,
      },
      {
        headers: {
          "x-access-key": `${process.env.WA_GW_ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return sendWA;
  } catch (error) {
    return error;
  }
}

module.exports = send_whatsapp;
