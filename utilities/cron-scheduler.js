var CronJob = require("cron").CronJob;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Dayjs Import
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

// CRON vars
const every_9_am = "0 9 * * *";
const every_2_sec = "*/2 * * * * *";
const every_10_sec = "*/10 * * * * *";

const { exec } = require("child_process");
const send_whatsapp = require("./send-whatsapp");

var isolir = new CronJob(
  every_10_sec,
  async function () {
    console.log("running every 10s..");
    // Update radgroup
    const users_expired = await prisma.radcheck.findMany({
      where: {
        AND: [
          { service_status: "active" },
          { expirydate: { lt: dayjs().format() } },
        ],
      },
    });

    const all_nas = await prisma.nas.findMany({});

    all_nas.forEach(async (nas) => {
      users_expired.forEach(async (element) => {
        exec(
          `echo "User-Name='${element.username}'" | /usr/bin/radclient -c '1' -n '3' -r '3' -t '3' -x '${nas.nasname}:${nas.ports}' 'disconnect' '${nas.secret}'`,
          async (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            // on success
            console.log(`stdout: ${stdout}`);
            // Update radusergroup set status to suspend
            await prisma.radusergroup.update({
              where: { id: element.radusergroup_id },
              data: { groupname: "suspend" },
            });

            // Update radcheck. set all expired customer (POV: Today) to suspend
            await prisma.radcheck.updateMany({
              where: {
                service_status: "active",
                expirydate: {
                  lt: dayjs().format(),
                },
              },
              data: {
                service_status: "suspend",
              },
            });
          }
        );
      });
    });
  },
  null,
  true,
  "Asia/Jakarta"
);

var wa_notify = new CronJob(
  every_9_am,
  async function () {
    // get message from prisma
    const reminder_message = await prisma.app_message.findFirst({
      where: { message_name: "reminder" },
    });

    const today = dayjs().hour(0).minute(0).second(0).format();
    const three_day_from_now = dayjs()
      .add(5, "day")
      .hour(0)
      .second(0)
      .minute(0)
      .format();

    const two_day_from_now = dayjs()
      .add(3, "day")
      .hour(0)
      .second(0)
      .minute(0)
      .format();

    const users_expired_in_3day = await prisma.radcheck.findMany({
      where: {
        AND: [
          { service_status: "active" },
          { expirydate: { lt: three_day_from_now, gt: two_day_from_now } },
        ],
      },
    });

    // Send Whatsapp
    users_expired_in_3day.forEach(async (user) => {
      const nama_depan_pelanggan = user.first_name;
      const nama_belakang_pelanggan = user.last_name;
      const tgl_expired = dayjs(user.expirydate).format(
        "DD-MM-YYYY Pukul HH:mm:ss WIB"
      );
      const username_pelanggan = user.username;
      const password_pelanggan = user.value;

      const computed_message = eval(
        "`" + (await reminder_message.message_content) + "`"
      );
      send_whatsapp(user.phone, computed_message);
    });
  },
  null,
  true,
  "Asia/Jakarta"
);

// Start
isolir.start();
wa_notify.start();
