var CronJob = require("cron").CronJob;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Dayjs Import
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

const { exec } = require("child_process");

var job = new CronJob(
  "*/10 * * * * *",
  async function () {
    console.log("running..");
    // Update radgroup
    const users_expired = await prisma.radcheck.findMany({
      where: {
        AND: [
          { service_status: "active" },
          { expirydate: { lt: dayjs().format() } },
        ],
      },
    });

    users_expired.forEach(async (element) => {
      console.log(element);
      exec(
        `echo "User-Name='${element.username}'" | /usr/bin/radclient -c '1' -n '3' -r '3' -t '3' -x '192.168.16.10:3799' 'disconnect' 'mikrotik'`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        }
      );

      await prisma.radusergroup.update({
        where: { id: element.radusergroup_id },
        data: { groupname: "suspend" },
      });
    });

    // Update radcheck
    const expiry = await prisma.radcheck.updateMany({
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

    // console.log("You will see this message every second");
  },
  null,
  true,
  "Asia/Jakarta"
);

job.start();

// async function a() {
//   console.log(expiry);
// }
// a();
