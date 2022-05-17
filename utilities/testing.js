// const { exec } = require("child_process");
const username = "hidayah";

// exec(
//   `/bin/echo "User-Name='${username}'" | /usr/bin/radclient -c '1' -n '3' -r '3' -t '3' -x '192.168.16.10:3799' 'disconnect' 'mikrotik'`,
//   (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//   }
// );

const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function lsWithGrep() {
  try {
    const { stdout, stderr } = await exec("ls | grep js");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}
lsWithGrep();
