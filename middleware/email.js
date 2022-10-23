import nodemailer from "nodemailer";
import dotenvConfigOptions from "dotenv";
// import price from "../middleware/BitValue.js";
import databaseConnection from "../connection.js";

dotenvConfigOptions.config();

// console.log(price);

// console.log(price);
// var MinMail = databaseConnection.query(
//   `SELECT email FROM cryptotracker.users WHERE ${price} < min`
// );
// var MaxMail = databaseConnection.query(
//   `SELECT email FROM cryptotracker.users WHERE ${price} > Max`
// );
// console.log(MinMail);
function min() {
  databaseConnection.connect(function (err) {
    if (err) throw err;
    databaseConnection.query(
      `SELECT email from cryptotracker.users`,
      function (err, result, fields) {
        if (err) throw err;
        console.log('"' + result[0].email + '"');
        let mailId = '"' + result[0].email + '"';
        return mailId;
      }
    );
  });
}
var toMail;
toMail = min();
// console.log(toMail);
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS,
  },
});

const message = {
  from: "me@gmail.com",
  to: min(),
  toMail,
  subject: "Threshold warning!",
  text: "Price went below min value ",
};

transport.sendMail(message, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("email sent successfully");
  }
});

export default transport.sendMail;
