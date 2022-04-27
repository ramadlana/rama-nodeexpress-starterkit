var CronJob = require("cron").CronJob;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

var job = new CronJob(
  "* * * * * *",
  async function () {
    const data = await prisma.app_users.findUnique({
      where: { username: "test" },
    });
    console.log(data);
    // console.log("You will see this message every second");
  },
  null,
  true,
  "Asia/Jakarta"
);
job.start();
