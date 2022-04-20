const winston = require("winston");

const logging_func = () => {
  // Handling output to console and file
  //   winston.add(
  //     new winston.transports.Console({
  //       json: false,
  //       timestamp: true,
  //     })
  //   );
  winston.add(new winston.transports.File({ filename: "error.log" }));
  //   console.log(winston.error);

  // Handling Uncaught
  process.on("uncaughtException", (ex) => {
    console.log("We Got An Uncaught Exception Please read the Log", ex);
    winston.error("We Got An Uncaught Exception", ex);
  });

  // Handling Promise rejection
  process.on("unhandledRejection", (ex) => {
    winston.error("We Got An unhandledRejection Exception", ex);
    console.log("We Got An Uncaught Exception Please read the Log", ex);
  });
};

module.exports = logging_func;
